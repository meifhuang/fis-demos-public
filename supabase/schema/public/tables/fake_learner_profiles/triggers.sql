CREATE TRIGGER handle_updated_at BEFORE
UPDATE ON public.fake_learner_profiles FOR EACH ROW
EXECUTE FUNCTION moddatetime ('updated_at');