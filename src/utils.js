import bcrypt from 'bcrypt';
import {fileURLToPath} from 'url';
import {dirname} from 'path';


export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password)
export const cookieExtractor = req =>{
    let token = null;
    if(req&&req.cookies){
        token=req.cookies["JWT_COOKIE"];
    }
    return token;
}


const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const authMiddleware = (req,res,next)=> {
    if(!req.auth){ 
        res.status(403).send({error:-2,message:"No autorizado"})
        console.log(`${req.originalUrl} with method ${req.method} are Not Authorised `)
    } else {
        next()
    }
}

export default __dirname;

