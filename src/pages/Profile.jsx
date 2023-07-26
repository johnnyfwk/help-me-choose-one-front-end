import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as api from "../api";
import PostCard from "../components/PostCard";

export default function Profile() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const { user_id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingUserSuccessful, setIsFetchingUserSuccessful] = useState(null);

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [isFetchingPostsSuccessful, setIsFetchingPostsSuccessful] = useState(null);

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
    }, [user_id])

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
    }, [user_id])

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

    console.log(posts)

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
                <h2>Posts</h2>
                {isPostsLoading
                    ? <p>Loading posts...</p>
                    : null
                }

                {isFetchingPostsSuccessful === null
                    ? null
                    : isFetchingPostsSuccessful === false
                        ? <p className="error">Posts could not be loaded</p>
                        : posts.length === 0
                            ? <p>{user.username} has not created any posts.</p>
                            : <div className="post-card-container">
                                {posts.map((post) => {
                                    return <PostCard key={post.post_id} post={post} />;
                                })}
                            </div>
                }
            </main>
        </div>
    )
}