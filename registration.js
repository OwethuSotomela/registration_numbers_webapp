module.exports = function Registration(local) {

    var regList = local;
    var message = "";
    var filterTown = []

    async function insertReg(regNumber) {
        var strFirstTwo = regNumber.substring(0, 2);
        const sqlTown = await local.query(`SELECT * FROM towns WHERE location = $1`, [strFirstTwo]);
        const sqlNumb = await local.query(`SELECT * FROM registration_numbers WHERE regnumber = '${regNumber}'`);
        if (sqlTown.rows.length == 0) {
            message = "Enter registration numbers for selected towns only!"
        } else {
            if (sqlNumb.rows.length == 0) {
                await local.query(`insert into registration_numbers (regnumber, town_id) values ('${regNumber}', ${sqlTown.rows[0].id})`)
                message = "Registration number successfully added!"
            } else {
                message = "Registration number already added!"
            }
        }
    }

    async function getRegNumbers() {
        const sqlShow = await local.query("SELECT * FROM registration_numbers");
        return sqlShow.rows;
    }

    function getMessage() {
        return message;
    }

    async function emptyDB() {
        await local.query("DELETE FROM registration_numbers")
    }

    async function regPlate(town_id) {
        var flitteredTown = await local.query(`SELECT * from registration_numbers where town_id = ${town_id} `)
        return flitteredTown.rows
    }

    async function prepopulate() {
        var towns = await local.query("SELECT * from towns")
        return towns.rows
    }

    async function getFilterTown() {
        return filterTown;
    }

    async function getRegi() {
        return regList;
    }

    return {
        getRegNumbers,
        Registration,
        insertReg,
        emptyDB,
        getRegi,
        getMessage,
        getFilterTown,
        regPlate,
        prepopulate
    }
}


