import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
	const sql = neon(`${process.env.DATABASE_URL || ''}`);

	try {
		const { userId, email, password } = await request.json();
		console.log(userId, email, password);

		if (!email || !password) {
			return Response.json(
				{ error: 'Missing required field(s)' },
				{ status: 400 }
			);
		}

		const response = await sql`
			INSERT INTO users (
				user_id,
				email,
				password
			)
		    VALUES (
				${userId},
		        ${email},
		        ${password}
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
