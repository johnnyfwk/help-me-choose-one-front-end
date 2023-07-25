export default function TitleInput({titleInput, setTitleInput}) {
    function handleTitleInput(event) {
        setTitleInput(event.target.value);
    }

    return (
        <div>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={titleInput}
                onChange={handleTitleInput}
                maxLength="50"
            ></input>
        </div>
    )
}