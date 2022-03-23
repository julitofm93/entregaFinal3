import express from 'express'
import upload from '../utils/uploader.js';
import { productService } from '../services/services.js';
import config from '../config/config.js';

const router = express.Router();


//GET - Devuelve todos los productos
router.get('/',(req,res)=>{
    productService.getAll().then(result=>{
        res.send(result)
    })
})

//GET - Devuelve un productos según su name
router.get('/:name', async (req,res)=>{
    const {prodName} = req.params;
    const data = await productService.getBy({prodName}).then(result=>{
        res.send(result)
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


//GET - Devuelve un producto según su ID
/* router.get('/:pid',(req,res)=>{
    let id = req.params.pid;
    id = parseInt(id)
    productService.getById(id).then(result=>{
        res.send(result);
    })
})  */




//PUT - Recibe y actualiza un producto según si ID
router.put('/:pid', /* authMiddleware, */ (req,res)=>{
    let body = req.body;
    let id = parseInt(req.params.pid)
    products.update(id,body).then(result=>{
        res.send(result)
    })
})

//DELETE - Elimina un producto según su ID
router.delete('/:pid', /* authMiddleware, */async (req,res)=>{
    await products.deleteById(req.params.id).then(result=>{
        res.send(result);
    })
})





export default router;