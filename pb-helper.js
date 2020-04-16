export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
    }

    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
    }

    mult(other) {
        this.x *= other.x;
        this.y *= other.y;
    }

    div(other) {
        this.x /= other.x;
        this.y /= other.y;
    }

    getLength() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    normalize() {
        this.x /= this.getLength();
        this.y /= this.getLength();
    }
}

export var gameObjects = []

export class GameObject {
    constructor(frame, x, y) {
        this.position = new Vector2(x, y);
        this.velocity = new Vector2();
        this.width = 8;
        this.height = 8;
        this.flipX = false;
        this.flipY = false;
        this.flipR = false;
        this.frame = frame;

        gameObjects.push(this);
    }

    draw() {
        sprite(this.frame, this.position.x, this.position.y, this.flipX, this.flipY, this.flipR);
    }

    static processAll() {
        for (var i = 0; i < gameObjects.length; i++) {
            gameObjects[i].process();
            gameObjects[i].draw();
        }
    }

    physicsProcess() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    update() {
        //updating logic goes here
    }

    process() {
        this.physicsProcess();
        this.update();
    }

    isCollingWith(other) {
        return (
            this.position.x + this.width > other.position.x &&
            this.position.y + this.height > other.position.y &&
            other.position.x + other.width > this.position.x &&
            other.position.y + other.height > this.position.y
        );
    }
}

var prevTime = Date.now();
export var delta;

export function calculateDeltaTime() {
    var curTime = Date.now();
    delta = curTime - prevTime;
    prevTime = Date.now();
}
