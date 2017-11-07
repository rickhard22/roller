const chai = require('chai');
const expect = chai.expect;

describe('Import module:', function () {
    const roll = require('../src/rpg-dice-roller');
    it('Functions "roll" and "createRoller" are available', function () {
        expect(roll).to.have.property('roll');
        expect(roll).to.have.property('createRoller')
    });
});

describe('Function "roll"', function () {
    const roll = require('../src/rpg-dice-roller').roll;

    it('Calling "roll" returns a number: whole, random & according to arguments', function () {
        for (let i = 0; i < 5; ++i) {
            let diceCount = Math.floor(Math.random() * 8) + 1;
            let faceCount = Math.floor(Math.random() * 120) + 1;
            let modifier = Math.floor(Math.random() * (diceCount * faceCount + 1)) + (diceCount * faceCount / 2);

            expect(roll(diceCount, faceCount, modifier)).to.be.a('number').above(diceCount - 1).and.below(diceCount * faceCount + modifier + 1);
        }

        expect(roll("3d7-2")).to.be.a('number').above(2).and.below(3 * 7 + (-2) + 1);
        expect(roll("3d7-2") % 1).to.be.equal(0);

        expect(roll("1d6+1")).to.be.a('number').above(1).and.below(1 * 6 + (+1) + 1);
        expect(roll("1d6+1") % 1).to.be.equal(0);

        expect(roll("4d")).to.be.a('number').above(3).and.below(4 * 6 + (0) + 1);
        expect(roll("4d") % 1).to.be.equal(0);

        expect(roll("d10")).to.be.a('number').above(0).and.below(1 * 10 + (0) + 1);
        expect(roll("d10") % 1).to.be.equal(0);

    });

});

describe('Function "createRoller"', function () {
    const createRoller = require('../src/rpg-dice-roller').createRoller;

    it('"createRoller" returns a function with property toDiceNotation', function () {
        const roller = createRoller();
        expect(roller).to.have.property('toDiceNotation');
    });

    it('Calling "createRoller" returns a number: whole, random & according to arguments', function () {
        for (let i = 0; i < 5; ++i) {
            let diceCount = Math.floor(Math.random() * 8) + 1;
            let faceCount = Math.floor(Math.random() * 120) + 1;
            let modifier = Math.floor(Math.random() * (diceCount * faceCount + 1)) + (diceCount * faceCount / 2);

            expect(createRoller(diceCount, faceCount, modifier)()).to.be.a('number').above(diceCount - 1).and.below(diceCount * faceCount + modifier + 1);
        }

        expect(createRoller("3d7-2")()).to.be.a('number').above(2).and.below(3 * 7 + (-2) + 1);
        expect(createRoller("3d7-2")() % 1).to.be.equal(0);

        expect(createRoller("1d6+1")()).to.be.a('number').above(1).and.below(1 * 6 + (+1) + 1);
        expect(createRoller("1d6+1")() % 1).to.be.equal(0);

        expect(createRoller("4d")()).to.be.a('number').above(3).and.below(4 * 6 + (0) + 1);
        expect(createRoller("4d")() % 1).to.be.equal(0);

        expect(createRoller("d10")()).to.be.a('number').above(0).and.below(1 * 10 + (0) + 1);
        expect(createRoller("d10")() % 1).to.be.equal(0);

    });

    it('Calling "createRoller" with weird input', function () {
        const roller = createRoller();

        expect(createRoller(3, 7, -2)()).to.be.a('number').above(2).and.below(3 * 7 + (-2) + 1);
        expect(createRoller(3, 7, -2)() % 1).to.be.equal(0);

        expect(createRoller(3, 7, -2)()).to.be.a('number').above(2).and.below(3 * 7 + (-2) + 1);
        expect(createRoller(3, 7, -2)() % 1).to.be.equal(0);

    });

});