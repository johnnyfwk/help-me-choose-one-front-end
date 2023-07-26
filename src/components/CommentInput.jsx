export default function CommentInput({commentInput, setCommentInput}) {
    const commentMaxLength = 1000;

    function handleCommentInput(event) {
        setCommentInput(event.target.value);
    }

    return (
        <div>
            <textarea
                id="comment"
                name="comment"
                value={commentInput}
                onChange={handleCommentInput}
                maxLength={commentMaxLength}
            ></textarea>
            <div>{commentInput.length} / {commentMaxLength}</div>
        </div>
    )
}