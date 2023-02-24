class UserRepository {
	constructor({ UserModel }) {
		this.UserModel = UserModel;
	}

	async create(name, email, password) {
		try {
			let newUser = new this.UserModel({
				name,
				email,
				password,
			});

			await newUser.save();

			return { error: false, message: 'User saved with success.' };
		} catch (e) {
			return { error: true, message: e };
		}
	}

	async findByEmail(email) {
		try {
			const user = await this.UserModel.findOne({ email });
			return user;
		} catch (e) {
			return {
				error: true,
				message:
					'Something wrong have happened with your search: \n' + e,
			};
		}
	}
}

module.exports = UserRepository;
