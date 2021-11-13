import { HarvestUser, getAllUsers, findUserById } from './harvest';

getAllUsers().then((users: HarvestUser[]) => {
	users.forEach(user => console.log(user.email));
}).catch(rejected => {
	console.error('Failed to get users');
});

//findUserById(1428546);
findUserById(1428545);
