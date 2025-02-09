import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.js';
import pokemonsRoutes from './routes/pokemons.js';

const app = express();
const PORT = process.env.PORT || 4242;

app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);
app.use('/pokemons', pokemonsRoutes);

app.get('/', (req, res) => {
	res.send('Hello!');
});

app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});

export default app;
