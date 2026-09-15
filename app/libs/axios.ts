import axios from 'axios';

export const axiosFetcher = async (apiLink: string) => {
	console.log('token', process.env.NEXT_PUBLIC_AUTH_TOKEN)
	
	const response = await axios.get(apiLink, {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
		},
	});
  
	return response.data;
}
