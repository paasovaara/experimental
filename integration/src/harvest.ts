import { AxiosResponse } from 'axios';
import {harvestClient as client} from './harvestClient';

export interface HarvestUser {
	first_name: string;
	last_name: string;
	id: number;
	email: string;
}

export const getAllUsers = async (): Promise<HarvestUser[]> => {
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

export const findUserById = async (id: number): Promise<HarvestUser> => {
	console.log(`Getting user ${id}`);
	return client.get<HarvestUser>(`/users/${id}`)  
		.then((response: AxiosResponse) => {
			console.log(response.status);
			//console.debug(response.data);
			return response.data;
		});
}
