import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
	const sql = neon(`${process.env.DATABASE_URL || ''}`);

	try {
		const { userId, randomId } = await request.json();

		if (!userId || !randomId) {
			return Response.json(
				{ error: 'Missing required field(s)' },
				{ status: 400 }
			);
		}

		await sql.transaction([
			sql`
		    INSERT INTO user_pokemons (
		        user_id,
		        pokemon_id
		    )
		    VALUES (
		        ${userId},
				${randomId}
		    );`,
			sql`UPDATE users
			SET has_unlocked_today = true
			WHERE user_id = ${userId};
		`,
		]);

		return new Response(
			JSON.stringify({
				status: 201,
			})
		);
	} catch (error) {
		return Response.json(
			{ error: `POST request failed: ${error}` },
			{ status: 500 }
		);
	}
}
