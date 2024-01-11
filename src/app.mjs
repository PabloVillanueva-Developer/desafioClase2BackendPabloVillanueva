
// CONEXION A BASE DE DATOS MongoDB Atlas via Mongoose de JS
(async() => { 
    try {
        await mongoose.connect('mongodb+srv://PabloVillanueva:coder123@ecommerce.dwcz14k.mongodb.net/ecommerce?retryWrites=true&w=majority')
    } catch(error) {
        console.error('Fallo en la conexion a la Base de Datos. Informe al administrador', error)
    }
})()

const PORT = 8080
const app = express() // Iniciacializacion y activacion de Server mediante Express 
const httpServer = app.listen(PORT, () => {console.log(`Servidor activo escuchando por puerto ${PORT}`)}) // Asignamos la escucha de nuestro servidor a una variable.

import mongoose from 'mongoose'
import { Server } from 'socket.io'
export const io = new Server(httpServer)
import express from 'express'
import handlebars from 'express-handlebars'
import { productRoutes } from '../src/dao/routesMongoose/products.mjs'
import { cartsRoutes } from '../src/dao/routesMongoose/carts.mjs'
import { routerViews, routerViewsRealTimeProducts, } from '../src/dao/routesMongoose/views.router.mjs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { chatRoutes } from '../src/dao/routesMongoose/chat.mjs'
const __filename = fileURLToPath(import.meta.url); //  proporciona la ruta completa al archivo actual, incluyendo el nombre del archivo (app.mjs en este caso).
const __dirname = dirname(__filename); // proporciona la ruta completa al directorio que contiene el archivo actual.



// Codificacion base para express
app.use(express.json()) // configuracion para leer archivos json
app.use(express.urlencoded({extended: true}))

// Configuración de Handlebars como motor de plantillas
app.engine('handlebars',handlebars.engine({ defaultLayout: 'home' })); // Define Handlebars como el motor de plantillas y configura su uso en la aplicación. Establece el layput principal como 'main'
app.set('view engine', 'handlebars'); // Establece 'handlebars' como la extensión de archivo para las plantillas(ej main.handlebars), indicando que se utilizará el motor Handlebars para renderizarlas.
app.set('views', __dirname+'/views' ) // Establece la ruta del directorio de vistas. Indica que las plantillas se encuentran en el directorio 'views' que está ubicado en el mismo directorio que el archivo de configuración.

app.use(express.static(__dirname+'/public'))
app.use('/api/products', productRoutes)
app.use('/api/carts', cartsRoutes)
app.use('/', routerViews)
app.use('/realTimeProducts', routerViewsRealTimeProducts)
app.use('/chat', chatRoutes)













