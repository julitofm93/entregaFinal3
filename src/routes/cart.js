import express from 'express'
import { cartService } from '../services/services.js';

const router = express.Router();


//GET - Devuelve todos los productos
router.get('/',(req,res)=>{
    cartService.getAll().then(result=>{
        res.send({message:"HOLA",result})
    })
})

//GET - Devuelve un carrito según su ID
router.get("/:id", async (req,res)=> {
    const {cartId} = req.params;
    const data = await cartService.getBy({cartId}).then(result=>{
        res.send(result)
    })
})

//POST - Crea un carrito
router.post("/",(req,res)=> {
    cartService.save(req.query.user).then(result=>{
        console.log("Creado")
        res.send(result);
    })
})

router.post("/:id/productos/:id_prod",(req,res)=> {
    const {id}= req.params.id
    const id_prod= req.params.id_prod
    cartService.addToCart({id},id_prod).then(result=>{
        res.send(result);
    })
})

//POST - Recibe y agrega un producto, y lo devuelve con su ID asignado
router.post('/upload', /* authMiddleware, */ /* upload.single('image'), */(req,res)=>{
    let file = req.file;
    let event = req.body;
/*     let newDate = new Date()
    event.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename;
    event.timestamp = newDate.toLocaleString() */
    productService.save(event).then(result=>{
        res.send({message:"BIEN",result});
        })
})

export default router;