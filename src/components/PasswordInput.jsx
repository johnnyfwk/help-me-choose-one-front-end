import * as utils from "../utils";

export default function PasswordInput({passwordInput, setPasswordInput, passwordInputLabel}) {
    function handlePasswordInput(event) {
        setPasswordInput(event.target.value);
    }

    return (
        <div>
            <label htmlFor="password">{passwordInputLabel}</label>
            <input
                type="password"
                id={passwordInputLabel}
                name={passwordInputLabel}
                value={passwordInput}
                onChange={handlePasswordInput}
            ></input>
        </div>
    )
}