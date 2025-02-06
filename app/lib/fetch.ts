export async function fetchAPI(url: string, options?: RequestInit) {
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
}
