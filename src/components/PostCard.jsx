import { Link } from "react-router-dom";
import * as utils from "../utils";

export default function PostCard({post}) {
    let totalVotes = 0;
    post.options_and_votes.forEach((option) => {
        totalVotes += option.votesFromUserIds.length;
    })

    return (
        <Link to={`/post/${post.post_id}-${utils.convertTitleToUrl(post.title)}`} className="post-card" loading="lazy">
            <img src={require(`../assets/images/avatars/${post.avatar_url}`)} />
            <div>{post.username}</div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div>{post.category}</div>
            <div>Votes: {totalVotes}</div>
            <div>{new Date(post.post_date).toLocaleDateString()}</div>
            <div>{new Date(post.post_date).toLocaleTimeString()}</div>
        </Link>
    )
}