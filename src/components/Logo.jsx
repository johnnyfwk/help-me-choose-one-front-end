import { Link } from "react-router-dom";

export default function Logo() {
    function onClickLogo() {
        window.scrollTo(0, 0);
    }

    return (
        <Link to="/" id="logo" onClick={onClickLogo}>Help Me Choose One</Link>
    )
}