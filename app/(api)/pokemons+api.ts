import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
	try {
		const sql = neon(`${process.env.DATABASE_URL || ''}`);

		const { id, name, types, weight, height } = await request.json();

		if (!id || !name || !types || !weight || !height) {
			return Response.json(
				{ error: 'Missing required field(s)' },
				{ status: 400 }
			);
		}

		const response = await sql`
            INSERT INTO pokemons (
                id,
                name,
                types,
                weight,
                height
            )
			OVERRIDING SYSTEM VALUE
            VALUES (
                ${id},
                ${name},
                ${types},
                ${weight},
                ${height}
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

export async function GET() {
	try {
		const sql = neon(`${process.env.DATABASE_URL || ''}`);

		const response = await sql`
			SELECT * FROM pokemons
		`;

		return new Response(JSON.stringify({ data: response }), { status: 200 });
	} catch (error) {
		return Response.json(
			{ error: `GET request failed: ${error}` },
			{ status: 500 }
		);
	}
}
