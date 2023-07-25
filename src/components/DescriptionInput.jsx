export default function DescriptionInput({descriptionInput, setDescriptionInput}) {
    const descriptionInputMaxLength = 1000;

    function handleDescriptionInput(event) {
        setDescriptionInput(event.target.value);
    }

    return (
        <div>
            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                name="description"
                value={descriptionInput}
                onChange={handleDescriptionInput}
                maxLength={descriptionInputMaxLength}
            ></textarea>
            <span>{descriptionInput.length} / {descriptionInputMaxLength}</span>
        </div>
    )
}