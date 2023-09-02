import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";
import * as api from "../api";
import Loading from "../components/Loading";

export default function LogIn({setIsLoggedInMessageVisible}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingUsersSuccessful, setIsFetchingUsersSuccessful] = useState(null);

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const passwordInputLabel = "Password";

    const [users, setUsers] = useState([]);

    const [isUsernameInputInDatabase, setIsUsernameInputInDatabase] = useState(null);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(null);

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
                setIsLoading(false);
                setIsFetchingUsersSuccessful(true);
                setUsers(response);
            })
            .catch((error) => {
                setIsLoading(false);
                setIsFetchingUsersSuccessful(false);
            })
    }, [])

    useEffect(() => {
        setIsUsernameInputInDatabase(null);
    }, [usernameInput])

    useEffect(() => {
        setIsPasswordCorrect(null);
    }, [passwordInput])

    function onClickLogInButton() {
        setIsUsernameInputInDatabase(null);
        setIsPasswordCorrect(null);
        const userInfo = users.filter((user) => {
            return user.username.toLowerCase() === usernameInput.toLowerCase();
        })
        if (userInfo.length === 0) {
            setIsUsernameInputInDatabase(false);
        }
        else if (userInfo.length > 0 && userInfo[0].password !== passwordInput) {
            setIsUsernameInputInDatabase(true);
            setIsPasswordCorrect(false);
        }
        else {
            setUserLoggedIn(userInfo[0]);
            setIsLoggedInMessageVisible(true);
            setTimeout(() => setIsLoggedInMessageVisible(false), 3000);
            navigate("/");
        }
    }

    const styleLogInButton = {
        opacity: !usernameInput || !passwordInput ? "0.3" : "1"
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isFetchingUsersSuccessful === false) {
        return (
            <main>
                <p className="error">Page could not be loaded.</p>
            </main>
        )
    }

    return (
        <div id="log-in">
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/log-in/" />
                <title>Log In • Help Me Choose One</title>
                <meta name="description" content="Log in to your account so you can posts questions, vote on other users questions, and post comments." />
            </Helmet>

            <header>
                <h1>Log In</h1>
                <p>Log in to your account to post a question or help others make a choice.</p>
                <p>Don't have an account? <Link to="/sign-up">Sign up</Link>.</p>
            </header>

            <main>
                <form>
                    <div className="log-in-input-and-error-message">
                        <UsernameInput 
                            usernameInput={usernameInput}
                            setUsernameInput={setUsernameInput}
                        />
                        {isUsernameInputInDatabase === null || isUsernameInputInDatabase === true
                            ? null
                            : <span className="error">Username does not exist</span>
                        }
                    </div>
                    
                    <div className="log-in-input-and-error-message">
                        <PasswordInput
                            passwordInput={passwordInput}
                            setPasswordInput={setPasswordInput}
                            passwordInputLabel={passwordInputLabel}
                        />
                        {isPasswordCorrect === null || isPasswordCorrect === true
                            ? null
                            : <span className="error">Password is incorrect</span>
                        }
                    </div>
                    
                    <div>
                        <button
                            type="button"
                            onClick={onClickLogInButton}
                            disabled={
                                !usernameInput ||
                                !passwordInput
                            }
                            style={styleLogInButton}
                        >Log In</button>
                    </div>
                </form>
            </main>
        </div>
    )
}