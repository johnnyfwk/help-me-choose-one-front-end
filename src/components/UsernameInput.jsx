export default function UsernameInput({usernameInput, setUsernameInput}) {
    function handleUsernameInput(event) {
        setUsernameInput(event.target.value);
    }

    return (
        <div>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={usernameInput}
                onChange={handleUsernameInput}
                maxLength="30"
            ></input>
        </div>
        
    )
}