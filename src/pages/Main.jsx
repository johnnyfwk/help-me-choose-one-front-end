import { Helmet } from "react-helmet";

export default function Main() {
    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/main/" />
                <title>Main • Help Me Choose One</title>
                <meta name="description" content="This is the Main page meta description." />
            </Helmet>

            <header>
                <h1>Main</h1>
                <p>This is the header copy for the Main page.</p>
            </header>

            <main>
                <h2>Sub-heading</h2>
                <p>This is some content on the Main page. This is some content on the Main page. This is some content on the Main page.</p>
                <p>This is some content on the Main page. This is some content on the Main page. This is some content on the Main page.</p>
                <p>This is some content on the Main page. This is some content on the Main page. This is some content on the Main page.</p>
            </main>
        </div>
        
    )
}