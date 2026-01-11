import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  login,
  resetPassword,
  forgotPassword,
} from "../controllers/user.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", create);      
router.get("/", getAll);       
router.get("/:id", auth, getOne);    
router.put("/:id", auth, update);    
router.delete("/:id", remove); 
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


export default router;
