export default class Adapter {
	static adaptUserToClient(user) {
		user.firstName = user.first_name;
		user.lastName = user.last_name;
		delete user.first_name;
		delete user.last_name;
		return user;
	}

	static adaptUserToServer(user) {
		user.first_name = user.firstName;
		user.last_name = user.lastName;
		delete user.firstName;
		delete user.lastName;
		return user;
	}
}
