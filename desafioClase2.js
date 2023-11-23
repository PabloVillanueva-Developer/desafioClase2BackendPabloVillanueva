// Trabjo Pablo Villanueva 
let arrayProductos = []
let contadorId = 0


class productManager {
    constructor () { // valores de propiedades del objeto inicializados vacios
   

        this.titulo = ''
        this.descripcion = ''
        this.precio = ''
        this.imagen = ''
        this.code = ''
        this.id = ''
        this.stock = ''
        this.color = ''
    }
    
    addProduct (titulo, descripcion, precio, imagen, code, stock, color) {
        contadorId++
    
        if (!titulo || !descripcion || !precio || !imagen || !code || !stock || !color || titulo === '' || descripcion === '' || precio === '' || imagen === '' || code === '' || stock === '' || color === '' || titulo === '')
         { // Verificaciones de datos ingresados vacios
            console.log(`Producto con Error en los datos ingresados. Producto No registrado`)
            return
        }
        
        this.titulo = titulo
        this.descripcion = descripcion
        this.precio = precio
        this.imagen = imagen
        this.id = contadorId
        
            this.code = code
        for (const elemento of arrayProductos) {
            if(this.code === elemento.code) 
                {console.log('Code repetido. Reintente con otro codigo ID')
            return}
        } 
        this.stock = stock
        this.color = color
        arrayProductos.push(this)
    } 

    getProduct(codeProductoBuscado) {
        let productoEncontrado = false // bandera para validar si se encontro un producto en la iteracion
        for (const elemento of arrayProductos) {
            if (elemento.code === codeProductoBuscado) {
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

    getProductByID(idProductoBuscado) {
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
            console.log('ID no encontrado')
        }
    }
}

console.log('Ejecucion registro Productos con metodo "agregarProducto":')

//EJECUCION CREACION DE PRODUCTOS | Plantilla (titulo, descripcion, precio, imagen, code, stock)
console.log('Instancia Array vacio creada = ')
console.log(arrayProductos)
const prueba = new productManager()
prueba.addProduct('Producto de prueba', 'Este es un producto de prueba', 200, 'Sin Imagen', 'abc123', 25, 'Sin Color')
console.log('Mostrando Producto de Prueba incorporado al array')
console.log(arrayProductos)

const producto1 = new productManager()
console.log('Prueba de Metodo addProduct')
producto1.addProduct( 'Camisa' , 'Camisa Lino XL', 5000, 'urlCamisaLinoXL', "AG21" , 10, 'Verde')

const producto2 = new productManager()
producto2.addProduct('Pantalon', 'Pantalon Chino', 25000, 'urlPantalonChino', "AB30", 7, 'Azul Marino') // ID 1 repetido intencionalmente para prueba

const producto3 = new productManager()
producto3.addProduct('Remera', 'Remera XXL', 7000, 'urlRemeraXXL', "BC10", 3, 'Rojo')

const producto4 = new productManager()
producto4.addProduct('Camisa', 'Camisa Lino L', 4000, 'urlCamisaLinoLL', "UF63", 1,  'Azul') // ID 1 repetido intencionalmente para prueba


console.log(arrayProductos) // consulta de array luego de la ejecucion del registro
console.log('Prueba de metodo de consulta de Productos por CODE con metodo "getProduct":')
producto1.getProduct("UF63") // ejecucion de consulta de producto por ID iterando sobre arrayProductos
console.log('Prueba de metodo de consulta de Productos por ID con metodo "getProductByID":')
producto1.getProductByID(2) // ejecucion de consulta de producto por ID iterando sobre arrayProductos