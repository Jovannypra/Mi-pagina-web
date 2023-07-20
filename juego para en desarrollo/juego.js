
// Cuando la ventana se ha cargado, inicia la función
window.onload = function () {
    'use strict';

    // Obtener el elemento canvas y su contexto
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var w = document.getElementById('canvas').offsetWidth; // Ancho del canvas
    var h = document.getElementById('canvas').offsetHeight; // Alto del canvas
    var terrainImageLoaded = false,
        houseImageLoaded = false,
        pokeballImageLoaded = false,
        playerImageLoaded = false;
    var objectSizes = 20; // Tamaño de los objetos en el juego
    var speed = 100; // Velocidad de movimiento del jugador
    var modifier = 100; // Modificador para el movimiento

    var score = 0; // Puntaje del jugador

    // Cargar imágenes
    // Imagen del terreno
    var terrainImage = new Image();
    terrainImage.onload = function () {
        terrainImageLoaded = true;
        assetsLoaded();
    };
    terrainImage.src = 'https://drive.google.com/uc?id=1o9rhnAr2GIilfjxPm4Wdl1BlaVP4Gsj1';

    // Imagen de la casa
    var houseImage = new Image();
    houseImage.onload = function () {
        houseImageLoaded = true;
        assetsLoaded();
    };
    houseImage.src = 'https://drive.google.com/uc?id=1YO5Mg6IzlskREYSRcr2Ut00JZI49ivnR';

    // Sonido principal
    var mainTheme = new Audio('https://drive.google.com/uc?id=1ljrlJ1UBrH4YnIpxH02jqR_oJeLZhkDv');
    mainTheme.loop = true;
    mainTheme.volume = 0.5;
    mainTheme.play();

    // Sonido para la selección de pokeball
    var pokePick = new Audio('https://drive.google.com/uc?id=1ULOY_JeGQWJ0SOcxQfBtNQ77e20sWa31');
    pokePick.volume = 0.8;

    // Imagen del jugador
    var playerImage = new Image();
    playerImage.onload = function () {
        pokeballImageLoaded = true;
        assetsLoaded();
    };
    playerImage.src = 'https://drive.google.com/uc?id=1ZsYCAWG7uR2_nZTVsIOOUog4tXFIUsgB';

    // Imagen de la pokeball
    var pokeballImage = new Image();
    pokeballImage.onload = function () {
        playerImageLoaded = true;
        assetsLoaded();
    };
    pokeballImage.src = 'https://drive.google.com/uc?id=1XiXaiRlytnRI2ncwnBWyyef79guxI55X';

    /**
     * Este objeto contendrá los datos de la pokeball, como la posición en el eje x e y,
     * la posición del sprite y la distancia entre los ítems del sprite.
     * Además, tiene la función "generatePosition" para generar posiciones aleatorias si no hay colisiones.
     * @Object
     * @name pokeball
     */
    var pokeball = {
        x: 0,
        y: 0,
        spritePosition: 0,
        spriteItemDistance: 33,
    };
    pokeball.generatePosition = function () {
        // Generar una posición aleatoria para la pokeball
        do {
            pokeball.x = Math.floor(Math.random() * 20) + 1;
            pokeball.y = Math.floor(Math.random() * 16) + 4;
        } while (check_collision(pokeball.x, pokeball.y));

        // Obtener una posición aleatoria para el sprite de la pokeball (0-3)
        pokeball.spritePosition = Math.floor(Math.random() * 4) + 0;
    };

    /**
     * Este objeto contendrá la información del jugador, como la posición en el eje x e y,
     * su dirección actual y la dirección de cada movimiento.
     * También incluye la función "move" para mover al jugador, donde se encuentra toda la lógica de movimiento.
     * @Object
     * @name player
     */
    var player = {
        x: Math.round(w / 2 / objectSizes),
        y: Math.round(h / 2 / objectSizes),
        currentDirection: 'stand',
        direction: {
            stand: {
                x: 0,
                y: 0,
            },
            'down-1': {
                x: 17,
                y: 0,
            },
            'down-2': {
                x: 34,
                y: 0,
            },
            'up-1': {
                x: 125,
                y: 0,
            },
            'up-2': {
                x: 142,
                y: 0,
            },
            'left-1': {
                x: 69,
                y: 0,
            },
            'left-2': {
                x: 87,
                y: 0,
            },
            'right-1': {
                x: 160,
                y: 0,
            },
            'right-2': {
                x: 178,
                y: 0,
            },
        },
    };
    player.move = function (direction) {
        /**
         * Un objeto temporal para almacenar la posición actual en x e y,
         * para retroceder aquí si hay una colisión con las nuevas coordenadas.
         */
        var hold_player = {
            x: player.x,
            y: player.y,
        };

        /**
         * Decidir aquí la dirección del jugador y realizar los cambios necesarios en las direcciones.
         */
        switch (direction) {
            case 'left':
                player.x -= speed / modifier;
                if (player.currentDirection == 'stand') {
                    player.currentDirection = 'left-1';
                } else if (player.currentDirection == 'left-1') {
                    player.currentDirection = 'left-2';
                } else if (player.currentDirection == 'left-2') {
                    player.currentDirection = 'left-1';
                } else {
                    player.currentDirection = 'left-1';
                }
                break;
            case 'right':
                player.x += speed / modifier;
                if (player.currentDirection == 'stand') {
                    player.currentDirection = 'right-1';
                } else if (player.currentDirection == 'right-1') {
                    player.currentDirection = 'right-2';
                } else if (player.currentDirection == 'right-2') {
                    player.currentDirection = 'right-1';
                } else {
                    player.currentDirection = 'right-1';
                }
                break;
            case 'up':
                player.y -= speed / modifier;

                if (player.currentDirection == 'stand') {
                    player.currentDirection = 'up-1';
                } else if (player.currentDirection == 'up-1') {
                    player.currentDirection = 'up-2';
                } else if (player.currentDirection == 'up-2') {
                    player.currentDirection = 'up-1';
                } else {
                    player.currentDirection = 'up-1';
                }

                break;
            case 'down':
                player.y += speed / modifier;

                if (player.currentDirection == 'stand') {
                    player.currentDirection = 'down-1';
                } else if (player.currentDirection == 'down-1') {
                    player.currentDirection = 'down-2';
                } else if (player.currentDirection == 'down-2') {
                    player.currentDirection = 'down-1';
                } else {
                    player.currentDirection = 'down-1';
                }

                break;
        }

        /**
         * Si hay una colisión, retroceder a la posición anterior para que el jugador no se mueva y mantener la dirección.
         */
        if (check_collision(player.x, player.y)) {
            player.x = hold_player.x;
            player.y = hold_player.y;
        }

        /**
         * Si el jugador encuentra la pokeball en las mismas coordenadas,
         * generar una nueva pokeball, reproducir el sonido y actualizar el puntaje.
         */
        if (player.x == pokeball.x && player.y == pokeball.y) {
            // Se encontró una pokeball, crear una nueva
            console.log('Encontraste una pokeball de ' + pokeball.spritePosition + '! ¡Bravo! ');
            pokePick.pause();
            pokePick.currentTime = 0;
            pokePick.play();
            score += 1;
            pokeball.generatePosition();
        }

        // Actualizar el canvas con los cambios
        update();
    };

    /**
     * Función para actualizar el canvas y dibujar los objetos del juego.
     * @function
     * @name update
     */
    function update() {
        // Dibujar el terreno y la casa en el canvas
        ctx.drawImage(terrainImage, 0, 0);
        ctx.drawImage(houseImage, 80, 60);

        // Dibujar el tablero del puntaje
        board();

        // Dibujar la pokeball
        ctx.drawImage(
            pokeballImage,
            pokeball.spritePosition * pokeball.spriteItemDistance,
            0,
            objectSizes,
            objectSizes,
            pokeball.x * objectSizes,
            pokeball.y * objectSizes,
            objectSizes,
            objectSizes
        );

        // Dibujar al jugador
        ctx.drawImage(
            playerImage,
            player.direction[player.currentDirection].x,
            player.direction[player.currentDirection].y,
            objectSizes - 2,
            objectSizes,
            player.x * objectSizes,
            player.y * objectSizes,
            objectSizes,
            objectSizes
        );
    }

    /**
     * Función para verificar si hay colisión con los objetos en el juego.
     * @function
     * @name check_collision
     * @param {Integer} x - Coordenada x
     * @param {Integer} y - Coordenada y
     */
    function check_collision(x, y) {
        var foundCollision = false;

        // Verificar colisión con la casa
        if ((x > 3 && x < 9 && y == 6) || (x > 4 && x < 9 && (y == 5 || y == 4 || y == 3))) {
            // Colisión con la casa
            console.log('Colisión con la casa');
            foundCollision = true;
        }

        // Verificar colisión con los bordes y otros obstáculos
        if (
            x < 1 ||
            x > 20 ||
            y < 2 ||
            y > 20 ||
            (y > 0 && y < 4 && (x == 20 || x == 19)) || // Esquina derecha
            (y > 0 && y < 4 && (x == 2 || x == 3)) || // Esquina izquierda
            (y > 18 && (x == 2 || x == 3)) || // Esquina izquierda
            (x > 17 && (y == 19 || y == 20)) || // Esquina izquierda
            (x > 19 && (y == 17 || y == 18)) // Esquina izquierda 2
        ) {
            console.log('Perdiste en el bosque');
            foundCollision = true;
        }

        return foundCollision;
    }

    /**
     * Función para crear el tablero en la esquina inferior derecha con el puntaje.
     * @function
     * @name board
     */
    function board() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(w - 100, h - 70, 100, 70);

        ctx.font = '16px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillText('Encontraste', w - 93, h - 45);

        ctx.font = '12px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillText(score + ' pokebolas', w - 85, h - 25);
    }

    /**
     * Función para verificar si todos los recursos están cargados para comenzar a actualizar el juego.
     * @function
     * @name assetsLoaded
     */
    function assetsLoaded() {
        if (
            terrainImageLoaded == true &&
            houseImageLoaded == true &&
            pokeballImageLoaded == true &&
            playerImageLoaded == true
        ) {
            // Si todas las imágenes y sonidos están cargados, generar la posición inicial de la pokeball y comenzar el juego.
            pokeball.generatePosition();
            update();
        }
    }

    /**
     * Asignar las teclas de flecha para llamar a la función "move" del jugador.
     */
    document.onkeydown = function (e) {
        e = e || window.event;

        if (e.keyCode == '37') player.move('left');
        else if (e.keyCode == '38') player.move('up');
        else if (e.keyCode == '39') player.move('right');
        else if (e.keyCode == '40') player.move('down');
    };
};
