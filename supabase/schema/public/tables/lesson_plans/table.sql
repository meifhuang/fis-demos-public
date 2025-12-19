CREATE TABLE
  public.lesson_plans (
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    creation_meta jsonb NOT NULL DEFAULT '{}'::jsonb,
    introduction text NOT NULL DEFAULT NULL,
    context text NOT NULL DEFAULT NULL,
    example text NOT NULL DEFAULT NULL,
    practice text NOT NULL DEFAULT NULL,
    assessment text NOT NULL DEFAULT NULL,
    reflection text NOT NULL DEFAULT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
  );

;

CREATE UNIQUE INDEX lesson_plans_pkey ON public.lesson_plans USING btree (id);