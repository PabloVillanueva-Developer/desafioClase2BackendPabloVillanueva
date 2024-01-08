import mongoose from "mongoose";

const productCartSchema = new mongoose.Schema ({
      title: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    
})

 export const ProductCart = mongoose.model('ProductCart', productCartSchema, 'carts'); // ('nombre modelo', 'schema a utilizar', 'nombre de la coleccion' )

