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
    setIsPostNotDeletedMessageVisible,
    setIsVoteRemovedMessageVisible,
    setIsVoteNotRemovedMessageVisible
}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const {post_id_and_title} = useParams();
    const postId = parseInt(post_id_and_title.slice(0, post_id_and_title.indexOf("-")));

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingPostSuccessful, setIsFetchingPostSuccessful] = useState(null);

    const [post, setPost] = useState({});

    const [optionInput, setOptionInput] = useState("");

    const [voterIds, setVoterIds] = useState([]);
    const [loggedInUsersVote, setLoggedInUsersVote] = useState("");
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

    const [isEditAndDeletePostButtonsContainerVisible, setIsEditAndDeletePostButtonsContainerVisible] = useState(false);
    const [isDeletePostMessageContainerVisible, setIsDeletePostMessageContainerVisible] = useState();
    const [isReportPostButtonContainerVisible, setIsReportPostButtonContainerVisible] = useState(false);

    const [selectedImage, setSelectedImage] = useState("");
    const [isOptionImageVisible, setIsOptionImageVisible] = useState(false);

    const [isOption1ImageInputValid, setIsOption1ImageInputValid] = useState(true);
    const [isOption2ImageInputValid, setIsOption2ImageInputValid] = useState(true);
    const [isOption3ImageInputValid, setIsOption3ImageInputValid] = useState(true);
    const [isOption4ImageInputValid, setIsOption4ImageInputValid] = useState(true);
    const [isOption5ImageInputValid, setIsOption5ImageInputValid] = useState(true);

    const [isRemoveVoteMessageAndButtonsContainerVisible, setIsRemoveVoteMessageAndButtonsContainerVisible] = useState(false);
    const [isVoteRemovedSuccessfully, setIsVoteRemovedSuccessfully] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setIsFetchingPostSuccessful(null);
        setLoggedInUsersVote("");
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
                            if (userLoggedIn.user_id === voterId) {
                                setLoggedInUsersVote(option.option);
                            }
                            voters.push(voterId);
                        })
                    })
                    setVoterIds(voters);
                }                
            })
            .catch((error) => {
                setIsLoading(false);
                setIsFetchingPostSuccessful(false);
                setLoggedInUsersVote("");
            })
    }, [
        post_id_and_title,
        isVoteAddedSuccessfully,
        isPostUpdatedSuccessfully,
        isCommentPostedSuccessfully,
        isCommentUpdatedSuccessfully,
        isCommentDeletedSuccessfully,
        isPostDeletedSuccessfully,
        isVoteRemovedSuccessfully
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
        isPostDeletedSuccessfully,
        isVoteRemovedSuccessfully
    ])

    function handleOptionInput(event) {
        setOptionInput(event.target.value);
    }

    function onClickVoteButton() {
        setIsEditAndDeletePostButtonsContainerVisible(false);
        setIsReportPostButtonContainerVisible(false);
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
        setIsEditAndDeletePostButtonsContainerVisible(false);
        setIsReportPostButtonContainerVisible(false);
        setIsRemoveVoteMessageAndButtonsContainerVisible(false);
    }

    function onClickPostOptionsButton() {
        setIsEditAndDeletePostButtonsContainerVisible((currentIsEditAndDeletePostButtonsVisible) => {
            return !currentIsEditAndDeletePostButtonsVisible;
        });
        setIsReportPostButtonContainerVisible((currentIsReportPostButtonContainerVisible) => {
            return !currentIsReportPostButtonContainerVisible;
        })
        setIsRemoveVoteMessageAndButtonsContainerVisible(false);
    }

    function onClickCloseEditAndDeletePostLinksContainerButton() {
        setIsEditAndDeletePostButtonsContainerVisible(false);
    }

    function onClickCloseReportButtonLinkContainer() {
        setIsReportPostButtonContainerVisible(false);
    }

    function onClickEditPost() {
        setIsEditAndDeletePostButtonsContainerVisible(false);
        setIsPostEditable((currentIsPostEditable) => {
            return !currentIsPostEditable;
        });
        setIsRemoveVoteMessageAndButtonsContainerVisible(false);
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
            api.updatePost(new Date(), editTitleInput.trim(), editDescriptionInput.trim(), utils.convertCategoryToUrl(editCategoryInput), updatedOptionsImagesAndVotes, postId)
                .then((response) => {
                    setIsPostUpdatedSuccessfully(true);
                    setIsPostUpdatedMessageVisible(true);
                    setIsPostEditable(false);
                    setIsEditAndDeletePostButtonsContainerVisible(false);
                    setTimeout(() => setIsPostUpdatedMessageVisible(false), 3000);
                })
                .catch((error) => {
                    setIsPostNotUpdatedMessageVisible(true);
                    setIsEditAndDeletePostButtonsContainerVisible(false);
                    setTimeout(() => setIsPostNotUpdatedMessageVisible(false), 3000);
                })
        }
    }

    function onClickCancelEditPostButton() {
        setIsPostEditable(false);
        setIsNumberOfOptionsLessThanTwo(null);
        setEditOptionsHasDuplicates(null);
        setIsEditAndDeletePostButtonsContainerVisible(false);
        setIsOption1ImageInputValid(true);
        setIsOption2ImageInputValid(true);
        setIsOption3ImageInputValid(true);
        setIsOption4ImageInputValid(true);
        setIsOption5ImageInputValid(true);
    }

    function onClickDeletePost() {
        setIsEditAndDeletePostButtonsContainerVisible(false);
        setIsDeletePostMessageContainerVisible(true);
    }

    function onClickDeletePostNo() {
        setIsEditAndDeletePostButtonsContainerVisible(false);
        setIsDeletePostMessageContainerVisible(false);
    }

    function onClickDeletePostYes() {
        setIsDeletePostMessageContainerVisible(false);
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
        setIsEditAndDeletePostButtonsContainerVisible(false);
        setIsReportPostButtonContainerVisible(false);
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

    function onClickReportPostLink() {
        navigate(`/report/?report_owners_id=${userLoggedIn.user_id}&report_owners_name=${userLoggedIn.username}&post_id=${postId}&post_owners_id=${post.post_owner_id}&post_owners_name=${post.username}&comment_id=null&comment_owners_id=null&comment_owners_name=`);
    }

    function onClickRemoveVoteButton() {
        setIsEditAndDeletePostButtonsContainerVisible(false);
        setIsDeletePostMessageContainerVisible(false);
        setIsReportPostButtonContainerVisible(false);
        setIsRemoveVoteMessageAndButtonsContainerVisible((currentIsRemoveVoteMessageAndButtonsContainerVisible) => {
            return !currentIsRemoveVoteMessageAndButtonsContainerVisible;
        });
    }

    function onClickRemoveVoteButtonNo() {
        setIsRemoveVoteMessageAndButtonsContainerVisible(false);
    }

    function onClickRemoveVoteButtonYes() {
        setIsRemoveVoteMessageAndButtonsContainerVisible(false);
        const updatedOptionsAndVotes = post.options_and_votes.map((optionAndVotes) => {
            const newOptionAndVotes = {};
            newOptionAndVotes.option = optionAndVotes.option;
            newOptionAndVotes.optionImage = optionAndVotes.optionImage;
            if (optionAndVotes.votesFromUserIds.includes(userLoggedIn.user_id)) {
                const votesForOptionCopy = [...optionAndVotes.votesFromUserIds];
                votesForOptionCopy.splice(votesForOptionCopy.indexOf(userLoggedIn.user_id), 1);
                newOptionAndVotes.votesFromUserIds = votesForOptionCopy;
            }
            else {
                newOptionAndVotes.votesFromUserIds = [...optionAndVotes.votesFromUserIds];
            }
            return newOptionAndVotes;
        })

        setIsVoteRemovedSuccessfully(null);
        api.updatePost(new Date(), post.title, post.description, post.category, updatedOptionsAndVotes, postId)
            .then((response) => {
                setIsVoteRemovedSuccessfully(true);
                setIsVoteRemovedMessageVisible(true);
                setTimeout(() => setIsVoteRemovedMessageVisible(false), 3000);
            })
            .catch((error) => {
                setIsVoteNotRemovedMessageVisible(true);
                setTimeout(() => setIsVoteNotRemovedMessageVisible(false), 3000);
            })
    }

    const stylePostMain = {
        gap: userLoggedIn.user_id ? "40px" : "20px"
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

    const styleEditAndDeletePostButtonsContainer = {
        bottom: isEditAndDeletePostButtonsContainerVisible  ? "0%" : "-100%"
    }

    const styleDeletePostMessageContainer = {
        bottom: isDeletePostMessageContainerVisible ? "0%" : "-100%"
    }

    const styleReportButtonLinkContainer = {
        bottom: isReportPostButtonContainerVisible ? "0%" : "-100%"
    }

    const styleOptionImage = {
        display: isOptionImageVisible ? "grid" : "none"
    }

    const styleUpdatePostButton = {
        opacity: !editTitleInput ||
        !editDescriptionInput ||
        editCategoryInput === "Select a Category" ||
        !isOption1ImageInputValid ||
        !isOption2ImageInputValid ||
        !isOption3ImageInputValid ||
        !isOption4ImageInputValid ||
        !isOption5ImageInputValid ||
        Object.values(editOptionInputs).filter((option) => option).length < 2
            ? "0.3"
            : "1"
    }

    const styleRemoveVoteMessageAndButtonsContainer = {
        bottom: isRemoveVoteMessageAndButtonsContainerVisible ? "0%" : "-100%"
    }

    const stylePostCommentButton = {
        opacity: !commentInput ? "0.3" : "1"
    }

    const styleVoteButton = {
        opacity: !optionInput ? "0.3" : "1"
    }

    if (isLoading) {
        return (
            <main>
                <p>Page is loading...</p>
            </main>
        )
    }

    if (isFetchingPostSuccessful === false) {
        return (
            <main>
                <p className="error">Page could not be loaded.</p>
            </main>
        )
    }
    
    return (
        <div id="post">
            <Helmet>
                <link rel="canonical" href={`https://helpmechooseone.com/post/${post_id_and_title}`} />
                <title>{post.title} • Help Me Choose One</title>
                <meta name="description" content={post.description} />
            </Helmet>

            <header>
                <h1>{post.title}</h1>
            </header>

            <main style={stylePostMain}>
                <section id="post-section-main">
                    <div id="post-section-main-info">
                        {Object.keys(userLoggedIn).length === 0
                            ? <div>
                                <div className="post-avatar-username-options-button">
                                    <div className="post-avatar-username">
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
                                    
                                </div>
                            </div>
                            : <div>
                                <div className="post-avatar-username-options-button">
                                    <div className="post-avatar-username">
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
                                        <Link to={`/user/${post.post_owner_id}`} className="post-username">{post.username}</Link>
                                    </div>
                                    <div id="post-options-button" onClick={onClickPostOptionsButton}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        }
                         <div id="post-category-date-and-description">
                            <div id="post-category">{utils.convertUrlsToUserFriendlyHeadings(post.category)}</div>                    
                            <div id="post-date">
                                <div>{new Date(post.post_date).toLocaleDateString()}</div>
                                <div>{new Date(post.post_date).toLocaleTimeString()}</div>
                            </div>                    
                            <p>{post.description}</p>
                        </div>
                    </div>

                    <form id="post-options-form">
                        <div id="post-options">
                            {post.options_and_votes.map((option) => {
                                return (
                                    <div key={option.option} className="post-option" style={stylePostOption}>
                                        <div className="post-option-radio-input-label-view-image">
                                            <div className="post-option-radio-input-label">
                                                {Object.keys(userLoggedIn).length === 0 || loggedInUsersVote
                                                    ? null
                                                    : <input type="radio" id={option.option} name="option" value={option.option} onChange={handleOptionInput} />
                                                }
                                                <label htmlFor={option.option} className="post-option-label">{option.option}</label>
                                            </div>
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
                            ? <>
                                <div>
                                    <button type="button" onClick={onClickShowVotesButton}>{isVotesVisible ? "Hide Votes" : "Show Votes"}</button>
                                </div>
                                <div><Link to="/log-in" id="post-log-in-link">Log in</Link> to vote or post a comment.</div>
                            </>
                            : loggedInUsersVote
                                ? <div id="already-voted-message-display-votes-button">
                                    <div>
                                        <button type="button" onClick={onClickShowVotesButton}>{isVotesVisible ? "Hide Votes" : "Show Votes"}</button>
                                    </div>
                                    <div id="already-voted-message">You have already voted. You chose '<b>{loggedInUsersVote}</b>'. <span id="remove-vote-text" style={{color:"#FF206E"}} onClick={onClickRemoveVoteButton}>Remove vote</span>.</div>
                                    <div id="remove-vote-message-and-buttons-container" style={styleRemoveVoteMessageAndButtonsContainer}>
                                        <div id="remove-vote-message">Remove your vote of '{loggedInUsersVote}'?</div>
                                        <div id="remove-vote-buttons">
                                            <button
                                                type="button"
                                                onClick={onClickRemoveVoteButtonNo}
                                            >No</button>
                                            <button
                                                type="button"
                                                onClick={onClickRemoveVoteButtonYes}
                                            >Yes</button>
                                        </div>
                                    </div>
                                </div>
                                : <div id="display-votes-and-vote-button">
                                    <div>
                                        <button type="button" onClick={onClickShowVotesButton}>{isVotesVisible ? "Hide Votes" : "Show Votes"}</button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={onClickVoteButton}
                                        disabled={!optionInput}
                                        style={styleVoteButton}
                                    >Vote</button>
                                </div>   
                        }

                        <div id="post-option-image" onClick={onClickCloseImage} style={styleOptionImage}>
                            <img src={selectedImage} alt="option" />
                            <div>[x]</div>
                        </div>
                    </form>

                    {userLoggedIn.user_id === post.post_owner_id
                        ? <>
                            <div id="edit-and-delete-post-buttons-container" style={styleEditAndDeletePostButtonsContainer}>
                                <div onClick={onClickCloseEditAndDeletePostLinksContainerButton}>x</div>
                                <div onClick={onClickEditPost}>Edit</div>
                                <div onClick={onClickDeletePost}>Delete</div>
                            </div>
                            <div id="delete-post-message-container" style={styleDeletePostMessageContainer}>
                                <div>Delete Post?</div>
                                <div id="delete-post-buttons-container">
                                    <button onClick={onClickDeletePostNo}>No</button>
                                    <button onClick={onClickDeletePostYes}>Yes</button>
                                </div>
                            </div>
                        </>
                        : <div
                            style={styleReportButtonLinkContainer}
                            id="report-button-link-container"
                        >
                            <div onClick={onClickCloseReportButtonLinkContainer}>x</div>
                            <div id="report-button-link" onClick={onClickReportPostLink}>Report</div>
                        </div>
                    }
                </section>

                <section id="edit-post" style={styleEditPost}>
                    <div id="edit-post-inputs">
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

                        <div id="edit-post-buttons">
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
                                style={styleUpdatePostButton}
                            >Update</button>
                        </div>
                    </div>
                </section>
                
                <section>
                    <form>
                        {userLoggedIn.user_id
                            ? <div id="post-comment-input-and-post-a-comment-button">
                                <CommentInput
                                    commentInput={commentInput}
                                    setCommentInput={setCommentInput}
                                />
                                <div>
                                    <button
                                        type="button"
                                        onClick={onClickPostCommentButton}
                                        disabled={!commentInput}
                                        style={stylePostCommentButton}
                                    >Post Comment</button>
                                </div>
                            </div>
                            : null
                        }
                    </form>
                </section>

                <section>                    
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