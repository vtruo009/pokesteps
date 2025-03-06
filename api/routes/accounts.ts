import { neon } from '@neondatabase/serverless';
import * as express from 'express';

const router = express.Router();
const sql = neon(process.env.DATABASE_URL || '');

router.patch('/:email/password', async (req, res) => {
	const { email } = req.params;
	const { password } = req.body;

	try {
		await sql`
			UPDATE test
			SET password = ${password}
			WHERE email = ${email};
		`;

		res.status(200).end();
	} catch (error) {
		res
			.status(500)
			.json({ error: `PATCH request failed: ${(error as Error).message}` });
	}
});

router.get('/:email', async (req, res) => {
	const { email } = req.params;

	if (!email) {
		res.status(400).json({ error: 'Missing email' });
		return;
	}

	try {
		const response = await sql`
			SELECT * FROM test WHERE email = ${email};
		`;

		if (response.length === 0) {
			res.status(404).json({ error: 'User not found in get request' });
			return;
		}

		res.status(200).json({ data: response[0] });
	} catch (error) {}
});

export default router;
