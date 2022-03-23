import dotenv from 'dotenv'
dotenv.config()
export default {
    mongo:{
        url:process.env.MONGO_URL||'mongodb://localhost:21017/adoptme'
    },
    session:{
        ADMIN:process.env.ADMIN,
        PASSWORD:process.env.PASSWORD
    },
    jwt:{
        SECRET:process.env.JWT_SECRET
    }
}