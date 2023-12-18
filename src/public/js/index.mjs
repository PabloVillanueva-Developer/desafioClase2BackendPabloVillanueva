const socket = io();
let outputData = document.getElementById('outPutData')
let inputData = document.getElementById('inPutData')
console.log(inputData)


socket.on('actualizacionListaProductos', (nuevaListaProductos) => {
    outputData.innerHTML = nuevaListaProductos
    socket.emit('envioListaActualizadaIndex-App', nuevaListaProductos )
  });


  
const postData = {
    "title":"productTest",
    "description":"Este es un producto de prueba",
    "price":"200",
    "thumbnail":"sin imagen",
    "code":"aba",
    "stock":"16",
    "status":"true"
}



const postClick = async () => {
    try {
      // Realiza una solicitud POST al servidor y espera la respuesta
        const response = await axios.post('/api/products', postData);
        console.log('Respuesta del servidor:', response.data);       
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};


const deleteClick = async () => {
    try {
        const inputValue = inputData.value.trim()
      // Solicitud POST al servidor y espera la respuesta
        const response = await axios.delete(`/api/products/${inputValue}`);
        console.log('Respuesta del servidor:', response.data);
        socket.emit('clicEnBoton', { mensaje: 'Se hizo clic en el botón POST' }); 
    } catch (error) {
    console.error('Error en la solicitud:', error);
    }
};


// Agrega un evento de clic al botón
const postButton = document.getElementById('POSTbutton');
const deleteButton = document.getElementById('DELETEbutton')
postButton.addEventListener('click', postClick);
deleteButton.addEventListener('click', deleteClick)


