import { Link } from "react-router-dom";

export default function Nav() {
    function onClickNavLinks() {
        window.scrollTo(0, 0);
    }

    function onClickLogOutButton() {
        console.log("click");
    }

    return (
        <nav onClick={onClickNavLinks}>
            <Link to="/" id="nav-link-home">Home</Link>
            <Link to="/sign-up" id="sign-up-link">Sign Up</Link>
            <Link to="/log-in" id="log-in-link">Log In</Link>
            <span id="log-out-button" onClick={onClickLogOutButton}>Log Out</span>
            <Link to="/create-post">Create Post</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/disclaimer">Disclaimer</Link>
        </nav>
    )
}