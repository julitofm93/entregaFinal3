export default class GenericQueries{
    constructor(dao,model){
        this.dao = dao;
        this.model = model;
    }
    getBy = async(options)=>{
        return this.dao.findOne(options,this.model);
    }
    getAll = async(options)=>{
        return this.dao.getAll(options,this.model);
    }
    save = async(document)=>{
        return this.dao.insert(document,this.model)
    }
    update = async(id,document)=>{
        document._id = id;
        return this.dao.update(document,this.model)
    }
    delete = async(id)=>{
        return this.dao.delete(id,this.model)
    }
    addToCart = async (cartId,prodId)=> {
        try {
            let search = await this.dao.findOne(cartId,this.model)
            console.log(search)
            if (search) {
                let result = await this.dao.update(prodId,this.model)
                return {status:"success", message:"producto agregado"}
            } else {
                return {status:"error", message:"no se encontró el carrito"}
            }
        } catch (err) {
            console.log(err)
            return {status:"error",message:err}
        }
    }
    
    
}