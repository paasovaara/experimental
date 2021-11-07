import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { processenv } from 'processenv';

const config: AxiosRequestConfig = {
	baseURL: 'https://api.harvestapp.com/api/v2/',
	headers: {
		'Content-Type': 'application/json',
		'Harvest-Account-ID': `${processenv('HARVEST_ACCOUNT_ID')}`,
		'User-Agent': 'Harvest-Mepco transformer',
		'Authorization': `Bearer ${processenv('HARVEST_SECRET')}`,
	}
};
const client: AxiosInstance = axios.create(config);

interface User {
	firstName: string;
	lastName: string;
	id: number;
}

function findUser(name: string): void {
	client.get('/users/me.json') // TODO Fix correct endpoint 
		.then((response) => {
			console.log(response.status);
			console.log(response.data);
		});
}

findUser('P');
