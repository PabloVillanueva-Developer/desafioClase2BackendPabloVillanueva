import express from 'express'
import fs from 'fs'
import { userRoutes } from './routes/user.routs.mjs'
import { petsRouts } from './routes/pets.routs.mjs'
import { productManager } from '../productManager.mjs'
import { parse } from 'path'

const appProductManager = new productManager('./productManager.json')


// Iniciacializacion y activacion de Server mediante Express por puerto 8080 
const PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(PORT, () => {
    console.log(`Servidor activo escuchando por puerto ${PORT}`)
})

app.get('/products/:pId?',async (req, res) => {
    const limit = req.query.param1
    const pId = req.params.pId
    let data = await appProductManager.getProducts() // trae el resultado completo de los datos guardados en productManager.json |
    const parsedProudctFile = JSON.parse(data) // parsea el resultado de productManager.json para trabajar los datos adecudamente

    if(limit !== undefined) {
        if(parsedProudctFile.length > limit) {
            let resultArray = []
            let contador = 0
            for (const elemento of parsedProudctFile) {
                    if(contador < limit ) {
                            resultArray.push(elemento)
                    }
                    contador++
            }
            res.send(resultArray)
        }else{res.send(parsedProudctFile)}
    }
        
    else if (+pId > 0) {
            let selectedProduct = await appProductManager.getProductById(+pId)
            if (selectedProduct !== undefined) {
                res.send(selectedProduct)
            }
            else {res.send('Id no encontrado')}
            }

    else {
        res.send(parsedProudctFile) }
})