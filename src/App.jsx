import Scoreboard from './components/Scoreboard.jsx'
import Grid from './components/Grid.jsx'
import moon from "./icons/moon.svg"
import sun from "./icons/sun.svg"
import { useEffect, useState } from "react"
import './styles/App.css'

export default function App() {
  const [isDark, setMode] = useState(false);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("High Score");
    if(storedHighScore != null){
      setHighScore(storedHighScore);
    }
  }, []);

  function handleClick(name){
    const copy = [...clicked];
    if(copy.includes(name)){
      setClicked([]);
      resetScore();
    }else{
      copy.push(name);
      setClicked(copy);
      increaseScore();
    }
  }

  function increaseScore(){
    setScore(score + 1);

    if(score + 1 > highScore){
      setHighScore(score + 1);
      localStorage.setItem("High Score", score + 1);
    }
  }

  function resetScore(){
    setScore(0);
  }

  return (
    <>
      <h1 id="title">Pokemon Memory Game</h1>
      <input type="image" src={isDark ? moon : sun} id="modeBtn" onClick={() => { 
          setMode(!isDark);
        }
      } className={isDark ? "darkMode" : "lightMode"}/>
      <Scoreboard score={score} highScore={highScore}></Scoreboard>
      <Grid length={39} handleClick={handleClick}></Grid>
    </>
  )
}