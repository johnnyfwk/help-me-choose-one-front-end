import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { UserContext } from "../contexts/UserContext";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";
import AvatarInput from "../components/AvatarInput";
import * as api from "../api";
import * as utils from "../utils";

export default function SignUp() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingUsersSuccessful, setIsFetchingUsersSuccessful] = useState(null);

    const [usernameInput, setUsernameInput] = useState("");
    const [registeredUsernames, setRegisteredUsernames] = useState([]);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const [isUsernameFamilyFriendly, setIsUsernameFamilyFriendly] = useState(null);

    const [passwordInput, setPasswordInput] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(null);

    const [avatarUrlInput, setAvatarUrlInput] = useState("");
    const [isAvatarUrlValid, setIsAvatarUrlValid] = useState(true);

    const [isAccountCreationSuccessful, setIsAccountCreationSuccessful] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length > 0) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        setIsLoading(true);
        setIsFetchingUsersSuccessful(null);
        api.getUsers()
            .then((response) => {
                const registeredUsernamesLowercase = response.map((user) => {
                    return user.username.toLowerCase();
                })
                setRegisteredUsernames(registeredUsernamesLowercase);
                setIsLoading(false);
                setIsFetchingUsersSuccessful(true);
            })
            .catch((error) => {
                setIsLoading(false);
                setIsFetchingUsersSuccessful(false);
            })
    }, [])

    useEffect(() => {
        setIsUsernameValid(null);
        setIsUsernameAvailable(null);
        setIsUsernameFamilyFriendly(null);
        if (usernameInput.length === 0) {
            setIsUsernameValid(null);
            setIsUsernameAvailable(null);
            setIsUsernameFamilyFriendly(null);
        }
        else if (!utils.isFamilyFriendly(usernameInput)) {
            setIsUsernameFamilyFriendly(false);
        }
        else if (!/^[a-zA-Z]+[0-9]*$/.test(usernameInput)) {
            setIsUsernameValid(false);
        }
        else if (registeredUsernames.includes(usernameInput.toLowerCase())) {
            setIsUsernameAvailable(false);
        }
        else {
            setIsUsernameValid(true);
            setIsUsernameAvailable(true);
            setIsUsernameFamilyFriendly(true);
        }
    }, [usernameInput])

    useEffect(() => {
        setIsPasswordValid(utils.isPasswordValid(passwordInput));
    }, [passwordInput])

    function onClickSignUpButton() {
        setIsAccountCreationSuccessful(null);
        api.addUser(usernameInput, passwordInput, avatarUrlInput ? avatarUrlInput : "default-avatar.webp", new Date())
            .then((response) => {
                setIsAccountCreationSuccessful(true);
                setUserLoggedIn(response);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                setIsAccountCreationSuccessful(false);
            })
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
                <p>Already have an account? <Link to="/log-in">Log in</Link>.</p>
            </header>

            <main>
                <form>
                    <UsernameInput
                        usernameInput={usernameInput}
                        setUsernameInput={setUsernameInput}
                    />
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
                    
                    <PasswordInput
                        passwordInput={passwordInput}
                        setPasswordInput={setPasswordInput}
                    />
                    {isPasswordValid === null || isPasswordValid === true
                        ? null
                        : <span className="error">Password can not contain spaces</span>    
                    }

                    <AvatarInput
                        avatarUrlInput={avatarUrlInput}
                        setAvatarUrlInput={setAvatarUrlInput}
                        setIsAvatarUrlValid={setIsAvatarUrlValid}
                    />
                    {isAvatarUrlValid === null || isAvatarUrlValid === true
                        ? null
                        : <span className="error">Please enter a valid image URL</span>
                    }

                    <button
                        type="button"
                        onClick={onClickSignUpButton}
                        disabled={
                            !usernameInput ||
                            !passwordInput ||
                            !isUsernameAvailable ||
                            !isUsernameValid ||
                            !isPasswordValid ||
                            !isUsernameFamilyFriendly ||
                            !isAvatarUrlValid
                        }
                    >Sign Up</button>

                    {isAccountCreationSuccessful === null
                        ? null
                        : isAccountCreationSuccessful === true
                            ? <span className="success">Account has been created successfully!</span>
                            : <span className="error">Account could not be created</span>
                    }
                </form>
            </main>
        </div>
    )
}