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
import { upload } from "../../middlewares/upload.middleware";


const router = Router();

router.post("/", create);      
router.get("/", getAll);       
router.get("/:id", auth, getOne);    
router.delete("/:id", remove); 
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.put(
  "/:id",
  auth,
  upload.single("profilePicture"),
  update
);



export default router;
