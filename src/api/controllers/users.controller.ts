import { Logger } from "../../lib";
import { UsersService } from "../services";

class UsersController {
	public UsersService = new UsersService();

	public async getAll() {
		Logger.info("yay");
	}
}

export { UsersController };
