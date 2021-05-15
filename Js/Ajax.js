colors = {rock:"#b8a058",normal:"#a8a090",fighting:"#a05038",flying:"#98a8f0",poison:"#b058a0",ground:"#d0b058",bug:"#a8b820",ghost:"#6060b0",steel:"#a8a8c0"
,fire:"#f05030",water:"#3b8fe3",grass:"#78c850",electric:"#f8bf30",psychic:"#f870a0",ice:"#58c7e0",dragon:"#7760e0",dark:"#705848",fairy:"#e794e7"}


const  PokemonList = document.getElementById('poke');
var openM = true;

const openMenu=()=>{
        if(openM){
            document.getElementById('mobile-menu').classList.add('active');
            openM = !openM;
        }
        else{
            document.getElementById('mobile-menu').classList.remove('active');
            openM = !openM;
        }

}

const createPokemon = async()=>{
    for(let x=1; x <= 151; x++){
        await getPokemon(x)

    }
}

const getPokemon = async id=>{
    const url =`https://pokeapi.co/api/v2/pokemon/${id}/`;
    var data;
    await $.ajax({
        url: url,
        method: "GET",
        async: true,
        success: (res) => {
            data=res;
        },
        error: (xhr) => {console.log(xhr)}
    });

    createItem(data);
}

const createItem = (pokemon)=>{

    let name=pokemon.forms[0].name;
    name=name[0].toUpperCase() + name.slice(1);
    let img =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    const Element = document.createElement("li");
    Element.classList.add("Poke-card")
    const html=`<figure><img src=${img} alt="" class="poke-img"/></figure> <p class="Poke-name">${name}</p>`

    Element.innerHTML = html;
    PokemonList.appendChild(Element)


 


}

// createPokemon()

