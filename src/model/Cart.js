import mongoose from 'mongoose';

let Schema = mongoose.Schema;
export default class Cart{
    constructor(data){
        this.data=data;
    }
    static get model(){
        return 'Cart';
    }
    static get schema(){
        return {
            user: {type:String, unique:true},
            productos: {
                type: [{
                     type: mongoose.Schema.Types.ObjectId,
                     ref: 'Product',
                 }],
                 default: []
             }
         }

        }
    }