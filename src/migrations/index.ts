import * as migration_20240918_174751 from "./20240918_174751";
import * as migration_20240918_175216 from "./20240918_175216";

export const migrations = [
	{
		up: migration_20240918_174751.up,
		down: migration_20240918_174751.down,
		name: "20240918_174751",
	},
	{
		up: migration_20240918_175216.up,
		down: migration_20240918_175216.down,
		name: "20240918_175216",
	},
];
