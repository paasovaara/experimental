import { AxiosResponse } from 'axios';
import {harvestClient} from './harvestClient';

interface HarvestUser {
	first_name: string;
	last_name: string;
	id: number;
	email: string;
}

async function getAllUsers(): Promise<HarvestUser[]> {
	return harvestClient.get<HarvestUser[]>('/users')
	  .then((response: AxiosResponse) => {
			//console.log(response.data);
			return response.data.users;
		});
}

function findUser(name: string): void {
	harvestClient.get('/users/me.json') // TODO Fix correct endpoint 
		.then((response) => {
			console.log(response.status);
			console.log(response.data);
		});
}

function findUserById(id: number): Promise<HarvestUser> {
	console.log(`Getting user ${id}`);
	return harvestClient.get<HarvestUser>(`/users/${id}`)  
		.then((response: AxiosResponse) => {
			console.log(response.status);
			//console.debug(response.data);
			return response.data;
		});
}

getAllUsers().then((users: HarvestUser[]) => {
	users.forEach(user => console.log(user.email));
}).catch(rejected => {
	console.error('Failed to get users');
});

//findUserById(1428546);
findUserById(1428545);
