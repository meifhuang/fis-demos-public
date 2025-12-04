CREATE TRIGGER handle_updated_at BEFORE
UPDATE ON public.course_outlines FOR EACH ROW
EXECUTE FUNCTION moddatetime ('updated_at');