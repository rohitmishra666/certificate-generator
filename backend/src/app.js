import express  from 'express'
import certificateRouter from './routes/certificate.routes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.use('/api/certificate', certificateRouter);

export default app;