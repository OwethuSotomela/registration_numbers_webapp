module.exports = function Registration(local) {

    var regList = local;
    var message = "";
    var filterTown = []

    // messageApp = "";
    // var regListApp = local;
    // var filterTownApp = [];

    async function insertReg(regNumber) {
        var strFirstTwo = regNumber.substring(0, 2);
        const sqlTown = await local.query(`SELECT * FROM towns WHERE location = $1`, [strFirstTwo]);
        const sqlNumb = await local.query(`SELECT * FROM registration_numbers WHERE regnumber = '${regNumber}'`);
        if (sqlTown.rows.length == 0) {
            message = "Sorry we don't accept that!"
        } else {
            if (sqlNumb.rows.length == 0) {
                await local.query(`insert into registration_numbers (regnumber, town_id) values ('${regNumber}', ${sqlTown.rows[0].id})`)
                message = "Registration number successfully added!"
            } else {
                message = "Registration number already added!"
            }
        }

    }

    async function getRegistrationNum(){
        const sqlShow = await pool.query("SELECT * FROM registration_numbers ORDER BY regnumber");
        return sqlShow.rows;
    }

    function getMessage() {
        return message;
    }

    async function emptyDB() {
        await local.query("DELETE FROM registration_numbers")
    }

    // async function displayFun(argPassed) {

    //     let element = document.getElementById("myList");
    //     while (element.firstChild) {
    //         element.removeChild(element.firstChild);
    //     }
    
    //     for (var i = 0; i < argPassed.length; i++) {
    //         var node = document.createElement("li");
    //         var textnode = document.createTextNode(argPassed[i]);
    //         node.appendChild(textnode);
    //         element.appendChild(node);
    //     }
    // }


    // function setRegi(carReg) {

    //     carReg = carReg.toUpperCase();

    //     var regx = /[A-Z]{2}\s[0-9]{6}$/.test(carReg)
    //     var regx1 = /[A-Z]{2}\s[0-9]{3}\s[0-9]{3}$/.test(carReg)
    //     var regx2 = /[A-Z]{2}\s[0-9]{3}\-[0-9]{3}$/.test(carReg)

    //     if (!regx && !regx1 && !regx2) {
    //         message = "Format doesn't match the required!"
    //         return false;
    //     } else {
    //         if (!regListApp.includes(carReg)) {
    //             regListApp.push(carReg)
    //             message = "Car registration added successfully!";
    //             return true;
    //         } else {
    //             message = "Car registration number already entered!";
    //             return false;
    //         }
    //     }
    // }

    //    async function setRegApp(carRegApp) {

    //         carRegApp = carRegApp.toUpperCase();

    //         var regx1App = /[A-Z]{2}\s[0-9]{6}$/.test(carRegApp);
    //         var regx2App = /[A-Z]{2}\s[0-9]{3}\s[0-9]{3}$/.test(carRegApp);
    //         var regx3App = /[A-Z]{2}\s[0-9]{3}\-[0-9]{3}$/.test(carRegApp);

    //         if (!regx1App && !regx2App && !regx3App) {
    //             messageApp = "Format doesnt match the required!"
    //         } else {
    //             if (!regListApp.includes(carRegApp)) {
    //                 regListApp.push(carRegApp);
    //                 message = "Car registration added successfully!";
    //                 return true;
    //             } else {
    //                 message = "Car registration number already entered!";
    //             }
    //         }
    //     }

    // function regPlate(regPlate) {
    //     filterTown = []
    //     for (var i = 0; i < regList.length; i++) {
    //         if (regList[i].startsWith(regPlate)) {
    //             filterTown.push(regList[i])
    //         }
    //     }
    // }
    async function regPlateApp(regApp) {
        filterTownApp = [];
        for (var i = 0; i < regListApp.length; i++) {
            if (regListApp[i].startsWith(regApp)) {
                filterTownApp.push(regApp);
            }
        }
    }

    async function getFilterTownApp() {
        return filterTownApp;
    }

    function getFilterTown() {
        return filterTown;
    }

    async function getRegApp() {
        return regListApp;
    }





    function getRegi() {
        return regList;
    }


    return {
        Registration,
        insertReg,
        getRegistrationNum,
        emptyDB,
        // displayFun,
        // setRegi,
        // regPlate,
        getRegi,
        getMessage,
        getFilterTown,
        // setRegApp,
        regPlateApp,
        getFilterTownApp,
        getRegApp,
    }
}


