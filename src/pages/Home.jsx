import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Home() {
    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/" />
                <title>Let the Internet help you make a choice • Help Me Choose One</title>
                <meta name="description" content="This is the Home page meta description." />
            </Helmet>

            <header>
                <h1>Home</h1>
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