import mongoose from 'mongoose';

let Schema = mongoose.Schema
export default class User{
    constructor(data){
        this.data=data;
    }
    static get model(){
        return 'Users';
    }
    static get schema(){
        return{
            first_name:String,
            last_name:String,
            password:String,
            role:String,
            email:String,
            phone:String,
            cart:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'cart'
            }],
            profile_picture:String
        }
    }
}

User.model