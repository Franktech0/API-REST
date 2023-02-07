//levantamos el servidor
const express = require('express'); //cargamos el modulo expressJS
const mogoose = require("mongoose");//cargamos el modulo mongoose para la conexxion a ala base de datos
require("dotenv").config();
const userRoutes = require("./routes/user");
const studentRoutes = require("./routes/student");
const classRoomRoutes = require("./routes/classroom");
const cors = require('cors');



const app = express();//aplicacion
const port = process.env.PORT ||9000;//si se despliga en un servidor externo toma su puerto sino, ocupa el 9000

//solucionnado porblemas de cors
app.use(cors());//permitimos cualquir origen


//middleware //codigo antes de abrir el cuerpo del api
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", studentRoutes);
app.use("/api", classRoomRoutes);

//routes 
app.get("/", (req, res)=>{
    res.send("bienvenido a mi API");
});


//conexion a mongodb
mogoose
.connect(process.env.MONGODB_URI)//utilizamos nuestra variable de enterono)
.then(()=>console.log("Conectado a MongoDB atlas"))
.catch((error) => console.error(error));

app.listen(port, ()=> console.log("el servidor esta escuchando en la puerta: " + port));//el servidor va a escruchar en la puerta 9000

