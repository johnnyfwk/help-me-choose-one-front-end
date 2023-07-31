import React, { useEffect, useRef } from "react";

export default function CommentInput({commentInput, setCommentInput}) {
    const commentMaxLength = 2000;
    const textareaRef = useRef(null);

    function handleCommentInput(event) {
        setCommentInput(event.target.value);
    }

    const resizeTextarea = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset the height to auto to get the actual content height
        textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the content height
    };

    useEffect(() => {
        resizeTextarea();
    }, [commentInput]);

    return (
        <div id="comment-input">
            <textarea
                id="comment"
                name="comment"
                ref={textareaRef}
                value={commentInput}
                onChange={handleCommentInput}
                maxLength={commentMaxLength}
                placeholder="Post a comment"
            ></textarea>
            <div id="comment-input-lengths">{commentInput.length} / {commentMaxLength}</div>
        </div>
    )
}