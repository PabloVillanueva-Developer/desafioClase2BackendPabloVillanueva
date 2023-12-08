import express from 'express'
import { productRoutes } from './routes/products.mjs'





// Iniciacializacion y activacion de Server mediante Express por puerto 8080 
const PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(PORT, () => {
    console.log(`Servidor activo escuchando por puerto ${PORT}`)
})

app.use('/api/products', productRoutes)
