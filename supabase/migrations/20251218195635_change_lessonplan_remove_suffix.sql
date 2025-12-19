alter table lesson_plans
rename column introduction_markdown to introduction;

alter table lesson_plans
rename column context_markdown to context;

alter table lesson_plans
rename column example_markdown to example;

alter table lesson_plans
rename column practice_markdown to practice;

alter table lesson_plans
rename column assessment_markdown to assessment;

alter table lesson_plans
rename column reflection_markdown to reflection;
