import * as migration_20251118_152735_initial from './20251118_152735_initial';

export const migrations = [
  {
    up: migration_20251118_152735_initial.up,
    down: migration_20251118_152735_initial.down,
    name: '20251118_152735_initial'
  },
];
