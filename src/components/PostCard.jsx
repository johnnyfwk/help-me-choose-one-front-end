import { Link } from "react-router-dom";
import * as utils from "../utils";

export default function PostCard({post}) {
    let totalVotes = 0;
    post.options_and_votes.forEach((option) => {
        totalVotes += option.votesFromUserIds.length;
    })

    return (
        <Link to={`/post/${post.post_id}-${utils.convertTitleToUrl(post.title)}`} className="post-card" loading="lazy">
            {post.avatar_url === "default-avatar.webp"
                ? <img src={require(`../assets/images/avatars/${post.avatar_url}`)} alt="Avatar" />
                : <img src={post.avatar_url} alt="Avatar" />
            }
            <div>{post.username}</div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div>{utils.convertUrlsToUserFriendlyHeadings(post.category)}</div>
            <div>Votes: {totalVotes}</div>
            <div>{new Date(post.post_date).toLocaleDateString()}</div>
            <div>{new Date(post.post_date).toLocaleTimeString()}</div>
        </Link>
    )
}