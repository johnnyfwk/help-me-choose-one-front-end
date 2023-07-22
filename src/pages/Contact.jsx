import { Helmet } from "react-helmet";

export default function Contact() {
    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/contact" />
                <title>Contact • Help Me Choose One</title>
                <meta name="description" content="This is the Contact page meta description." />
            </Helmet>

            <header>
                <h1>Contact</h1>
                <p>This is the header copy for the Contact page.</p>
            </header>

            <main>
                <h2>Sub-heading</h2>
                <p>This is some content on the Contact page. This is some content on the Contact page. This is some content on the Contact page.</p>
                <p>This is some content on the Contact page. This is some content on the Contact page. This is some content on the Contact page.</p>
                <p>This is some content on the Contact page. This is some content on the Contact page. This is some content on the Contact page.</p>
            </main>
        </div>
    )
}