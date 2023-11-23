import express from 'express';
import { createJob, getJobs, getJobById, updateJob, deleteJob, jobStatsController } from '../controllers/jobController.js';
import userAuth from '../middewares/isAuthMiddleware.js';

const router = express.Router();


/**
 * @swagger
 * /api/v1/job/post-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               workType:
 *                 type: string
 *                 enum: ['Full-time', 'Part-time', 'Contract', 'Freelance']
 *               status:
 *                 type: string
 *                 enum: ['reject', 'interview', 'pending']
 *               workLocation:
 *                 type: string
 *               createdBy:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - company
 *               - position
 *               - workType
 *               - workLocation
 *               - createdBy
 *     responses:
 *       '200':
 *         description: Job created successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.post('/post-job', userAuth, createJob);


// Get all jobs
/**
 * @swagger
 * /api/v1/job/:
 *   get:
 *     summary: Get all jobs
 *     tags: [Job]
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal Server Error
 */

// Get all jobs
router.get('/', getJobs);

/**
 * @swagger
 * /api/v1/job/{jobId}:
 *   get:
 *     summary: Get a specific job by ID
 *     tags: [Job]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: ID of the job
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Job not found
 *       '500':
 *         description: Internal Server Error
 */

// Get a specific job by ID
router.get('/:jobId', getJobById);
/**
 * @swagger
 * /api/v1/job/{jobId}/update:
 *   patch:
 *     summary: Update a job
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: ID of the job
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               workType:
 *                 type: string
 *                 enum: ['Full-time', 'Part-time', 'Contract', 'Freelance']
 *               status:
 *                 type: string
 *                 enum: ['reject', 'interview', 'pending']
 *               workLocation:
 *                 type: string
 *             required:
 *               - company
 *               - position
 *     responses:
 *       '200':
 *         description: Job updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Job not found
 *       '500':
 *         description: Internal Server Error
 */
// Update a job (requires authentication)
router.patch('/:jobId/update', userAuth, updateJob);

/**
 * @swagger
 * /api/v1/job/delete-job/{jobId}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: ID of the job
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Job deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Job not found
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/delete-job/:jobId',userAuth,deleteJob)


/**
 * @swagger
 * /api/v1/job/job-stats:
 *   get:
 *     summary: Get job stats for the authenticated user
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
// GET /jobs/user - Get all jobs for the authenticated user
router.get('/job-stats', userAuth, jobStatsController);


export default router;
