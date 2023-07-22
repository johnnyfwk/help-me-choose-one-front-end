import { Helmet } from "react-helmet";

export default function CreatePost() {
    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/" />
                <title>Create Post • Help Me Choose One</title>
                <meta name="description" content="This is the Create Post page meta description." />
            </Helmet>

            <header>
                <h1>CreatePost</h1>
                <p>This is the header copy for the Create Post page.</p>
            </header>

            <main>
                <h2>Sub-heading</h2>
                <p>This is some content on the Create Post page. This is some content on the Create Post page. This is some content on the Create Post page.</p>
                <p>This is some content on the Create Post page. This is some content on the Create Post page. This is some content on the Create Post page.</p>
                <p>This is some content on the Create Post page. This is some content on the Create Post page. This is some content on the Create Post page.</p>
            </main>
        </div>
        
    )
}