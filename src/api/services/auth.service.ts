import { Logger } from "../../lib";

class AuthService {
	public async signup() {
		Logger.info("Sign Up Service");
	}

	public async login() {
		Logger.info("Log In Service");
	}
}

export { AuthService };
