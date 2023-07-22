import { Helmet } from "react-helmet";

export default function SignUp() {
    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/sign-up/" />
                <title>Sign Up • Help Me Choose One</title>
                <meta name="description" content="Create an account so you can posts questions and let the Internet help you make a choice." />
            </Helmet>

            <header>
                <h1>Sign Up</h1>
                <p>This is the header copy for the Sign Up page.</p>
            </header>

            <main>
                <h2>Sub-heading</h2>
                <p>This is some content on the Sign Up page. This is some content on the Sign Up page. This is some content on the Sign Up page.</p>
                <p>This is some content on the Sign Up page. This is some content on the Sign Up page. This is some content on the Sign Up page.</p>
                <p>This is some content on the Sign Up page. This is some content on the Sign Up page. This is some content on the Sign Up page.</p>
            </main>
        </div>
    )
}