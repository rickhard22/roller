class Dice {
    faceCount: number;
    constructor(faceCount:number = 6) {
        this.faceCount = faceCount;
    }
}

class Roller {
    private validator: RegExp = /\b([1-9]\d*)?d([1-9]\d*)?([-+]{1}[1-9]\d*)?\b/mi;
    private dices: Dice[];
    private modifier: number = 0;

    constructor(value: string | number = 1, faceCount: number = 6, modifier: string | number = 0) {
        console.log("type of value#", typeof value);
        if (typeof value === "string") {
            this.parseDiceNotation(value.trim().toLowerCase());
        } else {
            this.createDices(Number(value), Number(faceCount));
            this.modifier = Number(modifier);
        }
    }

    private createDices(amount: number, faceCount: number) {
        this.dices = [];
        while (this.dices.length < amount) {
            this.dices.push(new Dice(faceCount))
        }
    }

    private parseDiceNotation(value: string) {
        if (!this.validator.test(value)) {
            throw new Error("Malformed dicenotation");
        }

        const groups = this.validator.exec(value);

        this.createDices(Number(groups[1]), Number(groups[2]));
        this.modifier = Number(groups[3]);
    }

    public roll(): number {
        return this.dices.length * (Math.floor(this.dices[0].faceCount * Math.random()) + 1) + this.modifier;
    }

    public toDiceNotation(): string {
        return `${this.dices.length}d${this.dices[0].faceCount}${this.modifier}`;
    }

}

function roll(): number {
    const roller = arguments.length === 1 ? new Roller(arguments[0]) :  new Roller(arguments[0], arguments[1], arguments[2]);
    return roller.roll();
}

function createRoller() {
    const roller = arguments.length === 1 ? new Roller(arguments[0]) :  new Roller(arguments[0], arguments[1], arguments[2]);
    Object.defineProperty(roller.roll, "toDiceNotation", {
        value: roller.toDiceNotation
    });
    return roller.roll;
}

export default { roll, createRoller };
