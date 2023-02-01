export interface Coordinate {
    x: number
    y: number
}

export interface BoundingBox {
    width: number
    height: number
}

export interface Drawable {
    draw(): void
}

export interface Shape extends Drawable {
    x(): number
    y(): number
    height(): number
    width(): number
}