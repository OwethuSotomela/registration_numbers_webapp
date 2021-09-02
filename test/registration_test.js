const assert = require("assert");
const Registration = require("../registration");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/registration_App';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const registration = Registration(pool);

describe('Registration number list', async function () {
    it('Should display the list of all entered registration numbers', async function () {
        await registration.insertReg('CA 123489');
        await registration.insertReg('CL 890-765');
        await registration.insertReg('CW 667-987');
        await registration.insertReg('CL 254 369');
        await registration.insertReg('CA 890-098');

        // var regNumber1 = await registration.getRegNumbers('CA 123489');
        // var regNumber2 = await registration.getRegNumbers('CL 890-765');
        // var regNumber3 = await registration.getRegNumbers('CW 667-987');
        // var regNumber4 = await registration.getRegNumbers('CL 254 369');
        // var regNumber5 = await registration.getRegNumbers('CA 890-098');

        // assert.equal('CA 123489', regNumber1);
        // assert.equal('CL 890-765', regNumber2);
        // assert.equal('CW 667-987', regNumber3);
        // assert.equal('CL 254 369', regNumber4);
        // assert.equal('CA 890-098', regNumber5);
        
        assert.equal('CA 123489', getRegNumbers())
        assert.equal('CL 890-765', getRegNumbers())
        assert.equal('CW 667-987', getRegNumbers())
        assert.equal('CL 254 369', getRegNumbers())
        assert.equal('CA 890-098', getRegNumbers())

    })


    it('Should return message "Registration number already entered"', function () {
        let myHello = Greeting([])
        var string = "Owethu"
        var langauge = "Sawubona, "

        myHello.setName(string)
        myHello.setName(string)

        assert.equal('Sawubona, Owethu', myHello.firstL(string, langauge))
        assert.equal('Name already greeted!', myHello.getMessage())
    })
})