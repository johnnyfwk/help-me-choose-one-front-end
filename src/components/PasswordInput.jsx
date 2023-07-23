import * as utils from "../utils";

export default function PasswordInput({passwordInput, setPasswordInput, setIsPasswordValid}) {
    function handlePasswordInput(event) {
        setPasswordInput(event.target.value);
        setIsPasswordValid(utils.isPasswordValid(event.target.value));
    }

    return (
        <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={passwordInput}
                onChange={handlePasswordInput}
            ></input>
        </div>
    )
}