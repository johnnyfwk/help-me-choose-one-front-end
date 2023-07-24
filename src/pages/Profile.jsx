import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Profile() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/log-in");
        }
    }, [userLoggedIn]);

    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/" />
                <title>Profile • Help Me Choose One</title>
                <meta name="description" content="This is the Profile page meta description." />
            </Helmet>

            <header>
                <h1>Profile</h1>
                <p>This is the header copy for the Profile page.</p>
            </header>

            <main>
                <h2>Sub-heading</h2>
                <p>This is some content on the Profile page. This is some content on the Profile page. This is some content on the Profile page.</p>
                <p>This is some content on the Profile page. This is some content on the Profile page. This is some content on the Profile page.</p>
                <p>This is some content on the Profile page. This is some content on the Profile page. This is some content on the Profile page.</p>
            </main>
        </div>
    )
}