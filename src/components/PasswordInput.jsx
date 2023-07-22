import * as utils from "../utils";

export default function PasswordInput({passwordInput, setPasswordInput, setIsPasswordValid, isPasswordValid}) {
    function handlePasswordInput(event) {
        setPasswordInput(event.target.value);
        setIsPasswordValid(utils.isPasswordValid(event.target.value));
    }

    return (
        <div>
            <label htmlFor="password">Password:</label>
            <input
                type="text"
                id="password"
                name="password"
                value={passwordInput}
                onChange={handlePasswordInput}
            ></input>
            {isPasswordValid === null || isPasswordValid === true
                ? null
                : <span className="error">Password can not contain spaces.</span>    
            }
        </div>
    )
}