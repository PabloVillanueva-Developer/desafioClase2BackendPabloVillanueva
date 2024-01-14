import { Router } from "express";
import { productManager } from '../routesFS/productManager.mjs'
import { io } from "../../app.mjs"
import { Product } from "../../dao/models/products.models.mjs";

export const productRoutes = Router()
 

productRoutes.get('/:pId?', async (req, res) => {
    let productos

    const limit = req.query.limit;
    const page = req.query.page;
    let sort = req.query.sort;
    let query 
    let key
    if (req.query.category) {
        query = req.query.category
        key = 'category'
    } else if (req.query.available) {
       query = req.query.available
       key = 'available'
    } else {query = undefined}

    const pId = req.params.pId;

    // switch para determinar valor de sort segun el dato pasado por parametro en la query
    switch(sort){
    case 'asc': sort = 1
    break;
    case 'desc': sort = -1
    break;
    default: sort = undefined
    break;
    }

     if (limit !== undefined && page !== undefined) { // si hay limit y page definidos, procesar la info segun el siguiente proceso
        try {
            const skip = (page -1 ) * limit
            if(sort !== undefined) { // si sort es asc o desc
                    if (query !== undefined) {
                       productos = await Product.find({ [key]: query }).sort({ price: sort }).skip(skip).limit(limit).exec(); // si query es category o available filtrar por ese parametro
                    } else { 
                        productos = await Product.find({}).sort({'price': sort }).skip(skip).limit(limit).exec();
                    }
               
            } else { // si sort es undefined, no aplicar filtro sort en resultado de base de datos
                    if (query !== undefined) {
                        productos = await Product.find({[key]: query}).skip(skip).limit(limit).exec();
                    } else {
                        productos = await Product.find({}).skip(skip).limit(limit).exec();
                    }
            }
            res.json ({
                status: 'succes',
                payload: productos
            })
      
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error en limite definido',
                error: error.message
            });
        }

    } else if (limit !== undefined) { // Si solo el limite esta definido activar el siguiente proceso.
        try {
            let limitedProduct
            if(sort !== undefined) {
                    if (query !== undefined) {
                        limitedProduct = await Product.find({[key]: query }).sort({ price: sort}).limit(limit).exec();
                    } else { limitedProduct = await Product.find({}).sort({ price: sort}).limit(limit).exec();}
            } else {
                    if (query !== undefined) {
                        limitedProduct = await Product.find({[key]: query }).limit(limit).exec();
                    } else { limitedProduct = await Product.find({}).limit(limit).exec();}
            }
            res.send(limitedProduct);

        } catch (error) {
            res.status(500).json({
                mensaje: 'Error en limite definido',
                error: error
            });
        }

    }  else if (pId !== undefined) {
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
    
})
;


// Postea producto definidos por parametros al crer instancia de productManager
productRoutes.post('/', async (req, res) => {
    try {   
        let nuevoProducto
        if(req.body.available !== "yes" || req.body.available !== "no") {
           
        // Toma la informacion enviada en el body de la solicitud POST
            nuevoProducto = new Product({ // Creamos una instancia del objeto Product creado en Mongoose Model
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                thumbnail: req.body.thumbnail,
                code: req.body.code,
                stock: req.body.stock,
                status: req.body.status,
                available: req.body.available,
                category: req.body.category
            });
        } else { throw new Error}
        console.log(nuevoProducto)
        const productoGuardado = await nuevoProducto.save();
        const listaProductosCompleta = await Product.find()
            
            io.emit('actualizacionListaProductos', listaProductosCompleta) // Este socket emite info al socket receptor de index.mjs cliente para que lo renderice
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
    
   
    io.emit('actualizacionListaProductos', await Product.find())

   res.status(200).json({
        mensaje: 'Operación DELETE completada con éxito',
        datosActualizados: productToDelete
    })
    } catch(error) {
    res.status(500).json({error: 'Error al modificar el producto', mensaje: error.message})
    }
})