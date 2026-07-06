import { useState } from "react";
export default function Scoreboard(){
    const [score, setScore] =  useState(0);
    const [highScore, setHighScore] = useState(0);

    function increaseScore(){
        const newScore = score + 1;
        setScore(newScore);
        if(newScore > highScore){
            setHighScore(newScore);
        }
    }

    function resetScore(){
        setScore(0);
    }

    return (
        <>
            <p>Current Score: {score}</p>
            <p>High     Score: {highScore}</p>
            <button onClick={increaseScore}>Increase Score</button>
            <button onClick={resetScore}>Reset Score</button>
        </>
    )
}