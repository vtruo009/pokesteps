import { neon } from '@neondatabase/serverless';

export async function GET(
	request: Request,
	{ deviceId }: { deviceId: string }
) {
	const sql = neon(`${process.env.DATABASE_URL || ''}`);

	try {
		const response = await sql`
		    SELECT * FROM users
            WHERE id = ${deviceId}
		`;
		return new Response(JSON.stringify({ data: response }), { status: 200 });
	} catch (error) {
		return Response.json(
			{ error: `GET request failed: ${error}` },
			{ status: 500 }
		);
	}
}
