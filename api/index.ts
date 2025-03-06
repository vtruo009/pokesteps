import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users';
import pokemonsRoutes from './routes/pokemons';
import accountsRoutes from './routes/accounts';

const app = express();
const PORT = process.env.PORT || 4242;

app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);
app.use('/pokemons', pokemonsRoutes);
app.use('/accounts', accountsRoutes);

app.get('/', (req, res) => {
	res.send('Express on Vercel');
});

app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});

module.exports = app;
