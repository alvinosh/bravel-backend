import { Logger } from "./lib";
import Server from "./server";

(async () => {
	await Server.init();
})().catch((e) => {
	Logger.error(e);
});
