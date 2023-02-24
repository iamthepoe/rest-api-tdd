const bcrypt = require('bcrypt');

class UserService {
	constructor({ UserRepository }) {
		this.UserRepository = UserRepository;
	}

	async findByEmail(email) {
		return await this.UserRepository.findByEmail(email);
	}

	async create(name, email, password) {
		if (!name.trim() || !email.trim() || !password.trim())
			return { error: true, message: "You can't pass empty values" };

		let userExists = await this.findByEmail(email);

		if (!!userExists)
			return { error: true, message: 'This email is already in use!' };

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		return await this.UserRepository.create(name, email, (password = hash));
	}
}

module.exports = UserService;
