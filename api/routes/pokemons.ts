import { neon } from '@neondatabase/serverless';
import express from 'express';

const router = express.Router();
const sql = neon(process.env.DATABASE_URL || '');

router.post('/:userId/unlock-pokemon', async (req, res) => {
	try {
		const { userId } = req.params;

		const { newPokemonId } = req.body;

		await sql.transaction([
			sql`
		    INSERT INTO user_pokemons (user_id, pokemon_id)
		    VALUES (${userId}, ${newPokemonId});`,
			sql`UPDATE users
			SET has_unlocked_today = true
			WHERE user_id = ${userId};
		`,
		]);

		res.status(204).end();
	} catch (error) {
		res
			.status(500)
			.json({ error: `POST request failed: ${(error as Error).message}` });
	}
});

router.get('/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		const response = await sql`
            SELECT * FROM pokemons
            LEFT JOIN user_pokemons
            ON pokemons.id = user_pokemons.pokemon_id
            AND user_pokemons.user_id = ${userId};
        `;

		res.status(200).json({ data: response });
	} catch (error) {
		res
			.status(500)
			.json({ error: `POST request failed: ${(error as Error).message}` });
	}
});

router.get('/:userId/locked-pokemon-ids', async (req, res) => {
	try {
		const { userId } = req.params;

		const response = await sql`
			SELECT array_agg(id) FROM
                ( SELECT id FROM pokemons
                    EXCEPT
                    SELECT * FROM (
                        SELECT pokemon_id FROM user_pokemons
                        WHERE user_id = ${userId}
                    ) t
                    ORDER BY id
                ) as result
		`;

		res.status(200).json({ data: response[0].array_agg });
	} catch (error) {}
});

export default router;
