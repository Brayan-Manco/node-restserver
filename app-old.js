const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', (req, res) =>{
    res.send('Hello Word')
})

app.listen(process.env.PORT, () => {
    console.log('Aplicacion corriendo en el puerto', process.env.PORT)
});
