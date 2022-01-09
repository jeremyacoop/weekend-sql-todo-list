CREATE TABLE "to-do" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100) NOT NULL,
	"section" VARCHAR(60),
	"priority" CHAR(1),
    "deadline_date" DATE,
    "deadline_time" TIME,
	"complete" BOOLEAN DEFAULT false,
	"time_started" TIMESTAMP,
	"time_completed" TIMESTAMP,
	"notes" VARCHAR(200)
);