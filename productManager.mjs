import fs from 'fs'
let id = 100000
let productArr = []


export class productManager {
    constructor(filePath, title, descripcion, price, thumbnail, code, stock) {
          
            this.filePath = filePath
            
            this.checkId()
            this.newProduct = {
                id, // asigna el ID luego de la verif. de repitencia en checkId()
                title,
                descripcion, 
                price,  
                thumbnail,
                code, 
                stock,
                stauts: true
                    
            }    
        }


        // Funcion refactorizadora de Codigo | Lee Base de datos
        consultarBaseDatos() {
            const data = fs.readFileSync(this.filePath, 'utf8') // lee el archivo con la lista de productos para verificar si hay datos guardados 
            if(data) {
                const listaProductosParseada = JSON.parse(data) // Parsea lista de productos a formato de trabajo.
                productArr = listaProductosParseada
            }  else {productArr = []}            
        }

        // Funcion refactorizadora de Codigo | Sobreescribe Base de datos
        guardarBaseDatos() {
            const listaproductosString = JSON.stringify(productArr) // transforma productArr en JSON
            console.log(listaproductosString)
            fs.writeFileSync(this.filePath, listaproductosString, 'utf8') // sobreescribe archivo con los datos del nuevo array nuevos.
        }
    

        // Metodo para verificar ID en la instancia de cracion de un objeto y evitar la repeticion
        checkId () {     
            this.consultarBaseDatos()
            if(productArr.length === 0) {return id}
            else {
                const idArr = productArr.map(productId => productId.id)
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
        addProduct = () => {
            productArr.push(this.newProduct) // agrega el nuevo producto instanciado a productArr 
            this.guardarBaseDatos()
        }


        // Metodo para eliminar productos por ID
        deleteProducts = (id) => {
            this.consultarBaseDatos()

            try {  productArr = productArr.filter(elemento => elemento.id !== id ) // crea nuevo array excluyendo el id que es coincidente.
            }catch(error) {console.error ('ID no encontrado. No se pudo eliminar el producto especificado.'), error}
            
            this.guardarBaseDatos()
        }


        getProductById = (id) => {
            let selectedProduct
            this.consultarBaseDatos()
            for (const elemento of productArr) {
                if(elemento.id === id) {
                    selectedProduct = elemento
                    return selectedProduct
                }
            
            }
        }


        updateProductById = (id, title, descripcion, price, thumbnail, code, stock) => {
            let objetoActualizado
            let idCapturado
            this.consultarBaseDatos()
            for (const elemento of productArr) {    
                if(elemento.id === id) { // Sobreescribre propiedades del elemento con coincidencia de Id
                    idCapturado = elemento.id
                    elemento.title = title;
                    elemento.descripcion = descripcion;
                    elemento.price = price;
                    elemento.thumbnail = thumbnail;
                    elemento.code = code;
                    elemento.stock = stock;
                    this.newProduct.id = idCapturado;
                    
                    this.guardarBaseDatos()
                    break
                    
                }
            }    
        }
}


// EJECUCION DE TEST
/* const productoPrueba1 = new productManager('./productManager.json','Producto Prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25) // Crea el objeto a nivel de codigo
/* console.log(productoPrueba1) */ 
/* productoPrueba1.addProduct() */
/* productoPrueba1.getProducts() */
/* productoPrueba1.getProductById(100001) */
/* productoPrueba1.updateProductById(100000,'./productManager.json','HotDog', 'Completo Super XXL', 4500, 'rutaDeImagen', 20, 2000 )  */  // desactivar addProduct para esta prueba
/* productoPrueba1.deleteProducts(100000)  */// desactivar resto de los metodos para esta prueba



