import { Router } from "express";
import { productManager } from '../../productManager.mjs'

export const productRoutes = Router()

const appProductManager = new productManager('./productos.json','Producto Nuevo', 'Este es un producto prueba', 1500, 'Ruta de imagen', 'abc123', 25)


productRoutes.get('/:pId?', async (req, res) => {
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


// Postea producto definidos por parametros al crer instancia de productManager
productRoutes.post('/', async (req, res) => {
    const newProduct =  appProductManager.addProduct()  
console.log(newProduct)

    res.status(200).json({
        mensaje: 'Operación PUT completada con éxito',
        datosActualizados: newProduct
    })
})


// Datos fijos definidos para pruebas
productRoutes.put('/:pId?', async (req, res) => {
    const pId = req.params.pId
    const data = req.body
    appProductManager.updateProductById(+pId, 'Producto editado con PUT', 'Producto Editado con PUT', 5000, 'Sin imagen', 'dsz321', 105)
  
    res.status(200).json({
    mensaje: 'Operación PUT completada con éxito',
    datosActualizados: data})
})


// Datos fijos definidos para pruebas
productRoutes.delete('/:pId?', async (req, res) => {
   const pId = req.params.pId
   const data = req.body
   appProductManager.deleteProducts(+pId)

   res.status(200).json({
    mensaje: 'Operación DELETE completada con éxito',
    datosActualizados: data})
})