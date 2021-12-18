const { expect, assert } = require('chai');
const { getCommandsFromFileContent, removeEdgeSpaces } = require('../src/services/process-input.service');


describe('Input Processor', () => {

    const content = `ALLOT_WATER 3 2:1\nADD_GUESTS 4\nADD_GUESTS 1\nBILL`;
    const contentWithEdgeSpaces = ` ALLOT_WATER 3 2:1
    ADD_GUESTS 4
    ADD_GUESTS 1
    BILL`;

    it('should return the commands array from file content', () => {
        const commands = getCommandsFromFileContent(content);
        assert.equal(commands.length, 4);
        assert.deepEqual(commands, ['ALLOT_WATER 3 2:1', 'ADD_GUESTS 4', 'ADD_GUESTS 1', 'BILL']);

    });

    it('should remove the starting spaces from input array', () => {

        let commands = getCommandsFromFileContent(contentWithEdgeSpaces);
        commands = removeEdgeSpaces(commands);
        assert.equal(commands.length, 4);
        assert.deepEqual(commands, ['ALLOT_WATER 3 2:1', 'ADD_GUESTS 4', 'ADD_GUESTS 1', 'BILL']);

    })

})