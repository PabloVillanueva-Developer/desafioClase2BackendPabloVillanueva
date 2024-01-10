  const socket = io();
  let outputData = document.getElementById('outPutData')
  let inputData = document.getElementById('inPutData')

  let title = document.getElementById('Title')
  let description = document.getElementById('Description')
  let price = document.getElementById('Price')
  let thumbnail = document.getElementById('Thumbnail')
  let code = document.getElementById('Code')
  let stock = document.getElementById('Stock')
  let idInput = document.getElementById('idInput')
  let postData


  const postClick = async () => {

      try {
          postData = {
          "title":title.value,
          "description": description.value,
          "price": price.value,
          "thumbnail":thumbnail.value,
          "code":code.value,
          "stock":stock.value,
          "status":true
      }
        console.log(postData)
        // Realiza una solicitud POST al servidor y espera la respuesta
          const response = await axios.post('/api/products', postData);
          console.log('Respuesta del servidor:', response.data);       

      } catch (error) {
          console.error('Error en la solicitud:', error);
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

  // Agrega un evento de clic al botón
  const postButton = document.getElementById('postButton');
  const deleteButton = document.getElementById('deleteButton')
  postButton.addEventListener('click', postClick);
  deleteButton.addEventListener('click', deleteClick)

  // Socket receptor de lista de productos desde metodo POST de products.mjs
  socket.on('actualizacionListaProductos', (nuevaListaProductos) => {
    const parsedData = JSON.stringify(nuevaListaProductos);
    outputData.innerHTML = parsedData

  });

  // reseta inputs luego de cargarse datos
  // activar el delete
  // luego queda avanzar con el chat.

