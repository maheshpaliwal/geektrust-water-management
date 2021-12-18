const Appartment = require('../model/appartment.model');
const constant = require('../config/constant');


/**
 * 
 * @param {*} slabZone 
 * @returns true/false if slab zone is valid
 */
const inSlabZone = (slabZone) => slabZone < constant.TANKER_SLAB_LENGTH;

/**
 * 
 * @param {*} totalUsage 
 * @returns total borewell water bill
 */
const borewellWaterBill = (totalUsage) =>  totalUsage * constant.PRICES.BOREWELL_WATER_PRICE;

/**
 * 
 * @param {*} totalUsage 
 * @returns total corporation water bill
 */
const corporationWaterBill = (totalUsage) => totalUsage * constant.PRICES.CORPORATION_WATER_PRICE;


/**
 * 
 * @param {*} totalUsage 
 * @returns total tanker water bill
 */
const tankerWaterBill = (totalUsage) => {

    let tankerBill = 0;

    // first slab zone (which is 0 to 500)
    let slabZone = 0;

    while(totalUsage > 0 && inSlabZone(slabZone)){

        // Map slab index to slab zone
        const slab = constant.SLAB_INDEX_TO_SLAB_MAPPING[slabZone];

        const slabWidth = constant.TANKER_SLAB_WIDTH[slab];
        // check if slab falls prior to THREE THOUSAND PLUS SLAB
        if(slabWidth){
            
            // if totalUsage left is greate than slab width
            // then consume the total width and add that to bill (e.g 600 usage is greater than 500)
            
            if(totalUsage >= slabWidth){
                tankerBill += slabWidth * constant.PRICES.TANKER_WATER_PRICE[slab];
                totalUsage -= slabWidth;
            }
            // if totalUsage left is less than slab width
            // then consume totalUsageLeft and add that to bill
            else{
                tankerBill += totalUsage * constant.PRICES.TANKER_WATER_PRICE[slab];
                totalUsage = 0;
            }
        }
        // condition where slab width is three thousand plus
        else{
            tankerBill += totalUsage * constant.PRICES.TANKER_WATER_PRICE[slab];
            totalUsage = 0;
        }
        // increment slab zone and calculate for next slab if water left
        slabZone++;
    }
    // return the tanker bill
    return tankerBill;

}


/**
 * 
 * @param {*} boreWellWaterUsage 
 * @param {*} corporationWaterUsage 
 * @param {*} tankerWaterUsage 
 * @returns  total bill
 * Calculates the total bill for the appartment
 * sum of borewell water bill, corporation water bill and tanker water bill
 */

const totalBill = (boreWellWaterUsage, corporationWaterUsage, tankerWaterUsage) => {
    return borewellWaterBill(boreWellWaterUsage) + corporationWaterBill(corporationWaterUsage) + tankerWaterBill(tankerWaterUsage);
}



/**
 * 
 * @param {*} appartment 
 * @returns total bill
 * Main function to calculate the bill and return amount
 */

const calculateBill = (appartment) => {

    if(appartment instanceof Appartment){
        // get borewell water usage
        const boreWellWaterUsage = appartment.getTotalBorewellWater();
        // get corporation water usage
        const corporationWaterUsage = appartment.getTotalCorporationWater();
        // get tanker water usage
        const totalTankerWaterUsage = appartment.getTotalTankerWater();
        // return total bill
        return Math.ceil(totalBill(boreWellWaterUsage, corporationWaterUsage, totalTankerWaterUsage));
    }

    return null;
}

module.exports = {
    calculateBill,
    borewellWaterBill,
    corporationWaterBill,
    tankerWaterBill,
    totalBill,
    inSlabZone
}