import * as utils from "../utils";

export default function PasswordInput({passwordInput, setPasswordInput}) {
    function handlePasswordInput(event) {
        setPasswordInput(event.target.value);
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