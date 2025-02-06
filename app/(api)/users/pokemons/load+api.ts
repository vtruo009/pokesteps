import { neon } from '@neondatabase/serverless';

export async function GET(request: Request, { userId }: { userId: string }) {
	try {
		const sql = neon(`${process.env.DATABASE_URL || ''}`);

		const response = await sql`
			SELECT * FROM pokemons
			LEFT JOIN user_pokemons
			ON pokemons.id = user_pokemons.pokemon_id
			AND user_pokemons.user_id = ${userId};
		`;

		return new Response(JSON.stringify({ data: response }), { status: 200 });
	} catch (error) {
		return Response.json(
			{ error: `GET request failed: ${error}` },
			{ status: 500 }
		);
	}
}
