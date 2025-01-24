// Animación del dado
function rollDiceAnimation () {
    for (let index = 0; index < 3; index++) {
        basic.showLeds(`
            . . # . .
            . . . . .
            . . # . .
            . . . . .
            . . # . .
            `)
        basic.pause(100)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # . # .
            . . . . .
            `)
        basic.pause(100)
        basic.showLeds(`
            # . . . #
            . . . . .
            . . # . .
            . . . . .
            # . . . #
            `)
        basic.pause(100)
    }
}
// Animación para serpientes
function showSnake () {
    music.playTone(330, 200)
    basic.showLeds(`
        . . # # .
        . # . . .
        . . # . .
        . . . # .
        . # # # .
        `)
    basic.pause(500)
}
// Animación para escaleras
function showLadder () {
    music.playTone(262, 200)
    basic.showLeds(`
        # . . . #
        # # # # #
        # . . . #
        # # # # #
        # . . . #
        `)
    basic.pause(500)
}
// Turno del jugador 1 (Botón A)
input.onButtonPressed(Button.A, function () {
    if (currentPlayer == 1) {
        rollDiceAnimation()
        // Lanza el dado (1-6)
        dado = Math.randomRange(1, 6)
        // Muestra el número del dado
        basic.showNumber(dado)
        music.playTone(262, music.beat(BeatFraction.Half))
        // Avanza el jugador 1
        player1Position += dado
        if (player1Position > 24) {
            // No puede pasar de la meta
            player1Position = 24
        }
        if (board[player1Position] > player1Position) {
            // Subir por una escalera
            showLadder()
        } else if (board[player1Position] < player1Position) {
            // Bajar por una serpiente
            showSnake()
        }
        // Aplica escaleras o serpientes
        player1Position = board[player1Position]
        // Muestra las posiciones
        showPositions()
        if (player1Position == 24) {
            music.playMelody("C5 B A G F E D C ", 120)
            basic.showString("P1 WINS!")
            return
        }
        // Cambia el turno al jugador 2
        currentPlayer = 2
    }
})
// Mostrar las posiciones de ambos jugadores
function showPositions () {
    basic.clearScreen()
    x1 = player1Position % 5
    y1 = Math.floor(player1Position / 5)
    // Jugador 1 (brillo medio)
    led.plotBrightness(x1, y1, 150)
    x2 = player2Position % 5
    y2 = Math.floor(player2Position / 5)
    // Jugador 2 (brillo máximo)
    led.plotBrightness(x2, y2, 255)
}
// Turno del jugador 2 (Botón B)
input.onButtonPressed(Button.B, function () {
    if (currentPlayer == 2) {
        rollDiceAnimation()
        // Lanza el dado (1-6)
        dado2 = Math.randomRange(1, 6)
        // Muestra el número del dado
        basic.showNumber(dado2)
        music.playTone(262, music.beat(BeatFraction.Half))
        // Avanza el jugador 2
        player2Position += dado2
        if (player2Position > 24) {
            // No puede pasar de la meta
            player2Position = 24
        }
        if (board[player2Position] > player2Position) {
            // Subir por una escalera
            showLadder()
        } else if (board[player2Position] < player2Position) {
            // Bajar por una serpiente
            showSnake()
        }
        // Aplica escaleras o serpientes
        player2Position = board[player2Position]
        // Muestra las posiciones
        showPositions()
        if (player2Position == 24) {
            music.playMelody("C5 B A G F E D C ", 120)
            basic.showString("P2 WINS!")
            return
        }
        // Cambia el turno al jugador 1
        currentPlayer = 1
    }
})
// Reiniciar el juego
input.onGesture(Gesture.Shake, function () {
    player1Position = 0
    player2Position = 0
    currentPlayer = 1
    showPositions()
    music.playMelody("C D E F G A B C5 ", 120)
    basic.showString("RESET")
})
let dado2 = 0
let y2 = 0
let player2Position = 0
let x2 = 0
let y1 = 0
let x1 = 0
let player1Position = 0
let dado = 0
let board: number[] = []
let currentPlayer = 0
let diceRoll = 0
// Indica qué jugador tiene el turno
currentPlayer = 1
// Configuración del tablero con escaleras y serpientes (con 25 casillas)
board = [
0,
1,
2,
3,
4,
5,
6,
7,
8,
9,
10,
11,
12,
13,
14,
15,
16,
17,
18,
19,
20,
21,
22,
23,
24
]
// Definir las serpientes y escaleras (por ejemplo, si caes en una casilla con una serpiente o escalera)
// Escalera de 4 a 10
// Definir las serpientes y escaleras (por ejemplo, si caes en una casilla con una serpiente o escalera)
// Escalera de 4 a 10
board[4] = 10
// Serpiente de 9 a 2
// Serpiente de 9 a 2
board[9] = 2
// Escalera de 16 a 20
// Escalera de 16 a 20
board[16] = 20
// Serpiente de 18 a 5
// Serpiente de 18 a 5
board[18] = 5
// Escalera de 21 a 17
// Escalera de 21 a 17
board[21] = 17
// Serpiente de 24 a 0 (puede ser cambiado según preferencias)
// Serpiente de 24 a 0 (puede ser cambiado según preferencias)
board[24] = 0
// Mostrar las posiciones iniciales
showPositions()
