import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Nav({isNavVisible, setIsNavVisible, onClickLogOutButton}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    function onClickNavLinks() {
        window.scrollTo(0, 0);
        setIsNavVisible(false);
    }

    function onClickHideNavButton() {
        setIsNavVisible(false);
    }

    const styleNav = {
        left: isNavVisible ? "0%" : "100%"
    }

    return (
        <nav onClick={onClickNavLinks} style={styleNav}>
            <div id="hide-nav-button" onClick={onClickHideNavButton}>x</div>

            <Link to="/" id="nav-link-home">Home</Link>

            {Object.keys(userLoggedIn).length === 0
                ? <>
                    <Link to="/sign-up" id="sign-up-link">Sign Up</Link>
                    <Link to="/log-in" id="log-in-link">Log In</Link>
                </>
                : <>
                    <Link to="/create-post">Create Post</Link>
                    <Link to={`/user/${userLoggedIn.user_id}`}>My Profile</Link>
                    <div id="log-out-button" onClick={onClickLogOutButton}>Log Out</div>
                </>
            }
        </nav>
    )
}