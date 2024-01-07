import { Router } from "express";
import { productManager } from '../routesFS/productManager.mjs'
import { io } from "../../app.mjs"
import { Product } from "../../dao/models/products.models.mjs";

export const productRoutes = Router()

const appProductManager = new productManager('./productos.json','Producto Nuevo', 'Este es un producto prueba', 1500, 'Ruta de imagen', 'abc123', 25)


productRoutes.get('/:pId?', async (req, res) => {
    const limit = req.query.param1;
    const pId = req.params.pId;

    if (limit !== undefined) {
        try {
            const limitedProduct = await Product.find().limit(limit);
            res.send(limitedProduct);
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error en limite definido',
                error: error
            });
        }
    } else if (pId !== undefined) {
        console.log('entramos al pId');
        try {
            const productById = await Product.findById(pId);
            res.send(productById);
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error en id definido',
                error: error
            });
        }
    } else {
        // Si ni limit ni pId están definidos, devolver todos los productos
        const data = await Product.find();
        res.send(data);
    }
});


// Postea producto definidos por parametros al crer instancia de productManager
productRoutes.post('/', async (req, res) => {
    try {
    // Toma la informacion enviada en el body de la solicitud POST
    const nuevoProducto = new Product({ // Creamos una instancia del objeto Product creado en Mongoose Model
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        code: req.body.code,
        stock: req.body.stock,
        status: req.body.status
    });

    const productoGuardado = await nuevoProducto.save();
    io.emit('actualizacionListaProductos', productoGuardado) // Este socket emite info al socket receptor de index.mjs cliente para que lo renderice
 
    res.status(200).json({
        mensaje: 'Operación POST completada con éxito',
        datosActualizados: productoGuardado
    })
    }catch(error) {
        res.status(500).send({error: 'Error al crear el producto', mensaje: error.message})
    }
})

productRoutes.put('/:pId?', async (req, res) => {
    const pId = req.params.pId
    const data = req.body
try {
    const productToUpdate = await Product.findById(pId)

    // Si el body tiene alguna modificacion, se modifica productToUpdate, caso contrario permanece el valor original.
    productToUpdate.title = req.body.title ||  productToUpdate.title
    productToUpdate.description = req.body.description || productToUpdate.description
    productToUpdate.price = req.body.price || productToUpdate.price
    productToUpdate.thumbnail = req.body.thumbnail || productToUpdate.thumbnail 
    productToUpdate.code = req.body.code || productToUpdate.code
    productToUpdate.stock = req.body.stock ||  productToUpdate.stock
    
    const updatedProduct = await productToUpdate.save();
   /*  appProductManager.updateProductById(+pId, 'Producto editado con PUT', 'Producto Editado con PUT', 5000, 'Sin imagen', 'dsz321', 105) */
  
    res.status(200).json({
    mensaje: 'Operación PUT completada con éxito',
    datosActualizados: updatedProduct
    })
    }catch(error) {
        res.status(500).send({error: 'Error al modificar el producto', mensaje: error.message})
    }
})


// Datos fijos definidos para pruebas
productRoutes.delete('/:pId?', async (req, res) => {
   const pId = req.params.pId
  /*  const data = req.body */
   try {
        const productToDelete = await Product.findById(pId)
        await productToDelete.deleteOne()
        console.log(productToDelete)
        if(!productToDelete) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            })
        }
    
   
    io.emit('actualizacionListaProductos', productToDelete)

   res.status(200).json({
        mensaje: 'Operación DELETE completada con éxito',
        datosActualizados: productToDelete
    })
    } catch(error) {
    res.status(500).json({error: 'Error al modificar el producto', mensaje: error.message})
    }
})