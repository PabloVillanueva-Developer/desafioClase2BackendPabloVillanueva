import mongoose from "mongoose";



const productSchema = new mongoose.Schema ({
      title: {
        type: String,
        required: true,
        unique: true
        
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    code:  {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    available: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

export const Product = mongoose.model('Product', productSchema, 'products'); // ('nombre modelo', 'schema a utilizar', 'nombre de la coleccion' )

