import { Link } from "react-router-dom";

export default function Footer() {
    function onClickFooterLinks() {
        window.scrollTo(0, 0);
    }

    return (
        <footer>
            <div id="footer-links" onClick={onClickFooterLinks}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/disclaimer">Disclaimer</Link>
            </div>
            <div id="copyright">Copyright &copy; {new Date().getFullYear()} HelpMeChooseOne.com. All Rights Reserved.</div>
        </footer>
    )
}