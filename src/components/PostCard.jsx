import { Link } from "react-router-dom";
import * as utils from "../utils";

export default function PostCard({post}) {
    let totalVotes = 0;
    post.options_and_votes.forEach((option) => {
        totalVotes += option.votesFromUserIds.length;
    })

    const descriptionMaxLength = 100;

    return (
        <Link to={`/post/${post.post_id}-${utils.convertTitleToUrl(post.title)}`} className="post-card" loading="lazy">
            <div className="post-card-avatar-username">
                {post.avatar_url === "default-avatar.webp"
                    ? <img src={require(`../assets/images/avatars/${post.avatar_url}`)} alt="Avatar" />
                    : <img src={post.avatar_url} alt="Avatar" />
                }
                <div>{post.username}</div>
            </div>
            
            <h2>{post.title}</h2>

            <p>{post.description.length < descriptionMaxLength
                ? post.description
                : post.description.slice(0, descriptionMaxLength) + "..."
            }</p>

            <div className="post-card-category-votes-date">
                <div>Votes: {totalVotes}</div>
                <div>{new Date(post.post_date).toLocaleDateString()}</div>
                <div>{new Date(post.post_date).toLocaleTimeString()}</div>
            </div>
            
        </Link>
    )
}