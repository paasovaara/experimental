const world = 'world';

export function hello(to: string = world): string {
	return `Hello ${to}!`;
}

console.log(hello());
console.log(hello('mama'));
