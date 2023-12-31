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

    const [optionInputImages, setOptionInputImages] = useState({
        option1ImageInput: "",
        option2ImageInput: "",
        option3ImageInput: "",
        option4ImageInput: "",
        option5ImageInput: ""
    });

    const [isOption1ImageInputValid, setIsOption1ImageInputValid] = useState(true);
    const [isOption2ImageInputValid, setIsOption2ImageInputValid] = useState(true);
    const [isOption3ImageInputValid, setIsOption3ImageInputValid] = useState(true);
    const [isOption4ImageInputValid, setIsOption4ImageInputValid] = useState(true);
    const [isOption5ImageInputValid, setIsOption5ImageInputValid] = useState(true);

    const [optionsHasDuplicates, setOptionsHasDuplicates] = useState(null);

    const [isPostCreationSuccessful, setIsPostCreationSuccessful] = useState(null);

    const [isDuplicateOptionsEnteredMessageVisible, setIsDuplicateOptionsEnteredMessageVisible] = useState(false);

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
        const images = Object.values(optionInputImages);
        const optionsMinusSpaces = options.map((option) => option.trim());
        const optionsInLowercase = optionsMinusSpaces.map((option) => option.toLowerCase());
        const optionsContainsDuplicates = optionsInLowercase.some((value, index) => {
            return optionsInLowercase.indexOf(value, index + 1) !== -1;
        });

        if (optionsContainsDuplicates) {
            setOptionsHasDuplicates(true);
            setIsDuplicateOptionsEnteredMessageVisible(true);
            setTimeout(() => setIsDuplicateOptionsEnteredMessageVisible(false), 3000)
        }
        else {
            setOptionsHasDuplicates(false);
            const addedInputs = Object.values(optionInputs);
            const optionsImagesAndVotes = [];
            for (let optionNumber = 0; optionNumber < addedInputs.length; optionNumber++) {
                if (addedInputs[optionNumber].length > 0) {
                    optionsImagesAndVotes.push({
                        "option": addedInputs[optionNumber].trim(),
                        "optionImage": images[optionNumber] ? images[optionNumber].trim() : "",
                        "votesFromUserIds": []
                    })
                }
            }
            
            setIsPostCreationSuccessful(null);
            api.createPost(new Date(), new Date(), titleInput.trim(), descriptionInput.trim(), utils.convertCategoryToUrl(categoryInput), optionsImagesAndVotes, userLoggedIn.user_id)
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

    const styleDuplicateOptionsEnteredMessage = {
        bottom: isDuplicateOptionsEnteredMessageVisible ? "0%" : "-100%"
    }

    const styleCreatePostButton = {
        opacity: !titleInput ||
        !descriptionInput ||
        !categoryInput ||
        categoryInput === "Select a Category" ||
        isSubmitDisabled ||
        isPostCreationSuccessful ||
        !isOption1ImageInputValid ||
        !isOption2ImageInputValid ||
        !isOption3ImageInputValid ||
        !isOption4ImageInputValid ||
        !isOption5ImageInputValid
            ? "0.3"
            : "1"
    }

    return (
        <div>
            <Helmet>
                <link rel="canonical" href="https://helpmechooseone.com/create-post" />
                <title>Create Post • Help Me Choose One</title>
                <meta name="description" content="If you have a choice to make, post a question so others can help you choose." />
            </Helmet>

            <header>
                <h1>Create a Post</h1>
                <p>Get help from the Internet to make a choice by posting your question and at least two options.</p>
                <p>You can also add images for each option to help others users make an informed choice.</p>
            </header>

            <main>
                <div id="duplicate-options-entered-message" style={styleDuplicateOptionsEnteredMessage}>You have entered duplicate options</div>

                <form id="create-post-form">
                    <div id="post-inputs">
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
                            optionInputImages={optionInputImages}
                            setOptionInputImages={setOptionInputImages}
                            isOption1ImageInputValid={isOption1ImageInputValid}
                            setIsOption1ImageInputValid={setIsOption1ImageInputValid}
                            isOption2ImageInputValid={isOption2ImageInputValid}
                            setIsOption2ImageInputValid={setIsOption2ImageInputValid}
                            isOption3ImageInputValid={isOption3ImageInputValid}
                            setIsOption3ImageInputValid={setIsOption3ImageInputValid}
                            isOption4ImageInputValid={isOption4ImageInputValid}
                            setIsOption4ImageInputValid={setIsOption4ImageInputValid}
                            isOption5ImageInputValid={isOption5ImageInputValid}
                            setIsOption5ImageInputValid={setIsOption5ImageInputValid}
                        />
                    </div>
                    
                    <div>
                        <button
                            type="button"
                            onClick={onClickCreatePostButton}
                            disabled={
                                !titleInput ||
                                !descriptionInput ||
                                !categoryInput ||
                                categoryInput === "Select a Category" ||
                                isSubmitDisabled ||
                                isPostCreationSuccessful ||
                                !isOption1ImageInputValid ||
                                !isOption2ImageInputValid ||
                                !isOption3ImageInputValid ||
                                !isOption4ImageInputValid ||
                                !isOption5ImageInputValid
                            }
                            style={styleCreatePostButton}
                        >Create Post</button>
                    </div>
                </form>
            </main>
        </div>
        
    )
}