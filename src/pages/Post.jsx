import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as api from "../api";

export default function Post({isVotesVisible, setIsVotesVisible, setIsVoteAddedMessageVisible, setIsVoteNotAddedMessageVisible}) {
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

    useEffect(() => {
        setIsLoading(true);
        setIsFetchingPostSuccessful(null);
        setHasLoggedInUserAlreadyVoted(null);
        setIsVoteAddedSuccessfully(null);
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
    }, [post_id_and_title, isVoteAddedSuccessfully])

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

        setIsVoteAddedMessageVisible(false);
        setIsVoteNotAddedMessageVisible(false);
        api.addVote(new Date(), post.title, post.description, post.category, updatedOptionsAndVotes, postId)
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

    const stylePostOption = {
        position: "relative"
    };

    const stylePostOptionPercentageBar = (percentage) => ({
        width: `${percentage}%`,
    });

    return (
        <div>
            <Helmet>
                <link rel="canonical" href={`https://helpmechooseone.com/post/${post_id_and_title}`} />
                <title>{post.title} • Help Me Choose One</title>
                <meta name="description" content={post.description} />
            </Helmet>

            <header>
                <h1>{post.title}</h1>
            </header>

            <main>
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

                <div>{new Date(post.post_date).toLocaleDateString()}</div>
                <div>{new Date(post.post_date).toLocaleTimeString()}</div>

                <h2>Comments</h2>
            </main>
        </div>
    )
}