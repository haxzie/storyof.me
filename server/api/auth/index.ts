import { Router } from "express";
import {
    register,
    logIn,
    checkIfUsernameExists,
    _logIn_checks,
    _register_checks,
    _username_checks
} from "./controller";

const router = Router();

router.post('/login', _logIn_checks, logIn);

router.post('/signup', _register_checks, register);

router.post('/check_username', _username_checks, checkIfUsernameExists);

// TODO: Create endpoints for google signup

export default router;