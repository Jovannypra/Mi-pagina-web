const temaOscuro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
    document.getElementById("dl-icon").src = "./Img/Oscuro-gif.gif";
};

const temaClaro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
    document.getElementById("dl-icon").src = "./Img/Claro-gif.gif";
};

const cambiar = () => {
    const temaActual = document.querySelector("body").getAttribute("data-bs-theme");
    if (temaActual === "dark") {
        temaClaro();
    } else {
        temaOscuro();
    }
};



let i = 1;

document.addEventListener("DOMContentLoaded", () => {
    temaOscuro();
    // Llama a la función changeImage1 cada 1 segundo
});

function changeImage1() {
    const image = document.querySelector("#myImage");

    if (i === 1) {
        image.src = "./Img/SepaBlanco.gif";
        i = 2;
    } else {
        image.src = "./Img/SepaNegro.gif";
        i = 1;
    }
}




