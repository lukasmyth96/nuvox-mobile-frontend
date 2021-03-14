class Key {
    constructor(id, x0, x1, y0, y1) {
        this.id = id;
        this.x0 = x0;
        this.x1 = x1;
        this.y0 = y0;
        this.y1 = y1;
    }

    contains(x, y) {
        return (this.x0 <= x) && (x <= this.x1) && (this.y0 <= y) && (y <= this.y1)
    }
}

const nuvoxKeys = [
    new Key('1', 0 / 3, 1 / 3, 0 / 3, 1 / 3),
    new Key('2', 1 / 3, 2 / 3, 0 / 3, 1 / 3),
    new Key('3', 2 / 3, 3 / 3, 0 / 3, 1 / 3),
    new Key('4', 0 / 3, 1 / 3, 1 / 3, 2 / 3),
    new Key('5', 1 / 3, 2 / 3, 1 / 3, 2 / 3),
    new Key('6', 2 / 3, 3 / 3, 1 / 3, 2 / 3),
    new Key('7', 0 / 3, 1 / 3, 2 / 3, 3 / 3),
    new Key('8', 1 / 3, 2 / 3, 2 / 3, 3 / 3),
    new Key('9', 2 / 3, 3 / 3, 2 / 3, 3 / 3),
]

const keyAtPoint = (x, y) => {
    return nuvoxKeys.find(key => key.contains(x, y));
}

export default keyAtPoint;
