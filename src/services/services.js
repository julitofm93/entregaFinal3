import Dao from "../model/Dao.js";
import ProductService from "./productService.js";
import UserService from "./userService.js";
import CartService from "./cartService.js"
import config from "../config/config.js";

const dao = new Dao(config.mongo);

export const userService = new UserService(dao)
export const productService = new ProductService(dao);
export const cartService = new CartService(dao)
