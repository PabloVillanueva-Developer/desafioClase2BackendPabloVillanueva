import { isUtf8 } from 'buffer'
import { error } from 'console'
import fs from 'fs'
let id = 100000
let productArr = []

class productManager {
    constructor(filePath, title, descripcion, precio, thumbnail, code, stock) {
      
       /*      id++ // Aumenta numeracion automatica */
            this.filePath = filePath
            
            this.checkId() // chequea codigo ID y si esta repetido genera uno diferente.
        
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
                    productArr = (listaProductosParseada)
                    for (const elemento of productArr) {
                        if(elemento.id === id) {
                           id = ++elemento.id
                        }
                    }
                return id
            }
        }


        // Metodo de consulta de productos registrados
        getProducts = async () => {
            const data = await fs.promises.readFile(this.filePath, 'utf8')
            console.log(data)
        }



        // Metodo para agregar producto a lista de productos.
        addProduct = async () => {
            try {
            const data = await fs.promises.readFile(this.filePath, 'utf8') // lee el archivo con la lista de productos para verificar si hay datos guardados 
            if(data) {
                const listaProductosParseada = await JSON.parse(data) // Parsea lista de productos a formato de trabajo.
                productArr = (listaProductosParseada) // agrega a productArr la lista descargada del archivo base de datos
            }
            } catch(error) {console.log(error)}
            
            productArr.push(this.newProduct) // agrega el nuevo producto instanciado a productArr 
            const listaproductosString = JSON.stringify(productArr) // transforma productArr en JSON
            await fs.promises.writeFile(this.filePath, listaproductosString, 'utf8') // sobreescribe archivo con los datos del nuevo array nuevos.
        }


        deleteProducts = async (id, code) => {
            try {
                const data = await fs.promises.readFile(this.filePath, 'utf8') // lee el archivo con la lista de productos para verificar si hay datos guardados 
                if(data) {
                const listaProductosParseada = JSON.parse(data) // Parsea lista de productos a formato de trabajo.
                productArr = (listaProductosParseada) // agrega a productArr la lista descargada del archivo base de datos
                }
                } catch(error) {console.log(error)}
            for (const elemento of productArr) {
                if(id, code)
                    productArr.splice(elemento) // elimina el producto coincidente instanciado a productArr 
                    const listaproductosString = JSON.stringify(productArr) // transforma productArr en JSON
                    await fs.promises.writeFile(this.filePath, listaproductosString, 'utf8') // sobreescribe archivo con los datos del nuevo array nuevos.
            }
        }
}

const producto1 = new productManager('./desafioClase4.txt','hamburguesa', 'BigMac', 4500, 'rutaDeImagen', 20, 2000)
/* const producto2 = new productManager('./desafioClase4.txt','sandwich', 'Crispy', 3500, 'rutaDeImagen', 50, 1500) */

producto1.getProducts()

/* producto2.addProduct() */
/* const eliminarProducto = new productManager()
eliminarProducto.removeProduct(100001) */


// falta ajustar el deleteProducts (busca producto por ID para eliminarlo.)
// luego falta geProductById que debe devolver el producto y mostrarlo como objeto
// Agregar updateProduct que busque por ID y reciba el objeto que debe ser actualizado por parametros (actualiza datos mas no el ID).
