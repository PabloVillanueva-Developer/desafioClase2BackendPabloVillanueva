import { isUtf8 } from 'buffer'
import { error } from 'console'
import fs from 'fs'
let id = 100000
let productArr = []



class productManager {
    constructor(filePath, title, descripcion, precio, thumbnail, code, stock) {
      
       /*      id++ // Aumenta numeracion automatica */
            this.filePath = filePath
           
                this.checkId() // chequea codigo ID y si esta repetido genera uno diferente. El chequeo de ID es salteado en el proceso de update ID
          
            this.newProduct = {
                id,
                title,
                descripcion, 
                precio,  
                thumbnail,
                code, 
                stock    
                    
            }    
        }
    
        // Metodo para verificar ID en la instancia de cracion de un objeto y evitar la repeticion
        checkId () {    
                const data = fs.readFileSync(this.filePath, 'utf8') // lee el archivo con la lista de productos para verificar si hay datos guardados 
                if(data) {
                    const listaProductosParseada = JSON.parse(data) // Parsea lista de productos a formato de trabajo.
                    productArr = listaProductosParseada
                   const idArr = productArr.map(productId => productId.id)
                   const maxId = Math.max(...idArr)
                   id = maxId + 1
                return id
            }
        }


        // Metodo de consulta de productos registrados
        getProducts = async () => {
            const data = await fs.promises.readFile(this.filePath, 'utf8')
            console.log(data)
        }


        // Metodo para agregar producto a lista de productos.
        addProduct = () => {
           
            const data =  fs.readFileSync(this.filePath, 'utf8') // lee el archivo con la lista de productos para verificar si hay datos guardados 
            if(data) {
                const listaProductosParseada = JSON.parse(data) // Parsea lista de productos a formato de trabajo.
                productArr = (listaProductosParseada) // agrega a productArr la lista descargada del archivo base de datos
            }
            
            productArr.push(this.newProduct) // agrega el nuevo producto instanciado a productArr 
            const listaproductosString = JSON.stringify(productArr) // transforma productArr en JSON
            fs.writeFileSync(this.filePath, listaproductosString, 'utf8') // sobreescribe archivo con los datos del nuevo array nuevos.
        }


        // Metodo para eliminar productos por ID
        deleteProducts = (id) => {
            const data =  fs.readFileSync (this.filePath, 'utf8') // lee el archivo con la lista de productos para verificar si hay datos guardados 
            if(data) {
                const listaProductosParseada = JSON.parse(data) // Parsea lista de productos a formato de trabajo.
                productArr = (listaProductosParseada) // agrega a productArr la lista descargada del archivo base de datos
            }

            try {  productArr = productArr.filter(elemento => elemento.id !== id ) // crea nuevo array excluyendo el id que es coincidente.
            }catch(error) {console.error ('ID no encontrado. No se pudo eliminar el producto especificado.'), error}
            
            const listaproductosString = JSON.stringify(productArr) // transforma productArr en JSON
            fs.writeFileSync(this.filePath, listaproductosString, 'utf8') // sobreescribe archivo con los datos del nuevo array nuevos.
        }


        getProductById = (id) => {
            const data =  fs.readFileSync (this.filePath, 'utf8') // lee el archivo con la lista de productos para verificar si hay datos guardados 
            if(data) {
                const listaProductosParseada = JSON.parse(data) // Parsea lista de productos a formato de trabajo.
                productArr = (listaProductosParseada) // agrega a productArr la lista descargada del archivo base de datos
            }
            for (const elemento of productArr) {
                if(elemento.id === id)
                    console.log(elemento)
            }
        }


        updateProductById = (id, filePath, title, descripcion, precio, thumbnail, code, stock) => {
            let objetoActualizado
            let idCapturado
            const data =  fs.readFileSync (this.filePath, 'utf8') // lee el archivo con la lista de productos para verificar si hay datos guardados 
            if(data) {
                const listaProductosParseada = JSON.parse(data) // Parsea lista de productos a formato de trabajo.
                productArr = (listaProductosParseada) // agrega a productArr la lista descargada del archivo base de datos
            }

            for (const elemento of productArr) {    
            
                if(elemento.id === id) {
                    idCapturado = elemento.id
                    elemento.title = title;
                    elemento.descripcion = descripcion;
                    elemento.precio = precio;
                    elemento.thumbnail = thumbnail;
                    elemento.code = code;
                    elemento.stock = stock;
                    this.newProduct.id = idCapturado;
                    
                    const listaproductosString = JSON.stringify(productArr) // transforma productArr en JSON
            fs.writeFileSync(this.filePath, listaproductosString, 'utf8') // sobreescribe archivo con los datos del nuevo array nuevos.
                    break
                    
                }
              
            }    
           
           
        }
}

const producto1 = new productManager('./desafioClase4.txt','hamburguesa', 'BigMac', 4500, 'rutaDeImagen', 20, 2000) // Crea el objeto a nivel de codigo
/* const producto2 = new productManager('./desafioClase4.txt','sandwich', 'Crispy', 3500, 'rutaDeImagen', 50, 1500) */
/* producto1.addProduct() */ // Agrega el objeto al array a nivel codigo y luego lo persiste en un archivo txt.
/* producto1.addProduct() */
/* 
/* producto1.addProduct() */ 
/* producto1.addProduct()   */
/* producto1.deleteProducts(100002)*/
producto1.updateProductById(100004,'./desafioClase4.txt','HotDog', 'Completo Super XXL', 4500, 'rutaDeImagen', 20, 2000 ) 

/* producto2.addProduct() */
/* const eliminarProducto = new productManager()*/
/* eliminarProducto.removeProduct(100005)  */


// falta ajustar el deleteProducts (busca producto por ID para eliminarlo.)
// luego falta geProductById que debe devolver el producto y mostrarlo como objeto
// Agregar updateProduct que busque por ID y reciba el objeto que debe ser actualizado por parametros (actualiza datos mas no el ID).
