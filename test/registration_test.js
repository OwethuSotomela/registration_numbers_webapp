const assert = require("assert");
const Registration = require("../registration");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/travis_ci_test';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const registration = Registration(pool);

describe('List of registration numbers', async function () {
    it('Should display the list of all entered registration numbers', async function () {

        await registration.emptyDB()
        var all = ["CA 456-456", "CA 123-123", "CW 456-456", "CL 456-456", "CA 589-365", "CL 589-357", "CW 254-365"]

        var regList = [];

        await registration.insertReg("CA 456-456")
        await registration.insertReg("CA 123-123")
        await registration.insertReg("CW 456-456")
        await registration.insertReg("CL 456-456")
        await registration.insertReg("CA 589-365")
        await registration.insertReg("CL 589-357")
        await registration.insertReg("CW 254-365")

        var getRegNumbs = await registration.getRegNumbers()

        getRegNumbs.forEach(element => {
            regList.push(element.regnumber)
        });

        assert.equal(all.length, regList.length)
        assert.deepEqual(all, regList)

    })
})

describe("Inserts registration numbers to the database", async function () {
    it("Should insert registration numbers to the database", async function () {

        await registration.emptyDB();

        var all = ["CA 456-456", "CA 123-123", "CW 456-456", "CL 456-456", "CA 589-365", "CL 589-357", "CW 254-365"]

        var regList = [];

        await registration.insertReg("CA 456-456")
        await registration.insertReg("CA 123-123")
        await registration.insertReg("CW 456-456")
        await registration.insertReg("CL 456-456")
        await registration.insertReg("CA 589-365")
        await registration.insertReg("CL 589-357")
        await registration.insertReg("CW 254-365")

        var getRegNumbs = await registration.getRegNumbers()

        getRegNumbs.forEach(element => {
            regList.push(element.regnumber)
        });

        assert.equal(all.length, regList.length)

        await registration.emptyDB();
    })
})

describe("Filtering registration numbers", async function () {

    it("Should return registration numbers for Cape Town", async function () {

        await registration.insertReg("CA 456-456")
        await registration.insertReg("CA 123-123")
        await registration.insertReg("CW 456-456")
        await registration.insertReg("CL 456-456")
        await registration.insertReg("CA 589-365")
        await registration.insertReg("CL 589-357")
        await registration.insertReg("CW 254-365")

        var capeTown = ["CA 456-456", "CA 123-123", "CA 589-365"]

        var regListCT = [];

        var getRegNumberFilter = await registration.regPlate(1)
        getRegNumberFilter.forEach(element => {
            regListCT.push(element.regnumber)
        })

        assert.deepEqual(capeTown, regListCT);
    }) 

    it("Should return registration numbers for Stellenbotch", async function(){

        var stellenbotch = ["CL 456-456", "CL 589-357"]

        var regListStellenbotch = []

        var getRegNumberFilter = await registration.regPlate(2)
        getRegNumberFilter.forEach(element => {
            regListStellenbotch.push(element.regnumber)
        })

        assert.deepEqual(stellenbotch, regListStellenbotch);
    })

    it("Should return registration numbers for Woester", async function(){

        var woester = ["CW 456-456", "CW 254-365"]

        var regListWoester = []

        var getRegNumberFilter = await registration.regPlate(3)
        getRegNumberFilter.forEach(element => {
            regListWoester.push(element.regnumber)
        })

        assert.deepEqual(woester, regListWoester);
        await registration.emptyDB();

    })
})

describe("Returns the towns in the database", async function(){
    it("Should prepopulate towns", async function(){
        
        var towns = ['Cape Town', 'Stellenbotsch', 'Woercester']
        var getTown = []

        var getDBTowns = await registration.prepopulate()
        getDBTowns.forEach(element => {
            getTown.push(element.towns)
        })

        assert.deepEqual(towns, getTown)
        getTown = []
    })
    
})



