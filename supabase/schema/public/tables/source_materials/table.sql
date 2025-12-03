CREATE TABLE
  public.source_materials (
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    title text NOT NULL DEFAULT NULL,
    markdown text NOT NULL DEFAULT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
  );

;

CREATE UNIQUE INDEX source_materials_pkey ON public.source_materials USING btree (id);