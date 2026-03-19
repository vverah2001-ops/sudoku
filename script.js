// Generar un tablero base de Sudoku (solución completa)
function generarTableroBase() {
    return [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];
}

// Función para eliminar números según la dificultad
function ocultarNumeros(tablero, dificultad) {
    let vacios = dificultad === "facil" ? 30 : dificultad === "medio" ? 40 : 50;
    let nuevoTablero = JSON.parse(JSON.stringify(tablero)); // Clon del tablero

    for (let i = 0; i < vacios; i++) {
        let fila, col;
        do {
            fila = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        } while (nuevoTablero[fila][col] === 0);

        nuevoTablero[fila][col] = 0;
    }
    return nuevoTablero;
}

// Función para generar el Sudoku
function generarSudoku() {
    let dificultad = document.getElementById("nivel").value;
    let solucion = generarTableroBase();
    let sudoku = ocultarNumeros(solucion, dificultad);
    
    let board = document.getElementById("sudoku-board");
    board.innerHTML = ""; // Limpiar el tablero
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.dataset.fila = i;
            input.dataset.columna = j;
            
            if (sudoku[i][j] !== 0) {
                input.value = sudoku[i][j];
                input.disabled = true;
                input.classList.add("por-defecto");
            } else {
                input.value = "";
                input.addEventListener("input", validarEntrada);
            }
            board.appendChild(input);
        }
    }
}

// Validar que la entrada del usuario sea un número entre 1 y 9
function validarEntrada(event) {
    let valor = event.target.value;
    if (!/^[1-9]$/.test(valor)) {
        event.target.value = "";
    }
}

// Función para verificar si el Sudoku es correcto
function verificarSudoku() {
    let inputs = document.querySelectorAll("#sudoku-board input");
    let solucion = generarTableroBase();
    let correcto = true;

    inputs.forEach(input => {
        let fila = input.dataset.fila;
        let columna = input.dataset.columna;
        let valorIngresado = parseInt(input.value);
        
        if (valorIngresado !== solucion[fila][columna]) {
            input.style.color = "red";
            correcto = false;
        } else {
            input.style.color = "black";
        }
    });

    if (correcto) {
        alert("¡Felicidades! Sudoku resuelto correctamente 🎉");
    } else {
        alert("Algunos valores son incorrectos, revisa los números en rojo.");
    }
}
