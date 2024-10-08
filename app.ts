import express, { Request, Response, } from 'express';
import connectDB from './database/mongoConnect'
import routes from './routes/usersRoutes'
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
const port: number = 2323;

app.use(cors({
    origin: 'localhost:5173',
    credentials: true
}))
app.use('/api', routes)
app.use(express.json())

connectDB()

app.listen(port, () => {
    console.log(`konek ke ${port}`);
});
