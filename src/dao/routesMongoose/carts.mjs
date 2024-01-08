import { Router } from "express";
export const cartsRoutes = Router()
import {ProductCart} from "../../dao/models/cart.models.mjs"
import {Product} from "../../dao/models/products.models.mjs";
import { io} from "../../app.mjs";


cartsRoutes.get('/', async (req, res) => {
    const cartProduct = await ProductCart.find()
    res.send(cartProduct);
})

cartsRoutes.post('/:cId/product/:pId?', async (req, res) => {
    const pId = req.params.pId
    const cId = req.params.cId
    if(pId !== undefined && cId !== undefined) {
        let productDetectedInProdArr
        let productDetectedInProdCartArr 
    try {
        productDetectedInProdArr = await Product.findById(pId)   
        productDetectedInProdCartArr = await ProductCart.findById(cId)  
    } catch(error) {
        return res.status(500).json({ // el return sale de la funcion y evita conflicto con otro catch y reenvio de response
            mensaje: 'Error en Id de Carrito o Id de Producto. Por favor revisar.',
            error: error.message
          })
        }
    try {
        if(productDetectedInProdArr) {
            if(!productDetectedInProdCartArr) {
                const newProductCart = new ProductCart ({
                    title: productDetectedInProdArr.title,
                    quantity: 1
                })
                const productoGuardado = await newProductCart.save();
                res.status(200).json({
                    mensaje: 'Operacion exitosa',
                    producto: productoGuardado
                })
            }
            if(productDetectedInProdCartArr){
                productDetectedInProdCartArr.quantity++
               const savedProduct = await productDetectedInProdCartArr.save();
                res.status(200).json({
                    mensaje: 'Operacion exitosa',
                    producto: savedProduct
                })
        }
        }
           
    }catch(error) {
        res.status(500).json({
            mensaje: 'Error en al intentar registrar producto en base de datos',
            error: error.message
          })
        }
    
    }
    })




// DELETE | Descuenta productos coincidente del carrito y si llega a cero lo elimina del array del carrito.
cartsRoutes.delete('/product/:cId?', async (req, res) => {
    const pId = req.params.pId
    const cId = req.params.cId

    let productDetectedInCartArr
    try {
        productDetectedInCartArr = await ProductCart.findById(cId)

    }catch(error) {
        return res.status(500).json({
            mensaje: 'Id no encohtrado. Operacion cancelada. Reintente',
            error: error.message
          })
    }
    try {
        if (productDetectedInCartArr && productDetectedInCartArr.quantity > 1) {
            productDetectedInCartArr.quantity--
            await productDetectedInCartArr.save()
            return res.status(200).json({
                mensaje: 'Producto restado del carrito',
                producto: productDetectedInCartArr
            })
           
            }
        if (productDetectedInCartArr && productDetectedInCartArr.quantity < 2) {
            await productDetectedInCartArr.deleteOne() 
            return res.status(200).json({
                mensaje: 'Producto eliminado',
                producto: productDetectedInCartArr.title
            })
        }else {        
            return res.status(500).json({
            mensaje: 'Id no encohtrado. Operacion cancelada. Reintente',
            error: error.message
        })}
            
    }catch(error) {
        return res.status(500).json({
            mensaje: 'Id no encohtrado. Operacion cancelada. Reintente',
            error: error.message
        })
    }
})


cartsRoutes.get('/:cId?', async (req, res) => {
    const cId = req.params.cId
    const data = await ProductCart.findById(cId)
    res.send(data)
})
