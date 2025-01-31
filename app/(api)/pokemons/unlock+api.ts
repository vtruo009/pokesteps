import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
	const sql = neon(`${process.env.DATABASE_URL || ''}`);

	try {
		const { userId, pokemonId } = await request.json();

		if (!userId || !pokemonId) {
			return Response.json(
				{ error: 'Missing required field(s)' },
				{ status: 400 }
			);
		}

		const response = await sql`
            INSERT INTO user_pokemons (
                user_id,
                pokemon_id
            )
            VALUES (
                ${userId},
                ${pokemonId}
            )
        `;

		return new Response(JSON.stringify({ data: response }), { status: 201 });
	} catch (error) {
		return Response.json(
			{ error: `POST request failed: ${error}` },
			{ status: 500 }
		);
	}
}
