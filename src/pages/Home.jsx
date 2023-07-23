import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Home() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length > 0) {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/" />
                <title>Let the Internet help you make a choice • Help Me Choose One</title>
                <meta name="description" content="This is the Home page meta description." />
            </Helmet>

            <header>
                {Object.keys(userLoggedIn).length === 0
                    ? <h1>Welcome Guest</h1>
                    : <h1>Welcome {userLoggedIn.username}</h1>
                }
                <p>Let the Internet help you make a choice</p>
            </header>

            <main>
                <h2>Sub-heading</h2>
                <Link to="/sign-up">Sign Up</Link>
                <Link to="/log-in">Log In</Link>
                <p>This is some text on the home page.</p>
            </main>
        </div>
    )
}