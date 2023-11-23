
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from 'swagger-jsdoc'; 
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import cors from 'cors'
import morgan from 'morgan'
import errorMiddleware from './middewares/errorMiddleware.js'

const app = express()

//env file config
dotenv.config()

connectDB()
//swagger api config
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Job Portal application',
        description: 'Node express js Job-Portal application',
      },
      servers: [
        {
          url: 'http://localhost:5000',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ['./routes/*.js'],
  };

const spec=swaggerDoc(options)





//cors
app.use(cors())
app.use(morgan("dev"))

//middleware 
app.use(express.json())
app.use('/api/V1/test',testRoutes)
app.use('/api/V1/auth',authRoutes)
app.use('/api/V1/user',userRoutes)
app.use('/api/V1/job',jobRoutes)


//HomeRoutes
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(spec))



//errorMiddleware

app.use(errorMiddleware)

//Port
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Node server  running in ${process.env.DEV_MODE} mode on port no ${PORT} `)
})