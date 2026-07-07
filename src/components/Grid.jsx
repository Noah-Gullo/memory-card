import Card from "./Card.jsx"

export default function Grid(map){
    async function generatePokemon(length){
        const randomKeys = [];
        const randomPokemon = [];

        for(let i = 0; i < length; i++){
            const randomNumber = Math.round(Math.random() * 1025 + 1);
            while(randomKeys.includes(randomNumber)){
                randomNumber = Math.round(Math.random() * 1025 + 1);
            }

            randomKeys.push(randomNumber);
            const url = "https://pokeapi.co/api/v2/pokemon/" + randomNumber;

            try{
                const response = await fetch(url);
                if(!response.ok){
                throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                randomPokemon.push({"name": result.name, "image": result.sprites["front_default"]});
            } catch(error){
                console.log(error.message);
            }
        }
        return randomPokemon;
    }

    const randomPokemon = [];
    generatePokemon(5).then(result => {
        for(let i = 0; i < result.length; i++){
            randomPokemon.push(result[i]);
        }
    })


    return (
        <>
        </>
    )
}