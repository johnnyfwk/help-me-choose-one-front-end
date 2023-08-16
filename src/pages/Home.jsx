import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Helmet } from "react-helmet";
import * as api from "../api";
import * as utils from "../utils";
import PostCard from "../components/PostCard";
import LoadMoreButton from "../components/LoadMoreButton";
import Loading from "../components/Loading";

export default function Home({numberOfItemsToDisplayAndIncrement}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [searchParams, setSearchParams] = useSearchParams();
    const filterByCategory = searchParams.get("category");

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingPostsSuccessful, setIsFetchingPostsSuccessful] = useState(null);

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState(filterByCategory || "");

    const [numberOfItemsToDisplay, setNumberOfItemsToDisplay] = useState(numberOfItemsToDisplayAndIncrement);
    const [itemsToDisplay, setItemsToDisplay] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setItemsToDisplay(null);
        setIsFetchingPostsSuccessful(null);
        setNumberOfItemsToDisplay(numberOfItemsToDisplayAndIncrement);
        api.getPosts()
            .then((response) => {
                setIsLoading(false);
                setIsFetchingPostsSuccessful(true);
                const postCategories = response.map((post) => utils.convertUrlsToUserFriendlyHeadings(post.category));
                const uniqueCategoriesSet = new Set(postCategories);
                const uniqueCategories = Array.from(uniqueCategoriesSet);
                setCategories(["All", ...uniqueCategories.sort()]);
                let allPostsInCategory;
                if (categoryInput === "all" || categoryInput === "All" || categoryInput === "") {
                    allPostsInCategory = response;
                }
                else {
                    allPostsInCategory = response.filter((post) => {
                        return post.category === utils.convertTitleToUrl(categoryInput);
                    })
                }
                setPosts(allPostsInCategory);
                let postsToDisplay;
                setNumberOfItemsToDisplay((currentNumberOfItemsToDisplay) => {
                    if (allPostsInCategory.length > currentNumberOfItemsToDisplay) {
                        postsToDisplay = allPostsInCategory.slice(0, currentNumberOfItemsToDisplay);
                    }
                    else {
                        postsToDisplay = allPostsInCategory;
                    }
                    setItemsToDisplay(postsToDisplay);
                    return currentNumberOfItemsToDisplay;
                })
            })
            .catch((error) => {
                setIsLoading(false);
                setIsFetchingPostsSuccessful(false);
            })
    }, [categoryInput])

    useEffect(() => {
        if (isFetchingPostsSuccessful) {
            if (posts.length <= numberOfItemsToDisplay) {
                setItemsToDisplay(posts);
            }
            else {
                const itemsToDisplay = posts.slice(0, numberOfItemsToDisplay);
                setItemsToDisplay(itemsToDisplay);
            }
        }
    }, [numberOfItemsToDisplay])

    function handleCategoryInput(event) {
        setCategoryInput(event.target.value);
        navigate(`?category=${utils.convertTitleToUrl(event.target.value)}`);
    }

    return (
        <div id="home">
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/" />
                <title>Let the Internet help you make a choice • Help Me Choose One</title>
                <meta name="description" content="If you have to make a choice but don't know which one to choose, post a question and let the Internet help you choose." />
            </Helmet>

            <header>
                {Object.keys(userLoggedIn).length === 0
                    ? <h1>Let the Internet help you make a choice.</h1>
                    : <h1>Welcome {userLoggedIn.username}</h1>
                }
                {Object.keys(userLoggedIn).length === 0
                    ? <div>
                        <p>If you have a choice to make but don't know which one to choose, <Link to="sign-up">sign up</Link> or <Link to="/log-in">log in</Link> in and post your question so other members of the site can help you with your decision.</p>
                    </div>
                    : <p><Link to="/create-post">Post a question</Link> and let other members of the site help you make a choice or help others with their choices by voting and commenting on their posts.</p>
                }
            </header>

            {isLoading
                ? <Loading />
                : null
            }

            {isFetchingPostsSuccessful === false
                ? <main>
                    <p className="error">Posts could not be loaded.</p>
                </main>
                : <main>
                    {itemsToDisplay === null
                        ? null
                        : itemsToDisplay.length === 0
                            ? null
                            : <select id="categories" value={categoryInput} onChange={handleCategoryInput}>
                                {categories.map((category) => {
                                    return <option
                                        key={category}
                                        value={category}
                                    >{category}</option>
                                })}
                            </select>
                    }

                    {itemsToDisplay === null
                        ? null
                        : itemsToDisplay.length === 0
                            ? <p>No posts to display.</p>
                            : <div className="post-cards">
                                {itemsToDisplay.map((post) => {
                                    return <PostCard key={post.post_id} post={post} />
                                })}
                            </div>
                    }
                    
                    <LoadMoreButton
                        numberOfItemsToDisplayAndIncrement={numberOfItemsToDisplayAndIncrement}
                        numberOfItemsToDisplay={numberOfItemsToDisplay}
                        setNumberOfItemsToDisplay={setNumberOfItemsToDisplay}
                        items={posts}
                    />
                </main>
            }
        </div>
    )
}