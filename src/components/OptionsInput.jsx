import * as utils from "../utils";

export default function OptionsInput({
    optionInputs,
    setOptionInputs,
    setOptionsHasDuplicates,
    optionInputImages,
    setOptionInputImages,
    isOption1ImageInputValid,
    setIsOption1ImageInputValid,
    isOption2ImageInputValid,
    setIsOption2ImageInputValid,
    isOption3ImageInputValid,
    setIsOption3ImageInputValid,
    isOption4ImageInputValid,
    setIsOption4ImageInputValid,
    isOption5ImageInputValid,
    setIsOption5ImageInputValid
}) {
    const optionInputMaxLength = 100;

    function handleOptionInput(event) {
        setOptionsHasDuplicates(null);
        const { name, value } = event.target;
        setOptionInputs((prevValues) => {
            return ({ ...prevValues, [name]: value })
        });
        setOptionInputImages((currentEditOptionInputImages) => {
            const currentEditOptionInputImagesCopy = {...currentEditOptionInputImages};
            if (name === "option1Input" && value === "") {
                currentEditOptionInputImagesCopy.option1ImageInput = "";
                setIsOption1ImageInputValid(true);
            }
            else if (name === "option2Input" && value === "") {
                currentEditOptionInputImagesCopy.option2ImageInput = "";
                setIsOption2ImageInputValid(true);
            }
            else if (name === "option3Input" && value === "") {
                currentEditOptionInputImagesCopy.option3ImageInput = "";
                setIsOption3ImageInputValid(true);
            }
            else if (name === "option4Input" && value === "") {
                currentEditOptionInputImagesCopy.option4ImageInput = "";
                setIsOption4ImageInputValid(true);
            }
            else if (name === "option5Input" && value === "") {
                currentEditOptionInputImagesCopy.option5ImageInput = "";
                setIsOption5ImageInputValid(true);
            }
            return currentEditOptionInputImagesCopy;
        })
    }

    const {
        option1Input,
        option2Input,
        option3Input,
        option4Input,
        option5Input
    } = optionInputs;

    function handleOptionImageInput(event) {
        const { name, value } = event.target;
        setOptionInputImages((prevValues) => {
            return ({...prevValues, [name]: value })
        })
        if (name === "option1ImageInput") {
            setIsOption1ImageInputValid(utils.isImageUrlValid(value))
            if (value === "") {
                setIsOption1ImageInputValid(true);
            }
        }
        else if (name === "option2ImageInput") {
            setIsOption2ImageInputValid(utils.isImageUrlValid(value))
            if (value === "") {
                setIsOption2ImageInputValid(true);
            }
        }
        else if (name === "option3ImageInput") {
            setIsOption3ImageInputValid(utils.isImageUrlValid(value))
            if (value === "") {
                setIsOption3ImageInputValid(true);
            }
        }
        else if (name === "option4ImageInput") {
            setIsOption4ImageInputValid(utils.isImageUrlValid(value))
            if (value === "") {
                setIsOption4ImageInputValid(true);
            }
        }
        else if (name === "option5ImageInput") {
            setIsOption5ImageInputValid(utils.isImageUrlValid(value))
            if (value === "") {
                setIsOption5ImageInputValid(true);
            }
        }
    }

    const {
        option1ImageInput,
        option2ImageInput,
        option3ImageInput,
        option4ImageInput,
        option5ImageInput
    } = optionInputImages;

    return (
        <div id="edit-post-options-and-images">
            <div className="edit-post-option-and-image">
                <div className="edit-post-option-label-input-and-lengths">
                    <label htmlFor="option">Option 1:</label>
                    <input
                        type="text"
                        id="option"
                        name="option1Input"
                        value={option1Input}
                        onChange={handleOptionInput}
                        maxLength={optionInputMaxLength}
                    ></input>
                    <span className="edit-post-input-length">{option1Input.length} / {optionInputMaxLength}</span>
                </div>

                <div className="edit-post-option-label-input-and-error-message">
                    <label htmlFor="option1ImageInput">Option 1 Image URL (optional):</label>
                    <input
                        type="text"
                        id="option1ImageInput"
                        name="option1ImageInput"
                        value={option1ImageInput}
                        onChange={handleOptionImageInput}
                        disabled={!option1Input}
                    ></input>
                </div>
                {isOption1ImageInputValid || option1ImageInput === ""
                    ? null
                    : <div className="error">Please enter a valid image URL</div>
                }
            </div>
            
            <div className="edit-post-option-and-image">
                <div className="edit-post-option-label-input-and-lengths">
                    <label htmlFor="option">Option 2:</label>
                    <input
                        type="text"
                        id="option"
                        name="option2Input"
                        value={option2Input}
                        onChange={handleOptionInput}
                        maxLength={optionInputMaxLength}
                    ></input>
                    <span className="edit-post-input-length">{option2Input.length} / {optionInputMaxLength}</span>
                </div>

                <div className="edit-post-option-label-input-and-error-message">
                    <label htmlFor="option2ImageInput">Option 2 Image URL (optional):</label>
                    <input
                        type="text"
                        id="option2ImageInput"
                        name="option2ImageInput"
                        value={option2ImageInput}
                        onChange={handleOptionImageInput}
                        disabled={!option2Input}
                    ></input>
                </div>
                {isOption2ImageInputValid || option2ImageInput === ""
                    ? null
                    : <div className="error">Please enter a valid image URL</div>
                }
            </div>
            
            <div className="edit-post-option-and-image">
                <div className="edit-post-option-label-input-and-lengths">
                    <label htmlFor="option">Option 3:</label>
                    <input
                        type="text"
                        id="option"
                        name="option3Input"
                        value={option3Input}
                        onChange={handleOptionInput}
                        maxLength={optionInputMaxLength}
                    ></input>
                    <span className="edit-post-input-length">{option3Input.length} / {optionInputMaxLength}</span>
                </div>

                <div className="edit-post-option-label-input-and-error-message">
                    <label htmlFor="option3ImageInput">Option 3 Image URL (optional):</label>
                    <input
                        type="text"
                        id="option3ImageInput"
                        name="option3ImageInput"
                        value={option3ImageInput}
                        onChange={handleOptionImageInput}
                        disabled={!option3Input}
                    ></input>
                </div>
                {isOption3ImageInputValid || option3ImageInput === ""
                    ? null
                    : <div className="error">Please enter a valid image URL</div>
                }
            </div>

            <div className="edit-post-option-and-image">
                <div className="edit-post-option-label-input-and-lengths">
                    <label htmlFor="option">Option 4:</label>
                    <input
                        type="text"
                        id="option"
                        name="option4Input"
                        value={option4Input}
                        onChange={handleOptionInput}
                        maxLength={optionInputMaxLength}
                    ></input>
                    <span className="edit-post-input-length">{option4Input.length} / {optionInputMaxLength}</span>
                </div>

                <div className="edit-post-option-label-input-and-error-message">
                    <label htmlFor="option4ImageInput">Option 4 Image URL (optional):</label>
                    <input
                        type="text"
                        id="option4ImageInput"
                        name="option4ImageInput"
                        value={option4ImageInput}
                        onChange={handleOptionImageInput}
                        disabled={!option4Input}
                    ></input>
                </div>
                {isOption4ImageInputValid || option4ImageInput === ""
                    ? null
                    : <div className="error">Please enter a valid image URL</div>
                }
            </div>
            
            <div className="edit-post-option-and-image">
                <div className="edit-post-option-label-input-and-lengths">
                    <label htmlFor="option">Option 5:</label>
                    <input
                        type="text"
                        id="option"
                        name="option5Input"
                        value={option5Input}
                        onChange={handleOptionInput}
                        maxLength={optionInputMaxLength}
                    ></input>
                    <span className="edit-post-input-length">{option5Input.length} / {optionInputMaxLength}</span>
                </div>

                <div className="edit-post-option-label-input-and-error-message">
                    <label htmlFor="option5ImageInput">Option 5 Image URL (optional):</label>
                    <input
                        type="text"
                        id="option5ImageInput"
                        name="option5ImageInput"
                        value={option5ImageInput}
                        onChange={handleOptionImageInput}
                        disabled={!option5Input}
                    ></input>
                </div>
                {isOption5ImageInputValid || option5ImageInput === ""
                    ? null
                    : <div className="error">Please enter a valid image URL</div>
                }
            </div>
        </div>
    )
}