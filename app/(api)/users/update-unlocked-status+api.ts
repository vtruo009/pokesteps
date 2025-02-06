import { neon } from '@neondatabase/serverless';

export async function PATCH(request: Request) {
	const sql = neon(`${process.env.DATABASE_URL || ''}`);

	try {
		const { userId } = await request.json();

		await sql`
            UPDATE users
            SET has_unlocked_today = false
            WHERE user_id = ${userId};
        `;

		return new Response(JSON.stringify({ status: 200 }));
	} catch (error) {
		return Response.json(
			{ error: `POST request failed: ${error}` },
			{ status: 500 }
		);
	}
}
