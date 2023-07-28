import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as api from "../api";
import * as utils from "../utils";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";
import AvatarInput from "../components/AvatarInput";
import PasswordInput from "../components/PasswordInput";

export default function Profile({
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
    const currentPasswordInputLabel = "Current Password:";
    const [newPasswordInput, setNewPasswordInput] = useState("");
    const [isNewPasswordValid, setIsNewPasswordValid] = useState(null);
    const newPasswordInputLabel = "New Password:";
    const [newPasswordCheckInput, setNewPasswordCheckInput] = useState("");
    const newPasswordInputCheckLabel = "New Password (Check):";
    const [doNewPasswordInputsMatch, setDoNewPasswordInputsMatch] = useState(null);
    const [isPasswordUpdatedSuccessfully, setIsPasswordUpdatedSuccessfully] = useState(null);

    const [isDeleteAccountButtonVisible, setIsDeleteAccountButtonVisible] = useState(true);
    const [isDeleteAccountConfirmationMessageVisible, setIsDeleteAccountConfirmationMessageVisible] = useState(false);
    const [isAccountDeletionSuccessful, setIsAccountDeletionSuccessful] = useState(null);

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
        api.getPostsByUserId(user_id)
            .then((response) => {
                setIsPostsLoading(false);
                setIsFetchingPostsSuccessful(true);
                setPosts(response);
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
        setIsCommentsLoading(true);
        setIsFetchingCommentsSuccessful(null);
        api.getCommentsByUserId(user_id)
            .then((response) => {
                setIsCommentsLoading(false);
                setIsFetchingCommentsSuccessful(true);
                setComments(response)
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
        display: isDeleteAccountConfirmationMessageVisible ? "initial" : "none"
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
            })
            .catch((error) => {
                setIsAccountNotDeletedMessageVisible(true);
                setTimeout(() => setIsAccountNotDeletedMessageVisible(false), 3000);
            })
    }

    if (isLoading) {
        return (
            <p>Page is loading...</p>
        )
    }

    if (isFetchingUserSuccessful === false) {
        return (
            <p className="error">Page could not be loaded.</p>
        )
    }

    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/" />
                <title>User: {user.username} • Help Me Choose One</title>
                <meta name="description" content="This is the Profile page meta description." />
            </Helmet>

            <header>
                <h1>{user.username}</h1>
                <img
                    src={user.avatar_url === "default-avatar.webp"
                            ? require(`../assets/images/avatars/${user.avatar_url}`)
                            : user.avatar_url
                    }
                    alt="Avatar"
                    id="profile-image"
                />
            </header>

            <main>
                <div id="profile-tabs">
                    <div id="profile-posts-tab" onClick={onClickProfilePostsTab}>Posts</div>
                    {userLoggedIn.user_id !== parseInt(user_id)
                        ? null
                        : <div>
                            <div id="profile-comments-tab" onClick={onClickProfileCommentsTab}>Comments</div>
                        </div>
                    }
                    {userLoggedIn.user_id === parseInt(user_id)
                        ? <div id="profile-account-tab" onClick={onClickProfileAccountTab}>Account</div>
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
                                : <div className="post-card-container">
                                    {posts.map((post) => {
                                        return <PostCard key={post.post_id} post={post} />;
                                    })}
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
                    </div>
                    : null
                }

                {visibleTab === "account"
                    ? <div>
                        <h3>Avatar</h3>
                        <AvatarInput
                            avatarUrlInput={editAvatarUrlInput}
                            setAvatarUrlInput={setEditAvatarUrlInput}
                            setIsAvatarUrlValid={setIsEditAvatarUrlValid}
                        />
                        {isEditAvatarUrlValid === null || isEditAvatarUrlValid === true
                            ? null
                            : <span className="error">Please enter a valid image URL</span>
                        }
                        <button
                            type="button"
                            onClick={onClickEditProfileButton}
                            disabled={!isEditAvatarUrlValid}
                        >Edit</button>
                        
                        <h3>Password</h3>
                        
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
                        <PasswordInput
                            passwordInput={newPasswordInput}
                            setPasswordInput={setNewPasswordInput}
                            passwordInputLabel={newPasswordInputLabel}
                        />
                        {isNewPasswordValid === null || isNewPasswordValid === true
                            ? null
                            : <span className="error">Password can not contain spaces</span>
                        }

                        <PasswordInput
                            passwordInput={newPasswordCheckInput}
                            setPasswordInput={setNewPasswordCheckInput}
                            passwordInputLabel={newPasswordInputCheckLabel}
                        />
                        {doNewPasswordInputsMatch === null || doNewPasswordInputsMatch === true
                            ? null
                            : <span className="error">New passwords do not match</span>
                        }

                        <button
                            type="button"
                            onClick={onClickChangePasswordButton}
                            disabled={
                                !currentPasswordInput ||
                                !newPasswordInput ||
                                !newPasswordCheckInput
                            }
                        >Change Password</button>

                        <button
                            type="button"
                            onClick={onClickDeleteAccountButton}
                            style={styleDeleteAccountButton}
                        >Delete Account</button>

                        <div style={styleDeleteAccountConfirmationMessage}>
                            <div className="warning">Delete account? It can not be recovered and your posts and comments will be also be deleted.</div>
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
                    : null
                }
            </main>
        </div>
    )
}