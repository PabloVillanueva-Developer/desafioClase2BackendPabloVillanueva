import express from 'express'
import fs from 'fs'
/* import { productManager } from '../productManager.mjs' */

// Iniciacializacion y activacion de Server mediante Express por puerto 8080 
const PORT = 8080
const app = express()
app.use(express.urlencoded({extended: true}))
app.listen(PORT, () => {
    console.log(`Servidor activo escuchando por puerto ${PORT}`)
})

app.get('/products/:pId?',async (req, res) => {
    const limit = req.query.param1
    const pId = req.params.pId
    const productFile = await fs.promises.readFile('./productManager.json')
    const parsedProudctFile = JSON.parse(productFile)

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
            let selectedProduct
            for (const elemento of parsedProudctFile) {
                if (elemento.id === +pId) {
                    selectedProduct = elemento
                }
            }
            if (selectedProduct !== undefined) {
                res.send(selectedProduct)
            }
            else {res.send('Id no encontrado')}
            }

    else {res.send(parsedProudctFile) }
})