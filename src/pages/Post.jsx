import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as api from "../api";
import CommentCard from "../components/CommentCard";
import TitleInput from "../components/TitleInput";
import DescriptionInput from "../components/DescriptionInput";
import OptionsInput from "../components/OptionsInput";
import CategoryInput from "../components/CategoryInput";
import CommentInput from "../components/CommentInput";
import * as utils from "../utils";

export default function Post({
    isVotesVisible,
    setIsVotesVisible,
    setIsVoteAddedMessageVisible,
    setIsVoteNotAddedMessageVisible,
    setIsPostUpdatedMessageVisible,
    setIsPostNotUpdatedMessageVisible,
    setIsCommentPostedMessageVisible,
    setIsCommentNotPostedMessageVisible,
    setIsCommentUpdatedMessageVisible,
    setIsCommentNotUpdatedMessageVisible,
    setIsCommentDeletedMessageVisible,
    setIsCommentNotDeletedMessageVisible,
    setIsPostDeletedMessageVisible,
    setIsPostNotDeletedMessageVisible
}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const {post_id_and_title} = useParams();
    const postId = parseInt(post_id_and_title.slice(0, post_id_and_title.indexOf("-")));

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingPostSuccessful, setIsFetchingPostSuccessful] = useState(null);

    const [post, setPost] = useState({});

    const [optionInput, setOptionInput] = useState("");

    const [voterIds, setVoterIds] = useState([]);
    const [hasLoggedInUserAlreadyVoted, setHasLoggedInUserAlreadyVoted] = useState(null);
    const [isVoteAddedSuccessfully, setIsVoteAddedSuccessfully] = useState(null);

    const [comments, setComments] = useState([]);
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);
    const [isFetchingCommentsSuccessful, setIsFetchingCommentsSuccessful] = useState(null);

    const [isPostEditable, setIsPostEditable] = useState(false);
    const [editTitleInput, setEditTitleInput] = useState("");
    const [editCategoryInput, setEditCategoryInput] = useState("");
    const [editDescriptionInput, setEditDescriptionInput] = useState("");

    const [editOptionInputs, setEditOptionInputs] = useState({
        option1Input: "",
        option2Input: "",
        option3Input: "",
        option4Input: "",
        option5Input: ""
    });

    const [editOptionInputImages, setEditOptionInputImages] = useState({
        option1ImageInput: "",
        option2ImageInput: "",
        option3ImageInput: "",
        option4ImageInput: "",
        option5ImageInput: ""
    });

    const [editOptionsHasDuplicates, setEditOptionsHasDuplicates] = useState(null);
    const [isNumberOfOptionsLessThanTwo, setIsNumberOfOptionsLessThanTwo] = useState(null);
    const [isPostUpdatedSuccessfully, setIsPostUpdatedSuccessfully] = useState(null);

    const [commentInput, setCommentInput] = useState("");

    const [isCommentPostedSuccessfully, setIsCommentPostedSuccessfully] = useState(null);
    const [isCommentUpdatedSuccessfully, setIsCommentUpdatedSuccessfully] = useState(null);
    const [isCommentDeletedSuccessfully, setIsCommentDeletedSuccessfully] = useState(null);
    const [isPostDeletedSuccessfully, setIsPostDeletedSuccessfully] = useState(null);

    const [isEditAndDeletePostButtonsVisible, setIsEditAndDeletePostButtonsVisible] = useState(false);
    const [isDeletePostMessageVisible, setIsDeletePostMessageVisible] = useState(false);
    const [isReportPostButtonVisible, setIsReportPostButtonVisible] = useState(false);

    const [selectedImage, setSelectedImage] = useState("");
    const [isOptionImageVisible, setIsOptionImageVisible] = useState(false);

    const [isOption1ImageInputValid, setIsOption1ImageInputValid] = useState(true);
    const [isOption2ImageInputValid, setIsOption2ImageInputValid] = useState(true);
    const [isOption3ImageInputValid, setIsOption3ImageInputValid] = useState(true);
    const [isOption4ImageInputValid, setIsOption4ImageInputValid] = useState(true);
    const [isOption5ImageInputValid, setIsOption5ImageInputValid] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setIsFetchingPostSuccessful(null);
        setHasLoggedInUserAlreadyVoted(null);
        setIsPostEditable(false);
        api.getPostById(postId)
            .then((response) => {
                setIsLoading(false);
                setIsFetchingPostSuccessful(true);
                setPost(response);
                const voters = [];
                if (response.options_and_votes.length > 0) {
                    response.options_and_votes.forEach((option) => {
                        option.votesFromUserIds.forEach((voterId) => {
                            voters.push(voterId);
                        })
                    })
                    setVoterIds(voters);
                }
                if (voters.includes(userLoggedIn.user_id)) {
                    setHasLoggedInUserAlreadyVoted(true);
                } else {
                    setHasLoggedInUserAlreadyVoted(false);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setIsFetchingPostSuccessful(false);
                setHasLoggedInUserAlreadyVoted(null);
            })
    }, [
        post_id_and_title,
        isVoteAddedSuccessfully,
        isPostUpdatedSuccessfully,
        isCommentPostedSuccessfully,
        isCommentUpdatedSuccessfully,
        isCommentDeletedSuccessfully,
        isPostDeletedSuccessfully
    ])

    useEffect(() => {
        setIsCommentsLoading(true);
        setIsFetchingCommentsSuccessful(null);
        api.getCommentsByPostId(postId)
            .then((response) => {
                setIsCommentsLoading(false);
                setIsFetchingCommentsSuccessful(true);
                setComments(response);
            })
            .catch((error) => {
                setIsCommentsLoading(false);
                setIsFetchingCommentsSuccessful(false);
            })
    }, [
        post_id_and_title,
        isVoteAddedSuccessfully,
        isPostUpdatedSuccessfully,
        isCommentPostedSuccessfully,
        isCommentUpdatedSuccessfully,
        isCommentDeletedSuccessfully,
        isPostDeletedSuccessfully
    ])

    function handleOptionInput(event) {
        setOptionInput(event.target.value);
    }

    function onClickVoteButton() {
        setIsEditAndDeletePostButtonsVisible(false);
        setIsDeletePostMessageVisible(false);
        setIsReportPostButtonVisible(false);
        let updatedOptionsAndVotes = [];
        post.options_and_votes.forEach((option) => {
            const newOption = {};
            newOption.option = option.option;
            newOption.optionImage = option.optionImage;
            if (option.option === optionInput) {
                newOption.votesFromUserIds = [...option.votesFromUserIds, userLoggedIn.user_id];
            }
            else {
                newOption.votesFromUserIds = [...option.votesFromUserIds];
            }
            updatedOptionsAndVotes.push(newOption);
        })

        setIsVoteAddedSuccessfully(null);
        api.updatePost(new Date(), post.title, post.description, post.category, updatedOptionsAndVotes, postId)
            .then((response) => {
                setIsVoteAddedSuccessfully(true);
                setIsVoteAddedMessageVisible(true);
                setOptionInput("");
                setTimeout(() => setIsVoteAddedMessageVisible(false), 3000);
            })
            .catch((error) => {
                setIsVoteNotAddedMessageVisible(true);
                setOptionInput("");
                setTimeout(() => setIsVoteNotAddedMessageVisible(false), 3000);
            })
    }

    function onClickShowVotesButton() {
        setIsVotesVisible((currentIsVotesVisible) => {
            return !currentIsVotesVisible;
        })
    }

    function onClickPostOptionsButton() {
        setIsEditAndDeletePostButtonsVisible((currentIsEditAndDeletePostButtonsVisible) => {
            return !currentIsEditAndDeletePostButtonsVisible;
        });
        setIsReportPostButtonVisible((currentIsReportPostButtonVisible) => {
            return !currentIsReportPostButtonVisible;
        })
    }

    function onClickEditPost() {
        setIsPostEditable((currentIsPostEditable) => {
            return !currentIsPostEditable;
        });
        setEditTitleInput(post.title);
        setEditCategoryInput(utils.convertUrlsToUserFriendlyHeadings(post.category));
        setEditDescriptionInput(post.description);
        const currentOptions = {
            option1Input: post.options_and_votes[0] ? post.options_and_votes[0].option : "",
            option2Input: post.options_and_votes[1] ? post.options_and_votes[1].option : "",
            option3Input: post.options_and_votes[2] ? post.options_and_votes[2].option : "",
            option4Input: post.options_and_votes[3] ? post.options_and_votes[3].option : "",
            option5Input: post.options_and_votes[4] ? post.options_and_votes[4].option : "",
        }
        setEditOptionInputs(currentOptions);
        const currentOptionImages = {
            option1ImageInput: post.options_and_votes[0] ? post.options_and_votes[0].optionImage : "",
            option2ImageInput: post.options_and_votes[1] ? post.options_and_votes[1].optionImage : "",
            option3ImageInput: post.options_and_votes[2] ? post.options_and_votes[2].optionImage : "",
            option4ImageInput: post.options_and_votes[3] ? post.options_and_votes[3].optionImage : "",
            option5ImageInput: post.options_and_votes[4] ? post.options_and_votes[4].optionImage : "",
        }
        setEditOptionInputImages(currentOptionImages);
    }

    function onClickUpdatePostButton() {
        const updatedOptions = Object.values(editOptionInputs).filter((option) => option);        
        const updatedOptionsMinusSpaces = updatedOptions.map((option) => option.trim());
        const updatedOptionsInLowercase = updatedOptionsMinusSpaces.map((option) => option.toLowerCase());
        const optionsContainsDuplicates = updatedOptionsInLowercase.some((value, index) => {
            return updatedOptionsInLowercase.indexOf(value, index + 1) !== -1;
        });

        if (optionsContainsDuplicates) {
            setEditOptionsHasDuplicates(optionsContainsDuplicates);
        }
        else if (updatedOptions.length < 2) {
            setIsNumberOfOptionsLessThanTwo(updatedOptions.length < 2);
        }
        else {
            const currentOptions = post.options_and_votes.map((option) => {
                return option.option;
            })
            const currentOptionsInLowerCase = currentOptions.map((option) => {
                return option.toLowerCase();
            })
            const updatedOptions = Object.values(editOptionInputs);
            const newImages = Object.values(editOptionInputImages);

            const updatedOptionsImagesAndVotes = [];
            for (let optionNumber = 0; optionNumber < updatedOptions.length; optionNumber++) {
                let votes;
                if (updatedOptions[optionNumber].length !== 0) {
                    if (currentOptionsInLowerCase.includes(updatedOptions[optionNumber].toLowerCase())) {
                        const option = post.options_and_votes.filter((optionAndVotes) => {
                            return optionAndVotes.option.toLowerCase() === updatedOptions[optionNumber].toLowerCase();
                        })
                        votes = option[0].votesFromUserIds;
                    }
                    else {
                        votes = [];
                    }

                    updatedOptionsImagesAndVotes.push({
                        option: updatedOptions[optionNumber] ? updatedOptions[optionNumber].trim() : "",
                        optionImage: newImages[optionNumber] ? newImages[optionNumber].trim() : "",
                        votesFromUserIds: votes
                    })
                }
            }

            setIsPostUpdatedSuccessfully(null);
            api.updatePost(new Date(), editTitleInput, editDescriptionInput, utils.convertCategoryToUrl(editCategoryInput), updatedOptionsImagesAndVotes, postId)
                .then((response) => {
                    setIsPostUpdatedSuccessfully(true);
                    setIsPostUpdatedMessageVisible(true);
                    setIsPostEditable(false);
                    setIsEditAndDeletePostButtonsVisible(false);
                    setTimeout(() => setIsPostUpdatedMessageVisible(false), 3000);
                })
                .catch((error) => {
                    setIsPostNotUpdatedMessageVisible(true);
                    setIsEditAndDeletePostButtonsVisible(false);
                    setTimeout(() => setIsPostNotUpdatedMessageVisible(false), 3000);
                })
        }
    }

    function onClickCancelEditPostButton() {
        setIsPostEditable(false);
        setIsNumberOfOptionsLessThanTwo(null);
        setEditOptionsHasDuplicates(null);
        setIsEditAndDeletePostButtonsVisible(false);
        setIsOption1ImageInputValid(true);
        setIsOption2ImageInputValid(true);
        setIsOption3ImageInputValid(true);
        setIsOption4ImageInputValid(true);
        setIsOption5ImageInputValid(true);
    }

    function onClickDeletePost() {
        setIsEditAndDeletePostButtonsVisible(false);
        setIsDeletePostMessageVisible(true);
    }

    function onClickDeletePostNo() {
        setIsEditAndDeletePostButtonsVisible(true);
        setIsDeletePostMessageVisible(false);
    }

    function onClickDeletePostYes() {
        setIsDeletePostMessageVisible(false);
        api.deleteCommentsByPostId(postId)
            .then((response) => {
                return api.deletePost(postId)
            })
            .then((response) => {
                setIsPostDeletedSuccessfully(true);
                setIsPostDeletedMessageVisible(true);
                setTimeout(() => setIsPostDeletedMessageVisible(false), 3000);
                navigate("/");
            })
            .catch((error) => {
                setIsPostNotDeletedMessageVisible(true);
                setTimeout(() => setIsPostNotDeletedMessageVisible(false), 3000);
            })
    }

    function onClickPostCommentButton() {
        setIsEditAndDeletePostButtonsVisible(false);
        setIsDeletePostMessageVisible(false);
        setIsReportPostButtonVisible(false);
        setIsCommentPostedSuccessfully(null);
        api.postComment(new Date(), new Date(), commentInput, [], post.post_id, userLoggedIn.user_id)
            .then((response) => {
                setIsCommentPostedSuccessfully(true);
                setIsCommentPostedMessageVisible(true);
                setCommentInput("");
                setTimeout(() => setIsCommentPostedMessageVisible(false), 3000);
                return api.updatePost(new Date(), post.title, post.description, post.category, post.options_and_votes, postId)
            })
            .catch((error) => {
                setIsCommentNotPostedMessageVisible(true);
                setTimeout(() => setIsCommentNotPostedMessageVisible(false), 3000);
            })
    }

    function onClickViewOptionImageButton(image) {
        setSelectedImage(image);
        setIsOptionImageVisible(true);
    }

    function onClickCloseImage() {
        setIsOptionImageVisible(false);
    }

    function onClickReportPost() {

    }

    const stylePostOption = {
        position: "relative"
    };

    const stylePostOptionPercentageBar = (percentage) => ({
        width: `${percentage}%`,
    });

    const styleEditPost = {
        display: isPostEditable ? "grid" : "none"
    }

    const styleEditAndDeletePostButtons = {
        display: isEditAndDeletePostButtonsVisible ? "initial" : "none"
    }

    const styleDeletePostMessage = {
        display: isDeletePostMessageVisible ? "initial" : "none"
    }

    const styleReportButton = {
        display: isReportPostButtonVisible ? "initial" : "none"
    }

    const styleOptionImage = {
        display: isOptionImageVisible ? "grid" : "none"
    }

    if (isLoading) {
        return (
            <p>Page is loading...</p>
        )
    }

    if (isFetchingPostSuccessful === false) {
        return (
            <p className="error">Page could not be loaded.</p>
        )
    }
    
    return (
        <div>
            <Helmet>
                <link rel="canonical" href={`https://helpmechooseone.com/post/${post_id_and_title}`} />
                <title>{post.title} • Help Me Choose One</title>
                <meta name="description" content={post.description} />
            </Helmet>

            <header>
                <h1>{post.title}</h1>
                <div>{utils.convertUrlsToUserFriendlyHeadings(post.category)}</div>
                <div>{new Date(post.post_date).toLocaleDateString()}</div>
                <div>{new Date(post.post_date).toLocaleTimeString()}</div>
            </header>

            <main>
                <section>
                    {Object.keys(userLoggedIn).length === 0
                        ? <div>
                            <img
                                src={
                                    post.avatar_url === "default-avatar.webp"
                                        ? require(`../assets/images/avatars/${post.avatar_url}`)
                                        : post.avatar_url
                                }
                                alt="Avatar"
                                className="post-avatar"
                            />
                            <div>{post.username}</div>
                        </div>
                        : <div>
                            <Link to={`/user/${post.post_owner_id}`}>
                                <img
                                    src={
                                        post.avatar_url === "default-avatar.webp"
                                            ? require(`../assets/images/avatars/${post.avatar_url}`)
                                            : post.avatar_url
                                    }
                                    alt="Avatar"
                                    className="post-avatar"
                                />
                            </Link>
                            <Link to={`/user/${post.post_owner_id}`}>{post.username}</Link>
                        </div>
                    }
                    
                    <p>{post.description}</p>

                    <button type="button" onClick={onClickShowVotesButton}>{isVotesVisible ? "Hide Votes" : "Show Votes"}</button>

                    <div id="post-option-image-and-close-button" onClick={onClickCloseImage} style={styleOptionImage}>
                        {selectedImage
                            ? <img src={selectedImage} alt="option-image" />
                            : <div>No image added</div>
                        }
                    </div>
                    
                    <form id="post-options-form">
                        <div id="post-options">
                            {post.options_and_votes.map((option) => {
                                return (
                                    <div key={option.option} className="post-option" style={stylePostOption}>
                                        <div>
                                            <div className="post-option-radio-input-and-label">
                                                {Object.keys(userLoggedIn).length === 0 || hasLoggedInUserAlreadyVoted
                                                    ? null
                                                    : <input type="radio" id={option.option} name="option" value={option.option} onChange={handleOptionInput} />
                                                }
                                                <label htmlFor={option.option} className="post-option-label">{option.option}</label>
                                                {option.optionImage
                                                    ? <span onClick={() => onClickViewOptionImageButton(option.optionImage)} className="view-option-image-button">View Image</span>
                                                    : null
                                                }
                                                
                                            </div>
                                            {isVotesVisible
                                                ?   <div className="post-option-votes-and-percentage">
                                                    <div>{option.votesFromUserIds.length} votes</div>
                                                    <div>({voterIds.length > 0 ? Math.round((option.votesFromUserIds.length * 100) / voterIds.length) : 0}%)</div>
                                                </div>
                                                : null
                                            }
                                        </div>
                                        
                                        {isVotesVisible
                                            ? <div
                                                className="post-option-percentage-bar"
                                                data-percentage={voterIds.length > 0 ? Math.round((option.votesFromUserIds.length * 100) / voterIds.length) : 0}
                                                style={stylePostOptionPercentageBar(voterIds.length > 0 ? Math.round((option.votesFromUserIds.length * 100) / voterIds.length) : 0)}
                                            >
                                                <span>*</span>
                                            </div>
                                            : null
                                        }
                                    </div>
                                )
                            })}
                        </div>
                        
                        {Object.keys(userLoggedIn).length === 0
                            ? <p><Link to="/log-in">Log in</Link> to vote and post a comment.</p>
                            : hasLoggedInUserAlreadyVoted
                                ? <div>You have already voted on this post.</div>
                                : <div>
                                    <button
                                        type="button"
                                        onClick={onClickVoteButton}
                                        disabled={!optionInput}
                                    >Vote</button>
                                </div>   
                        }
                    </form>

                    {Object.keys(userLoggedIn).length === 0
                        ? null
                        : <div id="post-options-button" onClick={onClickPostOptionsButton}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    }

                    {userLoggedIn.user_id === post.post_owner_id
                        ? <div>
                            <div style={styleEditAndDeletePostButtons}>
                                <button onClick={onClickEditPost}>Edit</button>
                                <button onClick={onClickDeletePost}>Delete</button>
                            </div>
                            <div style={styleDeletePostMessage}>
                                <div>Delete Post?</div>
                                <button onClick={onClickDeletePostNo}>No</button>
                                <button onClick={onClickDeletePostYes}>Yes</button>
                            </div>
                        </div>
                        : <button onClick={onClickReportPost} style={styleReportButton}>Report</button>
                    }

                    <div id="edit-post" style={styleEditPost}>
                        <h2>Edit Post</h2>

                        <TitleInput
                            titleInput={editTitleInput}
                            setTitleInput={setEditTitleInput}
                        />

                        <CategoryInput
                            categoryInput={editCategoryInput}
                            setCategoryInput={setEditCategoryInput}
                        />

                        <DescriptionInput
                            descriptionInput={editDescriptionInput}
                            setDescriptionInput={setEditDescriptionInput}
                        />

                        <OptionsInput
                            optionInputs={editOptionInputs}
                            setOptionInputs={setEditOptionInputs}
                            setOptionsHasDuplicates={setEditOptionsHasDuplicates}
                            optionInputImages={editOptionInputImages}
                            setOptionInputImages={setEditOptionInputImages}
                            isOption1ImageInputValid={isOption1ImageInputValid}
                            setIsOption1ImageInputValid={setIsOption1ImageInputValid}
                            isOption2ImageInputValid={isOption2ImageInputValid}
                            setIsOption2ImageInputValid={setIsOption2ImageInputValid}
                            isOption3ImageInputValid={isOption3ImageInputValid}
                            setIsOption3ImageInputValid={setIsOption3ImageInputValid}
                            isOption4ImageInputValid={isOption4ImageInputValid}
                            setIsOption4ImageInputValid={setIsOption4ImageInputValid}
                            isOption5ImageInputValid={isOption5ImageInputValid}
                            setIsOption5ImageInputValid={setIsOption5ImageInputValid}
                        />

                        {editOptionsHasDuplicates === null || editOptionsHasDuplicates === false
                            ? null
                            : <p className="error">You have entered duplicate options</p>
                        }

                        {isNumberOfOptionsLessThanTwo
                            ? <p className="error">Please enter at least two options</p>
                            : null
                        }

                        <div>
                            <button
                                type="button"
                                onClick={onClickCancelEditPostButton}
                            >Cancel</button>
                            <button
                                type="button"
                                onClick={onClickUpdatePostButton}
                                disabled={
                                    !editTitleInput ||
                                    !editDescriptionInput ||
                                    editCategoryInput === "Select a Category" ||
                                    !isOption1ImageInputValid ||
                                    !isOption2ImageInputValid ||
                                    !isOption3ImageInputValid ||
                                    !isOption4ImageInputValid ||
                                    !isOption5ImageInputValid
                                }
                            >Update</button>
                        </div>
                    </div>
                </section>
                
                <section>
                    {userLoggedIn.user_id
                        ? <h2>Post a Comment</h2>
                        : null
                    }
                    
                    <form>
                        {userLoggedIn.user_id
                            ? <div>
                                <CommentInput
                                commentInput={commentInput}
                                setCommentInput={setCommentInput}
                            />
                            <button
                                type="button"
                                onClick={onClickPostCommentButton}
                                disabled={!commentInput}
                            >Post Comment</button>
                            </div>
                            : null
                        }
                    </form>
                </section>

                <section>
                    <h2>Comments</h2>
                    
                    {isCommentsLoading
                        ? <p>Loading comments...</p>
                        : null
                    }

                    {isFetchingCommentsSuccessful === null
                        ? null
                        : isFetchingCommentsSuccessful === false
                            ? <p className="error">Comments could not be loaded</p>
                            : comments.length === 0
                                ? <div>Be the first to comment on this post.</div>
                                : <div className="comments">
                                    {comments.map((comment) => {
                                        return <CommentCard
                                            key={comment.comment_id}
                                            comment={comment}
                                            userLoggedIn={userLoggedIn}

                                            setIsCommentUpdatedSuccessfully={setIsCommentUpdatedSuccessfully}
                                            setIsCommentUpdatedMessageVisible={setIsCommentUpdatedMessageVisible}
                                            setIsCommentNotUpdatedMessageVisible={setIsCommentNotUpdatedMessageVisible}

                                            setIsCommentDeletedSuccessfully={setIsCommentDeletedSuccessfully}
                                            setIsCommentDeletedMessageVisible={setIsCommentDeletedMessageVisible}
                                            setIsCommentNotDeletedMessageVisible={setIsCommentNotDeletedMessageVisible}
                                        />
                                    })}
                                </div>
                    }
                </section>
            </main>
        </div>
    )
}