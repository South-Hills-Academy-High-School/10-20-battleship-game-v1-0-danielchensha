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
            moveBoat(boatSpriteArrayP1[currentBoat])
            if (isOverlapping(boatSpriteArrayP1)) {
                if (rotateFlag != "nothing") {
                    boatRotateArrayP1[currentBoat] = rotateFlag
                } else {
                    grid.place(cursor, grid.getLocation(shadowCursor))
                }
            }
        } else {
            moveBoat(boatSpriteArrayP2[currentBoat])
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
    rotateFlag = boatRotateArrayP1[currentBoat]
    turnBoat(currentBoat)
})
function makeBoatVisible (boatArray: Sprite[]) {
    for (let previousBoatSprite of boatArray) {
        previousBoatSprite.setFlag(SpriteFlag.Invisible, false)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    currentBoat += 1
    grid.place(cursor, tiles.getTileLocation(0, 0))
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    rotateFlag = "nothing"
    grid.move(cursor, -1, 0)
    grid.place(shadowCursor, tiles.getTileLocation(grid.spriteCol(cursor) + 1, grid.spriteRow(cursor)))
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    rotateFlag = "nothing"
    grid.move(cursor, 1, 0)
    grid.place(shadowCursor, tiles.getTileLocation(grid.spriteCol(cursor) + -1, grid.spriteRow(cursor)))
})
/**
 * moveBoat needs changes to take in the boatRotateArrayP1 or boatRotateArrayP2
 */
function moveBoat (boatArray: any[]) {
    makeBoatVisible(boatArray)
    if (grid.spriteRow(cursor) >= 8 - boatArray.length && boatRotateArrayP1[currentBoat] == "up") {
        if (rotateFlag != "nothing") {
            boatRotateArrayP1[currentBoat] = rotateFlag
        } else {
            grid.move(cursor, 0, -1)
        }
    }
    if (grid.spriteCol(cursor) >= 11 - boatArray.length && boatRotateArrayP1[currentBoat] == "sideways") {
        if (rotateFlag != "nothing") {
            boatRotateArrayP1[currentBoat] = rotateFlag
        } else {
            grid.move(cursor, -1, 0)
        }
    }
    cursor.setFlag(SpriteFlag.Invisible, true)
    iterator = 0
    for (let currentBoatSprite of boatArray) {
        if (boatRotateArrayP1[currentBoat] == "up") {
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
        . f f 3 3 3 3 f f f 3 3 3 3 f f 
        . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 b b b 1 1 1 3 3 f 
        . f 3 3 3 3 b b b b b 3 3 3 3 f 
        . f f 3 3 b b b b b b b 3 3 f f 
        . . f f 3 b b b b b b b 3 f f . 
        . . . f f b b b b b b b f f . . 
        . . . . f f b b b b b f f . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat0), sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 3 3 3 3 f f f 3 3 3 3 f f 
        . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 b b b 1 1 1 3 3 f 
        . f 3 3 3 3 b b b b b 3 3 3 3 f 
        . f f 3 3 b b b b b b b 3 3 f f 
        . . f f 3 b b b b b b b 3 f f . 
        . . . f f b b b b b b b f f . . 
        . . . . f f b b b b b f f . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat0)], [sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 3 3 3 3 f f f 3 3 3 3 f f 
        . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 b b b 1 1 1 3 3 f 
        . f 3 3 3 3 b b b b b 3 3 3 3 f 
        . f f 3 3 b b b b b b b 3 3 f f 
        . . f f 3 b b b b b b b 3 f f . 
        . . . f f b b b b b b b f f . . 
        . . . . f f b b b b b f f . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat1), sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 3 3 3 3 f f f 3 3 3 3 f f 
        . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 b b b 1 1 1 3 3 f 
        . f 3 3 3 3 b b b b b 3 3 3 3 f 
        . f f 3 3 b b b b b b b 3 3 f f 
        . . f f 3 b b b b b b b 3 f f . 
        . . . f f b b b b b b b f f . . 
        . . . . f f b b b b b f f . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat1), sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 3 3 3 3 f f f 3 3 3 3 f f 
        . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 b b b 1 1 1 3 3 f 
        . f 3 3 3 3 b b b b b 3 3 3 3 f 
        . f f 3 3 b b b b b b b 3 3 f f 
        . . f f 3 b b b b b b b 3 f f . 
        . . . f f b b b b b b b f f . . 
        . . . . f f b b b b b f f . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat1)], [
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 3 3 3 3 f f f 3 3 3 3 f f 
        . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 b b b 1 1 1 3 3 f 
        . f 3 3 3 3 b b b b b 3 3 3 3 f 
        . f f 3 3 b b b b b b b 3 3 f f 
        . . f f 3 b b b b b b b 3 f f . 
        . . . f f b b b b b b b f f . . 
        . . . . f f b b b b b f f . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat2),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 3 3 3 3 f f f 3 3 3 3 f f 
        . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 b b b 1 1 1 3 3 f 
        . f 3 3 3 3 b b b b b 3 3 3 3 f 
        . f f 3 3 b b b b b b b 3 3 f f 
        . . f f 3 b b b b b b b 3 f f . 
        . . . f f b b b b b b b f f . . 
        . . . . f f b b b b b f f . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat2),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 3 3 3 3 f f f 3 3 3 3 f f 
        . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 b b b 1 1 1 3 3 f 
        . f 3 3 3 3 b b b b b 3 3 3 3 f 
        . f f 3 3 b b b b b b b 3 3 f f 
        . . f f 3 b b b b b b b 3 f f . 
        . . . f f b b b b b b b f f . . 
        . . . . f f b b b b b f f . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boat2),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f . f f f f f f . 
        . f f 3 3 3 3 f f f 3 3 3 3 f f 
        . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
        . f 3 3 3 3 3 b b b 1 1 1 3 3 f 
        . f 3 3 3 3 b b b b b 3 3 3 3 f 
        . f f 3 3 b b b b b b b 3 3 f f 
        . . f f 3 b b b b b b b 3 f f . 
        . . . f f b b b b b b b f f . . 
        . . . . f f b b b b b f f . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
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
function turnBoat (boatNum: number) {
    if (boatRotateArrayP1[boatNum] == "up") {
        boatRotateArrayP1[boatNum] = "sideways"
    } else {
        boatRotateArrayP1[boatNum] = "up"
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
    updatePX("Player2")
})
