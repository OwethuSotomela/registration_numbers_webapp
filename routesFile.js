module.exports = function (RegistrationOS) {

    async function home(req, res){
            res.render('index', {
                model: await RegistrationOS.getRegNumbers(),
                towns: await RegistrationOS.prepopulate(),
            });
    }

    async function insertRoute(req, res, next) {
        try {
            let carRegNo = req.body.inputElement.toUpperCase();
            let addButton = req.body.addButton;
            let selectedLang = req.body.town;

            console.log(addButton);
            console.log(`value:  ${selectedLang}`);
            console.log(carRegNo);

            var regx1App = /[A-Z]{2}\s[0-9]{6}$/.test(carRegNo);
            var regx2App = /[A-Z]{2}\s[0-9]{3}\s[0-9]{3}$/.test(carRegNo);
            var regx3App = /[A-Z]{2}\s[0-9]{3}\-[0-9]{3}$/.test(carRegNo);

            if (!regx1App && !regx2App && !regx3App) {
                req.flash('error', 'Not a supported format type!');
            } else {
                await RegistrationOS.insertReg(carRegNo)
                console.log(RegistrationOS.getMessage())
                req.flash('info', await RegistrationOS.getMessage())
            }
            res.render('index', {
                towns: await RegistrationOS.prepopulate(),
                model: await RegistrationOS.getRegNumbers()
            })
        } catch (error) {
            next(error);
        }
    }

    async function showReg(req, res) {
        req.flash('info', await RegistrationOS.getMessage())
        var vele = req.body.town;
        console.log(vele)
        res.render('index', {
            towns: await RegistrationOS.prepopulate(),
            model: await RegistrationOS.regPlate(req.body.town)
        })
    }

    async function showAll(req, res) {
        res.render('index', {
            towns: await RegistrationOS.prepopulate(),
            model: await RegistrationOS.getRegNumbers()
        })
    }

    async function clear(req, res) {
        req.flash('info', 'Database successfully deleted');
        await RegistrationOS.emptyDB();
        res.redirect('/');
    }

    return {
        home,
        insertRoute,
        showReg,
        showAll,
        clear
    }
}
