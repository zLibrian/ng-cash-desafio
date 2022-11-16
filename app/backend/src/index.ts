import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', async (_req, res) => res.json({ message: 'Hello World!' }));

app.listen(PORT, () => {
  console.log(`App escutando na porta ${PORT}`);
});
