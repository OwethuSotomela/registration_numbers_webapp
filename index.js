const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const { Pool } = require("pg");
const session = require('express-session');
const Registration = require('./registration');
const routes = require('./routesFile')

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
const Routes = routes(RegistrationOS);

app.get('/', Routes.home)

app.post('/reg_number', Routes.insertRoute)

app.post('/showFlitter', Routes.showReg)

app.get('/showAll', Routes.showAll)

app.post('/reset', Routes.clear)

const PORT = process.env.PORT || 8085;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})
