const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const { Pool } = require("pg");
const session = require('express-session');
const Registration = require('./registration');

const app = express();

app.use(session({
    secret: "add a secret string here",
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/registration_App';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const RegistrationOS = Registration(pool);

app.get('/', async function (req, res) {
    res.render('index', {
        model: await RegistrationOS.getRegNumbers(),
        towns: await RegistrationOS.prepopulate(),
    });
})

app.post('/reg_number', async function (req, res, next) {

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
})

app.post('/showFlitter', async function (req, res){
    req.flash('info', await RegistrationOS.getMessage())
    var vele = req.body.town;
    console.log(vele)
    res.render('index', { 
        towns: await RegistrationOS.prepopulate(),
        model : await RegistrationOS.regPlate(req.body.town)})

})

app.get('/showAll', async function(req, res){
    res.render('index', {
        towns: await RegistrationOS.prepopulate(),
        model: await RegistrationOS.getRegNumbers()
    })
})

app.post('/reset', async function (req, res) {
    req.flash('info', 'Database successfully deleted');
    await RegistrationOS.emptyDB();
    res.redirect('/');
})

const PORT = process.env.PORT || 8085;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})
