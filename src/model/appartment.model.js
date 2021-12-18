/**
 * Base Appartment Class
 * @class
 * contains prop and methods for appartment
 * 
 */

const constant  = require('../config/constant');

class Appartment {

    /***
     *  Base appartment will have following props
     *  water factors: corporation and borewell
     *  no of members in the appartment
     *  no of guests coming in the appartment
     */

    constructor(noOfMembers, corporationWaterFactor, borewellWaterFactor, capacity = constant.PER_PERSON_CAPACITY, days = constant.DEFAULT_DAYS){
        this.noOfMembers = noOfMembers;
        this.corporationWaterFactor = parseInt(corporationWaterFactor);
        this.borewellWaterFactor = parseInt(borewellWaterFactor);
        this.sumOfFactors = this.borewellWaterFactor + this.corporationWaterFactor;
        this.capacity = capacity;
        this.days = days;
        this.noOfGuests = 0;
        this.bill = 0;
    }

    // getter for no of members in an appartment

    getNoOfMembers(){
        return this.noOfMembers;
    }

    // method to add guests in an appartment

    addGuests(noOfGuests){
        this.noOfGuests += parseInt(noOfGuests);
    }

    // getter for no of guests in an appartment

    getNoOfGuests(){
        return this.noOfGuests;
    }

    // getter for corporation water factor for an appartment

    getCorporationWaterFactor(){
        return this.corporationWaterFactor;
    }

     // getter for borewell water factor for an appartment

     getBorewellWaterFactor(){
        return this.borewellWaterFactor;
    }

    // get total water for an appartment consumed by family members
    getTotalWaterForFamily(){
        return this.noOfMembers * this.days * this.capacity;
    }

    // get total water for an appartment consumed by guests
    getTotalWaterForGuests(){
        return this.noOfGuests * this.days * this.capacity;
    }

     // get total borewell water for an appartment
     getTotalBorewellWater(){
        return (this.getTotalWaterForFamily() *  this.borewellWaterFactor )/(this.sumOfFactors);
     }



    // getCorporationWater for an appartment
    getTotalCorporationWater(){
        return (this.getTotalWaterForFamily() * this.corporationWaterFactor)/(this.sumOfFactors);
    }

    // get total tanker water for an appartment
    getTotalTankerWater(){
        return this.getTotalWaterForGuests();
    }

    // get total water usage
    getTotalWaterUsage(){
    return this.getTotalBorewellWater() + this.getTotalCorporationWater() + this.getTotalTankerWater();
    }

    // get the bill of appartment
    getBill(){
        return this.bill;
    }
    
    // set the appartment bill
    setBill(bill){
        this.bill = bill;
    }

}

module.exports = Appartment;