
const Appartment = require('../model/appartment.model');
const constant = require('../config/constant');
const billService = require('./bill.service');


/**
 * 
 * @param {*} appartmentType 
 * @returns noOfMembers
 * returns the numbers of members from appartment type
 */
const noOfMembersInAppartment = (appartmentType) => constant.APPARTMENT_TYPE_TO_NUMBER_OF_MEMBERS[constant.APPARTMENT_TYPE[appartmentType]] || 0;

/**
 * 
 * @param {*} ratio 
 * @returns corrsponding water factor array for a given water ratio
 */
const getBoreWellAndCorpRatio = (ratio) => ratio.split(':');

/**
 * 
 * @param {*} command 
 * @returns commandName, numberArgument, waterFactor
 * returns the command name
 * returns the number argument
 * returns the water factor
 */

const getSingleCommandArguments = (command) => {

    // get all elements of single command
    const commandElements = command.split(' ');

    // get the command name
    let commandName = null;
    // if command elements length is greater than command name index (which is zero)
    if(commandElements.length > constant.COMMAND_INDEX.COMMAND_NAME){
        commandName = commandElements[constant.COMMAND_INDEX.COMMAND_NAME];
    }

    let numberArgument = null;
    // if command elements length is greater than command number index (which is one)
    if(commandElements.length > constant.COMMAND_INDEX.NUMBER_ARGUMENT){
        numberArgument = commandElements[constant.COMMAND_INDEX.NUMBER_ARGUMENT];
    }

    let waterFactor = null;

    // if command elements length is greater than water factor index (which is two)
    if(commandElements.length > constant.COMMAND_INDEX.WATER_FACTOR){
        waterFactor = commandElements[constant.COMMAND_INDEX.WATER_FACTOR];
    }

    return {
        commandName,
        numberArgument,
        waterFactor
    }
}



/**
 * 
 * @param {*} appartment 
 * @param {*} command 
 * @returns appartment
 * Analyses the command and returns the appartment
 * Prints bill in case of BILL command
 */

const analyseCommand = (appartment, command) => {

    // get the command arguments
    const { commandName, numberArgument, waterFactor } = getSingleCommandArguments(command);

    /**
     * If command is ALLOT_WATER
     * initialize appartment class
     * allot water to appartment
     */

    if(commandName === constant.COMMANDS.ALLOT_WATER){

        // get no of family members
        const noOfMembersInFamily = noOfMembersInAppartment(numberArgument);

        // get corporation and borewell water factor
        const [ corporationWaterFactor, borewellWaterFactor ] = getBoreWellAndCorpRatio(waterFactor);

        appartment = new Appartment(noOfMembersInFamily, corporationWaterFactor, borewellWaterFactor);
    }

    /**
     * If command is ADD_GUESTS
     * add guests to appartment
     */

    else if(commandName === constant.COMMANDS.ADD_GUESTS){
        const noOfGuests = numberArgument;
        // add guests to appartment
        appartment.addGuests(noOfGuests);
    }

    /**
     * If command is BILL
     * get the bill from appartment
     * print the bill
     */

    else if(commandName === constant.COMMANDS.BILL){
        // get total water usage
        const totalWaterUsage = appartment.getTotalWaterUsage();
        // get bill
        const totalBill = billService.calculateBill(appartment);
        // print bill
        console.log(`${totalWaterUsage} ${totalBill}`);
        appartment.setBill(totalBill);
    }


    return appartment;
}


/**
 * 
 * @param {*} commands
 * Main Processor of appartment commands
 *  
 */

const processCommandsForAppartment = (commands) => {
    
    let appartment = null;

    // check if commands is an array
    if(Array.isArray(commands)){

        // traverse through all the commands
        for(let command of commands){
           appartment = analyseCommand(appartment, command);
        }

    }

    return appartment
}

module.exports = {
    getSingleCommandArguments,
    noOfMembersInAppartment,
    getBoreWellAndCorpRatio,
    processCommandsForAppartment
}