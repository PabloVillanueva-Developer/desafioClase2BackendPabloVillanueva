  const socket = io();
  let outputData = document.getElementById('outPutData')

  let title = document.getElementById('Title')
  let description = document.getElementById('Description')
  let price = document.getElementById('Price')
  let thumbnail = document.getElementById('Thumbnail')
  let code = document.getElementById('Code')
  let stock = document.getElementById('Stock')
  let available = document.getElementById('Available')
  let category = document.getElementById('Category')
  let idInput = document.getElementById('idInput')
  let mail = document.getElementById('Mail')
  let message = document.getElementById('Message')
  let postData
  let sendData

  const postClick = async () => {
      try {
          postData = {
          "title":title.value,
          "description": description.value,
          "price": price.value,
          "thumbnail":thumbnail.value,
          "code":code.value,
          "stock":stock.value,
          "status":true,
          "available": available.value,
          "category": category.value
      }
        if(postData.available !== 'yes' && postData.available !== 'no') {
        throw new Error ('Se produjo un error en el campo "Available". Solo se permiten "yes" o "no"')
        }
        // Realiza una solicitud POST al servidor y espera la respuesta
          const response = await axios.post('/api/products', postData);
          console.log('Respuesta del servidor:', response.data);       

      } catch (error) {
          console.error('Error en la solicitud:', error.message);
      }
  };

  const deleteClick = async () => {
      try {
          const idValue = idInput.value
        // Solicitud DELETE al servidor y espera la respuesta
          const response = await axios.delete(`/api/products/${idValue}`);
          console.log('Respuesta del servidor:', response.data);
          socket.emit('clicEnBoton', idValue); 
      } catch (error) {
      console.error('Error en la solicitud:', error);
      }
  };


const sendClick = async () => {
    try {
        sendData = {
        "user": mail.value,
        "message": message.value,
    }
      // Realiza una solicitud POST al servidor y espera la respuesta
        const response = await axios.post('/chat', sendData);
        console.log('Respuesta del servidor:', response.data);       

    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};

const sendResetClick = async () => {
  try {
      const response = await axios.delete('/chat', sendData);
      console.log('Respuesta del servidor:', response.data);       

  } catch (error) {
      console.error('Error en la solicitud:', error);
  }
};

  // Agrega un evento de clic al botón

  const postButton = document.getElementById('postButton');
  const deleteButton = document.getElementById('deleteButton')
  const sendButton = document.getElementById('sendButton')
  const resetChat = document.getElementById('resetChat')
  if(postButton) {
      postButton.addEventListener('click', postClick);
  }
  if(deleteButton) {
      deleteButton.addEventListener('click', deleteClick)
  }
  if(sendButton){
      sendButton.addEventListener('click', sendClick)
  }
  if(resetChat) {
    resetChat.addEventListener('click', sendResetClick)
  }
  
  // Socket receptor de lista de productos desde metodo POST de products.mjs
  socket.on('actualizacionListaProductos', (nuevaListaProductos) => {
    const parsedData = JSON.stringify(nuevaListaProductos);
    outputData.innerHTML = parsedData
  });

  socket.on('chatCompleto', (chatActualizado) => {
    const parsedData = JSON.stringify(chatActualizado);
    const nuevoParrafo = document.createElement('p');
    nuevoParrafo.textContent = parsedData;
    outputData.appendChild(nuevoParrafo);
   /*  outputData.innerHTML = parsedData */
  });

  socket.on('deletChat', (chatActualizado) => {
    outputData.innerHTML = chatActualizado
  });




  // reseta inputs luego de cargarse datos
  // activar el delete
  // luego queda avanzar con el chat.

