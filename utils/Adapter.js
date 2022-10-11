export default class Adapter {
	static adaptUserToClient(user) {
		user.firstName = user.first_name;
		user.lastName = user.last_name;
		user.birthDate = user.birth_date;
		delete user.first_name;
		delete user.last_name;
		delete user.birth_date;
		return user;
	}

	static adaptUserToServer(user) {
		user.first_name = user.firstName;
		user.last_name = user.lastName;
		user.birth_date = user.birthDate;
		delete user.firstName;
		delete user.lastName;
		delete user.birthDate;
		return user;
	}
}
