import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { UserContext } from "../contexts/UserContext";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";
import ImageInput from "../components/ImageInput";
import * as api from "../api";
import * as utils from "../utils";

export default function SignUp({setIsAccountCreatedMessageVisible, setIsAccountNotCreatedMessageVisible}) {
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
    const passwordInputLabel = "Password";

    const [avatarUrlInput, setAvatarUrlInput] = useState("");
    const [isAvatarUrlValid, setIsAvatarUrlValid] = useState(true);

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
        api.addUser(usernameInput, passwordInput, avatarUrlInput ? avatarUrlInput : "default-avatar.webp", new Date())
            .then((response) => {
                setUserLoggedIn(response);
                setIsAccountCreatedMessageVisible(true);
                setTimeout(() => setIsAccountCreatedMessageVisible(false), 3000);
                navigate("/");
            })
            .catch((error) => {
                setIsUsernameAvailable(false);
                setIsAccountNotCreatedMessageVisible(true);
                setTimeout(() => setIsAccountNotCreatedMessageVisible(false), 3000);
            })
    }

    if (isLoading) {
        return (
            <main>
                <p>Page is loading...</p>
            </main>
        )
    }

    if (isFetchingUsersSuccessful === false) {
        return (
            <main>
                <p className="error">Page could not be loaded.</p>
            </main>
        )
    }

    const styleSignUpButton = {
        opacity: !usernameInput ||
        !passwordInput ||
        !isUsernameAvailable ||
        !isUsernameValid ||
        !isPasswordValid ||
        !isUsernameFamilyFriendly ||
        !isAvatarUrlValid
            ? "0.3"
            : "1"
    }

    return (
        <div id="sign-up">
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
                    <div className="sign-up-input-and-error-message">
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
                    </div>
                    
                    <div className="sign-up-input-and-error-message">
                        <PasswordInput
                            passwordInput={passwordInput}
                            setPasswordInput={setPasswordInput}
                            passwordInputLabel={passwordInputLabel}
                        />
                        {isPasswordValid === null || isPasswordValid === true
                            ? null
                            : <span className="error">Password can not contain spaces</span>
                        }
                    </div>
                    
                    <div className="sign-up-input-and-error-message">
                        <ImageInput
                            imageUrlInput={avatarUrlInput}
                            setImageUrlInput={setAvatarUrlInput}
                            setIsImageUrlValid={setIsAvatarUrlValid}
                        />
                        {isAvatarUrlValid === null || isAvatarUrlValid === true
                            ? null
                            : <span className="error">Image URL should include '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', or '.svg' file extensions and not include any spaces.</span>
                        }
                    </div>
                    
                    <div>
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
                            style={styleSignUpButton}
                        >Sign Up</button>
                    </div>
                </form>
            </main>
        </div>
    )
}