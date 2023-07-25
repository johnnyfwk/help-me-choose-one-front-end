export default function CommentCard({comment}) {
    console.log(comment)
    return (
        <div className="comment-card">
            {comment.avatar_url === "default-avatar.webp"
                ? <img src={require(`../assets/images/avatars/${comment.avatar_url}`)} alt="Avatar" />
                : <img src={comment.avatar_url} alt="Avatar" />
            }
            <div>{comment.username}</div>
            <div>{new Date(comment.comment_date).toLocaleDateString()}</div>
            <div>{new Date(comment.comment_date).toLocaleTimeString()}</div>
            <p>{comment.comment}</p>
            <div>Likes: {comment.comment_likes_from_user_ids.length}</div>
        </div>
    )
}