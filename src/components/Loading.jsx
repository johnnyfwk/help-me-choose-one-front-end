import { useState, useEffect } from "react";
import axios from "axios";

export default function Loading() {
    const [joke, setJoke] = useState("");

    const onClickNextJokeButton = async () => {
        try {
            const response = await axios.get('https://icanhazdadjoke.com/', {
                headers: { Accept: 'application/json' },
            });
            setJoke(response.data.joke);
            } catch (error) {
                console.error('Error fetching dad joke:', error);
                setJoke("Couldn't get dad joke.")
            }
    };

    useEffect(() => {
        onClickNextJokeButton();
    }, [])

    return (
        <main>
            <p>Page is loading...</p>
            <p>While you're waiting, here are some dad jokes to keep you entertained.</p>
            <p id="loading-joke">{joke}</p>
            <div>
                <button type="button" onClick={onClickNextJokeButton}>Next Joke</button>
            </div>
        </main>
    )
}