import { Helmet } from "react-helmet";

export default function LogIn() {
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
            </header>

            <main>
                <h2>Sub-heading</h2>
                <p>This is some content on the Log In page. This is some content on the Log In page. This is some content on the Log In page.</p>
                <p>This is some content on the Log In page. This is some content on the Log In page. This is some content on the Log In page.</p>
                <p>This is some content on the Log In page. This is some content on the Log In page. This is some content on the Log In page.</p>
            </main>
        </div>
    )
}