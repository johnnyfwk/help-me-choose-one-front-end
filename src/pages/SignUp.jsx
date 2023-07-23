import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PasswordInput from "../components/PasswordInput";
import * as api from "../api";
import * as utils from "../utils";

export default function SignUp() {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingUsersSuccessful, setIsFetchingUsersSuccessful] = useState(null);

    const [registeredUsernames, setRegisteredUsernames] = useState([])
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const [isUsernameFamilyFriendly, setIsUsernameFamilyFriendly] = useState(null);

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
                                : <span className="error">Username is not available</span>
                        }
                        {isUsernameValid === null || isUsernameValid === true
                            ? null
                            : <span className="error">Username can only contain letters and numbers and must start with a letter.</span>
                        }
                        {isUsernameFamilyFriendly === null || isUsernameFamilyFriendly === true
                            ? null
                            : <span className="error">Please create a family-friendly username</span>
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
                        disabled={!usernameInput || !passwordInput || !isUsernameAvailable || !isUsernameValid || !isPasswordValid || !isUsernameFamilyFriendly}
                    >Sign Up</button>
                </form>
            </main>
        </div>
    )
}