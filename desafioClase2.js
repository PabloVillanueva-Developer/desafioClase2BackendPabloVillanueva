// Trabjo Pablo Villanueva 
let arrayProductos = []

class managerDeProductos {
    constructor () { // valores de propiedades del objeto inicializados vacios
        this.titulo = ''
        this.descripcion = ''
        this.precio = ''
        this.imagen = ''
        this.id = ''
        this.stock = ''
    }

    agregarProducto (titulo, descripcion, precio, imagen, id, stock, color) {
        if (!titulo || titulo === '') { // Verificaciones de datos ingresados vacios
            console.log(`Error en Valor Titulo. ${this} no registrado. Complete todos los campos correctamente.`)
            return
            }
        if (!descripcion || descripcion === '') {// Verificaciones de datos ingresados vacios
            console.log(`Error en Valor Descripcion. ${this} no registrado. Complete todos los campos correctamente.`)
            return
            }
        if (!precio || precio === '') {// Verificaciones de datos ingresados vacios
            console.log(`Error en Valor Precio. ${this} no registrado. Complete todos los campos correctamente.`);
            return}
        if (!imagen || imagen === '') {// Verificaciones de datos ingresados vacios
            console.log(`Error en Valor Imagen. ${this} no registrado. Complete todos los campos correctamente.`);
            return
            }
        if (!stock || stock === '') {// Verificaciones de datos ingresados vacios
            console.log(`Error en Valor Stock. ${this} no registrado. Complete todos los campos correctamente. `)
            return
            }
        if (!stock || stock === '') {// Verificaciones de datos ingresados vacios
            console.log(`Error en Valor Color. ${this} no registrado. Complete todos los campos correctamente. `)
            return
            }
        
        this.titulo = titulo
        this.descripcion = descripcion
        this.precio = precio
        this.imagen = imagen
        this.id = id 
        for (const elemento of arrayProductos) {
        
            if(this.id === elemento.id) 
                {console.log('ID repetido. Producto no registrado. Reintente con otro codigo ID')
            return}
        } 
        this.stock = stock
        this.color = color
        arrayProductos.push(this)
    } 

    obtenerProducto(idProductoBuscado) {
        let productoEncontrado = false // bandera para validar si se encontro un producto en la iteracion
        for (const elemento of arrayProductos) {
            if (elemento.id === idProductoBuscado) {
                productoEncontrado = true 
                console.log('Producto encontrado: ')
                console.log(elemento)
                break
            } 
        }
        if (!productoEncontrado) { // si el producto no se encuentra, se notifica advertencia por consola.
            console.log('Producto no encontrado')
        }
    }
}

console.log('Ejecucion registro Productos con metodo "agregarProducto":')

//EJECUCION CREACION DE PRODUCTOS | Plantilla (titulo, descripcion, precio, imagen, id, stock)
const producto1 = new managerDeProductos()
producto1.agregarProducto( 'Camisa' , 'Camisa Lino XL', 5000, 'urlCamisaLinoXL', 1 , 10, 'Verde')

const producto2 = new managerDeProductos()
producto2.agregarProducto('Pantalon', 'Pantalon Chino', 25000, 'urlPantalonChino', 1, 7, 'Azul Marino') // ID 1 repetido intencionalmente para prueba

const producto3 = new managerDeProductos()
producto3.agregarProducto('Remera', 'Remera XXL', 7000, 'urlRemeraXXL', 4, 3, 'Rojo')

const producto4 = new managerDeProductos()
producto4.agregarProducto('Camisa', 'Camisa Lino L', 4000, 'urlCamisaLinoLL',1, 50, 'Azul') // ID 1 repetido intencionalmente para prueba


console.log(arrayProductos) // consulta de array luego de la ejecucion del registro
console.log('Ejecucion consulta de Productos por ID con metodo "obtenerProducto":')
producto1.obtenerProducto(10) // ejecucion de consulta de producto por ID iterando sobre arrayProductos