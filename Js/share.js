const Email = document.getElementById('email1');
const Email2 = document.getElementById('email2');
const Share = document.getElementById('input-share')

var email1=false;
var email2=false;
var share=true

const validarEmail = (data) => {
    const regEXEmail = /^[a-zA-Z0-9][a-zA-Z0-9|_|\-|\.|]{1,}[^\.|_|\-]@[gmail|hotmail|yahoo]+\.com(\.ar|\.org)?$/gmi;
    const result = regEXEmail.test(data);
    return result;

}

const validarShare=()=>{
    if (document.getElementById("input-share").value.length > 0){
        share = true;
        Share.style.borderColor = "black";

    }
    else{
        share=false
        Share.style.borderColor = "Tomato";
    };
}

Share.addEventListener('change', (e) => {
    if (e.target.value.trim().length > 0){
        share = true;
        Share.style.borderColor = "black";

    }
    else{
        share=false
        Share.style.borderColor = "Tomato";
    };
})

Email.addEventListener('change', (e) => {
    if (e.target.value.trim().length > 0){
        if (validarEmail(e.target.value)== true){
            email1 = true;
            Email.style.borderColor = "black";
        }
        else{
            email1 = false;
            Email.style.borderColor = "Tomato";
        }
    }
    else{email1=false};
})

Email2.addEventListener('change', (e) => {
    if (e.target.value.trim().length > 0){
        if (validarEmail(e.target.value)== true){
            email2 = true;
            Email2.style.borderColor = "black";
        }
        else{
            email2 = false;
            Email2.style.borderColor = "Tomato";
        }
    }
    else{email2=false};
})

const setShare=(valor)=>{
    document.getElementById("input-share").value = valor;
}

const cancel=()=>{
    testEmail="";
    console.log("hola")
    window.location.replace("../index.html")
}

const send =()=>{
    validarShare();
    let datos=localStorage.getItem('datosShare');
    let mensaje=document.getElementById("mensaje").value
    let mail = document.getElementById("email2").value

    if(email1 && email2 && share){
        window.open(`mailto:${mail}?subject=PokeFiesta&body= ${datos} /n ${mensaje}`);
        localStorage.setItem('datosShare', '');

        setTimeout(window.location.replace("../index.html"), 100000);
    }
    else{
        alert("Debe completar los campos faltantes")
    }
}

$(document).ready(()=>{
    setShare(localStorage.getItem('datosShare'))
})
