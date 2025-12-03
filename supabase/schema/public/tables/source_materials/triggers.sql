CREATE TRIGGER handle_updated_at BEFORE
UPDATE ON public.source_materials FOR EACH ROW
EXECUTE FUNCTION moddatetime ('updated_at');