console.log("hola")
window.onload = () => {
    const boton = document.getElementById('icono-desp');
    boton.addEventListener('click', ()=>{
        const ul = document.getElementById('elemento');
        ul.classList.toggle('show');
    })

}
