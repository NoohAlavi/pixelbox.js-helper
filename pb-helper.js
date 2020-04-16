export class Vector {
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

export class GameObject {
    constructor(frame, x, y) {
        this.position = new Vector(x, y);
        this.velocity = new Vector();
        this.width = 8;
        this.height = 8;
        this.flipX = false;
        this.flipY = false;
        this.flipR = false;
        this.frame = frame;
    }

    draw() {
        sprite(this.frame, this.position.x, this.position.y, this.flipX, this.flipY, this.flipR);
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    isCollingWith(other) {
        return (
            this.x + this.width > other.x &&
            this.y + this.height > other.y &&
            other.x + other.width > this.x &&
            other.y + other.height > this.y
        );
    }
}

var prevTime = Date.now();

export function getDeltaTime() {
    var curTime = Date.now();
    var delta = curTime - prevTime;
    prevTime = Date.now();

    return delta;
}
