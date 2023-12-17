const socket = io();
let productData = [];

socket.on('productData', (data) => {
    // Actualizar la interfaz de usuario con los nuevos datos
    productData = data;
    console.log('Datos actualizados:', productData);
});

socket.on('productAdded', () => {
    // Aquí deberías emitir el evento 'updateProductData' para solicitar datos actualizados
    socket.emit('updateProductData'); // Solo emite el evento sin enviar datos
});

socket.on('updateProductData', (data) => {
    // Actualizar la interfaz de usuario con los nuevos datos
    productData = data;
    console.log('Datos actualizados después de la adición de productos:', productData);
});