import { Helmet } from "react-helmet";

export default function Home() {
    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/" />
                <title>Home • Help Me Choose One</title>
                <meta name="description" content="This is the Home page meta description." />
            </Helmet>

            <header>
                <h1>Home</h1>
                <p>This is the header copy for the Home page.</p>
            </header>

            <main>
                <h2>Sub-heading</h2>
                <p>This is some content on the Home page. This is some content on the Home page. This is some content on the Home page.</p>
                <p>This is some content on the Home page. This is some content on the Home page. This is some content on the Home page.</p>
                <p>This is some content on the Home page. This is some content on the Home page. This is some content on the Home page.</p>
            </main>
        </div>
    )
}