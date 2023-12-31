import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as api from "../api";

export default function Report({setIsReportSentMessageVisible, setIsReportNotSentMessageVisible}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [searchParams, setSearchParams] = useSearchParams();
    const reportOwnersId = searchParams.get("report_owners_id");
    const reportOwnersName = searchParams.get("report_owners_name");
    const postId = searchParams.get("post_id");
    const postOwnersId = searchParams.get("post_owners_id");
    const postOwnersName = searchParams.get("post_owners_name");
    const commentId = searchParams.get("comment_id");
    const commentOwnersId = searchParams.get("comment_owners_id");
    const commentOwnersName = searchParams.get("comment_owners_name");

    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");

    const titleMaxLength = 100;
    const descriptionInputMaxLength = 5000;

    const navigate = useNavigate();

    function handleTitleInput(event) {
        setTitleInput(event.target.value);
    }

    function handleDescriptionInput(event) {
        setDescriptionInput(event.target.value);
    }

    function onClickSubmitReportButton() {
        api.createReport(new Date(), parseInt(reportOwnersId), reportOwnersName, parseInt(postId), parseInt(postOwnersId), postOwnersName, parseInt(commentId), parseInt(commentOwnersId), commentOwnersName, titleInput.trim(), descriptionInput.trim())
            .then((response) => {
                setIsReportSentMessageVisible(true);
                setTimeout(() => setIsReportSentMessageVisible(false), 3000);
                navigate("/");
            })
            .catch((error) => {
                setIsReportNotSentMessageVisible(true);
                setTimeout(() => setIsReportNotSentMessageVisible(false), 3000);
            })
    }

    return (
        <div id="report">
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/report" />
                <title>Report an Issue • Help Me Choose One</title>
                <meta name="description" content="Send us a report of an issue and we'll do our best to fix it." />
            </Helmet>

            <header>
                <h1>Report an Issue</h1>
                <p>Send us a report of an issue and we'll do our best to make things better.</p>
            </header>

            <main>
                <form>
                    <div className="report-form-input">
                        <label htmlFor="report-title">Title</label>
                        <input
                            type="text"
                            id="report-title"
                            name="report-title"
                            value={titleInput}
                            onChange={handleTitleInput}
                            maxLength={titleMaxLength}
                        />
                        <div className="report-form-input-lengths">{titleInput.length} / {titleMaxLength}</div>
                    </div>
                    
                    <div className="report-form-input">
                        <label htmlFor="report-description">Description</label>
                        <textarea
                            id="report-description"
                            name="report-description"
                            value={descriptionInput}
                            onChange={handleDescriptionInput}
                            maxLength={descriptionInputMaxLength}
                        />
                        <div className="report-form-input-lengths">{descriptionInput.length} / {descriptionInputMaxLength}</div>
                    </div>
                    
                    <div>
                        <button
                            type="button"
                            onClick={onClickSubmitReportButton}
                            disabled={!titleInput || !descriptionInput}
                        >Submit</button>
                    </div>
                </form>
            </main>
        </div>
    )
}