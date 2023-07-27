import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as api from "../api";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";

export default function Profile({
    setIsCommentUpdatedMessageVisible,
    setIsCommentNotUpdatedMessageVisible,

    setIsCommentDeletedMessageVisible,
    setIsCommentNotDeletedMessageVisible
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
            })
            .catch((error) => {
                setIsLoading(false);
                setIsFetchingUserSuccessful(false);
            })
    }, [user_id, isCommentUpdatedSuccessfully, isCommentDeletedSuccessfully])

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
    }, [user_id, isCommentUpdatedSuccessfully, isCommentDeletedSuccessfully])

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
    }, [user_id, isCommentUpdatedSuccessfully, isCommentDeletedSuccessfully])

    function onClickProfilePostsTab() {
        setVisibleTab("posts");
    }

    function onClickProfileCommentsTab() {
        setVisibleTab("comments");
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
                    src={
                        user.avatar_url === "default-avatar.webp"
                            ? require(`../assets/images/avatars/${user.avatar_url}`)
                            : user.avatar_url
                    }
                    alt="Avatar"
                    id="profile-image"
                />
            </header>

            <main>
                <div id="profile-tabs">
                    <h2 id="profile-posts-tab" onClick={onClickProfilePostsTab}>Posts</h2>
                    {userLoggedIn.user_id !== user.user_id
                        ? null
                        : <div>
                            <h2 id="profile-comments-tab" onClick={onClickProfileCommentsTab}>Comments</h2>
                        </div>
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
                        <div className="post-card-container">
                            {posts.map((post) => {
                                return <PostCard key={post.post_id} post={post} />;
                            })}
                        </div>
                      </div>
                    : <div>
                        {isCommentsLoading
                            ? <div>Loading comments...</div>
                            : null
                        }
                        {isFetchingCommentsSuccessful
                            ? null
                            : <div className="error">Comments could not be loaded</div>
                        }
                        <div className="comments">
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
                      </div>
                }
            </main>
        </div>
    )
}