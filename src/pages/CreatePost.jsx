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

export default function CreatePost({setIsPostCreatedMessageVisible, setIsPostNotCreatedMessageVisible}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [optionInputs, setOptionInputs] = useState({
        option1Input: "",
        option2Input: "",
        option3Input: "",
        option4Input: "",
        option5Input: ""
    });
    const [optionsHasDuplicates, setOptionsHasDuplicates] = useState(null);

    const [isPostCreationSuccessful, setIsPostCreationSuccessful] = useState(null);

    const isSubmitDisabled = Object.values(optionInputs).filter(Boolean).length < 2;

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/log-in");
        }
    }, [userLoggedIn]);

    function onClickCreatePostButton() {
        setOptionsHasDuplicates(null);
        const options = Object.values(optionInputs).filter((option) => option);
        const optionsMinusSpaces = options.map((option) => option.trim());
        const optionsInLowercase = optionsMinusSpaces.map((option) => option.toLowerCase());
        const optionsContainsDuplicates = optionsInLowercase.some((value, index) => {
            return optionsInLowercase.indexOf(value, index + 1) !== -1;
        });

        if (optionsContainsDuplicates) {
            setOptionsHasDuplicates(true);
        }
        else {
            setOptionsHasDuplicates(false);
            const optionsAndVotes = optionsMinusSpaces.map((option) => {
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
                    setIsPostCreatedMessageVisible(true);
                    setTimeout(() => setIsPostCreatedMessageVisible(false), 3000);
                    navigate("/");
                })
                .catch((error) => {
                    setIsPostCreationSuccessful(false);
                    setIsPostNotCreatedMessageVisible(true);
                    setTimeout(() => setIsPostNotCreatedMessageVisible(false), 3000);
                })
        }
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
                <p>Enter at least two options.</p>
            </header>

            <main>
                {optionsHasDuplicates === null || optionsHasDuplicates === false
                    ? null
                    : <div className="error">You have entered duplicate options</div>
                }
                <form>
                    <TitleInput
                        titleInput={titleInput}
                        setTitleInput={setTitleInput}
                    />

                    <CategoryInput
                        categoryInput={categoryInput}
                        setCategoryInput={setCategoryInput}
                    />

                    <DescriptionInput
                        descriptionInput={descriptionInput}
                        setDescriptionInput={setDescriptionInput}
                    />

                    <OptionsInput
                        optionInputs={optionInputs}
                        setOptionInputs={setOptionInputs}
                        setOptionsHasDuplicates={setOptionsHasDuplicates}
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