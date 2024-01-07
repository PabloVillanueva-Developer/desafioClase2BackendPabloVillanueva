import fs from 'fs'
let id = 1
let quantity = 1
let cartArr = []
let cid = 3000
let globalCartArr = [] 


export class cartManager {
    constructor(filePath, product) {
            this.filePath = filePath
            
            this.checkId()
            this.newProduct = {
                id, // asigna el ID luego de la verif. de repitencia en checkId()
                product,
                quantity      
            }    
        }


        // Funcion refactorizadora de Codigo | Lee Base de datos
        consultarBaseDatos() {
            const data = fs.readFileSync(this.filePath, 'utf8') // lee el archivo con la lista de productos para verificar si hay datos guardados 
            if(data) {
                const listaProductosParseada = JSON.parse(data) // Parsea lista de productos a formato de trabajo.
                cartArr = listaProductosParseada
                return cartArr    
            }  else {return cartArr = []}   
        }

        // Funcion refactorizadora de Codigo | Sobreescribe Base de datos
        guardarBaseDatos(arr) {
            const listaproductosString = JSON.stringify(arr) // transforma cartArr en JSON
            fs.writeFileSync(this.filePath, listaproductosString, 'utf8') // sobreescribe archivo con los datos del nuevo array nuevos.
        }
    

        // Metodo para verificar ID en la instancia de cracion de un objeto y evitar la repeticion
        checkId () {     
            this.consultarBaseDatos()
            if(cartArr.length === 0) {return cid}
            else {
                const idArr = cartArr.map(productId => productId.cid)
                const maxId = Math.max(...idArr)
                id = maxId + 1
                return id
            }
        }


        // Metodo de consulta de productos registrados
        getProducts = async () => {
            const data = await fs.promises.readFile(this.filePath, 'utf8')
            return data
        }


        // Metodo para agregar producto a lista de productos.
        addProduct = (newProduct) => {
            cartArr.push(newProduct) // agrega el nuevo producto instanciado a cartArr 
            this.guardarBaseDatos(cartArr)
        }


        // Metodo para eliminar productos por ID
        deleteProducts = async (id) => {
            this.consultarBaseDatos()
            try { 
                cartArr[0].products = await cartArr[0].products.filter(elemento => elemento.id !== id ) // crea nuevo array excluyendo el id que es coincidente.

            }catch(error) {console.error ('ID no encontrado. No se pudo eliminar el producto especificado.'), error}
            this.guardarBaseDatos(cartArr)
        }


        getProductById = async (id) => {
            let selectedProduct
            const cartArr = await this.consultarBaseDatos()
            for (const elemento of cartArr) {
                
                if(elemento.id === +id) {                   
                    selectedProduct = elemento
                    return selectedProduct
                }
            }
        }


        updateProductById = (id, products) => {
            let objetoActualizado
            let idCapturado
            this.consultarBaseDatos()
            for (const elemento of cartArr) {    
                if(elemento.id === id) { // Sobreescribre propiedades del elemento con coincidencia de Id
                    idCapturado = elemento.id
                    elemento.products = products;
                    
                    this.guardarBaseDatos(cartArr)
                    break
                }
            }    
        }


        createCart = async () => {
            const newCart = {
                    cid: 'abc' + cid,
                    products: []
            }
            globalCartArr.push(newCart)

            return globalCartArr
        }   
}

/* const pruebaCarrito = new cartManager('./carrito.json', 'Carrito Prueba')
pruebaCarrito.addProduct() */