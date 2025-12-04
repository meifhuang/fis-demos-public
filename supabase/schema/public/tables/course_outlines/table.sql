CREATE TABLE
  public.course_outlines (
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    creation_meta jsonb NOT NULL DEFAULT '{}'::jsonb,
    title text NOT NULL DEFAULT NULL,
    description text NOT NULL DEFAULT NULL,
    lesson_outlines jsonb NOT NULL DEFAULT '[]'::jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
  );

;

CREATE UNIQUE INDEX course_outlines_pkey ON public.course_outlines USING btree (id);