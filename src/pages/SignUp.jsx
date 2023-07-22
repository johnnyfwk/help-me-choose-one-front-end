import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PasswordInput from "../components/PasswordInput";
import * as api from "../api";

export default function SignUp() {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingUsersSuccessful, setIsFetchingUsersSuccessful] = useState(null);

    const [registeredUsernames, setRegisteredUsernames] = useState([])
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
    const [isUsernameValid, setIsUsernameValid] = useState(null);

    const [isPasswordValid, setIsPasswordValid] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setIsFetchingUsersSuccessful(null);
        api.getUsers()
            .then((users) => {
                const takenUsernames = users.map((user) => {
                    return user.username.toLowerCase();
                })
                setRegisteredUsernames(takenUsernames);
                setIsLoading(false);
                setIsFetchingUsersSuccessful(true);
            })
            .catch((error) => {
                setIsLoading(false);
                setIsFetchingUsersSuccessful(false);
            })
    }, [])

    function handleUsernameInput(event) {
        setUsernameInput(event.target.value);
        if (event.target.value.length === 0) {
            setIsUsernameValid(null);
            setIsUsernameAvailable(null);
        }
        else if (/^[a-zA-Z]+[0-9]*$/.test(event.target.value)) {
            setIsUsernameValid(true);
            setIsUsernameAvailable(!registeredUsernames.includes(event.target.value.toLowerCase()));
        } else {
            setIsUsernameValid(false);
            setIsUsernameAvailable(null);
        }
    }

    function onClickSignUpButton() {
        console.log("usernameInput:", usernameInput);
        console.log("passwordInput:", passwordInput);
    }

    if (isLoading) {
        return (
            <p>Page is loading...</p>
        )
    }

    if (isFetchingUsersSuccessful === false) {
        return (
            <p className="error">Page could not be loaded.</p>
        )
    }

    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/sign-up/" />
                <title>Sign Up • Help Me Choose One</title>
                <meta name="description" content="Create an account so you can post questions and let the Internet help you make a choice." />
            </Helmet>

            <header>
                <h1>Sign Up</h1>
                <p>Create an account so you can post questions and let the Internet help you make a choice.</p>
            </header>

            <main>
                <form>
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
                        {!usernameInput || isUsernameAvailable === null
                            ? null
                            : isUsernameAvailable
                                ? <span className="success">Username is available</span>
                                : <span className="error">Username is unavailable</span>
                        }
                        {isUsernameValid === null || isUsernameValid === true
                            ? null
                            : <span className="error">Username can only contain letters and numbers and must start with a letter.</span>
                        }
                    </div>
                    
                    <PasswordInput
                        passwordInput={passwordInput}
                        setPasswordInput={setPasswordInput}
                        setIsPasswordValid={setIsPasswordValid}
                        isPasswordValid={isPasswordValid}
                    />

                    <button
                        type="button"
                        onClick={onClickSignUpButton}
                        disabled={!usernameInput || !passwordInput || !isUsernameAvailable || !isUsernameValid || !isPasswordValid
                    }
                    >Sign Up</button>
                </form>
            </main>
        </div>
    )
}