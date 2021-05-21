var queryValue = new URL(window.location.href);
var id = queryValue.searchParams.get("id");
const  Pokemon = document.getElementById('pokemon');
const Title = document.getElementById('poke-title')
const pokeFigure = document.getElementById('pokeFigure-container')
const Description = document.getElementById('description')
const Size = document.getElementById('size')
const Abilitys = document.getElementById('abilitys')
const Types = document.getElementById('types')
const graphGroup = document.getElementById('group')
const Chain = document.getElementById('chain')
var PokeJson;
var evolutionURL;
var genera;


const createView = async()=>{
    //GetPokemon
    await getPokemonView(id)
    //Image
    let imagenP = PokeJson.sprites.other["official-artwork"].front_default
    pokeFigure.innerHTML = `<figure class="pokeFigure"><img src="${imagenP}"></figure>`
    //Title
    let nameP = PokeJson.name[0].toUpperCase() + PokeJson.name.slice(1)
    Title.innerHTML= `<h1>${nameP} <span> N° ${PokeJson.id}</span></h1>`
    //Description
    await getDescription(id);
    //Abilitys
    await getAbility(PokeJson.abilities)
    //Types
    setType(PokeJson.types)
    //Size
    setSize()
    //Stats
    setStats(PokeJson)
    //Chain
    getEvolutionChain(evolutionURL)
}

const getDescription = async(id)=>{
    let des;
    await $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
        method: "GET",
        async: true,
        success: (res) => {
            des = res.flavor_text_entries.find(x=>x.language.name == "en").flavor_text;
            evolutionURL = res.evolution_chain.url
            genera = res.genera.find(x=>x.language.name == "en").genus
        },
        error: (xhr) => {console.log(xhr)}
    });

    Description.innerHTML = `<h2>Description</h2><p>${des}</p>`
}

const getAbility = async(json)=>{
    json.map(async(x)=>{
        let Aname = x.ability.name[0].toUpperCase() + x.ability.name.slice(1);
        let Atext;

        await $.ajax({
            url:x.ability.url,
            method: "GET",
            async: true,
            success: (res) => {
                Atext = res.effect_entries.find(x=> x.language.name == "en")
                Atext = Atext.short_effect
            },
            error: (xhr) => {console.log(xhr)}
        });

        let html = document.createElement('li')
        html.innerHTML =
            `<h3 class="data-title">${Aname}</h3>
            <p>${Atext}</p>`
        Abilitys.appendChild(html);
    })
}

const setType = (json)=>{

    json.map(x=>{
        let type = x.type.name
        let html = document.createElement('li')
        html.className =  type.toUpperCase()
        html.innerHTML = `<h3>${type[0].toUpperCase() + type.slice(1)}</h3>`
        Types.appendChild(html);
    })
}

const setSize = () =>{
    Size.innerHTML = `
    <li>
        <h2 class="data-title">Weight</h2>
        <p>${parseInt(PokeJson.weight)/10} kg</p>
    </li>
    <li>
        <h2 class="data-title">Height</h2>
        <p>${parseInt(PokeJson.height)/10}  m</p>
    </li>
    <li>
        <h2 class="data-title">Category</h2>
        <p>${genera}</p>
    </li>`
}

const generateGraph =(title,data)=>{

    let generate = document.createElement('div')
    generate.className = "graph-container"
    generate.id = title;
    generate.innerHTML =
        `
<div class="graph-container">
    <div class="graphic" id="${title}-content"></div>
    <div class="graf-data">
        <p>${title}</p>
        <p>${data}</p>
    </div>
</div>
`
    graphGroup.appendChild(generate);
}

const setRotation =(stat, title)=>{
    let percentage=parseInt(
        (
            (parseInt(stat)/255)*100
        ).toFixed()
    );
    let rotation = (180 * percentage) / 100;

    let container = document.getElementById(`${title}-content`);
    container.style.transform = `rotate(${rotation}deg)`
}

const getPokemonView = async(poke)=>{
    const url =`https://pokeapi.co/api/v2/pokemon/${poke}/`;
    await $.ajax({
        url: url,
        method: "GET",
        async: true,
        success: (res) => {
            PokeJson = res;
        },
        error: (xhr) => {console.log(xhr)}
    });
}

const setStats=(json)=>{
    let stat = json.stats
    for (let x=0; x < stat.length;x++)
    {
        let name = getStatName(stat[x].stat.name)
        let base = stat[x].base_stat

        generateGraph(name,base)
        setRotation(base,name)
    }
}

const getStatName=(name)=>{

    switch(name){
        case "hp":
            return "Hp"

        case "attack":
            return "Atk"


        case "defense":
            return "Def"


        case "special-attack":
            return "S-Atk"


        case "special-defense":
            return "S-Def"


        case "speed":
            return "Spd"

    }
}

const getEvolutionChain =async(url)=>{
    let evolution;
        await $.ajax({
            url: url,
            method: "GET",
            async: true,
            success: (res) => {
                evolution=res.chain;
            },
            error: (xhr) => {console.log(xhr)}
        });

        CreateEvolutionChain(evolution)
}

const setPokeChain=(pokeId,pokeName)=>{
    let chainItem = document.createElement('li')
    pokeName=pokeName[0].toUpperCase() + pokeName.slice(1)
    chainItem.className = "chain-item"
    chainItem.innerHTML =
    `<a href="pokemon.html?id=${pokeId}" class="poke-link">
        <div>
            <figure class="poke-chain">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png"/>
            </figure>
            <h4>${pokeName}</h4>
        </div>
    </a>`

    Chain.appendChild(chainItem);

}

const setArrow=()=>{
    let chainItem = document.createElement('li')
    chainItem.className = "chain-item arrow"

    chainItem.innerHTML =
    `<div>
        <img src="./img/avance-rapido.png"/>
    </div>`

    Chain.appendChild(chainItem);
}

const getPokeId=async(url,next)=>{
    let poke;
    await $.ajax({
        url: url,
        method: "GET",
        async: true,
        success: (res) => {
            poke=res;
        },
        error: (xhr) => {console.log(xhr)}
    });

    setPokeChain(poke.id,poke.name)
    if(next){
        setArrow();
    }
}

const CreateEvolutionChain = async(json) =>{

    if(json.evolves_to.length >= 1){
        if(json.evolves_to.length > 1){
            await getPokeId(json.species.url,true)
            json.evolves_to.map(x=> CreateEvolutionChain(x))
        }
        else{
            await getPokeId(json.species.url,true)
            CreateEvolutionChain(json.evolves_to[0])
        }
    }
    else{
        getPokeId(json.species.url,false)
    }
}

const setDatoShare=()=>{
    let texto = `Ven a ver el mejor pokemon ${PokeJson.name}!! el mejor de todos Link: ${window.location.href}`
    localStorage.setItem('datosShare', texto);
    window.location.replace("share.html")
}

$(document).ready(()=>{
    if(id == undefined || parseInt(id) > 898){
        window.location.replace("index.html")
    }
    else{
        createView()
    }

})
