"use strict";

function Roller(value, faceCount, modifier) {
    this.validator = /^\b([1-9]\d*)?d([1-9]\d*)?([-+]{1}[1-9]\d*)?$\b/mi;

    if (value && typeof value !== "string" && typeof value !== "number") {
        throw new Error("Invalid arguments supplied: Roller is of type function(diceNotation:string) or function(diceCount:number[,faceCount:number,modifier:number]) but '" + Array.prototype.slice.call(arguments) + "' was supplied");
    }

    if (value && typeof value === "string") {
        this.parseDiceNotation(value.trim().toLowerCase());
    } else {
        this.setDiceCount(value).setFaceCount(faceCount).setModifier(modifier);
    }
}

Roller.prototype.setDiceCount = function (val) {
    if (val && (!isInteger(val) || val < 0)) {
        throw new Error("Invalid arguments supplied: diceCount should be a positive integer but '" + Array.prototype.slice.call(arguments) + "' was supplied");
    }
    this.diceCount = val ? Number(val) : 1;
    return this;
};

Roller.prototype.setFaceCount = function (val) {
    if (val && (!isInteger(val) || val < 0)) {
        throw new Error("Invalid arguments supplied: faceCount should be a positive integer but '" + Array.prototype.slice.call(arguments) + "' was supplied");
    }
    this.faceCount = val ? Number(val) : 6;
    return this;
};

Roller.prototype.setModifier = function (val) {
    if (val && !isInteger(val)) {
        throw new Error("Invalid arguments supplied: modifier should be an integer but '" + Array.prototype.slice.call(arguments) + "' was supplied");
    }
    this.modifier = val ? Number(val) : 0;
    return this;
};

Roller.prototype.parseDiceNotation = function (value) {
    if (!this.validator.test(value)) {
        throw new Error("Invalid arguments supplied: Malformed dicenotation, should be of format `${diceCount}d${faceCount}${modifier}` but '" + value + "' was supplied");
    }

    const groups = this.validator.exec(value);
    this.setDiceCount(groups[1]).setFaceCount(groups[2]).setModifier(groups[3]);
};

Roller.prototype.roll = function () {
    return this.diceCount * (Math.floor(this.faceCount * Math.random()) + 1) + this.modifier;
};

Roller.prototype.toDiceNotation = function () {
    let dicenotation = this.diceCount + "d" + this.faceCount;
    if (this.modifier) {
        dicenotation += this.modifier > 0 ? "+" : "";
        dicenotation += this.modifier;
    }

    return dicenotation;
};

function isInteger(val) {
    return !isNaN(parseFloat(val)) && isFinite(val) && (val % 1 === 0) && val > -Infinity && val < Infinity;
}

function roll() {
    const roller = arguments.length < 2 ? new Roller(arguments[0]) : new Roller(arguments[0], arguments[1], arguments[2]);
    return roller.roll();
}

function createRoller() {
    const roller = arguments.length < 2 ? new Roller(arguments[0]) : new Roller(arguments[0], arguments[1], arguments[2]);

    function roll() {
        return roller.roll();
    }

    Object.defineProperty(roll, "toDiceNotation", {
        value: function () {
            return roller.toDiceNotation();
        }
    });

    return roll;
}

module.exports = {
    roll,
    createRoller
};