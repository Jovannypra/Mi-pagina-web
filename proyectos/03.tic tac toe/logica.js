// Array para almacenar el estado del juego
let board = ['', '', '', '', '', '', '', '', ''];

// Jugador actual ('X' o 'O')
let currentPlayer = 'X';

// Función para colocar una marca en el tablero
function placeMark(celda) {
    if (board[celda] === '') {
        board[celda] = currentPlayer;
        document.getElementsByClassName('cell')[celda].innerHTML = `<img src="${currentPlayer === 'X' ? '../../Img/equis.svg' : '../../Img/circulo.svg'}" alt="${currentPlayer}" class="mark-image" />`;
        if (checkWin()) {
            alert(currentPlayer + ' Ganó');
            resetBoard();
        } else if (board.every(celda => celda !== '')) {
            alert('Es un empate');
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Función para verificar si hay una combinación ganadora
function checkWin() {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]              // Diagonales
    ];

    for (let combinacion of combinacionesGanadoras) {
        if (board[combinacion[0]] !== '' &&
            board[combinacion[0]] === board[combinacion[1]] &&
            board[combinacion[0]] === board[combinacion[2]]) {
            return true;
        }
    }

    return false;
}

// Función para reiniciar el tablero
function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    let celdas = document.getElementsByClassName('cell');
    for (let celda of celdas) {
        celda.innerHTML = '';
    }

    // Recargar la página
    location.reload();
}

// Función para manejar el redimensionamiento de la ventana
function handleWindowResize() {
    const imagenesMarca = document.getElementsByClassName('mark-image');
    for (let imagen of imagenesMarca) {
        if (window.innerWidth <= 320) {
            imagen.style.maxWidth = '60%';
            imagen.style.maxHeight = '60%';
        } else if (window.innerWidth <= 768) {
            imagen.style.maxWidth = '80%';
            imagen.style.maxHeight = '80%';
        } else {
            imagen.style.maxWidth = '100%';
            imagen.style.maxHeight = '100%';
        }
    }
}

// Agregar el event listener para el redimensionamiento de la ventana ('resize')
window.addEventListener('resize', handleWindowResize);

// Llamar a handleWindowResize inicialmente
handleWindowResize();

// Mensaje indicando que el programa fue creado por Jovanny Prado
console.log('Este programa fue creado por Jovanny Prado.');


/*! Js para el boton */

var animateButton = function (e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');

    e.target.classList.add('animate');
    setTimeout(function () {
        e.target.classList.remove('animate');
    }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}