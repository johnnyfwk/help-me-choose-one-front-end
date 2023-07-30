export default function CommentInput({commentInput, setCommentInput}) {
    const commentMaxLength = 1000;

    function handleCommentInput(event) {
        setCommentInput(event.target.value);
    }

    return (
        <div id="comment-input">
            <textarea
                id="comment"
                name="comment"
                value={commentInput}
                onChange={handleCommentInput}
                maxLength={commentMaxLength}
                placeholder="Post a comment"
            ></textarea>
            <div id="comment-input-lengths">{commentInput.length} / {commentMaxLength}</div>
        </div>
    )
}