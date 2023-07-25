export default function OptionsInput({
    optionInputs,
    setOptionInputs,
    setOptionsHasDuplicates
}) {
    const optionInputMaxLength = 100;

    function handleOptionInput(event) {
        setOptionsHasDuplicates(null);
        const { name, value } = event.target;
        setOptionInputs((prevValues) => {
            return ({ ...prevValues, [name]: value })
        });
    }

    const {
        option1Input,
        option2Input,
        option3Input,
        option4Input,
        option5Input
    } = optionInputs;

    return (
        <div>
            <div>
                <label htmlFor="option">Option 1:</label>
                <input
                    type="text"
                    id="option"
                    name="option1Input"
                    value={option1Input}
                    onChange={handleOptionInput}
                    maxLength={optionInputMaxLength}
                ></input>
                <span>{option1Input.length} / {optionInputMaxLength}</span>
            </div>

            <div>
                <label htmlFor="option">Option 2:</label>
                <input
                    type="text"
                    id="option"
                    name="option2Input"
                    value={option2Input}
                    onChange={handleOptionInput}
                    maxLength={optionInputMaxLength}
                ></input>
                <span>{option2Input.length} / {optionInputMaxLength}</span>
            </div>

            <div>
                <label htmlFor="option">Option 3:</label>
                <input
                    type="text"
                    id="option"
                    name="option3Input"
                    value={option3Input}
                    onChange={handleOptionInput}
                    maxLength={optionInputMaxLength}
                ></input>
                <span>{option3Input.length} / {optionInputMaxLength}</span>
            </div>

            <div>
                <label htmlFor="option">Option 4:</label>
                <input
                    type="text"
                    id="option"
                    name="option4Input"
                    value={option4Input}
                    onChange={handleOptionInput}
                    maxLength={optionInputMaxLength}
                ></input>
                <span>{option4Input.length} / {optionInputMaxLength}</span>
            </div>

            <div>
                <label htmlFor="option">Option 5:</label>
                <input
                    type="text"
                    id="option"
                    name="option5Input"
                    value={option5Input}
                    onChange={handleOptionInput}
                    maxLength={optionInputMaxLength}
                ></input>
                <span>{option5Input.length} / {optionInputMaxLength}</span>
            </div>
        </div>
    )
}