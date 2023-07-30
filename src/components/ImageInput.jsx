import * as utils from "../utils";

export default function ImageInput({imageUrlInput, setImageUrlInput, setIsImageUrlValid}) {
    function handleAvatarUrlInput(event) {
        setImageUrlInput(event.target.value);
        if (event.target.value.length === 0) {
            setIsImageUrlValid(true);
        }
        else if (utils.isImageUrlValid(event.target.value) === true) {
            setIsImageUrlValid(true);
        }
        else {
            setIsImageUrlValid(false);
        }
    }

    return (
        <div id="image-input">
            <label htmlFor="avatar-url-input">Image URL (optional)</label>
            <input
                type="text"
                id="image-url-input"
                name="image-url-input"
                value={imageUrlInput}
                onChange={handleAvatarUrlInput}
            ></input>
        </div>
    )
}