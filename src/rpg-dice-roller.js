"use strict";

function Dice(faceCount) {
    if (faceCount === void 0) { faceCount = 6; }
    this.faceCount = faceCount;
}

function Roller(value, faceCount, modifier) {
    if (value === void 0) { value = 1; }
    if (faceCount === void 0) { faceCount = 6; }
    if (modifier === void 0) { modifier = 0; }
    this.validator = /\b([1-9]\d*)?d([1-9]\d*)?([-+]{1}[1-9]\d*)?\b/mi;
    if (typeof value === "string") {
        this.parseDiceNotation(value.trim().toLowerCase());
    }
    else {
        this.createDices(Number(value), Number(faceCount));
        this.modifier = Number(modifier);
    }
}

Roller.prototype.createDices = function (amount, faceCount) {
    this.dices = [];
    while (this.dices.length < amount) {
        this.dices.push(new Dice(faceCount));
    }
};

Roller.prototype.parseDiceNotation = function (value) {
    if (!this.validator.test(value)) {
        throw new Error("Malformed dicenotation");
    }
    var groups = this.validator.exec(value);
    console.log("group#", groups)
    this.createDices(Number(groups[1]), Number(groups[2]));
    this.modifier = Number(groups[3]);
};

Roller.prototype.roll = function () {
    console.log("this#", this)
    return this.dices.length * (Math.floor(this.dices[0].faceCount * Math.random()) + 1) + this.modifier;
};

Roller.prototype.toDiceNotation = function () {
    return this.dices.length + "d" + this.dices[0].faceCount + this.modifier;
};

function roll() {
    var roller = arguments.length === 1 ? new Roller(arguments[0]) : new Roller(arguments[0], arguments[1], arguments[2]);
    return roller.roll();
}

function createRoller() {
    var roller = arguments.length === 1 ? new Roller(arguments[0]) : new Roller(arguments[0], arguments[1], arguments[2]);
    Object.defineProperty(roller.roll, "toDiceNotation", {
        value: roller.toDiceNotation
    });
    return roller.roll;
}

module.exports = { roll: roll, createRoller: createRoller };
