import express from 'express'
import morgan  from 'morgan'
import cors from 'cors'
import taskRoutes from './routes/task.routes'

const app = express()

//setings

app.set('port', process.env.PORT || 3000)

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'));
app.use(cors({}))

//routes
app.use('/api/task', taskRoutes)

export default app;