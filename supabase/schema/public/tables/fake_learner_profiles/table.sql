CREATE TABLE
  public.fake_learner_profiles (
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    label text NOT NULL DEFAULT NULL,
    age integer NOT NULL DEFAULT NULL,
    reading_level integer NOT NULL DEFAULT NULL,
    interests text[] NULL DEFAULT '{}'::text[],
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
  );

;

CREATE UNIQUE INDEX fake_learner_profiles_pkey ON public.fake_learner_profiles USING btree (id);