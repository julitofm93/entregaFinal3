import express from 'express';
import passport from 'passport';
import initializePassport from './config/passport-config.js';
import sessionRouter from  './routes/sessions.js'
import productsRouter from './routes/products.js'
import cartRouter from './routes/cart.js'
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());
app.use('/session',sessionRouter)
app.use('/products',productsRouter)
app.use('/cart',cartRouter)

/* app.get("/products",(req,res)=>{
    res.send({message:"hola"})
}) */