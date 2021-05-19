const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')

const PORT = process.env.PORT || 3300
const mongoose = require('mongoose')

// Database connection
const url ='mongodb://localhost/pizza'
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});


app.use(express.static('public'))


app.use(expressLayout)
app.set('views',path.join(__dirname, "/resources/views"))
app.set('view engine', 'ejs')

require('./routes/web')(app)



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
}) 