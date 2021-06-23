import { Logger } from "./lib";
import { App } from "./app";

(async () => {
	const app = new App();
	await app.init();
})().catch((e) => {
	Logger.error(e);
});
