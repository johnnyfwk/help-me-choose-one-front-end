import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";
import * as api from "../api";

export default function LogIn() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingUsersSuccessful, setIsFetchingUsersSuccessful] = useState(null);

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

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
            navigate("/");
        }
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
                <link rel="canonical" href="https://helpmechooseone.com/log-in/" />
                <title>Log In • Help Me Choose One</title>
                <meta name="description" content="Log in to your account so you can posts questions, vote on other users questions, and post comments." />
            </Helmet>

            <header>
                <h1>Log In</h1>
                <p>This is the header copy for the Log In page.</p>
                <p>Don't have an account? <Link to="/sign-up">Sign up</Link>.</p>
            </header>

            <main>
                <UsernameInput 
                    usernameInput={usernameInput}
                    setUsernameInput={setUsernameInput}
                />
                {isUsernameInputInDatabase === null || isUsernameInputInDatabase === true
                    ? null
                    : <span className="error">Username does not exist</span>
                }

                <PasswordInput
                    passwordInput={passwordInput}
                    setPasswordInput={setPasswordInput}
                />
                {isPasswordCorrect === null || isPasswordCorrect === true
                    ? null
                    : <span className="error">Password is incorrect</span>
                }

                <button
                    type="button"
                    onClick={onClickLogInButton}
                    disabled={
                        !usernameInput ||
                        !passwordInput
                    }
                >Log In</button>
            </main>
        </div>
    )
}