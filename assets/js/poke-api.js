const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    
    pokemon.species = pokeDetail.species.url
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name)
    const [abilitie] = abilities
    pokemon.abilities = abilities
    pokemon.abilitie = abilitie

    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.attack = pokeDetail.stats[1].base_stat
    pokemon.defense = pokeDetail.stats[2].base_stat
    pokemon.spAttack = pokeDetail.stats[3].base_stat
    pokemon.spDefense = pokeDetail.stats[4].base_stat
    pokemon.speed = pokeDetail.stats[5].base_stat

    return pokemon
}

pokeApi.gePokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json()).then(convertPokeApiDetailToPokemon)
}

//busca a lista de pokemons
pokeApi.gePokemons = (offset = 0, limit = 8) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.gePokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((erro) => console.error(erro))
}

//busca apenas um pokemon
pokeApi.searchPokemon = (number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`

    return fetch(url)
        .then((response) => response.json())
        .then((convertPokeApiDetailToPokemon))
        .catch((erro) => {console.log(erro)})
}