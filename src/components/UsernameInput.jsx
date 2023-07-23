import * as utils from "../utils";

export default function UsernameInput({usernameInput, setUsernameInput, setIsUsernameAvailable, setIsUsernameValid, setIsUsernameFamilyFriendly, registeredUsernames}) {

    function handleUsernameInput(event) {
        setUsernameInput(event.target.value);
        if (event.target.value.length === 0) {
            setIsUsernameValid(null);
            setIsUsernameAvailable(null);
            setIsUsernameFamilyFriendly(null);
        }
        else if (!utils.isFamilyFriendly(event.target.value)) {
            setIsUsernameValid(null);
            setIsUsernameAvailable(null);
            setIsUsernameFamilyFriendly(false);
        }
        else if (!/^[a-zA-Z]+[0-9]*$/.test(event.target.value)) {
            setIsUsernameValid(false);
            setIsUsernameAvailable(null);
            setIsUsernameFamilyFriendly(null);
        }
        else if (registeredUsernames.includes(event.target.value.toLowerCase())) {
            setIsUsernameValid(null);
            setIsUsernameAvailable(false);
            setIsUsernameFamilyFriendly(null);
        }
        else {
            setIsUsernameValid(true);
            setIsUsernameAvailable(true);
            setIsUsernameFamilyFriendly(true);
        }
    }

    return (
        <div>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={usernameInput}
                onChange={handleUsernameInput}
                maxLength="30"
            ></input>
        </div>
        
    )
}