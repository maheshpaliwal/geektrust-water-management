const appartmentService = require('../src/services/appartment.service');
const inputService = require('../src/services/process-input.service');
const billService = require('../src/services/bill.service');
const { expect, assert } = require('chai');



describe('Get command arguments from command', () => {

    const allotWatterCommand = `ALLOT_WATER 3 2:1`;
    const addGuestsCommand = `ADD_GUESTS 4`;
    const billCommand = `BILL`;

    it('should return all the command arguments of allot water', () => {
        const { commandName, numberArgument, waterFactor } = appartmentService.getSingleCommandArguments(allotWatterCommand);
        assert.equal(commandName, 'ALLOT_WATER');
        assert.equal(numberArgument, '3');
        assert.equal(waterFactor, '2:1');
    })

    it('should return all the command arguments of add guests', () => {
        const { commandName, numberArgument: noOfGuests} = appartmentService.getSingleCommandArguments(addGuestsCommand);
        assert.equal(commandName, 'ADD_GUESTS');
        assert.equal(noOfGuests, '4');
    })

    it('should return all the command arguments of bill', () => {
        const { commandName } = appartmentService.getSingleCommandArguments(billCommand);
        assert.equal(commandName, 'BILL');
    })


})

describe('should return correct no of family members in appartment', () => {
    const twobhkAppartmentType = 2;
    const threebhkAppartmentType = 3;

    it('should return correct no of member in two bhk', () => {
        const noOfMembers = appartmentService.noOfMembersInAppartment(twobhkAppartmentType);
        assert.equal(noOfMembers, 3);
    } )

    it('should return correct no of member in three bhk', () => {
        const noOfMembers =  appartmentService.noOfMembersInAppartment(threebhkAppartmentType);
        assert.equal(noOfMembers, 5);
    })

})


describe('should return correct borewell and corp ratio', () => {
    
    const ratio = '2:3';

    it('should return correct borewell and corp ratio', () => {
        const [corporationWaterFactor, borewellWaterFactor] = appartmentService.getBoreWellAndCorpRatio(ratio);
        assert.equal(corporationWaterFactor, 2);
        assert.equal(borewellWaterFactor, 3);
    })
})


describe('water management', () => {
    
    it(`should print total water usage and bill for 3bhk`, () => {
        const commands = `ALLOT_WATER 3 2:1\nADD_GUESTS 4\nADD_GUESTS 1\nBILL`;
        const appartment = inputService.processFileContent(commands);

        assert.equal(appartment.getBill(), 5750);
        assert.equal(appartment.getTotalWaterUsage(), 3000);

    })

    it('should get caculate the bill for 3bhk appartment', () => {
        const commands = `ALLOT_WATER 3 2:1\nADD_GUESTS 4\nADD_GUESTS 1\nBILL`;
        const appartment = inputService.processFileContent(commands);
        const bill = billService.calculateBill(appartment);
        assert.equal(bill, 5750);
    })

    it('should get calculate the bill for 2bhk appartment', () => { 
        const commands = `ALLOT_WATER 2 3:7
        ADD_GUESTS 2
        ADD_GUESTS 3
        BILL`
        const appartment = inputService.processFileContent(commands);
        assert.equal(appartment.getBill(), 5215);
        assert.equal(appartment.getTotalWaterUsage(), 2400);
    })


})