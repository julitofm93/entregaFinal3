import mongoose from 'mongoose';
import User from "./User.js";
import Product from "./Product.js"
import Cart from "./Cart.js"
export default class Dao{
    constructor(config){
        this.mongoose = mongoose.connect(config.url,{useNewUrlParser:true}).catch(error=>{
            console.log(error);
            process.exit()
        })
        const timestamp = {timestamps:{createdAt:'created_at',updateAt:'updated_at'}};
        const userSchema = mongoose.Schema(User.schema,timestamp);
        const productSchema = mongoose.Schema(Product.schema,timestamp);
        const cartSchema = mongoose.Schema(Cart.schema,timestamp);
        this.models ={
            [User.model]:mongoose.model(User.model,userSchema),
            [Product.model]:mongoose.model(Product.model,productSchema),
            [Cart.model]:mongoose.model(Cart.model,cartSchema)
        }
    }
    findOne = async(options,entity)=>{
        //Si como DAO no encuentro la entidad, tiro error
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let result = await this.models[entity].findOne(options);
        //Si existe un resultado, quiero pasarlo a un objeto
        return result?result.toObject():null;
    }
    getAll = async(options,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let results = await this.models[entity].find(options);
        return results.map(result=>result.toObject())
    }
    insert = async(document,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        try {
            let instance = new this.models[entity](document);
            let result = await instance.save();
            return result?result.toObject():null
        } catch (error) {
            console.log(error);
            return null
        }
    }
    update = async(document,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let id = document._id;
        delete document._id;
        let result = await this.models[entity].findByIdAndUpdate(id,{$push:document},{new:true})
        return result
    }
    delete = async(id,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let result = await this.models[entity].findByIdAndDelete(id);
        return result?result.toObject():null;
    }
    exists = async(entity,options)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        return this.models[entity].exists(options)
    }

}