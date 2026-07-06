import Scoreboard from './components/Scoreboard'
import './styles/App.css'

export default function App() {
  function generatePokemon(length){
    const randomKeys = [];
    for(let i = 0; i < length; i++){
      const randomNumber = Math.round(Math.random() * 1025 + 1);
      randomKeys.push(randomNumber);
    }
    
  }

  return (
    <>
      <h1>Pokemon Memory Game</h1>
      <Scoreboard />
    </>
  )
}