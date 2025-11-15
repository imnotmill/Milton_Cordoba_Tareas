import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            minlength: [3, "El nombre debe tener al menos 3 caracteres"]
        },
        lastname: {
            type: String,
            required: [true, "El apellido es obligatorio"],
            minlength: [3, "El apellido debe tener al menos 3 caracteres"]
        },
        email: {
            type: String,
            required: [true, "El email es obligatorio"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "La contraseña es obligatoria"],
            minlength: [8, "La contraseña debe tener al menos 8 caracteres"]
        }
    }, {timestamps: true}
)

userSchema.virtual('passwordConfirm').get(
    function(){
        return this._passwordConfirm;
    }
    ).set(function(value){
    this._passwordConfirm = value;
});

userSchema.pre('validate', function(next){
    if(this.password !== this.passwordConfirm){
        this.invalidate('passwordConfirm', 'Las contraseñas no coinciden')
    }
    next(); 
})
    
userSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10).then((ecnryptedPass)=> {
        this.password = ecnryptedPass;
        next();
    })
})

const User = mongoose.model('Users', userSchema)

export {User, userSchema}