import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams, Link } from "react-router-dom";
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
    setIsCommentNotPostedMessageVisible
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
    const [editOptionsHasDuplicates, setEditOptionsHasDuplicates] = useState(null);
    const [isNumberOfOptionsLessThanTwo, setIsNumberOfOptionsLessThanTwo] = useState(null);
    const [isPostUpdatedSuccessfully, setIsPostUpdatedSuccessfully] = useState(null);

    const [commentInput, setCommentInput] = useState("");
    const [isCommentPostedSuccessfully, setIsCommentPostedSuccessfully] = useState(null);
    const [isCommentUpdatedSuccessfully, setIsCommentUpdatedSuccessfully] = useState(null);

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
    }, [post_id_and_title, isVoteAddedSuccessfully, isPostUpdatedSuccessfully, isCommentPostedSuccessfully, isCommentUpdatedSuccessfully])

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
    }, [post_id_and_title, isVoteAddedSuccessfully, isPostUpdatedSuccessfully, isCommentPostedSuccessfully, isCommentUpdatedSuccessfully])

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

    function handleOptionInput(event) {
        setOptionInput(event.target.value);
    }

    function onClickVoteButton() {
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
                setTimeout(() => setIsVoteAddedMessageVisible(false), 3000);
            })
            .catch((error) => {
                setIsVoteAddedSuccessfully(false);
                setIsVoteNotAddedMessageVisible(true);
                setTimeout(() => setIsVoteNotAddedMessageVisible(false), 3000);
            })
    }

    function onClickShowVotesButton() {
        setIsVotesVisible((currentIsVotesVisible) => {
            return !currentIsVotesVisible;
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
    }

    function onClickUpdatePostButton() {
        const options = Object.values(editOptionInputs).filter((option) => option);
        const optionsMinusSpaces = options.map((option) => option.trim());
        const optionsInLowercase = optionsMinusSpaces.map((option) => option.toLowerCase());
        const optionsContainsDuplicates = optionsInLowercase.some((value, index) => {
            return optionsInLowercase.indexOf(value, index + 1) !== -1;
        });

        if (optionsContainsDuplicates) {
            setEditOptionsHasDuplicates(optionsContainsDuplicates);
        }
        else if (options.length < 2) {
            setIsNumberOfOptionsLessThanTwo(options.length < 2);
        }
        else {           
            const optionsAndVotes = optionsMinusSpaces.map((option) => {
                const optionAndVotes = post.options_and_votes.filter((singleOption) => singleOption.option.toLowerCase() === option.toLowerCase())
                const votesForOption = optionAndVotes.length > 0 ? optionAndVotes[0].votesFromUserIds : [];
                return {
                    "option": option,
                    "optionImage": "",
                    "votesFromUserIds": votesForOption
                }
            })

            setIsPostUpdatedSuccessfully(null);
            api.updatePost(new Date(), editTitleInput, editDescriptionInput, utils.convertCategoryToUrl(editCategoryInput), optionsAndVotes, postId)
                .then((response) => {
                    setIsPostUpdatedSuccessfully(true);
                    setIsPostUpdatedMessageVisible(true);
                    setIsPostEditable(false);
                    setTimeout(() => setIsPostUpdatedMessageVisible(false), 3000);
                })
                .catch((error) => {
                    setIsPostUpdatedSuccessfully(false);
                    setIsPostNotUpdatedMessageVisible(true);
                    setTimeout(() => setIsPostNotUpdatedMessageVisible(false), 3000);
                })
        }
    }

    function onClickCancelEditPostButton() {
        setIsPostEditable(false);
        setIsNumberOfOptionsLessThanTwo(null);
        setEditOptionsHasDuplicates(null);
    }

    function onClickPostCommentButton() {
        setIsCommentPostedSuccessfully(null);
        console.log(new Date())
        console.log(post.title, "<-------- post title")
        console.log(post.description, "<-------- post description")
        console.log(post.category, "<-------- post category")
        console.log(post.options_and_votes, "<-------- options and votes")
        console.log(postId, "<-------- post ID")
        api.postComment(new Date(), new Date(), commentInput, [], post.post_id, userLoggedIn.user_id)
            .then((response) => {
                setIsCommentPostedSuccessfully(true);
                setIsCommentPostedMessageVisible(true);
                setCommentInput("");
                setTimeout(() => setIsCommentPostedMessageVisible(false), 3000);
                return api.updatePost(new Date(), post.title, post.description, post.category, post.options_and_votes, postId)
            })
            .catch((error) => {
                setIsCommentPostedSuccessfully(false);
                setIsCommentNotPostedMessageVisible(true);
                setTimeout(() => setIsCommentNotPostedMessageVisible(false), 3000);
            })
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
                    {post.avatar_url === "default-avatar.webp"
                        ? <img src={require(`../assets/images/avatars/${post.avatar_url}`)} alt="Avatar" className="post-avatar" />
                        : <img src={post.avatar_url} alt="Avatar" className="post-avatar" />
                    }
                    <div>{post.username}</div>
                    <p>{post.description}</p>

                    <button type="button" onClick={onClickShowVotesButton}>{isVotesVisible ? "Hide Votes" : "Show Votes"}</button>
                    
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
                                                <label htmlFor={option.option}>{option.option}</label>
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
                            ? <p><Link to="/log-in">Log in</Link> to vote</p>
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

                    {userLoggedIn.user_id === post.post_owner_id
                        ? <button onClick={onClickEditPost}>Edit Post</button>
                        : null
                    }

                    <div id="edit-post" style={styleEditPost}>
                        <h2>Edit Post</h2>

                        {editOptionsHasDuplicates === null || editOptionsHasDuplicates === false
                            ? null
                            : <p className="error">You have entered duplicate options</p>
                        }

                        {isNumberOfOptionsLessThanTwo
                            ? <p className="error">Please enter at least two options</p>
                            : null
                        }

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
                        />

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
                                    editCategoryInput === "Select a Category"
                                }
                            >Update</button>
                        </div>
                    </div>
                </section>
                
                <section>
                    <h2>Post a Comment</h2>
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
                            : <p><Link to="/log-in">Log in</Link> to post a comment</p>
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
                                    />
                                })}
                            </div>
                    }
                </section>
            </main>
        </div>
    )
}