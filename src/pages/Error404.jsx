import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Error404() {
    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/" />
                <title>404 • Help Me Choose One</title>
                <meta name="description" content="This is the Error 404 page meta description." />
            </Helmet>

            <header>
                <h1>404</h1>
                <p>This is the header copy for the Home page.</p>
            </header>

            <main>
                <p>This page does not exist. Go to the <Link to="/">home</Link> page.</p>
            </main>
        </div>
    )
}