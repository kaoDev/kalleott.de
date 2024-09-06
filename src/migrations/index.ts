import * as migration_20240906_145941 from './20240906_145941';

export const migrations = [
  {
    up: migration_20240906_145941.up,
    down: migration_20240906_145941.down,
    name: '20240906_145941'
  },
];
