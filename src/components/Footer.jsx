import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Footer() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    function onClickFooterLinks() {
        window.scrollTo(0, 0);
    }

    return (
        <footer>
            <div id="footer-links" onClick={onClickFooterLinks}>
                <Link to="/">Home</Link>
                {/* <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link> */}
                <Link to={`/report/?report_owners_id=${userLoggedIn.user_id ? userLoggedIn.user_id : null}&report_owners_name=${userLoggedIn.username ? userLoggedIn.username : ""}&post_id=null&post_owners_id=null&post_owners_name=&comment_id=null&comment_owners_id=null&comment_owners_name=`}>Report an Issue</Link>
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/disclaimer">Disclaimer</Link>
            </div>
            <div id="copyright">Copyright &copy; {new Date().getFullYear()} HelpMeChooseOne.com. All Rights Reserved.</div>
        </footer>
    )
}