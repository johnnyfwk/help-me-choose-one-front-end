import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Nav({isNavVisible, setIsNavVisible}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    function onClickNavLinks() {
        window.scrollTo(0, 0);
        setIsNavVisible(false);
    }

    function onClickHideNavButton() {
        setIsNavVisible(false);
    }

    function onClickLogOutButton() {
        setUserLoggedIn({});
    }

    const styleNav = {
        left: isNavVisible ? "0%" : "100%"
    }

    return (
        <nav onClick={onClickNavLinks} style={styleNav}>
            <div id="hide-nav-button" onClick={onClickHideNavButton}>x</div>
            <Link to="/" id="nav-link-home">Home</Link>
            <Link to="/create-post">Create Post</Link>
            <Link to="/profile">My Profile</Link>
            <Link to="/about" id="nav-link-about">About</Link>
            <Link to="/contact" id="nav-link-contact">Contact</Link>
            <Link to="/terms-and-conditions" id="nav-link-terms-and-conditions">Terms & Conditions</Link>
            <Link to="/privacy-policy" id="nav-link-privacy-policy">Privacy Policy</Link>
            <Link to="/disclaimer" id="nav-link-disclaimer">Disclaimer</Link>
            <Link to="/sign-up" id="sign-up-link">Sign Up</Link>
            <Link to="/log-in" id="log-in-link">Log In</Link>
            <div id="log-out-button" onClick={onClickLogOutButton}>Log Out</div>
        </nav>
    )
}