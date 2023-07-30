import React, { useEffect, useRef } from "react";

export default function DescriptionInput({ descriptionInput, setDescriptionInput }) {
    const descriptionInputMaxLength = 5000;
    const textareaRef = useRef(null);

    function handleDescriptionInput(event) {
        setDescriptionInput(event.target.value);
    }

    // Function to resize the textarea based on its content
    const resizeTextarea = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset the height to auto to get the actual content height
        textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the content height
    };

    // Use useEffect to call resizeTextarea whenever the content changes
    useEffect(() => {
        resizeTextarea();
    }, [descriptionInput]);

    return (
        <div id="description-input">
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                ref={textareaRef}
                value={descriptionInput}
                onChange={handleDescriptionInput}
                maxLength={descriptionInputMaxLength}
            ></textarea>
            <div id="description-input-length">
                {descriptionInput.length} / {descriptionInputMaxLength}
            </div>
        </div>
    );
}
