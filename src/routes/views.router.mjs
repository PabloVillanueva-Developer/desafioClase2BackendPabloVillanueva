import { Router } from "express";
import { productManager } from "../../productManager.mjs";
import { io } from "../app.mjs";
const appProductManager = new productManager('./productos.json')
export const routerViews = Router()
export const routerViewsRealTimeProducts = Router()
export let productsData


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

    io.on('connection', (socket) => {
      console.log('Server 2: Nuevo cliente conectado');
    
      // Escuchar el evento de handshake desde server1
      socket.on('handshake', (message) => {
        console.log('Server 2 recibió handshake:', message);
      });
 

});
  })


    





  
 


