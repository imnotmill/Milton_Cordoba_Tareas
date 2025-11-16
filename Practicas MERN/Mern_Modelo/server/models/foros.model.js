import mongoose from "mongoose";

const forosSchema = mongoose.Schema(
    {
        title : {
            type : String,
            minlength : [5, "El titulo sebe de ser al menos de 5 caracteres"],
            required : [true, "El titulo es obligatorio"],
            unique : true
        },
        description : {
            type: String,
            minlength : [10, "La descripción debe tener al menos 10 caracteres"],
            required : [true, "Debes agregar una descrpción descripción"],
            unique : true
        },
        category : {
            type : String,
            minlength : [5, "La categoría debe tener al menos 5 caracteres"],
            required : [true, "La categoría es obligatoria"],
            
        },
        author : {
            type : String,
            minlength : [5, "El autor debe tener al menos 5 caracteres"],
            required : [true, "El autor es obligatorio"]
        }
    },
    {timestamps : true}
)


const Foros = mongoose.model('foros',forosSchema)

export {Foros,forosSchema } ;