import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
	const sql = neon(`${process.env.DATABASE_URL || ''}`);

	try {
		const { newStepGoal, userId } = await request.json();

		await sql`
            UPDATE users
            SET step_goal = ${newStepGoal}
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
