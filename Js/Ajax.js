var colors = {rock:"#b8a058",normal:"#a8a090",fighting:"#a05038",flying:"#98a8f0",poison:"#b058a0",ground:"#d0b058",bug:"#a8b820",ghost:"#6060b0",steel:"#a8a8c0"
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

