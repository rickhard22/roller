"use strict";

function Roller(value, faceCount, modifier) {
    this.validator = /\b([1-9]\d*)?d([1-9]\d*)?([-+]{1}[1-9]\d*)?\b/mi;

    if (typeof value === "string") {
        this.parseDiceNotation(value.trim().toLowerCase());
    } else {
        this.setDiceCount(value).setFaceCount(faceCount).setModifier(modifier);
    }
}

Roller.prototype.setDiceCount = function(val) {
    this.diceCount = (!isNaN(parseFloat(val)) && isFinite(val) && (val % 1 === 0)) ? Number(val) : 1;
    return this;
};

Roller.prototype.setFaceCount = function(val) {
    this.faceCount = (!isNaN(parseFloat(val)) && isFinite(val) && (val % 1 === 0)) ? Number(val) : 6;
    return this;
};

Roller.prototype.setModifier = function(val) {
    this.modifier = (!isNaN(parseFloat(val)) && isFinite(val) && (val % 1 === 0)) ? Number(val) : 0;
    return this;
};

Roller.prototype.parseDiceNotation = function(value) {
    if (!this.validator.test(value)) {
        throw new Error("Malformed dicenotation. Dicenotation format is like: ${diceCount}d${faceCount}${modifier}");
    }

    const groups = this.validator.exec(value);
    this.setDiceCount(groups[1]).setFaceCount(groups[2]).setModifier(groups[3]);
};

Roller.prototype.roll = function() {
    return this.diceCount * (Math.floor(this.faceCount * Math.random()) + 1) + this.modifier;
}; 

Roller.prototype.toDiceNotation = function() {
    const dicenotation = this.diceCount + "d" + this.faceCount;
    if (this.modifier) {
        dicenotation += this.modifier;
    }

    return dicenotation;
};

function roll() {
    const roller = arguments.length === 1 ? new Roller(arguments[0]) : new Roller(arguments[0], arguments[1], arguments[2]);
    return roller.roll();
}

function createRoller() {
    const roller = arguments.length === 1 ? new Roller(arguments[0]) : new Roller(arguments[0], arguments[1], arguments[2]);

    function roll() {
        return roller.roll();
    }

    Object.defineProperty(roll, "toDiceNotation", {
        value: function() {
            return roller.toDiceNotation();
        }
    });

    return roll;
}

module.exports = { roll, createRoller };
