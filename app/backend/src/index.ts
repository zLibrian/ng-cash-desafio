import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import handleErrors from './middleware/handleError';
import userRouter from './router/userRouter';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use('/', userRouter);

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App escutando na porta ${PORT}`);
});
