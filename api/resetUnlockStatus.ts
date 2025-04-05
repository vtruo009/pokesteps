import { VercelRequest, VercelResponse } from '@vercel/node';

const resetUnlockStatus = async (req: VercelRequest, res: VercelResponse) => {
	if (req.method !== 'GET' && req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	try {
		await fetch(`https://pokesteps.vercel.app/accounts/reset-unlocked-status`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return res
			.status(200)
			.json({ message: 'Unlocked status reset successfully!' });
	} catch (error) {
		res
			.status(500)
			.json({ error: `Error resetting unlocked status for all users` });
	}
};

export default resetUnlockStatus;
