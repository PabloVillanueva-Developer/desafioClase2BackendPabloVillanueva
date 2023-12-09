import express from 'express'
import { productRoutes } from './routes/products.mjs'
import { cartsRoutes } from './routes/carts.mjs'
const PORT = 8080
const app = express()


// Iniciacializacion y activacion de Server mediante Express por puerto 8080 

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(PORT, () => {
    console.log(`Servidor activo escuchando por puerto ${PORT}`)
})

app.use('/api/products', productRoutes)
app.use('/api/carts', cartsRoutes)
