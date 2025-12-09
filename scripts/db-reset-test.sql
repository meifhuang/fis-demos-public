-- Ensure schema exists
CREATE SCHEMA IF NOT EXISTS test_public;

-- Grant schema privileges to service_role
GRANT USAGE ON SCHEMA test_public TO service_role;
GRANT CREATE ON SCHEMA test_public TO service_role;

DO $$
DECLARE
    tbl RECORD;
BEGIN
    -- Drop existing tables
    FOR tbl IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'test_public'
    LOOP
        EXECUTE format('DROP TABLE IF EXISTS test_public.%I CASCADE', tbl.tablename);
    END LOOP;

    -- Clone tables from public
    FOR tbl IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format(
            'CREATE TABLE test_public.%I (LIKE public.%I INCLUDING ALL)',
            tbl.tablename, tbl.tablename
        );
    END LOOP;

    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA test_public TO service_role;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA test_public TO service_role;

    -- Delete any existing table data
    FOR tbl IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'test_public'
    LOOP
        EXECUTE format('TRUNCATE TABLE test_public.%I RESTART IDENTITY CASCADE', tbl.tablename);
    END LOOP;
END $$;

-- Add new schema (+ all other public schemas) to PostgREST
-- https://github.com/orgs/supabase/discussions/30661#discussioncomment-11377951
DO $$
DECLARE
    schema_list TEXT;
BEGIN
    -- Generate the list of schemas
    SELECT string_agg(nspname, ',')
    INTO schema_list
    FROM pg_namespace
    WHERE nspname LIKE '%public%';

    -- Set the role's pgrst.db_schemas configuration
    EXECUTE format(
        'ALTER ROLE authenticator SET pgrst.db_schemas = %L',
        schema_list
    );
END $$;

NOTIFY pgrst, 'reload config';
NOTIFY pgrst, 'reload schema';
