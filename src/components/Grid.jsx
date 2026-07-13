import { useEffect, useState } from "react";
import Card from "./Card.jsx"

export default function Grid({length, handleClick}){
    const [pokemon, setPokemon] = useState([]);
    const randomPokemon = [];

    async function getRandomPokemon(){
        const randomKeys = [];
        const POKEMON_LIST_LENGTH = 1025;

        for(let i = 1; i <= POKEMON_LIST_LENGTH; i++){
            randomKeys.push(i);
        }

        for(let i = 0; i < length; i++){
            const randomNumber = Math.round(Math.random() * randomKeys.length);
            randomKeys.splice(randomNumber, 1);
            
            const url = "https://pokeapi.co/api/v2/pokemon/" + randomNumber;
            try{
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                randomPokemon.push({"name": (result.name[0].toUpperCase() + result.name.slice(1)).split("-")[0], "image": result.sprites["front_default"], "id": randomNumber});
            } catch(error){
                console.log(error.message);
            }
        }
 
        return randomPokemon;
    }

    useEffect(() => {
        let ignore = false;
        getRandomPokemon().then(result => {
            if(!ignore){
                setPokemon(result);
            }
        });
        return () => {
            ignore = true;
        };
    }, []);

    function randomizePokemon(name){
        const copy = [...pokemon];
        for(let i = copy.length - 1; i > 0; i--){
            const random = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[random]] = [copy[random], copy[i]];
        }
        setPokemon(copy);
        handleClick(name);
    }

    return (pokemon.length === 0 ? <p id="loadText">Loading grid...</p> : 
        <div id="pokemonCards">
                {pokemon.map(pokemon => (
                    <Card name={pokemon.name} image={pokemon.image} randomRender={randomizePokemon} key={pokemon.id}></Card>
                ))}
        </div>
    );
}