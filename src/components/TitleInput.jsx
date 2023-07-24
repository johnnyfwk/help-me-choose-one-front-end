export default function TitleInput({titleInput, setTitleInput, setIsPostCreationSuccessful}) {
    function handleTitleInput(event) {
        setTitleInput(event.target.value);
        setIsPostCreationSuccessful(null);
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