import { Account, Client, ID } from 'react-native-appwrite';

export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.vantruong.Pokesteps',
	projectId: '67a121780008aa706a61',
	storageId: '67a1234700051042a105',
};

const client = new Client();

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform);

const account = new Account(client);

export const createUser = (name: string, email: string, password: string) => {
	console.log(`Creating user... ${name} ${email} ${password}`);
	account.create(ID.unique(), email, password, name).then(
		function (response) {
			console.log(response);
		},
		function (error) {
			console.log(error);
		}
	);
};
