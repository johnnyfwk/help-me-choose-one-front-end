import * as utils from "../utils";

export default function AvatarInput({avatarUrlInput, setAvatarUrlInput, setIsAvatarUrlValid}) {
    function handleAvatarUrlInput(event) {
        setAvatarUrlInput(event.target.value.toLowerCase());
        if (event.target.value.length === 0) {
            setIsAvatarUrlValid(true);
        }
        else if (utils.isAvatarUrlValid(event.target.value) === true) {
            setIsAvatarUrlValid(true);
        }
        else {
            setIsAvatarUrlValid(false);
        }
    }

    return (
        <div>
            <label htmlFor="avatar-url-input">Avatar URL (optional):</label>
            <input
                type="text"
                id="avatar-url-input"
                name="avatar-url-input"
                value={avatarUrlInput}
                onChange={handleAvatarUrlInput}
            ></input>
        </div>
    )
}