import { Router } from "express";
export const chatRoutes = Router()
import { Chat } from "../models/chat.models.mjs";
import { io } from "../../app.mjs";

// Vista para el CHAT
chatRoutes.get('/', async (req, res) => {
    try {
    const chatMessages = await Chat.find({}, {_id: 0, __v: 0})
    res.render('chat', { chatMessages });
  }catch(error) {
    res.status(500).json({
      mensaje: 'Error en metodo GET de RealTimeProducts.handlebars',
      error: error.message
    })
  }
  });
  
  chatRoutes.post('/', async (req, res) => {
    try {
    const user = req.body.user
    const message = req.body.message
    const newMessage = {
    user: user,
      message: message
    }
    console.log(newMessage)
    const chatMessages = await Chat.create(newMessage)

    const mensajeSinId = chatMessages.toObject();
    delete mensajeSinId._id;
    delete mensajeSinId.__v;

    const fullChat = await Chat.find({}, {_id: 0, __v: 0})

    io.emit('chatCompleto', mensajeSinId) // Este socket emite info al socket receptor de index.mjs cliente para que lo renderice
    /* hatMessages = {
      
    } */
    res.render('chat', { chatMessages });
  }catch(error) {
    res.status(500).json({
      mensaje: 'Error en metodo GET de RealTimeProducts.handlebars',
      error: error.message
    })
  }
  });
  

  chatRoutes.delete('/', async (req, res) => {
    try {
    
    await Chat.deleteMany()
    const fullChat = await Chat.find()

    io.emit('deletChat', fullChat) // Este socket emite info al socket receptor de index.mjs cliente para que lo renderice
   
    res.render('chat', { fullChat });
  }catch(error) {
    res.status(500).json({
      mensaje: 'Error en metodo GET de RealTimeProducts.handlebars',
      error: error.message
    })
  }
  });