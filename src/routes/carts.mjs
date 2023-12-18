import { Router } from "express";
import { cartManager } from '../../cartManager.mjs'
const appCartManager = new cartManager('./carrito.json', 'Agua Saborizada', [2])
const appProductManager = new cartManager('./productos.json')
export const cartsRoutes = Router()
import { io} from "../app.mjs";


cartsRoutes.get('/', async (req, res) => {
    const data = await appCartManager.getProducts()
    res.send(data)
})


// POST RAIZ | Crea objeto carrito vacio
cartsRoutes.post('/', async (req, res) => { // Directorio raiz crea carrito de array
    const cartArr = await appCartManager.createCart() 

    res.status(200).json({
        message: `Nuevo carrito creado`,
        data: `El cartID (cid) es ${cartArr.cid}, el contenido del carrito esta vacio: ${cartArr.products}`
    })
    appCartManager.guardarBaseDatos(cartArr)
})


// POST AGREGAR PRODUCTOS AL CARRITO | Verifica los productos dsiponibles de productos.json y si coincide lo agrega a carrito.json
// Si no existe el producto en carrito.json lo agrega, si existe lo suma.
cartsRoutes.post('/:cId/product/:pId?', async (req, res) => {
    const pId = req.params.pId
    const cid = req.params.cId
   
    const prodArr = await appProductManager.consultarBaseDatos()
    const cartArr = await appCartManager.consultarBaseDatos()
    const productDetectedInProdArr = await prodArr.find(elemento => elemento.id === +pId); // verifica si algun producto en cartArr es igual al producto instanciado de prueba
    const productDetectedInCartArr = await cartArr[0].products.find(elemento =>  elemento.id === +pId )
  
        if (productDetectedInProdArr) {
            if(!productDetectedInCartArr) {
                const newProductToCart = {
                    id: productDetectedInProdArr.id,
                    title: `${productDetectedInProdArr.title}`,
                    quantity: 1
                }
                cartArr[0].products.push(newProductToCart);
                
                appCartManager.guardarBaseDatos(cartArr)
                res.status(200).json({
                    message: `(${newProductToCart.title}) agregado al carrito`,
                    quantity: 1
                })

            }if (productDetectedInCartArr) {
                    for (const elemento of cartArr[0].products) {
                        if (elemento.id === productDetectedInCartArr.id ) {                       
                            elemento.quantity++
                            appCartManager.guardarBaseDatos(cartArr)
                            res.status(200).json({
                                message: `(${elemento.title}) agregado al carrito`,
                                quantity: `${elemento.quantity}`
                            })
                        }
                    }
                }
        } else { res.status(400).json({
            message: `Producto no encontrado. Codigos disponibles:  ${  JSON.stringify(prodArr)}`,
            })
        }
})


// DELETE | Descuenta productos coincidente del carrito y si llega a cero lo elimina del array del carrito.
cartsRoutes.delete('/:cId/product/:pId?', async (req, res) => {
    const pId = req.params.pId
    const cid = req.params.cId
   
    const prodArr = await appProductManager.consultarBaseDatos()
    const cartArr = await appCartManager.consultarBaseDatos()
    const productDetectedInProdArr = await prodArr.find(elemento => elemento.id === +pId); // verifica si algun producto en cartArr es igual al producto instanciado de prueba
    const productDetectedInCartArr = await cartArr[0].products.find(elemento =>  elemento.id === +pId )
  
        if (productDetectedInProdArr) {
            if (productDetectedInCartArr) {
                    for (const elemento of cartArr[0].products) {
                        if (elemento.id === productDetectedInCartArr.id ) {                       
                            elemento.quantity--
                            if(elemento.quantity === 0) {
                                appCartManager.deleteProducts(productDetectedInCartArr.id)
                            }
                            appCartManager.guardarBaseDatos(cartArr)
                            res.status(200).json({
                                message: `(${elemento.title}) eliminado del carrito`,
                                quantity: `${elemento.quantity}`
                            })
                        }
                    }
            }else { res.status(400).json({
                message: `Producto no encontrado. Codigos disponibles:  ${JSON.stringify(prodArr)}`, 
                })
            } 
        }
})


cartsRoutes.get('/:cId?', async (req, res) => {
    const cId = req.params.cId
    const data = await appCartManager.getProductById(cId)
    res.send(data)
})
