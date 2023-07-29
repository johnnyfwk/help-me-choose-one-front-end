export default function DescriptionInput({descriptionInput, setDescriptionInput}) {
    const descriptionInputMaxLength = 5000;

    function handleDescriptionInput(event) {
        setDescriptionInput(event.target.value);
    }

    return (
        <div id="description-input">
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                value={descriptionInput}
                onChange={handleDescriptionInput}
                maxLength={descriptionInputMaxLength}
            ></textarea>
            <div id="description-input-length">{descriptionInput.length} / {descriptionInputMaxLength}</div>
        </div>
    )
}