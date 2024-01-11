import { Router } from "express";
import { Product } from "../../dao/models/products.models.mjs";

/* const appProductManager = new productManager('./productos.json') */
export const routerViews = Router()
export const routerViewsRealTimeProducts = Router()

let productsData
import { io } from "../../app.mjs";


// Vista basica para consultar base de datos o por ID
routerViews.get('/routerViews/:pId?', async (req, res) => {
  const pId = req.params.pId
  const limit = req.query.limit
  // Renderiza la vista 'home' con Handlebars
  try{
    if(!pId) {
        productsData = await Product.find().limit(limit)
        res.render('index',  {productsData}); // En app.engine(app.mjs) establecemos que el layout principal sea main, luego todos los render van hacerlo dentro de main por defecto
        return
      } else {
      productsData = await Product.findById(pId)
      res.render('index',  {productsData}); 
      return
    }
    }catch(error) {
      res.status(500).json({
        mensaje: "Error en id",
        error: error.message
      })
    }
  });


// Vista que permite crear productos por formulario. Tambien permite borrarlos por Id
  routerViewsRealTimeProducts.get('/products/', async (req, res) => {
    try {
    const productsData = await Product.find()
    res.render('realTimeProducts', { productsData });
  }catch(error) {
    res.status(500).json({
      mensaje: 'Error en metodo GET de RealTimeProducts.handlebars',
      error: error.message
    })
  }
});


 


