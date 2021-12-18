// Import the file system module
const fs = require('fs');
// Import process commands from appartment service
const { processCommandsForAppartment } = require('./appartment.service');


/**
 * 
 * @param {*} fileContent 
 * process the file content
 * 
 */
const processFileContent = (fileContent) => {
     // get the commands array from file content
     let commands = getCommandsFromFileContent(fileContent);

     // Remove starting and ending spaces of input array
     commands = removeEdgeSpaces(commands);
 
     // process the commands
    return processCommandsForAppartment(commands);
}

/**
 * 
 * @param {*} filename 
 * process the input and get file content
 * process the file content
 */

const inputProcessor = async (filename) => {

    // read the file content
    const fileContent = await fs.readFileSync(filename, 'utf8');
    processFileContent(fileContent);
}

/**
 * 
 * @param {*} fileContent 
 * @returns array of commands
 * get the commands array from file content
 */

const getCommandsFromFileContent = (fileContent) => {
    // split the file content by new line
    return fileContent.split('\n');
};


/**
 * 
 * @param {*} inputArray 
 * @returns trimmed array
 * Remove starting and ending spaces of input array
 */

const removeEdgeSpaces = (inputArray) => {
    // trim the input array
    return inputArray.map(item => item.trim());
};




module.exports = { 
    inputProcessor,
    getCommandsFromFileContent,
    removeEdgeSpaces,
    processFileContent
 };