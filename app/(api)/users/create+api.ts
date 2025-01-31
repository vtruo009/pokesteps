import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
	const sql = neon(`${process.env.DATABASE_URL || ''}`);

	try {
		const { deviceId } = await request.json();

		if (!deviceId) {
			return Response.json(
				{ error: 'Missing required field(s)' },
				{ status: 400 }
			);
		}

		const response = await sql`
		    INSERT INTO users (
		        id
		    )
			OVERRIDING SYSTEM VALUE
		    VALUES (
		        ${deviceId}
		    )
		`;

		return new Response(JSON.stringify({ data: response }), { status: 200 });
	} catch (error) {
		return Response.json(
			{ error: `POST request failed: ${error}` },
			{ status: 500 }
		);
	}
}
