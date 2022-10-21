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
		const userData = { ...user };

		userData.first_name = userData.firstName;
		userData.last_name = userData.lastName;
		userData.birth_date = userData.birthDate;
		delete userData.firstName;
		delete userData.lastName;
		delete userData.birthDate;

		return userData;
	}

	static adaptCompanyToServer(company) {
		const companyData = { ...company };

		companyData.min_experience = companyData.minExperience;
		delete companyData.minExperience;

		return companyData;
	}
}
