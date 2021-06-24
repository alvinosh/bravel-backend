import morgan, { StreamOptions } from "morgan";
import { __prod__ } from "../../config";

import { Logger } from "../../lib";

const stream: StreamOptions = {
	write: (message) => Logger.http(message),
};

const skip = () => {
	return __prod__;
};

const morganMiddleware = morgan(
	":method :url :status :res[content-length] - :response-time ms",

	{ stream, skip }
);

export { morganMiddleware };
