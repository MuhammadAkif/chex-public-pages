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
import * as migration_20260514_141500_home_page_global from './20260514_141500_home_page_global';
import * as migration_20260609_000000_landing_page_global from './20260609_000000_landing_page_global';
import * as migration_20260609_120000_posts_seo_meta from './20260609_120000_posts_seo_meta';
import * as migration_20260611_000000_swap_home_service_globals from './20260611_000000_swap_home_service_globals';
import * as migration_20260611_010000_home_hero_background_video from './20260611_010000_home_hero_background_video';
import * as migration_20260612_000000_solution_block_overlay_image from './20260612_000000_solution_block_overlay_image';
import * as migration_20260707_000000_inspection_form_page_global from './20260707_000000_inspection_form_page_global';
import * as migration_20260707_120000_inspection_form_state_forms from './20260707_120000_inspection_form_state_forms';
import * as migration_20260707_130000_posts_cta from './20260707_130000_posts_cta';

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
  {
    up: migration_20260514_141500_home_page_global.up,
    down: migration_20260514_141500_home_page_global.down,
    name: '20260514_141500_home_page_global'
  },
  {
    up: migration_20260609_000000_landing_page_global.up,
    down: migration_20260609_000000_landing_page_global.down,
    name: '20260609_000000_landing_page_global'
  },
  {
    up: migration_20260609_120000_posts_seo_meta.up,
    down: migration_20260609_120000_posts_seo_meta.down,
    name: '20260609_120000_posts_seo_meta'
  },
  {
    up: migration_20260611_000000_swap_home_service_globals.up,
    down: migration_20260611_000000_swap_home_service_globals.down,
    name: '20260611_000000_swap_home_service_globals'
  },
  {
    up: migration_20260611_010000_home_hero_background_video.up,
    down: migration_20260611_010000_home_hero_background_video.down,
    name: '20260611_010000_home_hero_background_video'
  },
  {
    up: migration_20260612_000000_solution_block_overlay_image.up,
    down: migration_20260612_000000_solution_block_overlay_image.down,
    name: '20260612_000000_solution_block_overlay_image'
  },
  {
    up: migration_20260707_000000_inspection_form_page_global.up,
    down: migration_20260707_000000_inspection_form_page_global.down,
    name: '20260707_000000_inspection_form_page_global'
  },
  {
    up: migration_20260707_120000_inspection_form_state_forms.up,
    down: migration_20260707_120000_inspection_form_state_forms.down,
    name: '20260707_120000_inspection_form_state_forms'
  },
  {
    up: migration_20260707_130000_posts_cta.up,
    down: migration_20260707_130000_posts_cta.down,
    name: '20260707_130000_posts_cta'
  },
];
