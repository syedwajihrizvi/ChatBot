import express from 'express';
import dotenv from 'dotenv';
import router from './route';

dotenv.config();

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use('/api/chat', router);

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
