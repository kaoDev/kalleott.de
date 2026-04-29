import { initBotId } from "botid/client/core";

initBotId({
	protect: [
		{
			path: "/api/forms/submit",
			method: "POST",
		},
	],
});
