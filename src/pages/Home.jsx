import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Helmet } from "react-helmet";
import * as api from "../api";
import PostCard from "../components/PostCard";
import LoadMoreButton from "../components/LoadMoreButton";

export default function Home({numberOfItemsToDisplayAndIncrement}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingPostsSuccessful, setIsFetchingPostsSuccessful] = useState(null);

    const [posts, setPosts] = useState([]);

    const [numberOfItemsToDisplay, setNumberOfItemsToDisplay] = useState(numberOfItemsToDisplayAndIncrement);
    const [itemsToDisplay, setItemsToDisplay] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length > 0) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        setIsLoading(true);
        setIsFetchingPostsSuccessful(null);
        api.getPosts()
            .then((response) => {
                setIsLoading(false);
                setIsFetchingPostsSuccessful(true);
                setPosts(response);
                let postsToDisplay;
                if (numberOfItemsToDisplayAndIncrement < response.length) {
                    postsToDisplay = response.slice(0, numberOfItemsToDisplayAndIncrement);
                    setItemsToDisplay(postsToDisplay);
                }
                else {
                    setItemsToDisplay(response);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setIsFetchingPostsSuccessful(false);
            })
    }, [])

    useEffect(() => {
        if (posts.length <= numberOfItemsToDisplay) {
            setItemsToDisplay(posts);
        }
        else {
            const allItemsToDisplay = posts.slice(0, numberOfItemsToDisplay);
            console.log(allItemsToDisplay)
            setItemsToDisplay(allItemsToDisplay);
        }
    }, [numberOfItemsToDisplay])

    if (isLoading) {
        return (
            <p>Page is loading...</p>
        )
    }

    if (isFetchingPostsSuccessful === false) {
        return (
            <p className="error">Page could not be loaded.</p>
        )
    }

    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/" />
                <title>Let the Internet help you choose • Help Me Choose One</title>
                <meta name="description" content="This is the Home page meta description." />
            </Helmet>

            <header>
                {Object.keys(userLoggedIn).length === 0
                    ? <h1>Welcome Guest</h1>
                    : <h1>Welcome {userLoggedIn.username}</h1>
                }
                <p>Let the Internet help you make a choice.</p>
            </header>

            <main>
                <div className="post-card-container">
                    {itemsToDisplay.map((post) => {
                        return <PostCard key={post.post_id} post={post} />
                    })}
                </div>
                
                <LoadMoreButton
                    numberOfItemsToDisplayAndIncrement={numberOfItemsToDisplayAndIncrement}
                    setNumberOfItemsToDisplay={setNumberOfItemsToDisplay}
                    posts={posts}
                    numberOfItemsToDisplay={numberOfItemsToDisplay}
                />
            </main>
        </div>
    )
}