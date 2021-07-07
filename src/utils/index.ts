import axios from "axios";

export const reqWithToken = (url: string, token: string) => {
	let config = {
		headers: {
			Authorization: "Bearer " + token,
		},
	};
	axios.post(url, {}, config).catch((_e) => {});
};
