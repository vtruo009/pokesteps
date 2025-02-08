import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users';
import pokemonsRoutes from './routes/pokemons';

const app = express();
const PORT = process.env.PORT || 4242;

app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);
app.use('/pokemons', pokemonsRoutes);

app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
