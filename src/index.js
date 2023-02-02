//levantamos el servidor
const express = require('express'); //cargamos el modulo expressJS

const app = express();//aplicacion
const port = process.env.PORT ||9000;//si se despliga en un servidor externo toma su puerto sino, ocupa el 9000

app.listen(port, ()=> console.log("el servidor esta escuchando en la puerta: " + port));//el servidor va a escruchar en la puerta 9000

