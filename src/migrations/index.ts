import * as migration_20260422_162945_initial_schema from './20260422_162945_initial_schema';
import * as migration_20260427_111031_media_collection from './20260427_111031_media_collection';
import * as migration_20260427_122450_locations_collection from './20260427_122450_locations_collection';
import * as migration_20260429_000000_rideshare_sections from './20260429_000000_rideshare_sections';

export const migrations = [
  {
    up: migration_20260422_162945_initial_schema.up,
    down: migration_20260422_162945_initial_schema.down,
    name: '20260422_162945_initial_schema',
  },
  {
    up: migration_20260427_111031_media_collection.up,
    down: migration_20260427_111031_media_collection.down,
    name: '20260427_111031_media_collection',
  },
  {
    up: migration_20260427_122450_locations_collection.up,
    down: migration_20260427_122450_locations_collection.down,
    name: '20260427_122450_locations_collection'
  },
  {
    up: migration_20260429_000000_rideshare_sections.up,
    down: migration_20260429_000000_rideshare_sections.down,
    name: '20260429_000000_rideshare_sections'
  },
];
