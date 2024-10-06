import express, { Request, Response, } from 'express';
import connectDB from '../database/mongoConnect'
import routes from '../routes/usersRoutes'

const app = express();
const port: number = 2323;

app.use('/api', routes)

connectDB()

app.listen(port, () => {
    console.log(`konek ke ${port}`);
});
