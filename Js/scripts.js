console.log("hola")
window.onload = () => {
    const boton = document.getElementById('icono-desp');
    boton.addEventListener('click', ()=>{
        console.log("presionaste el boton")
        const ul = document.getElementById('elemento');
        ul.classList.toggle('show');
    })

}
