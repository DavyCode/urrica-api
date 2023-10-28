export interface UserDto {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	role: string;
	balance: number;
}
