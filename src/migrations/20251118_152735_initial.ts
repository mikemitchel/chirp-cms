import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_listeners_roles" AS ENUM('Listener', 'Volunteer', 'Regular DJ', 'Substitute DJ', 'Board Member');
  CREATE TYPE "public"."enum_listeners_profile_image_orientation" AS ENUM('square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum_listeners_preferences_dark_mode" AS ENUM('light', 'dark', 'device');
  CREATE TYPE "public"."enum_show_schedules_day_of_week" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
  CREATE TYPE "public"."enum_shop_items_category" AS ENUM('apparel', 'accessories', 'poster', 'merchandise', 'music', 'other');
  CREATE TYPE "public"."enum_weekly_charts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_announcements_variant" AS ENUM('donation', 'motivation');
  CREATE TYPE "public"."enum_announcements_texture_background" AS ENUM('cr-bg-natural-a500', 'cr-bg-natural-s100', 'cr-bg-natural-s900', 'cr-bg-natural-d100', 'cr-bg-natural-d900');
  CREATE TYPE "public"."enum_announcements_button_count" AS ENUM('none', 'one', 'two');
  CREATE TYPE "public"."enum_announcements_button1_icon" AS ENUM('PiArrowRight', 'PiArrowSquareUp', 'PiCaretLeft', 'PiCaretRight', 'PiCaretUp', 'PiCaretDown', 'PiCaretUpDown', 'PiX', 'PiXBold', 'PiMagnifyingGlass', 'PiDotsThreeOutlineVerticalFill', 'PiPlus', 'PiMinus', 'PiCalendarBlank', 'PiCalendarDot', 'PiCalendarDots', 'PiCalendarPlus', 'PiTicket', 'PiVinylRecord', 'PiMusicNote', 'PiMusicNotes', 'PiPlaylist', 'PiPlayFill', 'PiPauseFill', 'PiHeadphones', 'PiMicrophone', 'PiHeart', 'PiHeartFill', 'PiHandHeart', 'PiHandHeartLight', 'PiUser', 'PiUserCircle', 'PiChatCircleText', 'PiChatCircleTextLight', 'PiSignIn', 'PiReadCvLogo', 'PiNotepad', 'PiPaperclip', 'PiNewspaper', 'PiMapTrifold', 'PiPaperPlaneRight', 'PiPaperPlaneTilt', 'PiGear', 'PiFloppyDisk', 'PiPencilSimple', 'PiUploadSimple', 'PiShoppingBag', 'PiEye', 'PiEyeSlash', 'PiDownload', 'PiDownloadSimple', 'PiExport', 'PiPlusCircle', 'PiPlusSquare', 'speaker', 'mobile');
  CREATE TYPE "public"."enum_announcements_button2_icon" AS ENUM('PiArrowRight', 'PiArrowSquareUp', 'PiCaretLeft', 'PiCaretRight', 'PiCaretUp', 'PiCaretDown', 'PiCaretUpDown', 'PiX', 'PiXBold', 'PiMagnifyingGlass', 'PiDotsThreeOutlineVerticalFill', 'PiPlus', 'PiMinus', 'PiCalendarBlank', 'PiCalendarDot', 'PiCalendarDots', 'PiCalendarPlus', 'PiTicket', 'PiVinylRecord', 'PiMusicNote', 'PiMusicNotes', 'PiPlaylist', 'PiPlayFill', 'PiPauseFill', 'PiHeadphones', 'PiMicrophone', 'PiHeart', 'PiHeartFill', 'PiHandHeart', 'PiHandHeartLight', 'PiUser', 'PiUserCircle', 'PiChatCircleText', 'PiChatCircleTextLight', 'PiSignIn', 'PiReadCvLogo', 'PiNotepad', 'PiPaperclip', 'PiNewspaper', 'PiMapTrifold', 'PiPaperPlaneRight', 'PiPaperPlaneTilt', 'PiGear', 'PiFloppyDisk', 'PiPencilSimple', 'PiUploadSimple', 'PiShoppingBag', 'PiEye', 'PiEyeSlash', 'PiDownload', 'PiDownloadSimple', 'PiExport', 'PiPlusCircle', 'PiPlusSquare', 'speaker', 'mobile');
  CREATE TYPE "public"."enum_advertisements_size" AS ENUM('large-rectangle', 'leaderboard', 'medium-rectangle', 'mobile-banner', 'wide-skyscraper', 'custom');
  CREATE TYPE "public"."enum_advertisements_content_type" AS ENUM('image', 'video', 'html', 'embed');
  CREATE TYPE "public"."enum_advertisements_target" AS ENUM('_blank', '_self');
  CREATE TYPE "public"."enum_media_category" AS ENUM('General', 'Member Profile Images', 'Articles', 'Events', 'Podcasts', 'Shop Items', 'Advertisements');
  CREATE TYPE "public"."enum_donations_type" AS ENUM('One-time', 'Monthly', 'Annual', 'In-kind');
  CREATE TYPE "public"."enum_donations_status" AS ENUM('completed', 'pending', 'failed', 'refunded');
  CREATE TYPE "public"."enum_donations_source" AS ENUM('Neon', 'PayPal', 'Manual', 'Other');
  CREATE TYPE "public"."enum_purchases_status" AS ENUM('completed', 'pending', 'shipped', 'cancelled', 'refunded');
  CREATE TYPE "public"."enum_pages_blocks_content_card_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_pages_blocks_content_card_image_position" AS ENUM('none', 'left', 'right');
  CREATE TYPE "public"."enum_pages_layout_template" AS ENUM('default', 'sidebar-right');
  CREATE TYPE "public"."enum_pages_sidebar_content_type" AS ENUM('none', 'articles', 'events', 'podcasts');
  CREATE TYPE "public"."enum_mobile_page_content_page_identifier" AS ENUM('make-request', 'now-playing', 'recently-played', 'my-collection', 'account-settings', 'android-auto');
  CREATE TYPE "public"."enum_onboarding_feature_identifier" AS ENUM('welcome', 'profile', 'collection', 'explore-features', 'support', 'favorite-djs', 'request-songs');
  CREATE TYPE "public"."enum_onboarding_platform" AS ENUM('both', 'web', 'mobile');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('facebook', 'twitter', 'instagram', 'bluesky', 'youtube', 'tiktok', 'linkedin', 'spotify', 'apple-music', 'other');
  CREATE TYPE "public"."enum_site_settings_events_sidebar_content_type" AS ENUM('articles', 'podcasts', 'events', 'none');
  CREATE TYPE "public"."enum_site_settings_events_sidebar_content_count" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_site_settings_articles_sidebar_content_type" AS ENUM('articles', 'podcasts', 'events', 'none');
  CREATE TYPE "public"."enum_site_settings_articles_sidebar_content_count" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_site_settings_dj_detail_sidebar_content_type" AS ENUM('articles', 'podcasts', 'events', 'none');
  CREATE TYPE "public"."enum_site_settings_dj_detail_sidebar_content_count" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_site_settings_schedule_sidebar_content_type" AS ENUM('articles', 'podcasts', 'events', 'none');
  CREATE TYPE "public"."enum_site_settings_schedule_sidebar_content_count" AS ENUM('1', '2', '3');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"avatar_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "listeners_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_listeners_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "listeners_collection" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"track_name" varchar NOT NULL,
  	"artist_name" varchar NOT NULL,
  	"album_name" varchar,
  	"label_name" varchar,
  	"album_art" varchar,
  	"album_art_alt" varchar,
  	"is_local" boolean,
  	"date_added" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "listeners_favorite_d_js" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"dj_id" varchar
  );
  
  CREATE TABLE "listeners_volunteer_orgs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"org" varchar
  );
  
  CREATE TABLE "listeners_special_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"skill" varchar
  );
  
  CREATE TABLE "listeners_hear_about_chirp" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" varchar
  );
  
  CREATE TABLE "listeners_interests" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"interest" varchar
  );
  
  CREATE TABLE "listeners_dj_availability" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar
  );
  
  CREATE TABLE "listeners_previous_shows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"audio_url" varchar NOT NULL,
  	"duration" varchar,
  	"gcs_file_name" varchar
  );
  
  CREATE TABLE "listeners_substitute_availability" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar
  );
  
  CREATE TABLE "listeners_can_substitute_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"dj_id" varchar
  );
  
  CREATE TABLE "listeners_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "listeners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"display_title" varchar,
  	"email" varchar NOT NULL,
  	"username" varchar,
  	"first_name" varchar,
  	"last_name" varchar,
  	"member_since" timestamp(3) with time zone,
  	"profile_image_id" integer,
  	"profile_image_orientation" "enum_listeners_profile_image_orientation",
  	"location" varchar,
  	"preferences_email_notifications" boolean DEFAULT true,
  	"preferences_show_notifications" boolean DEFAULT true,
  	"preferences_dark_mode" "enum_listeners_preferences_dark_mode",
  	"preferences_auto_play" boolean DEFAULT true,
  	"onboarding_completed" boolean DEFAULT false,
  	"donor_level" varchar,
  	"_purchasenote" varchar,
  	"primary_phone_type" varchar,
  	"primary_phone" varchar,
  	"secondary_phone_type" varchar,
  	"secondary_phone" varchar,
  	"address" varchar,
  	"city" varchar,
  	"state" varchar,
  	"zip_code" varchar,
  	"age" varchar,
  	"education" varchar,
  	"employer" varchar,
  	"has_radio_experience" varchar,
  	"radio_stations" varchar,
  	"wants_to_d_j" varchar,
  	"social_links_facebook" varchar,
  	"social_links_instagram" varchar,
  	"social_links_twitter" varchar,
  	"social_links_bluesky" varchar,
  	"social_links_linkedin" varchar,
  	"dj_name" varchar,
  	"show_name" varchar,
  	"show_time" varchar,
  	"dj_excerpt" varchar,
  	"dj_bio" varchar,
  	"dj_donation_link" varchar,
  	"board_position" varchar,
  	"board_since" timestamp(3) with time zone,
  	"board_term_end" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"_verified" boolean,
  	"_verificationtoken" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "show_schedules" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"day_of_week" "enum_show_schedules_day_of_week" NOT NULL,
  	"start_time" timestamp(3) with time zone NOT NULL,
  	"end_time" timestamp(3) with time zone NOT NULL,
  	"is_music_mix" boolean DEFAULT false,
  	"dj_id" integer,
  	"is_active" boolean DEFAULT true,
  	"notes" varchar,
  	"display_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"author" varchar NOT NULL,
  	"featured_image_id" integer,
  	"featured_image_url" varchar,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"video_title" varchar,
  	"youtube_video_id" varchar,
  	"published_date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb,
  	"featured_image_id" integer,
  	"featured_image_url" varchar,
  	"show_photo_credit" boolean DEFAULT false,
  	"photographer_name" varchar,
  	"venue_id" integer NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"age_restriction_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "podcasts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "podcasts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"host" varchar NOT NULL,
  	"cover_art_id" integer,
  	"cover_art_url" varchar,
  	"sound_cloud_embed_url" varchar,
  	"pull_quote" varchar,
  	"pull_quote_attribution" varchar,
  	"additional_info" varchar,
  	"transcript_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "shop_items_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar
  );
  
  CREATE TABLE "shop_items_additional_image_urls" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"alt" varchar
  );
  
  CREATE TABLE "shop_items_sizes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" varchar
  );
  
  CREATE TABLE "shop_items_variants_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"option" varchar NOT NULL
  );
  
  CREATE TABLE "shop_items_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "shop_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"item_type" varchar,
  	"category" "enum_shop_items_category" DEFAULT 'merchandise' NOT NULL,
  	"price" numeric NOT NULL,
  	"image_url" varchar,
  	"in_stock" boolean DEFAULT true,
  	"external_url" varchar,
  	"featured" boolean DEFAULT false,
  	"sold_out" boolean DEFAULT false,
  	"limited_edition" boolean DEFAULT false,
  	"display_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "weekly_charts_tracks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"song_name" varchar NOT NULL,
  	"artist_name" varchar NOT NULL,
  	"record_company" varchar NOT NULL
  );
  
  CREATE TABLE "weekly_charts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"preheader" varchar,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"list_type" varchar,
  	"csv_file_id" integer,
  	"csv_import" varchar,
  	"is_current_week" boolean DEFAULT false,
  	"notes" varchar,
  	"featured_track" numeric,
  	"status" "enum_weekly_charts_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "volunteer_calendar_event_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"detail" varchar NOT NULL
  );
  
  CREATE TABLE "volunteer_calendar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"date_time" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"more_info_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "venues" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"address" varchar,
  	"city" varchar,
  	"state" varchar,
  	"zip" varchar,
  	"phone" varchar,
  	"website" varchar,
  	"map_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "announcements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline_text" varchar NOT NULL,
  	"body_text" jsonb NOT NULL,
  	"variant" "enum_announcements_variant" DEFAULT 'motivation' NOT NULL,
  	"texture_background" "enum_announcements_texture_background" DEFAULT 'cr-bg-natural-a500' NOT NULL,
  	"show_link" boolean DEFAULT false,
  	"link_text" varchar,
  	"link_url" varchar,
  	"button_count" "enum_announcements_button_count" DEFAULT 'none',
  	"button1_text" varchar,
  	"button1_icon" "enum_announcements_button1_icon",
  	"button2_text" varchar,
  	"button2_icon" "enum_announcements_button2_icon",
  	"current_amount" numeric,
  	"target_amount" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "advertisements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"size" "enum_advertisements_size" DEFAULT 'medium-rectangle' NOT NULL,
  	"custom_width" numeric,
  	"custom_height" numeric,
  	"content_type" "enum_advertisements_content_type" DEFAULT 'image' NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"alt" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"html_content" varchar,
  	"embed_code" varchar,
  	"href" varchar,
  	"target" "enum_advertisements_target" DEFAULT '_blank',
  	"show_label" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "age_gate" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"age" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"category" "enum_media_category" DEFAULT 'General' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "player_fallback_images" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_player_url" varchar,
  	"sizes_player_width" numeric,
  	"sizes_player_height" numeric,
  	"sizes_player_mime_type" varchar,
  	"sizes_player_filesize" numeric,
  	"sizes_player_filename" varchar
  );
  
  CREATE TABLE "donations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"member_id" integer NOT NULL,
  	"amount" numeric NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"type" "enum_donations_type" DEFAULT 'One-time' NOT NULL,
  	"status" "enum_donations_status" DEFAULT 'completed' NOT NULL,
  	"transaction_id" varchar NOT NULL,
  	"source" "enum_donations_source",
  	"tax_receipt_sent" boolean DEFAULT false,
  	"receipt_url" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "purchases_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" varchar NOT NULL,
  	"product_name" varchar NOT NULL,
  	"quantity" numeric DEFAULT 1 NOT NULL,
  	"price" numeric NOT NULL
  );
  
  CREATE TABLE "purchases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"member_id" integer NOT NULL,
  	"total" numeric NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"status" "enum_purchases_status" DEFAULT 'completed' NOT NULL,
  	"transaction_id" varchar NOT NULL,
  	"shipping_address_name" varchar,
  	"shipping_address_street" varchar,
  	"shipping_address_city" varchar,
  	"shipping_address_state" varchar,
  	"shipping_address_zip" varchar,
  	"shipping_address_country" varchar DEFAULT 'USA',
  	"tracking_number" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"preheader" varchar,
  	"title" varchar NOT NULL,
  	"title_tag" "enum_pages_blocks_content_card_title_tag" DEFAULT 'h2',
  	"content" jsonb NOT NULL,
  	"image_position" "enum_pages_blocks_content_card_image_position" DEFAULT 'none',
  	"background_image_id" integer,
  	"background_image_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_row_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"alt" varchar
  );
  
  CREATE TABLE "pages_blocks_image_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar,
  	"layout_template" "enum_pages_layout_template" DEFAULT 'default' NOT NULL,
  	"sidebar_announcement_id" integer,
  	"sidebar_content_type" "enum_pages_sidebar_content_type" DEFAULT 'none',
  	"sidebar_content_count" numeric DEFAULT 3,
  	"sidebar_advertisement_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "mobile_page_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_identifier" "enum_mobile_page_content_page_identifier" NOT NULL,
  	"page_title" varchar,
  	"page_subtitle" varchar,
  	"intro_content" jsonb,
  	"form_hint_text" varchar,
  	"announcement_id" integer,
  	"custom_not_logged_in_message" jsonb,
  	"is_login_required" boolean DEFAULT false,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "onboarding" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"feature_identifier" "enum_onboarding_feature_identifier" NOT NULL,
  	"order" numeric DEFAULT 1 NOT NULL,
  	"platform" "enum_onboarding_platform" DEFAULT 'both' NOT NULL,
  	"media_id" integer,
  	"cta_text" varchar,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"articles_id" integer,
  	"events_id" integer,
  	"podcasts_id" integer
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"listeners_id" integer,
  	"show_schedules_id" integer,
  	"articles_id" integer,
  	"events_id" integer,
  	"podcasts_id" integer,
  	"shop_items_id" integer,
  	"weekly_charts_id" integer,
  	"volunteer_calendar_id" integer,
  	"categories_id" integer,
  	"venues_id" integer,
  	"announcements_id" integer,
  	"advertisements_id" integer,
  	"age_gate_id" integer,
  	"media_id" integer,
  	"player_fallback_images_id" integer,
  	"donations_id" integer,
  	"purchases_id" integer,
  	"pages_id" integer,
  	"mobile_page_content_id" integer,
  	"onboarding_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"listeners_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "mobile_app_settings_account_benefits_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar NOT NULL
  );
  
  CREATE TABLE "mobile_app_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"not_logged_in_message_title" varchar DEFAULT 'Login Required',
  	"not_logged_in_message_message" jsonb,
  	"not_logged_in_message_login_button_text" varchar DEFAULT 'Log In',
  	"not_logged_in_message_signup_button_text" varchar DEFAULT 'Sign Up',
  	"login_modal_login_message" jsonb,
  	"login_modal_signup_message" jsonb,
  	"account_benefits_title" varchar DEFAULT 'Benefits of Creating an Account',
  	"account_benefits_content" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "volunteer_form_settings_age_question_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "volunteer_form_settings_special_skills_question_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "volunteer_form_settings_hear_about_chirp_question_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "volunteer_form_settings_interests_question_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "volunteer_form_settings_dj_availability_question_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "volunteer_form_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"age_question_label" varchar DEFAULT 'Your Age (Generally) *',
  	"education_question_label" varchar DEFAULT 'What colleges/universities have you attended? *',
  	"education_question_placeholder" varchar DEFAULT 'Loyola University Chicago',
  	"employer_question_label" varchar DEFAULT 'Who are you currently employed by? *',
  	"employer_question_placeholder" varchar DEFAULT 'Portillos',
  	"volunteer_orgs_question_label" varchar DEFAULT 'What other organizations do you volunteer with?',
  	"volunteer_orgs_question_placeholder" varchar DEFAULT 'American Cancer Society',
  	"volunteer_orgs_question_add_button_text" varchar DEFAULT '+ ADD ANOTHER',
  	"radio_experience_question_label" varchar DEFAULT 'Have you worked with a radio station before? *',
  	"radio_experience_question_follow_up_label" varchar DEFAULT 'What radio stations have you worked with?',
  	"radio_experience_question_follow_up_placeholder" varchar DEFAULT 'WLUW',
  	"special_skills_question_label" varchar DEFAULT 'What special skills do you have?',
  	"hear_about_chirp_question_label" varchar DEFAULT 'How did you hear about CHIRP?',
  	"interests_question_label" varchar DEFAULT 'What are you interested in doing?',
  	"wants_to_d_j_question_label" varchar DEFAULT 'Do you want to be a DJ or on-air sub?',
  	"dj_availability_question_label" varchar DEFAULT 'What''s your DJ availability?',
  	"form_actions_cancel_button_text" varchar DEFAULT 'Cancel',
  	"form_actions_save_button_text" varchar DEFAULT 'Save Changes',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_additional_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"logo_url" varchar,
  	"alt" varchar
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_top_announcement" boolean DEFAULT true,
  	"top_announcement_id" integer,
  	"sidebar_announcement_id" integer,
  	"sidebar_advertisement_id" integer,
  	"show_user_collection" boolean DEFAULT true,
  	"listen_page_title" varchar DEFAULT 'Listen',
  	"listen_current_playlist_title" varchar DEFAULT 'Current Playlist',
  	"listen_previous_plays_button_text" varchar DEFAULT 'Previous Plays',
  	"listen_user_collection_title" varchar DEFAULT 'A Few from Your Collection',
  	"listen_your_collection_button_text" varchar DEFAULT 'Your Collection',
  	"listen_sidebar_weekly_chart_id" integer,
  	"listen_sidebar_advertisement_id" integer,
  	"full_width_announcement_id" integer,
  	"left_weekly_chart_id" integer,
  	"right_weekly_chart_id" integer,
  	"events_sidebar_announcement_id" integer,
  	"events_sidebar_content_type" "enum_site_settings_events_sidebar_content_type" DEFAULT 'articles',
  	"events_sidebar_content_count" "enum_site_settings_events_sidebar_content_count" DEFAULT '3',
  	"events_sidebar_advertisement_id" integer,
  	"events_full_width_announcement_id" integer,
  	"articles_sidebar_announcement_id" integer,
  	"articles_sidebar_content_type" "enum_site_settings_articles_sidebar_content_type" DEFAULT 'events',
  	"articles_sidebar_content_count" "enum_site_settings_articles_sidebar_content_count" DEFAULT '3',
  	"articles_sidebar_advertisement_id" integer,
  	"articles_full_width_announcement_id" integer,
  	"podcasts_page_title" varchar DEFAULT 'Podcasts',
  	"podcasts_sidebar_announcement_id" integer,
  	"podcasts_sidebar_advertisement_id" integer,
  	"podcasts_full_width_announcement_id" integer,
  	"dj_detail_sidebar_announcement_id" integer,
  	"dj_detail_sidebar_advertisement_id" integer,
  	"dj_detail_sidebar_content_type" "enum_site_settings_dj_detail_sidebar_content_type" DEFAULT 'articles',
  	"dj_detail_sidebar_content_count" "enum_site_settings_dj_detail_sidebar_content_count" DEFAULT '3',
  	"schedule_sidebar_announcement_id" integer,
  	"schedule_sidebar_advertisement_id" integer,
  	"schedule_sidebar_content_type" "enum_site_settings_schedule_sidebar_content_type" DEFAULT 'articles',
  	"schedule_sidebar_content_count" "enum_site_settings_schedule_sidebar_content_count" DEFAULT '3',
  	"not_found_page_heading" varchar DEFAULT 'Page Not Found',
  	"not_found_page_message" varchar DEFAULT 'Sorry, we couldn''t find the page you''re looking for. It may have been moved or deleted.',
  	"forbidden_page_heading" varchar DEFAULT 'Access Denied',
  	"forbidden_page_message" varchar DEFAULT 'Sorry, you don''t have permission to access this page. Please log in or contact us if you believe this is an error.',
  	"forbidden_page_message_logged_in" varchar DEFAULT 'You need to be signed in to access this page. Please sign in to continue.',
  	"server_error_page_heading" varchar DEFAULT 'Internal Server Error',
  	"server_error_page_message" varchar DEFAULT 'Oops! Something went wrong on our end. We''re working to fix the issue. Please try again later.',
  	"login_success_message" varchar DEFAULT 'Successfully logged in',
  	"logout_success_message" varchar DEFAULT 'Successfully signed out',
  	"signup_success_message" varchar DEFAULT 'Account created successfully',
  	"profile_update_success_message" varchar DEFAULT 'Profile updated successfully',
  	"profile_update_error_message" varchar DEFAULT 'Failed to save profile. Please try again.',
  	"add_to_collection_success_message" varchar DEFAULT 'Added to your collection',
  	"remove_from_collection_success_message" varchar DEFAULT 'Removed from your collection',
  	"support_content" jsonb,
  	"show_d_case_logo" boolean DEFAULT true,
  	"d_case_logo_id" integer,
  	"d_case_logo_url" varchar,
  	"show_il_arts_council_logo" boolean DEFAULT true,
  	"il_arts_council_logo_id" integer,
  	"il_arts_council_logo_url" varchar,
  	"support_advertisement_id" integer,
  	"copyright_text" varchar DEFAULT '© {year} CHIRP Radio. All rights reserved.',
  	"show_chirp_film_fest_logo" boolean DEFAULT false,
  	"chirp_film_fest_logo_id" integer,
  	"chirp_film_fest_logo_url" varchar,
  	"show_first_time_logo" boolean DEFAULT false,
  	"first_time_logo_id" integer,
  	"first_time_logo_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "listeners_roles" ADD CONSTRAINT "listeners_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "listeners_collection" ADD CONSTRAINT "listeners_collection_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "listeners_favorite_d_js" ADD CONSTRAINT "listeners_favorite_d_js_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "listeners_volunteer_orgs" ADD CONSTRAINT "listeners_volunteer_orgs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "listeners_special_skills" ADD CONSTRAINT "listeners_special_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "listeners_hear_about_chirp" ADD CONSTRAINT "listeners_hear_about_chirp_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "listeners_interests" ADD CONSTRAINT "listeners_interests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "listeners_dj_availability" ADD CONSTRAINT "listeners_dj_availability_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "listeners_previous_shows" ADD CONSTRAINT "listeners_previous_shows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "listeners_substitute_availability" ADD CONSTRAINT "listeners_substitute_availability_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "listeners_can_substitute_for" ADD CONSTRAINT "listeners_can_substitute_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "listeners_sessions" ADD CONSTRAINT "listeners_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "listeners" ADD CONSTRAINT "listeners_profile_image_id_media_id_fk" FOREIGN KEY ("profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "show_schedules" ADD CONSTRAINT "show_schedules_dj_id_listeners_id_fk" FOREIGN KEY ("dj_id") REFERENCES "public"."listeners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_tags" ADD CONSTRAINT "articles_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_age_restriction_id_age_gate_id_fk" FOREIGN KEY ("age_restriction_id") REFERENCES "public"."age_gate"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "podcasts_tags" ADD CONSTRAINT "podcasts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."podcasts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "podcasts" ADD CONSTRAINT "podcasts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "podcasts" ADD CONSTRAINT "podcasts_cover_art_id_media_id_fk" FOREIGN KEY ("cover_art_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shop_items_images" ADD CONSTRAINT "shop_items_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shop_items_images" ADD CONSTRAINT "shop_items_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shop_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shop_items_additional_image_urls" ADD CONSTRAINT "shop_items_additional_image_urls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shop_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shop_items_sizes" ADD CONSTRAINT "shop_items_sizes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shop_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shop_items_variants_options" ADD CONSTRAINT "shop_items_variants_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shop_items_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shop_items_variants" ADD CONSTRAINT "shop_items_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shop_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "weekly_charts_tracks" ADD CONSTRAINT "weekly_charts_tracks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."weekly_charts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "weekly_charts" ADD CONSTRAINT "weekly_charts_csv_file_id_media_id_fk" FOREIGN KEY ("csv_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "volunteer_calendar_event_details" ADD CONSTRAINT "volunteer_calendar_event_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volunteer_calendar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "advertisements" ADD CONSTRAINT "advertisements_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "advertisements" ADD CONSTRAINT "advertisements_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "donations" ADD CONSTRAINT "donations_member_id_listeners_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."listeners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "purchases_items" ADD CONSTRAINT "purchases_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."purchases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "purchases" ADD CONSTRAINT "purchases_member_id_listeners_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."listeners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_card" ADD CONSTRAINT "pages_blocks_content_card_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_card" ADD CONSTRAINT "pages_blocks_content_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_row_images" ADD CONSTRAINT "pages_blocks_image_row_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_row_images" ADD CONSTRAINT "pages_blocks_image_row_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_row" ADD CONSTRAINT "pages_blocks_image_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_sidebar_announcement_id_announcements_id_fk" FOREIGN KEY ("sidebar_announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_sidebar_advertisement_id_advertisements_id_fk" FOREIGN KEY ("sidebar_advertisement_id") REFERENCES "public"."advertisements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mobile_page_content" ADD CONSTRAINT "mobile_page_content_announcement_id_announcements_id_fk" FOREIGN KEY ("announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "onboarding" ADD CONSTRAINT "onboarding_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_1_idx" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_podcasts_fk" FOREIGN KEY ("podcasts_id") REFERENCES "public"."podcasts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_1_idx" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_listeners_fk" FOREIGN KEY ("listeners_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_show_schedules_fk" FOREIGN KEY ("show_schedules_id") REFERENCES "public"."show_schedules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_podcasts_fk" FOREIGN KEY ("podcasts_id") REFERENCES "public"."podcasts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shop_items_fk" FOREIGN KEY ("shop_items_id") REFERENCES "public"."shop_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_weekly_charts_fk" FOREIGN KEY ("weekly_charts_id") REFERENCES "public"."weekly_charts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_volunteer_calendar_fk" FOREIGN KEY ("volunteer_calendar_id") REFERENCES "public"."volunteer_calendar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_venues_fk" FOREIGN KEY ("venues_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_announcements_fk" FOREIGN KEY ("announcements_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_advertisements_fk" FOREIGN KEY ("advertisements_id") REFERENCES "public"."advertisements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_age_gate_fk" FOREIGN KEY ("age_gate_id") REFERENCES "public"."age_gate"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_player_fallback_images_fk" FOREIGN KEY ("player_fallback_images_id") REFERENCES "public"."player_fallback_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_donations_fk" FOREIGN KEY ("donations_id") REFERENCES "public"."donations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_purchases_fk" FOREIGN KEY ("purchases_id") REFERENCES "public"."purchases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mobile_page_content_fk" FOREIGN KEY ("mobile_page_content_id") REFERENCES "public"."mobile_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_onboarding_fk" FOREIGN KEY ("onboarding_id") REFERENCES "public"."onboarding"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_1_idx" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_listeners_fk" FOREIGN KEY ("listeners_id") REFERENCES "public"."listeners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mobile_app_settings_account_benefits_benefits" ADD CONSTRAINT "mobile_app_settings_account_benefits_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mobile_app_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volunteer_form_settings_age_question_options" ADD CONSTRAINT "volunteer_form_settings_age_question_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volunteer_form_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volunteer_form_settings_special_skills_question_options" ADD CONSTRAINT "volunteer_form_settings_special_skills_question_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volunteer_form_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volunteer_form_settings_hear_about_chirp_question_options" ADD CONSTRAINT "volunteer_form_settings_hear_about_chirp_question_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volunteer_form_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volunteer_form_settings_interests_question_options" ADD CONSTRAINT "volunteer_form_settings_interests_question_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volunteer_form_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volunteer_form_settings_dj_availability_question_options" ADD CONSTRAINT "volunteer_form_settings_dj_availability_question_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volunteer_form_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_additional_logos" ADD CONSTRAINT "site_settings_additional_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_additional_logos" ADD CONSTRAINT "site_settings_additional_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_top_announcement_id_announcements_id_fk" FOREIGN KEY ("top_announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_sidebar_announcement_id_announcements_id_fk" FOREIGN KEY ("sidebar_announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_sidebar_advertisement_id_advertisements_id_fk" FOREIGN KEY ("sidebar_advertisement_id") REFERENCES "public"."advertisements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_listen_sidebar_weekly_chart_id_weekly_charts_id_fk" FOREIGN KEY ("listen_sidebar_weekly_chart_id") REFERENCES "public"."weekly_charts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_listen_sidebar_advertisement_id_advertisements_id_fk" FOREIGN KEY ("listen_sidebar_advertisement_id") REFERENCES "public"."advertisements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_full_width_announcement_id_announcements_id_fk" FOREIGN KEY ("full_width_announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_left_weekly_chart_id_weekly_charts_id_fk" FOREIGN KEY ("left_weekly_chart_id") REFERENCES "public"."weekly_charts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_right_weekly_chart_id_weekly_charts_id_fk" FOREIGN KEY ("right_weekly_chart_id") REFERENCES "public"."weekly_charts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_events_sidebar_announcement_id_announcements_id_fk" FOREIGN KEY ("events_sidebar_announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_events_sidebar_advertisement_id_advertisements_id_fk" FOREIGN KEY ("events_sidebar_advertisement_id") REFERENCES "public"."advertisements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_events_full_width_announcement_id_announcements_id_fk" FOREIGN KEY ("events_full_width_announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_articles_sidebar_announcement_id_announcements_id_fk" FOREIGN KEY ("articles_sidebar_announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_articles_sidebar_advertisement_id_advertisements_id_fk" FOREIGN KEY ("articles_sidebar_advertisement_id") REFERENCES "public"."advertisements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_articles_full_width_announcement_id_announcements_id_fk" FOREIGN KEY ("articles_full_width_announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_podcasts_sidebar_announcement_id_announcements_id_fk" FOREIGN KEY ("podcasts_sidebar_announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_podcasts_sidebar_advertisement_id_advertisements_id_fk" FOREIGN KEY ("podcasts_sidebar_advertisement_id") REFERENCES "public"."advertisements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_podcasts_full_width_announcement_id_announcements_id_fk" FOREIGN KEY ("podcasts_full_width_announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_dj_detail_sidebar_announcement_id_announcements_id_fk" FOREIGN KEY ("dj_detail_sidebar_announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_dj_detail_sidebar_advertisement_id_advertisements_id_fk" FOREIGN KEY ("dj_detail_sidebar_advertisement_id") REFERENCES "public"."advertisements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_schedule_sidebar_announcement_id_announcements_id_fk" FOREIGN KEY ("schedule_sidebar_announcement_id") REFERENCES "public"."announcements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_schedule_sidebar_advertisement_id_advertisements_id_fk" FOREIGN KEY ("schedule_sidebar_advertisement_id") REFERENCES "public"."advertisements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_d_case_logo_id_media_id_fk" FOREIGN KEY ("d_case_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_il_arts_council_logo_id_media_id_fk" FOREIGN KEY ("il_arts_council_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_support_advertisement_id_advertisements_id_fk" FOREIGN KEY ("support_advertisement_id") REFERENCES "public"."advertisements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_chirp_film_fest_logo_id_media_id_fk" FOREIGN KEY ("chirp_film_fest_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_first_time_logo_id_media_id_fk" FOREIGN KEY ("first_time_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "listeners_roles_order_idx" ON "listeners_roles" USING btree ("order");
  CREATE INDEX "listeners_roles_parent_idx" ON "listeners_roles" USING btree ("parent_id");
  CREATE INDEX "listeners_collection_order_idx" ON "listeners_collection" USING btree ("_order");
  CREATE INDEX "listeners_collection_parent_id_idx" ON "listeners_collection" USING btree ("_parent_id");
  CREATE INDEX "listeners_favorite_d_js_order_idx" ON "listeners_favorite_d_js" USING btree ("_order");
  CREATE INDEX "listeners_favorite_d_js_parent_id_idx" ON "listeners_favorite_d_js" USING btree ("_parent_id");
  CREATE INDEX "listeners_volunteer_orgs_order_idx" ON "listeners_volunteer_orgs" USING btree ("_order");
  CREATE INDEX "listeners_volunteer_orgs_parent_id_idx" ON "listeners_volunteer_orgs" USING btree ("_parent_id");
  CREATE INDEX "listeners_special_skills_order_idx" ON "listeners_special_skills" USING btree ("_order");
  CREATE INDEX "listeners_special_skills_parent_id_idx" ON "listeners_special_skills" USING btree ("_parent_id");
  CREATE INDEX "listeners_hear_about_chirp_order_idx" ON "listeners_hear_about_chirp" USING btree ("_order");
  CREATE INDEX "listeners_hear_about_chirp_parent_id_idx" ON "listeners_hear_about_chirp" USING btree ("_parent_id");
  CREATE INDEX "listeners_interests_order_idx" ON "listeners_interests" USING btree ("_order");
  CREATE INDEX "listeners_interests_parent_id_idx" ON "listeners_interests" USING btree ("_parent_id");
  CREATE INDEX "listeners_dj_availability_order_idx" ON "listeners_dj_availability" USING btree ("_order");
  CREATE INDEX "listeners_dj_availability_parent_id_idx" ON "listeners_dj_availability" USING btree ("_parent_id");
  CREATE INDEX "listeners_previous_shows_order_idx" ON "listeners_previous_shows" USING btree ("_order");
  CREATE INDEX "listeners_previous_shows_parent_id_idx" ON "listeners_previous_shows" USING btree ("_parent_id");
  CREATE INDEX "listeners_substitute_availability_order_idx" ON "listeners_substitute_availability" USING btree ("_order");
  CREATE INDEX "listeners_substitute_availability_parent_id_idx" ON "listeners_substitute_availability" USING btree ("_parent_id");
  CREATE INDEX "listeners_can_substitute_for_order_idx" ON "listeners_can_substitute_for" USING btree ("_order");
  CREATE INDEX "listeners_can_substitute_for_parent_id_idx" ON "listeners_can_substitute_for" USING btree ("_parent_id");
  CREATE INDEX "listeners_sessions_order_idx" ON "listeners_sessions" USING btree ("_order");
  CREATE INDEX "listeners_sessions_parent_id_idx" ON "listeners_sessions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "listeners_email_idx" ON "listeners" USING btree ("email");
  CREATE INDEX "listeners_profile_image_idx" ON "listeners" USING btree ("profile_image_id");
  CREATE INDEX "listeners_updated_at_idx" ON "listeners" USING btree ("updated_at");
  CREATE INDEX "listeners_created_at_idx" ON "listeners" USING btree ("created_at");
  CREATE UNIQUE INDEX "listeners_email_1_idx" ON "listeners" USING btree ("email");
  CREATE INDEX "show_schedules_dj_idx" ON "show_schedules" USING btree ("dj_id");
  CREATE INDEX "show_schedules_updated_at_idx" ON "show_schedules" USING btree ("updated_at");
  CREATE INDEX "show_schedules_created_at_idx" ON "show_schedules" USING btree ("created_at");
  CREATE INDEX "articles_tags_order_idx" ON "articles_tags" USING btree ("_order");
  CREATE INDEX "articles_tags_parent_id_idx" ON "articles_tags" USING btree ("_parent_id");
  CREATE INDEX "articles_category_idx" ON "articles" USING btree ("category_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_featured_image_idx" ON "articles" USING btree ("featured_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "events_category_idx" ON "events" USING btree ("category_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_featured_image_idx" ON "events" USING btree ("featured_image_id");
  CREATE INDEX "events_venue_idx" ON "events" USING btree ("venue_id");
  CREATE INDEX "events_age_restriction_idx" ON "events" USING btree ("age_restriction_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "podcasts_tags_order_idx" ON "podcasts_tags" USING btree ("_order");
  CREATE INDEX "podcasts_tags_parent_id_idx" ON "podcasts_tags" USING btree ("_parent_id");
  CREATE INDEX "podcasts_category_idx" ON "podcasts" USING btree ("category_id");
  CREATE UNIQUE INDEX "podcasts_slug_idx" ON "podcasts" USING btree ("slug");
  CREATE INDEX "podcasts_cover_art_idx" ON "podcasts" USING btree ("cover_art_id");
  CREATE INDEX "podcasts_updated_at_idx" ON "podcasts" USING btree ("updated_at");
  CREATE INDEX "podcasts_created_at_idx" ON "podcasts" USING btree ("created_at");
  CREATE INDEX "shop_items_images_order_idx" ON "shop_items_images" USING btree ("_order");
  CREATE INDEX "shop_items_images_parent_id_idx" ON "shop_items_images" USING btree ("_parent_id");
  CREATE INDEX "shop_items_images_image_idx" ON "shop_items_images" USING btree ("image_id");
  CREATE INDEX "shop_items_additional_image_urls_order_idx" ON "shop_items_additional_image_urls" USING btree ("_order");
  CREATE INDEX "shop_items_additional_image_urls_parent_id_idx" ON "shop_items_additional_image_urls" USING btree ("_parent_id");
  CREATE INDEX "shop_items_sizes_order_idx" ON "shop_items_sizes" USING btree ("_order");
  CREATE INDEX "shop_items_sizes_parent_id_idx" ON "shop_items_sizes" USING btree ("_parent_id");
  CREATE INDEX "shop_items_variants_options_order_idx" ON "shop_items_variants_options" USING btree ("_order");
  CREATE INDEX "shop_items_variants_options_parent_id_idx" ON "shop_items_variants_options" USING btree ("_parent_id");
  CREATE INDEX "shop_items_variants_order_idx" ON "shop_items_variants" USING btree ("_order");
  CREATE INDEX "shop_items_variants_parent_id_idx" ON "shop_items_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "shop_items_slug_idx" ON "shop_items" USING btree ("slug");
  CREATE INDEX "shop_items_updated_at_idx" ON "shop_items" USING btree ("updated_at");
  CREATE INDEX "shop_items_created_at_idx" ON "shop_items" USING btree ("created_at");
  CREATE INDEX "weekly_charts_tracks_order_idx" ON "weekly_charts_tracks" USING btree ("_order");
  CREATE INDEX "weekly_charts_tracks_parent_id_idx" ON "weekly_charts_tracks" USING btree ("_parent_id");
  CREATE INDEX "weekly_charts_csv_file_idx" ON "weekly_charts" USING btree ("csv_file_id");
  CREATE INDEX "weekly_charts_updated_at_idx" ON "weekly_charts" USING btree ("updated_at");
  CREATE INDEX "weekly_charts_created_at_idx" ON "weekly_charts" USING btree ("created_at");
  CREATE INDEX "volunteer_calendar_event_details_order_idx" ON "volunteer_calendar_event_details" USING btree ("_order");
  CREATE INDEX "volunteer_calendar_event_details_parent_id_idx" ON "volunteer_calendar_event_details" USING btree ("_parent_id");
  CREATE INDEX "volunteer_calendar_updated_at_idx" ON "volunteer_calendar" USING btree ("updated_at");
  CREATE INDEX "volunteer_calendar_created_at_idx" ON "volunteer_calendar" USING btree ("created_at");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "venues_updated_at_idx" ON "venues" USING btree ("updated_at");
  CREATE INDEX "venues_created_at_idx" ON "venues" USING btree ("created_at");
  CREATE INDEX "announcements_updated_at_idx" ON "announcements" USING btree ("updated_at");
  CREATE INDEX "announcements_created_at_idx" ON "announcements" USING btree ("created_at");
  CREATE INDEX "advertisements_image_idx" ON "advertisements" USING btree ("image_id");
  CREATE INDEX "advertisements_video_idx" ON "advertisements" USING btree ("video_id");
  CREATE INDEX "advertisements_updated_at_idx" ON "advertisements" USING btree ("updated_at");
  CREATE INDEX "advertisements_created_at_idx" ON "advertisements" USING btree ("created_at");
  CREATE INDEX "age_gate_updated_at_idx" ON "age_gate" USING btree ("updated_at");
  CREATE INDEX "age_gate_created_at_idx" ON "age_gate" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "player_fallback_images_updated_at_idx" ON "player_fallback_images" USING btree ("updated_at");
  CREATE INDEX "player_fallback_images_created_at_idx" ON "player_fallback_images" USING btree ("created_at");
  CREATE UNIQUE INDEX "player_fallback_images_filename_idx" ON "player_fallback_images" USING btree ("filename");
  CREATE INDEX "player_fallback_images_sizes_thumbnail_sizes_thumbnail_f_idx" ON "player_fallback_images" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "player_fallback_images_sizes_player_sizes_player_filenam_idx" ON "player_fallback_images" USING btree ("sizes_player_filename");
  CREATE INDEX "donations_member_idx" ON "donations" USING btree ("member_id");
  CREATE UNIQUE INDEX "donations_transaction_id_idx" ON "donations" USING btree ("transaction_id");
  CREATE INDEX "donations_updated_at_idx" ON "donations" USING btree ("updated_at");
  CREATE INDEX "donations_created_at_idx" ON "donations" USING btree ("created_at");
  CREATE INDEX "purchases_items_order_idx" ON "purchases_items" USING btree ("_order");
  CREATE INDEX "purchases_items_parent_id_idx" ON "purchases_items" USING btree ("_parent_id");
  CREATE INDEX "purchases_member_idx" ON "purchases" USING btree ("member_id");
  CREATE UNIQUE INDEX "purchases_transaction_id_idx" ON "purchases" USING btree ("transaction_id");
  CREATE INDEX "purchases_updated_at_idx" ON "purchases" USING btree ("updated_at");
  CREATE INDEX "purchases_created_at_idx" ON "purchases" USING btree ("created_at");
  CREATE INDEX "pages_blocks_content_card_order_idx" ON "pages_blocks_content_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_card_parent_id_idx" ON "pages_blocks_content_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_card_path_idx" ON "pages_blocks_content_card" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_card_background_image_idx" ON "pages_blocks_content_card" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_image_row_images_order_idx" ON "pages_blocks_image_row_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_row_images_parent_id_idx" ON "pages_blocks_image_row_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_row_images_image_idx" ON "pages_blocks_image_row_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_row_order_idx" ON "pages_blocks_image_row" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_row_parent_id_idx" ON "pages_blocks_image_row" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_row_path_idx" ON "pages_blocks_image_row" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_sidebar_announcement_idx" ON "pages" USING btree ("sidebar_announcement_id");
  CREATE INDEX "pages_sidebar_advertisement_idx" ON "pages" USING btree ("sidebar_advertisement_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "mobile_page_content_page_identifier_idx" ON "mobile_page_content" USING btree ("page_identifier");
  CREATE INDEX "mobile_page_content_announcement_idx" ON "mobile_page_content" USING btree ("announcement_id");
  CREATE INDEX "mobile_page_content_updated_at_idx" ON "mobile_page_content" USING btree ("updated_at");
  CREATE INDEX "mobile_page_content_created_at_idx" ON "mobile_page_content" USING btree ("created_at");
  CREATE INDEX "onboarding_media_idx" ON "onboarding" USING btree ("media_id");
  CREATE INDEX "onboarding_updated_at_idx" ON "onboarding" USING btree ("updated_at");
  CREATE INDEX "onboarding_created_at_idx" ON "onboarding" USING btree ("created_at");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_articles_id_idx" ON "redirects_rels" USING btree ("articles_id");
  CREATE INDEX "redirects_rels_events_id_idx" ON "redirects_rels" USING btree ("events_id");
  CREATE INDEX "redirects_rels_podcasts_id_idx" ON "redirects_rels" USING btree ("podcasts_id");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_listeners_id_idx" ON "payload_locked_documents_rels" USING btree ("listeners_id");
  CREATE INDEX "payload_locked_documents_rels_show_schedules_id_idx" ON "payload_locked_documents_rels" USING btree ("show_schedules_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_podcasts_id_idx" ON "payload_locked_documents_rels" USING btree ("podcasts_id");
  CREATE INDEX "payload_locked_documents_rels_shop_items_id_idx" ON "payload_locked_documents_rels" USING btree ("shop_items_id");
  CREATE INDEX "payload_locked_documents_rels_weekly_charts_id_idx" ON "payload_locked_documents_rels" USING btree ("weekly_charts_id");
  CREATE INDEX "payload_locked_documents_rels_volunteer_calendar_id_idx" ON "payload_locked_documents_rels" USING btree ("volunteer_calendar_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_venues_id_idx" ON "payload_locked_documents_rels" USING btree ("venues_id");
  CREATE INDEX "payload_locked_documents_rels_announcements_id_idx" ON "payload_locked_documents_rels" USING btree ("announcements_id");
  CREATE INDEX "payload_locked_documents_rels_advertisements_id_idx" ON "payload_locked_documents_rels" USING btree ("advertisements_id");
  CREATE INDEX "payload_locked_documents_rels_age_gate_id_idx" ON "payload_locked_documents_rels" USING btree ("age_gate_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_player_fallback_images_id_idx" ON "payload_locked_documents_rels" USING btree ("player_fallback_images_id");
  CREATE INDEX "payload_locked_documents_rels_donations_id_idx" ON "payload_locked_documents_rels" USING btree ("donations_id");
  CREATE INDEX "payload_locked_documents_rels_purchases_id_idx" ON "payload_locked_documents_rels" USING btree ("purchases_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_mobile_page_content_id_idx" ON "payload_locked_documents_rels" USING btree ("mobile_page_content_id");
  CREATE INDEX "payload_locked_documents_rels_onboarding_id_idx" ON "payload_locked_documents_rels" USING btree ("onboarding_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_listeners_id_idx" ON "payload_preferences_rels" USING btree ("listeners_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "mobile_app_settings_account_benefits_benefits_order_idx" ON "mobile_app_settings_account_benefits_benefits" USING btree ("_order");
  CREATE INDEX "mobile_app_settings_account_benefits_benefits_parent_id_idx" ON "mobile_app_settings_account_benefits_benefits" USING btree ("_parent_id");
  CREATE INDEX "volunteer_form_settings_age_question_options_order_idx" ON "volunteer_form_settings_age_question_options" USING btree ("_order");
  CREATE INDEX "volunteer_form_settings_age_question_options_parent_id_idx" ON "volunteer_form_settings_age_question_options" USING btree ("_parent_id");
  CREATE INDEX "volunteer_form_settings_special_skills_question_options_order_idx" ON "volunteer_form_settings_special_skills_question_options" USING btree ("_order");
  CREATE INDEX "volunteer_form_settings_special_skills_question_options_parent_id_idx" ON "volunteer_form_settings_special_skills_question_options" USING btree ("_parent_id");
  CREATE INDEX "volunteer_form_settings_hear_about_chirp_question_options_order_idx" ON "volunteer_form_settings_hear_about_chirp_question_options" USING btree ("_order");
  CREATE INDEX "volunteer_form_settings_hear_about_chirp_question_options_parent_id_idx" ON "volunteer_form_settings_hear_about_chirp_question_options" USING btree ("_parent_id");
  CREATE INDEX "volunteer_form_settings_interests_question_options_order_idx" ON "volunteer_form_settings_interests_question_options" USING btree ("_order");
  CREATE INDEX "volunteer_form_settings_interests_question_options_parent_id_idx" ON "volunteer_form_settings_interests_question_options" USING btree ("_parent_id");
  CREATE INDEX "volunteer_form_settings_dj_availability_question_options_order_idx" ON "volunteer_form_settings_dj_availability_question_options" USING btree ("_order");
  CREATE INDEX "volunteer_form_settings_dj_availability_question_options_parent_id_idx" ON "volunteer_form_settings_dj_availability_question_options" USING btree ("_parent_id");
  CREATE INDEX "site_settings_additional_logos_order_idx" ON "site_settings_additional_logos" USING btree ("_order");
  CREATE INDEX "site_settings_additional_logos_parent_id_idx" ON "site_settings_additional_logos" USING btree ("_parent_id");
  CREATE INDEX "site_settings_additional_logos_logo_idx" ON "site_settings_additional_logos" USING btree ("logo_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_top_announcement_idx" ON "site_settings" USING btree ("top_announcement_id");
  CREATE INDEX "site_settings_sidebar_announcement_idx" ON "site_settings" USING btree ("sidebar_announcement_id");
  CREATE INDEX "site_settings_sidebar_advertisement_idx" ON "site_settings" USING btree ("sidebar_advertisement_id");
  CREATE INDEX "site_settings_listen_sidebar_weekly_chart_idx" ON "site_settings" USING btree ("listen_sidebar_weekly_chart_id");
  CREATE INDEX "site_settings_listen_sidebar_advertisement_idx" ON "site_settings" USING btree ("listen_sidebar_advertisement_id");
  CREATE INDEX "site_settings_full_width_announcement_idx" ON "site_settings" USING btree ("full_width_announcement_id");
  CREATE INDEX "site_settings_left_weekly_chart_idx" ON "site_settings" USING btree ("left_weekly_chart_id");
  CREATE INDEX "site_settings_right_weekly_chart_idx" ON "site_settings" USING btree ("right_weekly_chart_id");
  CREATE INDEX "site_settings_events_sidebar_announcement_idx" ON "site_settings" USING btree ("events_sidebar_announcement_id");
  CREATE INDEX "site_settings_events_sidebar_advertisement_idx" ON "site_settings" USING btree ("events_sidebar_advertisement_id");
  CREATE INDEX "site_settings_events_full_width_announcement_idx" ON "site_settings" USING btree ("events_full_width_announcement_id");
  CREATE INDEX "site_settings_articles_sidebar_announcement_idx" ON "site_settings" USING btree ("articles_sidebar_announcement_id");
  CREATE INDEX "site_settings_articles_sidebar_advertisement_idx" ON "site_settings" USING btree ("articles_sidebar_advertisement_id");
  CREATE INDEX "site_settings_articles_full_width_announcement_idx" ON "site_settings" USING btree ("articles_full_width_announcement_id");
  CREATE INDEX "site_settings_podcasts_sidebar_announcement_idx" ON "site_settings" USING btree ("podcasts_sidebar_announcement_id");
  CREATE INDEX "site_settings_podcasts_sidebar_advertisement_idx" ON "site_settings" USING btree ("podcasts_sidebar_advertisement_id");
  CREATE INDEX "site_settings_podcasts_full_width_announcement_idx" ON "site_settings" USING btree ("podcasts_full_width_announcement_id");
  CREATE INDEX "site_settings_dj_detail_sidebar_announcement_idx" ON "site_settings" USING btree ("dj_detail_sidebar_announcement_id");
  CREATE INDEX "site_settings_dj_detail_sidebar_advertisement_idx" ON "site_settings" USING btree ("dj_detail_sidebar_advertisement_id");
  CREATE INDEX "site_settings_schedule_sidebar_announcement_idx" ON "site_settings" USING btree ("schedule_sidebar_announcement_id");
  CREATE INDEX "site_settings_schedule_sidebar_advertisement_idx" ON "site_settings" USING btree ("schedule_sidebar_advertisement_id");
  CREATE INDEX "site_settings_d_case_logo_idx" ON "site_settings" USING btree ("d_case_logo_id");
  CREATE INDEX "site_settings_il_arts_council_logo_idx" ON "site_settings" USING btree ("il_arts_council_logo_id");
  CREATE INDEX "site_settings_support_advertisement_idx" ON "site_settings" USING btree ("support_advertisement_id");
  CREATE INDEX "site_settings_chirp_film_fest_logo_idx" ON "site_settings" USING btree ("chirp_film_fest_logo_id");
  CREATE INDEX "site_settings_first_time_logo_idx" ON "site_settings" USING btree ("first_time_logo_id");`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "listeners_roles" CASCADE;
  DROP TABLE "listeners_collection" CASCADE;
  DROP TABLE "listeners_favorite_d_js" CASCADE;
  DROP TABLE "listeners_volunteer_orgs" CASCADE;
  DROP TABLE "listeners_special_skills" CASCADE;
  DROP TABLE "listeners_hear_about_chirp" CASCADE;
  DROP TABLE "listeners_interests" CASCADE;
  DROP TABLE "listeners_dj_availability" CASCADE;
  DROP TABLE "listeners_previous_shows" CASCADE;
  DROP TABLE "listeners_substitute_availability" CASCADE;
  DROP TABLE "listeners_can_substitute_for" CASCADE;
  DROP TABLE "listeners_sessions" CASCADE;
  DROP TABLE "listeners" CASCADE;
  DROP TABLE "show_schedules" CASCADE;
  DROP TABLE "articles_tags" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "podcasts_tags" CASCADE;
  DROP TABLE "podcasts" CASCADE;
  DROP TABLE "shop_items_images" CASCADE;
  DROP TABLE "shop_items_additional_image_urls" CASCADE;
  DROP TABLE "shop_items_sizes" CASCADE;
  DROP TABLE "shop_items_variants_options" CASCADE;
  DROP TABLE "shop_items_variants" CASCADE;
  DROP TABLE "shop_items" CASCADE;
  DROP TABLE "weekly_charts_tracks" CASCADE;
  DROP TABLE "weekly_charts" CASCADE;
  DROP TABLE "volunteer_calendar_event_details" CASCADE;
  DROP TABLE "volunteer_calendar" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "venues" CASCADE;
  DROP TABLE "announcements" CASCADE;
  DROP TABLE "advertisements" CASCADE;
  DROP TABLE "age_gate" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "player_fallback_images" CASCADE;
  DROP TABLE "donations" CASCADE;
  DROP TABLE "purchases_items" CASCADE;
  DROP TABLE "purchases" CASCADE;
  DROP TABLE "pages_blocks_content_card" CASCADE;
  DROP TABLE "pages_blocks_image_row_images" CASCADE;
  DROP TABLE "pages_blocks_image_row" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "mobile_page_content" CASCADE;
  DROP TABLE "onboarding" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "mobile_app_settings_account_benefits_benefits" CASCADE;
  DROP TABLE "mobile_app_settings" CASCADE;
  DROP TABLE "volunteer_form_settings_age_question_options" CASCADE;
  DROP TABLE "volunteer_form_settings_special_skills_question_options" CASCADE;
  DROP TABLE "volunteer_form_settings_hear_about_chirp_question_options" CASCADE;
  DROP TABLE "volunteer_form_settings_interests_question_options" CASCADE;
  DROP TABLE "volunteer_form_settings_dj_availability_question_options" CASCADE;
  DROP TABLE "volunteer_form_settings" CASCADE;
  DROP TABLE "site_settings_additional_logos" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_listeners_roles";
  DROP TYPE "public"."enum_listeners_profile_image_orientation";
  DROP TYPE "public"."enum_listeners_preferences_dark_mode";
  DROP TYPE "public"."enum_show_schedules_day_of_week";
  DROP TYPE "public"."enum_shop_items_category";
  DROP TYPE "public"."enum_weekly_charts_status";
  DROP TYPE "public"."enum_announcements_variant";
  DROP TYPE "public"."enum_announcements_texture_background";
  DROP TYPE "public"."enum_announcements_button_count";
  DROP TYPE "public"."enum_announcements_button1_icon";
  DROP TYPE "public"."enum_announcements_button2_icon";
  DROP TYPE "public"."enum_advertisements_size";
  DROP TYPE "public"."enum_advertisements_content_type";
  DROP TYPE "public"."enum_advertisements_target";
  DROP TYPE "public"."enum_media_category";
  DROP TYPE "public"."enum_donations_type";
  DROP TYPE "public"."enum_donations_status";
  DROP TYPE "public"."enum_donations_source";
  DROP TYPE "public"."enum_purchases_status";
  DROP TYPE "public"."enum_pages_blocks_content_card_title_tag";
  DROP TYPE "public"."enum_pages_blocks_content_card_image_position";
  DROP TYPE "public"."enum_pages_layout_template";
  DROP TYPE "public"."enum_pages_sidebar_content_type";
  DROP TYPE "public"."enum_mobile_page_content_page_identifier";
  DROP TYPE "public"."enum_onboarding_feature_identifier";
  DROP TYPE "public"."enum_onboarding_platform";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_site_settings_social_links_platform";
  DROP TYPE "public"."enum_site_settings_events_sidebar_content_type";
  DROP TYPE "public"."enum_site_settings_events_sidebar_content_count";
  DROP TYPE "public"."enum_site_settings_articles_sidebar_content_type";
  DROP TYPE "public"."enum_site_settings_articles_sidebar_content_count";
  DROP TYPE "public"."enum_site_settings_dj_detail_sidebar_content_type";
  DROP TYPE "public"."enum_site_settings_dj_detail_sidebar_content_count";
  DROP TYPE "public"."enum_site_settings_schedule_sidebar_content_type";
  DROP TYPE "public"."enum_site_settings_schedule_sidebar_content_count";`)
}
