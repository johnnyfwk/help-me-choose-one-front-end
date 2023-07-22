import { Helmet } from "react-helmet";

export default function About() {
    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/about" />
                <title>About • Help Me Choose One</title>
                <meta name="description" content="This is the About page meta description." />
            </Helmet>

            <header>
                <h1>About</h1>
                <p>This is the header copy for the About page.</p>
            </header>

            <main>
                <h2>Sub-heading</h2>
                <p>This is some content on the About page. This is some content on the About page. This is some content on the About page.</p>
                <p>This is some content on the About page. This is some content on the About page. This is some content on the About page.</p>
                <p>This is some content on the About page. This is some content on the About page. This is some content on the About page.</p>
            </main>
        </div>
    )
}