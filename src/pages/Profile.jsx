import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as api from "../api";
import * as utils from "../utils";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";
import ImageInput from "../components/ImageInput";
import PasswordInput from "../components/PasswordInput";
import LoadMoreButton from "../components/LoadMoreButton";

export default function Profile({
    numberOfItemsToDisplayAndIncrement,
    setIsCommentUpdatedMessageVisible,
    setIsCommentNotUpdatedMessageVisible,
    setIsCommentDeletedMessageVisible,
    setIsCommentNotDeletedMessageVisible,
    setIsAvatarUpdatedMessageVisible,
    setIsAvatarNotUpdatedMessageVisible,
    setIsPasswordUpdatedMessageVisible,
    setIsPasswordNotUpdatedMessageVisible,
    setIsAccountDeletedMessageVisible,
    setIsAccountNotDeletedMessageVisible
}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const { user_id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingUserSuccessful, setIsFetchingUserSuccessful] = useState(null);

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [isFetchingPostsSuccessful, setIsFetchingPostsSuccessful] = useState(null);

    const [isCommentsLoading, setIsCommentsLoading] = useState(true);
    const [isFetchingCommentsSuccessful, setIsFetchingCommentsSuccessful] = useState(null);

    const [visibleTab, setVisibleTab] = useState("posts");

    const [isCommentUpdatedSuccessfully, setIsCommentUpdatedSuccessfully] = useState(null);
    const [isCommentDeletedSuccessfully, setIsCommentDeletedSuccessfully] = useState(null);

    const [editAvatarUrlInput, setEditAvatarUrlInput] = useState("");
    const [isEditAvatarUrlValid, setIsEditAvatarUrlValid] = useState(true);
    const [isAvatarUpdatedSuccessfully, setIsAvatarUpdatedSuccessfully] = useState(null);

    const [currentPasswordInput, setCurrentPasswordInput] = useState("");
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(null);
    const currentPasswordInputLabel = "Current Password";
    const [newPasswordInput, setNewPasswordInput] = useState("");
    const [isNewPasswordValid, setIsNewPasswordValid] = useState(null);
    const newPasswordInputLabel = "New Password";
    const [newPasswordCheckInput, setNewPasswordCheckInput] = useState("");
    const newPasswordInputCheckLabel = "New Password (Check)";
    const [doNewPasswordInputsMatch, setDoNewPasswordInputsMatch] = useState(null);
    const [isPasswordUpdatedSuccessfully, setIsPasswordUpdatedSuccessfully] = useState(null);

    const [isDeleteAccountButtonVisible, setIsDeleteAccountButtonVisible] = useState(true);
    const [isDeleteAccountConfirmationMessageVisible, setIsDeleteAccountConfirmationMessageVisible] = useState(false);
    const [isAccountDeletionSuccessful, setIsAccountDeletionSuccessful] = useState(null);

    const [numberOfPostsToDisplay, setNumberOfPostsToDisplay] = useState(numberOfItemsToDisplayAndIncrement);
    const [postsToDisplay, setPostsToDisplay] = useState([]);
    const [numberOfCommentsToDisplay, setNumberOfCommentsToDisplay] = useState(numberOfItemsToDisplayAndIncrement);
    const [commentsToDisplay, setCommentsToDisplay] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/log-in");
        }
    }, [userLoggedIn]);

    useEffect(() => {
        setIsLoading(true);
        setIsFetchingUserSuccessful(null);
        api.getUserById(user_id)
            .then((response) => {
                setIsLoading(false);
                setIsFetchingUserSuccessful(true);
                setUser(response);
                setEditAvatarUrlInput(response.avatar_url);
            })
            .catch((error) => {
                setIsLoading(false);
                setIsFetchingUserSuccessful(false);
            })
    }, [
        user_id,
        isCommentUpdatedSuccessfully,
        isCommentDeletedSuccessfully,
        isAvatarUpdatedSuccessfully,
        isPasswordUpdatedSuccessfully,
        isAccountDeletionSuccessful
    ])

    useEffect(() => {
        setIsPostsLoading(true);
        setIsFetchingPostsSuccessful(null);
        setNumberOfPostsToDisplay(numberOfItemsToDisplayAndIncrement);
        api.getPostsByUserId(user_id)
            .then((response) => {
                setIsPostsLoading(false);
                setIsFetchingPostsSuccessful(true);
                setPosts(response);
                let postsToRender;
                setNumberOfPostsToDisplay((currentNumberOfPostsToDisplay) => {
                    if (response.length > currentNumberOfPostsToDisplay) {
                        postsToRender = response.slice(0, currentNumberOfPostsToDisplay);
                    }
                    else {
                        postsToRender = response;
                    }
                    setPostsToDisplay(postsToRender);
                    return currentNumberOfPostsToDisplay;
                })
            })
            .catch((error) => {
                setIsPostsLoading(false);
                setIsFetchingPostsSuccessful(false)
            })
    }, [user_id,
        isCommentUpdatedSuccessfully,
        isCommentDeletedSuccessfully,
        isAvatarUpdatedSuccessfully,
        isPasswordUpdatedSuccessfully,
        isAccountDeletionSuccessful
    ])

    useEffect(() => {
        if (posts.length <= numberOfPostsToDisplay) {
            setPostsToDisplay(posts);
        }
        else {
            const postsToDisplay = posts.slice(0, numberOfPostsToDisplay);
            setPostsToDisplay(postsToDisplay);
        }
    }, [numberOfPostsToDisplay])

    useEffect(() => {
        setIsCommentsLoading(true);
        setIsFetchingCommentsSuccessful(null);
        api.getCommentsByUserId(user_id)
            .then((response) => {
                setIsCommentsLoading(false);
                setIsFetchingCommentsSuccessful(true);
                setComments(response);
                let commentsToRender;
                setNumberOfCommentsToDisplay((currentNumberOfCommentsToDisplay) => {
                    if (response.length > currentNumberOfCommentsToDisplay) {
                        commentsToRender = response.slice(0, currentNumberOfCommentsToDisplay);
                    }
                    else {
                        commentsToRender = response;
                    }
                    setCommentsToDisplay(commentsToRender);
                    return currentNumberOfCommentsToDisplay;
                })
            })
            .catch((error) => {
                setIsCommentsLoading(false);
                setIsFetchingCommentsSuccessful(false);
            })
    }, [user_id,
        isCommentUpdatedSuccessfully,
        isCommentDeletedSuccessfully,
        isAvatarUpdatedSuccessfully,
        isPasswordUpdatedSuccessfully,
        isAccountDeletionSuccessful
    ])

    useEffect(() => {
        if (comments.length <= numberOfCommentsToDisplay) {
            setCommentsToDisplay(comments);
        }
        else {
            const commentsToDisplay = comments.slice(0, numberOfCommentsToDisplay);
            setCommentsToDisplay(commentsToDisplay);
        }
    }, [numberOfCommentsToDisplay])

    useEffect(() => {
        setIsPasswordCorrect(null);
    }, [currentPasswordInput])

    useEffect(() => {
        setIsNewPasswordValid(utils.isPasswordValid(newPasswordInput));
    }, [newPasswordInput])

    useEffect(() => {
        setDoNewPasswordInputsMatch(null);
    }, [newPasswordInput, newPasswordCheckInput])

    function onClickProfilePostsTab() {
        setVisibleTab("posts");
    }

    function onClickProfileCommentsTab() {
        setVisibleTab("comments");
    }

    function onClickProfileAccountTab() {
        setVisibleTab("account");
    }

    const styleDeleteAccountButton = {
        display: isDeleteAccountButtonVisible ? "initial" : "none"
    }

    const styleDeleteAccountConfirmationMessage = {
        display: isDeleteAccountConfirmationMessageVisible ? "grid" : "none"
    }

    function onClickEditProfileButton() {
        setIsAvatarUpdatedSuccessfully(null);
        api.updateUser(user.password, editAvatarUrlInput, user_id)
            .then((response) => {
                setIsAvatarUpdatedSuccessfully(true);
                setIsAvatarUpdatedMessageVisible(true);
                setTimeout(() => setIsAvatarUpdatedMessageVisible(false), 3000);
            })
            .catch((error) => {
                setIsAvatarNotUpdatedMessageVisible(true);
                setTimeout(() => setIsAvatarNotUpdatedMessageVisible(false), 3000);
            })
    }

    function onClickChangePasswordButton() {
        setIsPasswordCorrect(currentPasswordInput === user.password);
        setDoNewPasswordInputsMatch(newPasswordInput === newPasswordCheckInput);
        if (currentPasswordInput === user.password && isNewPasswordValid && newPasswordInput === newPasswordCheckInput) {
            setIsPasswordUpdatedSuccessfully(null);
            api.updateUser(newPasswordInput, user.avatar_url, user_id)
                .then((response) => {
                    setCurrentPasswordInput("");
                    setNewPasswordInput("");
                    setNewPasswordCheckInput("");
                    setIsPasswordUpdatedSuccessfully(true);
                    setIsPasswordUpdatedMessageVisible(true);
                    setTimeout(() => setIsPasswordUpdatedMessageVisible(false), 3000);
                })
                .catch((error) => {
                    setIsPasswordNotUpdatedMessageVisible(true);
                    setTimeout(() => setIsPasswordNotUpdatedMessageVisible(false), 3000);
                })
        }
    }

    function onClickDeleteAccountButton() {
        setIsDeleteAccountButtonVisible(false);
        setIsDeleteAccountConfirmationMessageVisible(true);
    }

    function onClickDeleteAccountCancelButton() {
        setIsDeleteAccountButtonVisible(true);
        setIsDeleteAccountConfirmationMessageVisible(false);
    }

    function onClickDeleteAccountDeleteButton() {
        setIsDeleteAccountButtonVisible(true);
        setIsDeleteAccountConfirmationMessageVisible(false);
        setIsAccountDeletionSuccessful(null);
        api.deleteCommentsByUserId(parseInt(user_id))
            .then((response) => {
                return api.deletePostsByUserId(parseInt(user_id))
            })
            .then((response) => {
                return api.deleteAccount(parseInt(user_id))
            })
            .then((response) => {
                setUserLoggedIn({});
                setIsAccountDeletionSuccessful(true);
                setIsAccountDeletedMessageVisible(true);
                setTimeout(() => setIsAccountDeletedMessageVisible(false), 3000);
                navigate("/");
                window.scrollTo(0, 0);
            })
            .catch((error) => {
                setIsAccountNotDeletedMessageVisible(true);
                setTimeout(() => setIsAccountNotDeletedMessageVisible(false), 3000);
            })
    }

    const styleTabPosts = {
        color: visibleTab === "posts" ? "#FF206E" : "#FFFFFF"
    }

    const styleTabComments = {
        color: visibleTab === "comments" ? "#FF206E" : "#FFFFFF"
    }

    const styleTabAccount = {
        color: visibleTab === "account" ? "#FF206E" : "#FFFFFF"
    }

    const styleUpdateAvatarButton = {
        opacity: !isEditAvatarUrlValid ? "0.3" : "1"
    }

    const styleChangePasswordButton = {
        opacity: !currentPasswordInput ||
        !newPasswordInput ||
        !newPasswordCheckInput
            ? "0.3"
            : "1"
    }

    if (isLoading) {
        return (
            <main>
                <p>Page is loading...</p>
            </main>
        )
    }

    if (isFetchingUserSuccessful === false) {
        return (
            <main>
                <p className="error">Page could not be loaded.</p>
            </main>
        )
    }

    return (
        <div id="profile">
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/" />
                <title>User: {user.username} • Help Me Choose One</title>
                <meta name="description" content="This is the Profile page meta description." />
            </Helmet>

            <header>
                <img
                    src={user.avatar_url === "default-avatar.webp"
                            ? require(`../assets/images/avatars/${user.avatar_url}`)
                            : user.avatar_url
                    }
                    alt="Avatar"
                    id="profile-image"
                />
                <h1>{user.username}</h1>
            </header>

            <main>
                <div id="profile-tabs">
                    <div id="profile-posts-tab" onClick={onClickProfilePostsTab} style={styleTabPosts}>Posts</div>
                    {userLoggedIn.user_id !== parseInt(user_id)
                        ? null
                        : <div>
                            <div id="profile-comments-tab" onClick={onClickProfileCommentsTab} style={styleTabComments}>Comments</div>
                        </div>
                    }
                    {userLoggedIn.user_id === parseInt(user_id)
                        ? <div id="profile-account-tab" onClick={onClickProfileAccountTab} style={styleTabAccount}>Account</div>
                        : null
                    }
                </div>
                
                {visibleTab === "posts"
                    ? <div>
                        {isPostsLoading
                            ? <div>Loading posts...</div>
                            : null
                        }
                        {isFetchingPostsSuccessful
                            ? null
                            : <div className="error">Posts could not be loaded</div>
                        }
                        {posts.length === 0 && userLoggedIn.user_id === parseInt(user_id)
                            ? <div>You have not created any posts.</div>
                            : posts.length === 0 && userLoggedIn.user_id !== parseInt(user_id)
                                ? <div>User has not created any posts.</div>
                                : <div>
                                    <div className="post-cards">
                                        {postsToDisplay.map((post) => {
                                            return <PostCard key={post.post_id} post={post} />;
                                        })}
                                    </div>
                                    <LoadMoreButton
                                        numberOfItemsToDisplayAndIncrement={numberOfItemsToDisplayAndIncrement}
                                        numberOfItemsToDisplay={numberOfPostsToDisplay}
                                        setNumberOfItemsToDisplay={setNumberOfPostsToDisplay}
                                        items={posts}
                                    />
                                </div>
                        }
                    </div>
                    : null
                }

                {visibleTab === "comments"
                    ? <div>
                        {isCommentsLoading
                            ? <div>Loading comments...</div>
                            : null
                        }
                        {isFetchingCommentsSuccessful
                            ? null
                            : <div className="error">Comments could not be loaded</div>
                        }
                        {comments.length === 0 && userLoggedIn.user_id === parseInt(user_id)
                            ? <div>You have not posted any comments.</div>
                            : comments.length === 0 && userLoggedIn.user_id !== parseInt(user_id)
                                ? <div>User has not posted any comments.</div>
                                : <div>
                                    <div className="comments">
                                        {commentsToDisplay.map((comment) => {
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
                                    <LoadMoreButton
                                        numberOfItemsToDisplayAndIncrement={numberOfItemsToDisplayAndIncrement}
                                        numberOfItemsToDisplay={numberOfCommentsToDisplay}
                                        setNumberOfItemsToDisplay={setNumberOfCommentsToDisplay}
                                        items={comments}
                                    />
                                </div>
                                
                        }
                    </div>
                    : null
                }

                {visibleTab === "account"
                    ? <div id="profile-tab-account">
                        <div id="profile-tab-account-avatar">
                            <h2>Avatar</h2>
                            <div id="profile-tab-account-avatar-container">
                                <ImageInput
                                    imageUrlInput={editAvatarUrlInput}
                                    setImageUrlInput={setEditAvatarUrlInput}
                                    setIsImageUrlValid={setIsEditAvatarUrlValid}
                                />
                                {isEditAvatarUrlValid === null || isEditAvatarUrlValid === true
                                    ? null
                                    : <span className="error">Please enter a valid image URL</span>
                                }
                                <div>
                                    <button
                                        type="button"
                                        onClick={onClickEditProfileButton}
                                        disabled={!isEditAvatarUrlValid}
                                        style={styleUpdateAvatarButton}
                                    >Update</button>
                                </div>
                            </div>
                        </div>
                        
                        <div id="profile-tab-account-password">
                            <h2>Password</h2>

                            <div id="profile-tab-account-password-inputs">
                                <div className="profile-tab-account-password-input-and-error-message">
                                    <PasswordInput
                                        passwordInput={currentPasswordInput}
                                        setPasswordInput={setCurrentPasswordInput}
                                        passwordInputLabel={currentPasswordInputLabel}
                                    />
                                    {isPasswordCorrect === null
                                        ? null
                                        : isPasswordCorrect
                                            ? null
                                            : <div className="error">Password is incorrect</div>
                                    }
                                </div>
                                
                                <div className="profile-tab-account-password-input-and-error-message">
                                    <PasswordInput
                                        passwordInput={newPasswordInput}
                                        setPasswordInput={setNewPasswordInput}
                                        passwordInputLabel={newPasswordInputLabel}
                                    />
                                    {isNewPasswordValid === null || isNewPasswordValid === true
                                        ? null
                                        : <span className="error">Password can not contain spaces</span>
                                    }
                                </div>
                                
                                <div className="profile-tab-account-password-input-and-error-message">
                                    <PasswordInput
                                        passwordInput={newPasswordCheckInput}
                                        setPasswordInput={setNewPasswordCheckInput}
                                        passwordInputLabel={newPasswordInputCheckLabel}
                                    />
                                    {doNewPasswordInputsMatch === null || doNewPasswordInputsMatch === true
                                        ? null
                                        : <span className="error">New passwords do not match</span>
                                    }
                                </div>
                                
                                <div>
                                    <button
                                        type="button"
                                        onClick={onClickChangePasswordButton}
                                        disabled={
                                            !currentPasswordInput ||
                                            !newPasswordInput ||
                                            !newPasswordCheckInput
                                        }
                                        style={styleChangePasswordButton}
                                    >Change Password</button>
                                </div>
                            </div>                            
                        </div>
                        
                        {/* <div id="profile-tab-account-delete-account">
                            <div>
                                <button
                                    type="button"
                                    onClick={onClickDeleteAccountButton}
                                    style={styleDeleteAccountButton}
                                >Delete Account</button>
                            </div>
                            
                            <div id="profile-tab-account-delete-account-confirmation-message" style={styleDeleteAccountConfirmationMessage}>
                                <div className="warning">Delete account? It can not be recovered and your posts and comments will be also be deleted.</div>
                                <div id="profile-tab-account-delete-account-buttons">
                                    <button
                                        type="button"
                                        onClick={onClickDeleteAccountCancelButton}
                                    >Cancel</button>
                                    <button
                                        type="button"
                                        onClick={onClickDeleteAccountDeleteButton}
                                    >Delete</button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    : null
                }
            </main>
        </div>
    )
}