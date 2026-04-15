CREATE TABLE "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"unit" text NOT NULL,
	"to_buy" boolean DEFAULT false NOT NULL,
	"quantity_to_buy" integer DEFAULT 0 NOT NULL
);
