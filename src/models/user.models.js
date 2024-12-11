import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    refreshToken:{
        type: String
    }
    
},{timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePasswords = async function (candidatePass) {
    return await bcrypt.compare(candidatePass, this.password);
}

userSchema.methods.generateAccessTokens = function(){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
}

userSchema.methods.generateRefreshTokens = function(){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
        }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '12d'});
}

export const User = mongoose.model('User', userSchema);