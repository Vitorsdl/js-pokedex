const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 8
let offset = 0;
//const maxRecords = 151


function loadPokemonItens(offset, limit) {
    pokeApi.gePokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" onClick="pokemonSelec(${pokemon.number})">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')} 
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
        </li> 
    `).join('')
    })
}

function pokemonSelec(number) {
    pokeApi.searchPokemon(number).then((pokemon) => {

        //pokemonList.innerHTML = pokemonList.innerHTML + pokemon.map((pokemon) =>)
        const htmlSt = `
        <div class="popup">
            <div class="card ${pokemon.type}">
                <div class="card-header ${pokemon.type}">
                    <div><button type="button" onClick="closePopup()">⬅</button></div>
                    <span class="number">#00${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                    <lo class= "types">
                        ${pokemon.types.map((type) => `<lo class="type">${type}</lo>`).join('')}
                    </lo>
                    </div>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <div class="car-body">
                     <lo class="info">
                         <h3>About</h3>
                         <li>Height: ${pokemon.height}</li>
                         <li>Weight: ${pokemon.weight}</li>
                         <li>Habilities: ${pokemon.abilities}</li>
                     </lo>
                     <lo class="info">
                         <h3>Base Stats</h3>
                         <li>HP: ${pokemon.hp}</li>
                         <li>Attack: ${pokemon.attack}</li>
                         <li>Defense: ${pokemon.defense}</li>
                         <li>Sp.Atk: ${pokemon.spAttack}</li>
                         <li>Sp.Def: ${pokemon.spDefense}</li>
                         <li>Speed: ${pokemon.speed}</li>
                     </lo>
                </div>
            </div>
        </div>
     `
        pokemonList.innerHTML = htmlSt + pokemonList.innerHTML;
    })
}

const closePopup = () => {
    const popup = document.querySelector('.popup')
    popup.parentElement.removeChild(popup)
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    //para limitar os pokemons
    /* const qtdRecordNextPage = offset + limit
    if (qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadMoreButton(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    } */

    loadPokemonItens(offset, limit)
})