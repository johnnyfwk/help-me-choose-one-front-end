export default function TitleInput({titleInput, setTitleInput}) {
    const titleMaxLength = 100;

    function handleTitleInput(event) {
        setTitleInput(event.target.value);
    }

    return (
        <div id="title-input">
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                name="title"
                value={titleInput}
                onChange={handleTitleInput}
                maxLength={titleMaxLength}
            ></input>
            <div id="title-input-length">{titleInput.length} / {titleMaxLength}</div>
        </div>
    )
}