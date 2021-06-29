import { Router } from "express";
import staysController from "./stays";

const router = Router();

router.use("/stays", staysController);

export default router;
