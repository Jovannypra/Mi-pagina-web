var programCode = function (processingInstance) {
    with (processingInstance) {
        size(400, 400); // Define el tamaño del lienzo de dibujo como 400x400 píxeles
        frameRate(30); // Define la velocidad de cuadros por segundo en 30

        line(0, 200, 400, 200); // Dibuja una línea horizontal en la mitad del lienzo
        line(200, 400, 200, 0); // Dibuja una línea vertical en la mitad del lienzo

        dibujo1(); // Llama a la función dibujo1()
        dibujo2(); // Llama a la función dibujo2()
        dibujo3(); // Llama a la función dibujo3()

        function dibujo1() {
            // Dibuja varias líneas en forma de escalera hacia arriba y hacia la izquierda
            for (var x = 195; x >= 100; x -= 5) {
                line(x, 200, 200, 0); // Línea vertical hacia arriba
                line(0, 200, 200, x); // Línea diagonal hacia la izquierda
            }
        }

        function dibujo2() {
            // Dibuja varias líneas en forma de escalera hacia abajo y hacia la derecha
            for (var x = 205; x < 300; x += 5) {
                line(200, 0, x, 200); // Línea diagonal hacia la derecha
                line(0, 200, 200, x); // Línea diagonal hacia abajo
                line(400, 200, 200, x); // Línea diagonal hacia abajo
            }

            // Dibuja líneas verticales hacia abajo
            for (var y = 100; y < 200; y += 5) {
                line(400, 200, 200, y);
            }
        }

        function dibujo3() {
            // Dibuja líneas diagonales hacia arriba y hacia abajo
            for (var x = 100; x <= 200; x += 5) {
                line(200, 400, x, 200); // Línea diagonal hacia arriba
            }

            for (var y = 295; y > 200; y -= 5) {
                line(200, 400, y, 200); // Línea diagonal hacia abajo
            }
        }
    }
};

/*  no toques esto */
var canvas = document.getElementById("CuadroDeDibujo"); // Obtiene el elemento canvas con id "CuadroDeDibujo"
var processingInstance = new Processing(canvas, programCode); // Crea una instancia de Processing y ejecuta el código programCode en el canvas

