import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import TitleInput from "../components/TitleInput";
import DescriptionInput from "../components/DescriptionInput";
import CategoryInput from "../components/CategoryInput";
import OptionsInput from "../components/OptionsInput";
import * as utils from "../utils";
import * as api from "../api";

export default function CreatePost() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");

    const [isPostCreationSuccessful, setIsPostCreationSuccessful] = useState(null);

    const [optionInputs, setOptionInputs] = useState({
        option1Input: "",
        option2Input: "",
        option3Input: "",
        option4Input: "",
        option5Input: ""
    });

    const isSubmitDisabled = Object.values(optionInputs).filter(Boolean).length < 2;

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/log-in");
        }
    }, [userLoggedIn]);

    function onClickCreatePostButton() {
        const options = Object.values(optionInputs).filter((option) => option);
        const optionsAndVotes = options.map((option) => {
            return {
                "option": option,
                "optionImage": "",
                "votesFromUserIds": []
            }
        })

        setIsPostCreationSuccessful(null);
        api.createPost(new Date(), new Date(), titleInput, descriptionInput, utils.convertCategoryToUrl(categoryInput), optionsAndVotes, userLoggedIn.user_id)
            .then((response) => {
                setIsPostCreationSuccessful(true);
                setTimeout(() => navigate("/"), 3000);
            })
            .catch((error) => {
                setIsPostCreationSuccessful(false);
            })
    }

    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/create-post" />
                <title>Create Post • Help Me Choose One</title>
                <meta name="description" content="This is the Create Post page meta description." />
            </Helmet>

            <header>
                <h1>CreatePost</h1>
                <p>This is the header copy for the Create Post page.</p>
            </header>

            <main>
                {isPostCreationSuccessful === null
                    ? null
                    : isPostCreationSuccessful === true
                        ? <div className="success">Post has been created. You will be redirected to the home page.</div>
                        : <div className="error">Post could not be created.</div>
                }
                <form>
                    <TitleInput
                        titleInput={titleInput}
                        setTitleInput={setTitleInput}
                        setIsPostCreationSuccessful={setIsPostCreationSuccessful}
                    />

                    <CategoryInput
                        categoryInput={categoryInput}
                        setCategoryInput={setCategoryInput}
                        setIsPostCreationSuccessful={setIsPostCreationSuccessful}
                    />

                    <DescriptionInput
                        descriptionInput={descriptionInput}
                        setDescriptionInput={setDescriptionInput}
                        setIsPostCreationSuccessful={setIsPostCreationSuccessful}
                    />

                    <OptionsInput
                        optionInputs={optionInputs}
                        setOptionInputs={setOptionInputs}
                        setIsPostCreationSuccessful={setIsPostCreationSuccessful}
                    />
                    
                    <button
                        type="button"
                        onClick={onClickCreatePostButton}
                        disabled={
                            !titleInput ||
                            !descriptionInput ||
                            !categoryInput ||
                            categoryInput === "Select a Category" ||
                            isSubmitDisabled ||
                            isPostCreationSuccessful
                        }
                    >Create Post</button>
                </form>
                
            </main>
        </div>
        
    )
}