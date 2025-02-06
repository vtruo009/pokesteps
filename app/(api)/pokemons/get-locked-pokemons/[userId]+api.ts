import { neon } from '@neondatabase/serverless';

export async function GET(request: Request, { userId }: { userId: string }) {
	const sql = neon(`${process.env.DATABASE_URL || ''}`);

	try {
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
		return new Response(JSON.stringify({ data: response[0].array_agg }), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
	}
}
