require('dotenv').config();

const express = require('express');
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');
const connection = require('./config/database');
const { getHomepage } = require('./controllers/homeController');
const startOrderCron = require('./jobs/orderCron');
const seedData = require('./jobs/seedData');
const cors = require('cors');
const path = require('path')
const app = express(); 

const port = process.env.PORT || 8888;
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
configViewEngine(app);

const webAPI = express.Router();
webAPI.get("/", getHomepage);
app.use('/', webAPI);

app.use('/v1/api/', apiRoutes);
app.use('/v1/admin/', adminRoutes);

(async () => {
    try {
        await connection();
        console.log("mongo ok")
        // Seed data on startup
        await seedData();
        startOrderCron();
        app.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to DB: ", error)
    }
})()