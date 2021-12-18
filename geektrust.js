// Import input processor
const { inputProcessor } = require('./src/services/process-input.service');

// Get the File Name from the command line
const filename = process.argv[2];


// Immediately Invoked Function to process the input

(async () => {
// process the input
await inputProcessor(filename);

})()





