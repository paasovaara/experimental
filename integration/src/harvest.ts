import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { processenv } from 'processenv';
import { AxiosPromise } from 'axios';
import { request } from 'http';
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

client.interceptors.response.use((response: AxiosResponse) => {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	return response;
}, (error: AxiosError) => {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	if (error.response) {
		console.error(`Invalid response: ${error.response.status}, ${error.message} `);
	} else if (error.request) {
		console.error(`Request failed: ${error.request}`);
	} else {
		console.error(`Something failed: ${error.message}`);
	}
	return Promise.reject(error);
});

interface HarvestUser {
	first_name: string;
	last_name: string;
	id: number;
	email: string;
}

async function getAllUsers(): Promise<HarvestUser[]> {
	return client.get<HarvestUser[]>('/users')
	  .then((response: AxiosResponse) => {
			//console.log(response.data);
			return response.data.users;
		});
}

function findUser(name: string): void {
	client.get('/users/me.json') // TODO Fix correct endpoint 
		.then((response) => {
			console.log(response.status);
			console.log(response.data);
		});
}

getAllUsers().then((users: HarvestUser[]) => {
	users.forEach(user => console.log(user.email));
}).catch(rejected => {
	console.error('Failed to get users');
})