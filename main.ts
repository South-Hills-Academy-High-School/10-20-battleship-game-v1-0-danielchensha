namespace SpriteKind {
    export const Cursor = SpriteKind.create()
    export const Boat0 = SpriteKind.create()
    export const Boat1 = SpriteKind.create()
    export const Boat2 = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    rotateFlag = "nothing"
    grid.move(cursor, 0, -1)
    grid.place(shadowCursor, tiles.getTileLocation(grid.spriteCol(cursor), grid.spriteRow(cursor) + 1))
})
function updatePX (whichPlayer: string) {
    if (moveBoatFlag == 1) {
        if (whichPlayer == "Player1") {
            moveBoat(boatSpriteArrayP1[currentBoat], boatRotateArrayP1)
            if (isOverlapping(boatSpriteArrayP1)) {
                if (rotateFlag != "nothing") {
                    boatRotateArrayP1[currentBoat] = rotateFlag
                } else {
                    grid.place(cursor, grid.getLocation(shadowCursor))
                }
            }
        } else {
            moveBoat(boatSpriteArrayP2[currentBoat], boatRotateArrayP1)
            if (isOverlapping(boatSpriteArrayP2)) {
                if (rotateFlag != "nothing") {
                    boatRotateArrayP2[currentBoat] = rotateFlag
                } else {
                    grid.place(cursor, grid.getLocation(shadowCursor))
                }
            }
        }
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentPlayer == "Player1") {
        rotateFlag = boatRotateArrayP1[currentBoat]
        turnBoat(currentBoat, boatRotateArrayP1)
    }
    if (currentPlayer == "Player2") {
        rotateFlag = boatRotateArrayP1[currentBoat]
        turnBoat(currentBoat, boatRotateArrayP1)
    }
})
function makeBoatVisible (boatArray: Sprite[]) {
    for (let previousBoatSprite of boatArray) {
        previousBoatSprite.setFlag(SpriteFlag.Invisible, false)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    currentBoat += 1
    grid.place(cursor, tiles.getTileLocation(0, 0))
    if (currentBoat == 3) {
        currentBoat = 0
        switchPlayer()
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    rotateFlag = "nothing"
    grid.move(cursor, -1, 0)
    grid.place(shadowCursor, tiles.getTileLocation(grid.spriteCol(cursor) + 1, grid.spriteRow(cursor)))
})
function switchPlayer () {
    if (currentPlayer == "Player1") {
        currentPlayer = "Player2"
        for (let value of boatSpriteArrayP1) {
            makeBoatInvisible(value)
        }
    } else {
        currentPlayer = "Player1"
        for (let value of boatSpriteArrayP2) {
            makeBoatInvisible(value)
        }
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    rotateFlag = "nothing"
    grid.move(cursor, 1, 0)
    grid.place(shadowCursor, tiles.getTileLocation(grid.spriteCol(cursor) + -1, grid.spriteRow(cursor)))
})
/**
 * moveBoat needs changes to take in the boatRotateArrayP1 or boatRotateArrayP2
 */
function moveBoat (boatArray: any[], boatRotateArray: string[]) {
    makeBoatVisible(boatArray)
    if (grid.spriteRow(cursor) >= 8 - boatArray.length && boatRotateArray[currentBoat] == "up") {
        if (rotateFlag != "nothing") {
            boatRotateArray[currentBoat] = rotateFlag
        } else {
            grid.move(cursor, 0, -1)
        }
    }
    if (grid.spriteCol(cursor) >= 11 - boatArray.length && boatRotateArrayP1[currentBoat] == "sideways") {
        if (rotateFlag != "nothing") {
            boatRotateArray[currentBoat] = rotateFlag
        } else {
            grid.move(cursor, -1, 0)
        }
    }
    cursor.setFlag(SpriteFlag.Invisible, true)
    iterator = 0
    for (let currentBoatSprite of boatArray) {
        if (boatRotateArray[currentBoat] == "up") {
            grid.place(currentBoatSprite, tiles.getTileLocation(grid.spriteCol(cursor), grid.spriteRow(cursor) + iterator))
        } else {
            grid.place(currentBoatSprite, tiles.getTileLocation(grid.spriteCol(cursor) + iterator, grid.spriteRow(cursor)))
        }
        iterator += 1
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    rotateFlag = "nothing"
    grid.move(cursor, 0, 1)
    grid.place(shadowCursor, tiles.getTileLocation(grid.spriteCol(cursor), grid.spriteRow(cursor) + -1))
})
function initP2 () {
    boatSpriteArrayP2 = [[sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 2 2 2 2 f f f 2 2 2 2 f f 
        . f 2 2 2 2 2 2 f 2 2 1 1 1 2 f 
        . f 2 2 2 2 2 2 2 2 2 2 1 1 2 f 
        . f 2 2 2 2 2 2 2 2 2 2 2 1 2 f 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 2 f 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 2 f 
        . f f 2 2 2 2 2 2 2 2 2 2 2 f f 
        . . f f 2 2 2 2 2 2 2 2 2 f f . 
        . . . f f 2 2 2 2 2 2 2 f f . . 
        . . . . f f 2 2 2 2 2 f f . . . 
        . . . . . f f 2 2 2 f f . . . . 
        . . . . . . f f 2 f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat0), sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 5 5 5 5 f f f 5 5 5 5 f f 
        . f 5 5 5 5 5 5 f 5 5 5 5 5 5 f 
        . f 5 5 5 5 5 5 5 5 1 1 1 5 5 f 
        . f 5 5 5 5 5 5 5 5 5 5 1 5 5 f 
        . f 5 5 5 5 5 5 5 5 5 5 1 5 5 f 
        . f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
        . f f 5 5 5 5 5 5 5 5 5 5 5 f f 
        . . f f 5 5 5 5 5 5 5 5 5 f f . 
        . . . f f 5 5 5 5 5 5 5 f f . . 
        . . . . f f 5 5 5 5 5 f f . . . 
        . . . . . f f 5 5 5 f f . . . . 
        . . . . . . f f 5 f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat0)], [sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f a a a a f f f a a a a f f 
        . f a a a a a a f a a a a a a f 
        . f a a a a a a a a 1 1 1 a a f 
        . f a a a a a a a a 1 1 1 a a f 
        . f a a a a a a a a 1 1 1 a a f 
        . f a a a a a a a a a a a a a f 
        . f f a a a a a a a a a a a f f 
        . . f f a a a a a a a a a f f . 
        . . . f f a a a a a a a f f . . 
        . . . . f f a a a a a f f . . . 
        . . . . . f f a a a f f . . . . 
        . . . . . . f f a f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat1), sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 4 4 4 4 f f f 4 4 4 4 f f 
        . f 4 4 4 4 4 4 f 4 4 4 4 4 4 f 
        . f 4 4 4 4 4 4 4 4 1 1 1 4 4 f 
        . f 4 4 4 4 4 4 4 4 1 1 1 4 4 f 
        . f 4 4 4 4 4 4 4 4 1 1 1 4 4 f 
        . f 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . . f f 4 4 4 4 4 4 4 4 4 f f . 
        . . . f f 4 4 4 4 4 4 4 f f . . 
        . . . . f f 4 4 4 4 4 f f . . . 
        . . . . . f f 4 4 4 f f . . . . 
        . . . . . . f f 4 f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat1), sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . 2 2 2 2 2 2 . 2 2 2 2 2 2 . 
        . 2 2 f f f f 2 2 2 f f f f 2 2 
        . 2 f f f f f f 2 f f f f f f 2 
        . 2 f f f f f f f f 1 1 1 f f 2 
        . 2 f f f f f f f f 1 1 1 f f 2 
        . 2 f f f f f f f f 1 1 1 f f 2 
        . 2 f f f f f f f f f f f f f 2 
        . 2 2 f f f f f f f f f f f 2 2 
        . . 2 2 f f f f f f f f f 2 2 . 
        . . . 2 2 f f f f f f f 2 2 . . 
        . . . . 2 2 f f f f f 2 2 . . . 
        . . . . . 2 2 f f f 2 2 . . . . 
        . . . . . . 2 2 f 2 2 . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat1)], [
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 9 9 9 9 f f f 9 9 9 9 f f 
        . f 9 9 9 9 9 9 f 9 9 9 9 9 9 f 
        . f 9 9 9 9 9 9 9 9 1 1 1 9 9 f 
        . f 9 9 9 9 9 9 9 9 1 1 1 9 9 f 
        . f 9 9 9 9 9 9 9 9 1 1 1 9 9 f 
        . f 9 9 9 9 9 9 9 9 9 9 9 9 9 f 
        . f f 9 9 9 9 9 9 9 9 9 9 9 f f 
        . . f f 9 9 9 9 9 9 9 9 9 f f . 
        . . . f f 9 9 9 9 9 9 9 f f . . 
        . . . . f f 9 9 9 9 9 f f . . . 
        . . . . . f f 9 9 9 f f . . . . 
        . . . . . . f f 9 f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat2),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f e e e e f f f e e e e f f 
        . f e e e e e e f e e e e e e f 
        . f e e e e e e e e 1 1 1 e e f 
        . f e e e e e e e e 1 1 1 e e f 
        . f e e e e e e e e 1 1 1 e e f 
        . f e e e e e e e e e e e e e f 
        . f f e e e e e e e e e e e f f 
        . . f f e e e e e e e e e f f . 
        . . . f f e e e e e e e f f . . 
        . . . . f f e e e e e f f . . . 
        . . . . . f f e e e f f . . . . 
        . . . . . . f f e f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat2),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 8 8 8 8 f f f 8 8 8 8 f f 
        . f 8 8 8 8 8 8 f 8 8 8 8 8 8 f 
        . f 8 8 8 8 8 8 8 8 1 1 1 8 8 f 
        . f 8 8 8 8 8 8 8 8 1 1 1 8 8 f 
        . f 8 8 8 8 8 8 8 8 1 1 1 8 8 f 
        . f 8 8 8 8 8 8 8 8 8 8 8 8 8 f 
        . f f 8 8 8 8 8 8 8 8 8 8 8 f f 
        . . f f 8 8 8 8 8 8 8 8 8 f f . 
        . . . f f 8 8 8 8 8 8 8 f f . . 
        . . . . f f 8 8 8 8 8 f f . . . 
        . . . . . f f 8 8 8 f f . . . . 
        . . . . . . f f 8 f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat2),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f c c c c f f f c c c c f f 
        . f c c c c c c f c c c c c c f 
        . f c c c c c c c c 1 1 1 c c f 
        . f c c c c c c c c 1 1 1 c c f 
        . f c c c c c c c c 1 1 1 c c f 
        . f c c c c c c c c c c c c c f 
        . f f c c c c c c c c c c c f f 
        . . f f c c c c c c c c c f f . 
        . . . f f c c c c c c c f f . . 
        . . . . f f c c c c c f f . . . 
        . . . . . f f c c c f f . . . . 
        . . . . . . f f c f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat2)
    ]]
    boatRotateArrayP2 = ["up", "up", "up"]
    for (let value4 of boatSpriteArrayP2) {
        makeBoatInvisible(value4)
    }
}
function makeBoatInvisible (boatArray: Sprite[]) {
    for (let value3 of boatArray) {
        value3.setFlag(SpriteFlag.Invisible, true)
    }
}
function turnBoat (boatNum: number, boatRotateArray: string[]) {
    if (boatRotateArray[boatNum] == "up") {
        boatRotateArray[boatNum] = "sideways"
    } else {
        boatRotateArray[boatNum] = "up"
    }
}
function isOverlapping (boatSpriteArrayPX: Sprite[][]) {
    for (let index = 0; index <= currentBoat - 1; index++) {
        for (let previousBoatSprite2 of boatSpriteArrayPX[index]) {
            for (let currentBoatSprite2 of boatSpriteArrayPX[currentBoat]) {
                if (grid.spriteCol(previousBoatSprite2) == grid.spriteCol(currentBoatSprite2) && grid.spriteRow(previousBoatSprite2) == grid.spriteRow(currentBoatSprite2)) {
                    return 1
                }
            }
        }
    }
    return 0
}
let iterator = 0
let boatRotateArrayP2: string[] = []
let boatSpriteArrayP2: Sprite[][] = []
let shadowCursor: Sprite = null
let cursor: Sprite = null
let moveBoatFlag = 0
let boatSpriteArrayP1: Sprite[][] = []
let boatRotateArrayP1: string[] = []
let currentBoat = 0
let rotateFlag = ""
let currentPlayer = ""
currentPlayer = "Player1"
tiles.setCurrentTilemap(tilemap`level1`)
initP2()
rotateFlag = "nothing"
currentBoat = 0
boatRotateArrayP1 = ["up", "up", "up"]
boatSpriteArrayP1 = [[sprites.create(img`
    . . . . . b b b b b b . . . . . 
    . . . b b 9 9 9 9 9 9 b b . . . 
    . . b b 9 9 9 9 9 9 9 9 b b . . 
    . b b 9 d 9 9 9 9 9 9 9 9 b b . 
    . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
    b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
    b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
    b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
    b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
    . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
    . b d 5 3 3 3 3 3 3 3 d 5 b b . 
    . . b d 5 d 3 3 3 3 5 5 b b . . 
    . . . b b 5 5 5 5 5 5 b b . . . 
    . . . . . b b b b b b . . . . . 
    `, SpriteKind.Boat0), sprites.create(img`
    . . . . . b b b b b b . . . . . 
    . . . b b 9 9 9 9 9 9 b b . . . 
    . . b b 9 9 9 9 9 9 9 9 b b . . 
    . b b 9 d 9 9 9 9 9 9 9 9 b b . 
    . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
    b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
    b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
    b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
    b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
    . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
    . b d 5 3 3 3 3 3 3 3 d 5 b b . 
    . . b d 5 d 3 3 3 3 5 5 b b . . 
    . . . b b 5 5 5 5 5 5 b b . . . 
    . . . . . b b b b b b . . . . . 
    `, SpriteKind.Boat0)], [sprites.create(img`
    . . . . . b b b b b b . . . . . 
    . . . b b 9 9 9 9 9 9 b b . . . 
    . . b b 9 9 9 9 9 9 9 9 b b . . 
    . b b 9 d 9 9 9 9 9 9 9 9 b b . 
    . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
    b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
    b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
    b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
    b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
    . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
    . b d 5 3 3 3 3 3 3 3 d 5 b b . 
    . . b d 5 d 3 3 3 3 5 5 b b . . 
    . . . b b 5 5 5 5 5 5 b b . . . 
    . . . . . b b b b b b . . . . . 
    `, SpriteKind.Boat1), sprites.create(img`
    . . . . . b b b b b b . . . . . 
    . . . b b 9 9 9 9 9 9 b b . . . 
    . . b b 9 9 9 9 9 9 9 9 b b . . 
    . b b 9 d 9 9 9 9 9 9 9 9 b b . 
    . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
    b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
    b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
    b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
    b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
    . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
    . b d 5 3 3 3 3 3 3 3 d 5 b b . 
    . . b d 5 d 3 3 3 3 5 5 b b . . 
    . . . b b 5 5 5 5 5 5 b b . . . 
    . . . . . b b b b b b . . . . . 
    `, SpriteKind.Boat1), sprites.create(img`
    . . . . . b b b b b b . . . . . 
    . . . b b 9 9 9 9 9 9 b b . . . 
    . . b b 9 9 9 9 9 9 9 9 b b . . 
    . b b 9 d 9 9 9 9 9 9 9 9 b b . 
    . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
    b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
    b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
    b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
    b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
    . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
    . b d 5 3 3 3 3 3 3 3 d 5 b b . 
    . . b d 5 d 3 3 3 3 5 5 b b . . 
    . . . b b 5 5 5 5 5 5 b b . . . 
    . . . . . b b b b b b . . . . . 
    `, SpriteKind.Boat1)], [
sprites.create(img`
    . . . . . b b b b b b . . . . . 
    . . . b b 9 9 9 9 9 9 b b . . . 
    . . b b 9 9 9 9 9 9 9 9 b b . . 
    . b b 9 d 9 9 9 9 9 9 9 9 b b . 
    . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
    b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
    b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
    b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
    b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
    . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
    . b d 5 3 3 3 3 3 3 3 d 5 b b . 
    . . b d 5 d 3 3 3 3 5 5 b b . . 
    . . . b b 5 5 5 5 5 5 b b . . . 
    . . . . . b b b b b b . . . . . 
    `, SpriteKind.Boat2),
sprites.create(img`
    . . . . . b b b b b b . . . . . 
    . . . b b 9 9 9 9 9 9 b b . . . 
    . . b b 9 9 9 9 9 9 9 9 b b . . 
    . b b 9 d 9 9 9 9 9 9 9 9 b b . 
    . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
    b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
    b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
    b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
    b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
    . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
    . b d 5 3 3 3 3 3 3 3 d 5 b b . 
    . . b d 5 d 3 3 3 3 5 5 b b . . 
    . . . b b 5 5 5 5 5 5 b b . . . 
    . . . . . b b b b b b . . . . . 
    `, SpriteKind.Boat2),
sprites.create(img`
    . . . . . b b b b b b . . . . . 
    . . . b b 9 9 9 9 9 9 b b . . . 
    . . b b 9 9 9 9 9 9 9 9 b b . . 
    . b b 9 d 9 9 9 9 9 9 9 9 b b . 
    . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
    b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
    b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
    b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
    b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
    . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
    . b d 5 3 3 3 3 3 3 3 d 5 b b . 
    . . b d 5 d 3 3 3 3 5 5 b b . . 
    . . . b b 5 5 5 5 5 5 b b . . . 
    . . . . . b b b b b b . . . . . 
    `, SpriteKind.Boat2),
sprites.create(img`
    . . . . . b b b b b b . . . . . 
    . . . b b 9 9 9 9 9 9 b b . . . 
    . . b b 9 9 9 9 9 9 9 9 b b . . 
    . b b 9 d 9 9 9 9 9 9 9 9 b b . 
    . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
    b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
    b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
    b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
    b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
    . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
    . b d 5 3 3 3 3 3 3 3 d 5 b b . 
    . . b d 5 d 3 3 3 3 5 5 b b . . 
    . . . b b 5 5 5 5 5 5 b b . . . 
    . . . . . b b b b b b . . . . . 
    `, SpriteKind.Boat2)
]]
for (let value42 of boatSpriteArrayP1) {
    makeBoatInvisible(value42)
}
moveBoatFlag = 1
cursor = sprites.create(img`
    3 3 3 3 3 . . . . . . 3 3 3 3 3 
    3 . . . . . . . . . . . . . . 3 
    3 . . . . . . . . . . . . . . 3 
    3 . . . . . . . . . . . . . . 3 
    3 . . . . . . . . . . . . . . 3 
    3 . . . . . . . . . . . . . . 3 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    3 . . . . . . . . . . . . . . 3 
    3 . . . . . . . . . . . . . . 3 
    3 . . . . . . . . . . . . . . 3 
    3 . . . . . . . . . . . . . . 3 
    3 . . . . . . . . . . . . . . 3 
    3 3 3 3 3 . . . . . . 3 3 3 3 3 
    `, SpriteKind.Cursor)
shadowCursor = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Cursor)
grid.snap(cursor)
grid.snap(shadowCursor)
game.onUpdate(function () {
    updatePX(currentPlayer)
})
