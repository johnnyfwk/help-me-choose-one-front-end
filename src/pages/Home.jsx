import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Helmet } from "react-helmet";
import * as api from "../api";
import * as utils from "../utils";
import PostCard from "../components/PostCard";
import LoadMoreButton from "../components/LoadMoreButton";

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
        setNumberOfItemsToDisplay(numberOfItemsToDisplayAndIncrement);
        api.getPosts()
            .then((response) => {
                setIsLoading(false);
                setIsFetchingPostsSuccessful(true);

                const postCategories = response.map((post) => utils.convertUrlsToUserFriendlyHeadings(post.category));
                const uniqueCategoriesSet = new Set(postCategories);
                const uniqueCategories = Array.from(uniqueCategoriesSet);
                setCategories(["All", ...uniqueCategories]);

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
        if (posts.length <= numberOfItemsToDisplay) {
            setItemsToDisplay(posts);
        }
        else {
            const itemsToDisplay = posts.slice(0, numberOfItemsToDisplay);
            setItemsToDisplay(itemsToDisplay);
        }
    }, [numberOfItemsToDisplay])

    function handleCategoryInput(event) {
        setCategoryInput(event.target.value);
        navigate(`?category=${utils.convertTitleToUrl(event.target.value)}`);
    }

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
                <form>
                    <label htmlFor="categories">Categories:</label>
                    <select id="categories" value={categoryInput} onChange={handleCategoryInput}>
                        {categories.map((category) => {
                            return <option
                                key={category}
                                value={category}
                            >{category}</option>
                        })}
                    </select>
                </form>

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
                    itemsToDisplay={itemsToDisplay}
                />
            </main>
        </div>
    )
}