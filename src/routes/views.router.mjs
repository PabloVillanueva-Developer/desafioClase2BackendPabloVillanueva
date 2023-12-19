import { Router } from "express";
import { productManager } from "../../productManager.mjs";
const appProductManager = new productManager('./productos.json')
export const routerViews = Router()
export const routerViewsRealTimeProducts = Router()
let productsData
import { io } from "../app.mjs";


// Test de renderizado
routerViews.get('/', async (req, res) => {
  // Renderiza la vista 'home' con Handlebars
    productsData = await appProductManager.getProducts()
    res.render('index',  {productsData}); // En app.engine(app.mjs) establecemos que el layout principal sea main, luego todos los render van hacerlo dentro de main por defecto
  });


// Renderizar Vista con datos originales en file productos.json
  routerViewsRealTimeProducts.get('/', async (req, res) => {
    productsData = await appProductManager.getProducts();
    res.render('realTimeProducts', { productsData });
});

 


