const pokeContainer = document.querySelector("#poke-container");

const pokeCount = 152;
const pokeOffset = 0;

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const getPokemons = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokeCount}&offset=${pokeOffset}`;
  const res = await fetch(url);
  const data = await res.json();

  for (let pokemon of data.results) {
    await getPokemonDetails(pokemon.url);
  }
};

const getPokemonDetails = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  createPokemon(data);
};

const createPokemon = (pokemon) => {
  const div = document.createElement("div");
  div.classList.add("pokemon");

  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const pokemonType =
    pokemon.types[0].type.name.charAt(0).toUpperCase() +
    pokemon.types[0].type.name.slice(1);
  const pokemonTypeSecond = pokemon.types[0].type.name;
  const pokemonWeight = (pokemon.weight / 10).toFixed(1);
  const pokemonImage = pokemon.sprites.other["official-artwork"].front_default;

  const color = colors[pokemonTypeSecond] || colors.normal;
  div.style.backgroundColor = color;

  const pokeInnerHTML = `
    <div class="img-container">
      <img
        src="${pokemonImage}"
        alt="${pokemonName}"
      />
    </div>
    <div class="info">
      <span class="number">#${pokemonId}</span>
      <h3 class="name">${pokemonName}</h3>
      <h3 class="type">${pokemonWeight} Kg</h3>
      <small class="type">Type: <span>${pokemonType}</span></small>
    </div>
  `;

  div.innerHTML = pokeInnerHTML;
  pokeContainer.appendChild(div);
};

getPokemons();
