import * as utils from "../utils";

export default function ImageInput({imageUrlInput, setImageUrlInput, setIsImageUrlValid}) {
    function handleAvatarUrlInput(event) {
        setImageUrlInput(event.target.value.toLowerCase());
        if (event.target.value.length === 0) {
            setIsImageUrlValid(true);
        }
        else if (utils.isAvatarUrlValid(event.target.value) === true) {
            setIsImageUrlValid(true);
        }
        else {
            setIsImageUrlValid(false);
        }
    }

    return (
        <div>
            <label htmlFor="avatar-url-input">Image URL (optional):</label>
            <input
                type="text"
                id="avatar-url-input"
                name="avatar-url-input"
                value={imageUrlInput}
                onChange={handleAvatarUrlInput}
            ></input>
        </div>
    )
}