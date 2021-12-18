const { expect, assert } = require('chai');
const billService = require('../src/services/bill.service');

describe('Bill Service', () => {

    
    it('should return the correct slab', () => {
        let slab = billService.inSlabZone(0);
        assert.equal(slab, true);
        slab = billService.inSlabZone(1);
        assert.equal(slab, true);
        slab = billService.inSlabZone(2);
        assert.equal(slab, true);
        slab = billService.inSlabZone(3);
        assert.equal(slab, true);
        slab = billService.inSlabZone(4);
        assert.equal(slab, false);
    })

    it('should calculate the correct borewell water bill', () => {
        let totalWaterBill = billService.borewellWaterBill(0);
        assert.equal(totalWaterBill, 0);
        totalWaterBill = billService.borewellWaterBill(500);
        assert.equal(totalWaterBill, 750);
        totalWaterBill = billService.borewellWaterBill(1000);
        assert.equal(totalWaterBill, 1500);
    })

    it('should calculate the correct corporation water bill', () => {
        let totalWaterBill = billService.corporationWaterBill(0);
        assert.equal(totalWaterBill, 0);
        totalWaterBill = billService.corporationWaterBill(500);
        assert.equal(totalWaterBill, 500);
        totalWaterBill = billService.corporationWaterBill(1000);
        assert.equal(totalWaterBill, 1000);
    })

    it('it should calculate the correct tanker water bill', () => {
        let totalWaterBill = billService.tankerWaterBill(0);
        assert.equal(totalWaterBill, 0);
        totalWaterBill = billService.tankerWaterBill(250);
        assert.equal(totalWaterBill, 500);
        totalWaterBill = billService.tankerWaterBill(500);
        assert.equal(totalWaterBill, 1000);
        totalWaterBill = billService.tankerWaterBill(1500);
        assert.equal(totalWaterBill, 4000);
        totalWaterBill = billService.tankerWaterBill(2000);
        assert.equal(totalWaterBill, 6500);
        totalWaterBill = billService.tankerWaterBill(3000);
        assert.equal(totalWaterBill, 11500);



    })

    it('should calculate the total bill', () => {
        // borewell water 0, corporation water 0, tanker water 0
        let totalBill = billService.totalBill(0, 0, 0);
        assert.equal(totalBill, 0);
        // borewell water 630, corporation water 270, tanker water 1500
        totalBill = billService.totalBill(630, 270, 1500);
        assert.equal(totalBill, 5215);
        // borewell water 500, corporation water 1000, tanker water 1500
        totalBill = billService.totalBill(500, 1000, 1500);
        assert.equal(totalBill, 5750);
        // borewell water 600, corporation water 300, tanker water 0
        totalBill = billService.totalBill(600, 300, 0);
        assert.equal(totalBill, 1200);

    })
})

