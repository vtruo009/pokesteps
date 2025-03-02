import { neon } from '@neondatabase/serverless';
import * as express from 'express';

const router = express.Router();
const sql = neon(process.env.DATABASE_URL || '');

router.post('/:userId', async (req, res) => {
	try {
		const { userId } = req.params;

		const { email, password } = req.body;
		if (!email || !password) {
			throw new Error('Missing email or password');
		}

		const response = await sql`
			INSERT INTO users (user_id, email, password)
			VALUES (${userId}, ${email}, ${password})
			RETURNING *;
		`;

		res.status(201).json({ data: response[0] });
	} catch (error) {
		res
			.status(500)
			.json({ error: `POST request failed: ${(error as Error).message}` });
	}
});

router.patch('/:userId/step-goal', async (req, res) => {
	try {
		const { userId } = req.params;

		const { newStepGoal } = req.body;
		if (!newStepGoal) {
			res.status(400).json({ error: 'Missing new step goal' });
		}

		await sql`
			UPDATE users
            SET step_goal = ${newStepGoal}
            WHERE user_id = ${userId};
		`;

		res.json({ status: 200 });
	} catch (error) {
		res
			.status(500)
			.json({ error: `PATCH request failed: ${(error as Error).message}` });
	}
});

router.patch('/:userId/unlocked-status', async (req, res) => {
	try {
		const { userId } = req.params;

		const { unlockedStatus } = req.body;

		await sql`
			UPDATE users
			SET has_unlocked_today = ${unlockedStatus}
			WHERE user_id = ${userId};
		`;

		res.json({ status: 200 });
	} catch (error) {
		res
			.status(500)
			.json({ error: `PATCH request failed: ${(error as Error).message}` });
	}
});

router.get('/:userId', async (req, res) => {
	try {
		const { userId } = req.params;

		const response = await sql`
			SELECT * FROM users WHERE user_id = ${userId};
		`;

		res.status(200).json({ data: response[0] });
	} catch (error) {
		res
			.status(500)
			.json({ error: `GET request failed: ${(error as Error).message}` });
	}
});

export default router;
