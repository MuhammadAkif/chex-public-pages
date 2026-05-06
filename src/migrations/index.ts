import * as migration_20260422_162945_initial_schema from './20260422_162945_initial_schema';
import * as migration_20260427_111031_media_collection from './20260427_111031_media_collection';
import * as migration_20260427_122450_locations_collection from './20260427_122450_locations_collection';
import * as migration_20260429_000000_rideshare_sections from './20260429_000000_rideshare_sections';
import * as migration_20260505_081314_location_register_section from './20260505_081314_location_register_section';
import * as migration_20260505_115759_hero_google_review_widget from './20260505_115759_hero_google_review_widget';
import * as migration_20260505_123050_rideshare_step_reviews from './20260505_123050_rideshare_step_reviews';
import * as migration_20260505_124044_rideshare_review_links from './20260505_124044_rideshare_review_links';
import * as migration_20260505_131500_testimonials_distribution_cleanup from './20260505_131500_testimonials_distribution_cleanup';
import * as migration_20260506_113000_testimonials_avatar from './20260506_113000_testimonials_avatar';

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
    name: '20260427_122450_locations_collection',
  },
  {
    up: migration_20260429_000000_rideshare_sections.up,
    down: migration_20260429_000000_rideshare_sections.down,
    name: '20260429_000000_rideshare_sections',
  },
  {
    up: migration_20260505_081314_location_register_section.up,
    down: migration_20260505_081314_location_register_section.down,
    name: '20260505_081314_location_register_section',
  },
  {
    up: migration_20260505_115759_hero_google_review_widget.up,
    down: migration_20260505_115759_hero_google_review_widget.down,
    name: '20260505_115759_hero_google_review_widget',
  },
  {
    up: migration_20260505_123050_rideshare_step_reviews.up,
    down: migration_20260505_123050_rideshare_step_reviews.down,
    name: '20260505_123050_rideshare_step_reviews',
  },
  {
    up: migration_20260505_124044_rideshare_review_links.up,
    down: migration_20260505_124044_rideshare_review_links.down,
    name: '20260505_124044_rideshare_review_links'
  },
  {
    up: migration_20260505_131500_testimonials_distribution_cleanup.up,
    down: migration_20260505_131500_testimonials_distribution_cleanup.down,
    name: '20260505_131500_testimonials_distribution_cleanup'
  },
  {
    up: migration_20260506_113000_testimonials_avatar.up,
    down: migration_20260506_113000_testimonials_avatar.down,
    name: '20260506_113000_testimonials_avatar'
  },
];
