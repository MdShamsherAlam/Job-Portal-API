import express from 'express';
import { loginAdmin, userRegister } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastName
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: ID should be auto-incremented
 *         name:
 *           type: string
 *           description: User name
 *         lastName:
 *           type: string
 *           description: User last name
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password, should be greater than 6 characters
 *         location:
 *           type: string
 *           description: User location
 *       example:
 *         id: hsdfdf
 *         name: shamsher
 *         lastName: alam
 *         email: sha@gmail.com
 *         password: sdfkjsd1
 *         location: mumbai
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */

// For register user
router.post('/register', userRegister);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login page
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Something went wrong
 */

// For login
router.post('/login', loginAdmin);

export default router;
