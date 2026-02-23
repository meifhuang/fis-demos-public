import { test, expect } from "./base-test";
import { ROUTES } from "./routes";

test("1. Renders the main Adaptive Learning headline and intro text", async ({
  dashboardPage,
}) => {
  // 1. Verify the main structural headline
  await expect(dashboardPage.heading).toBeVisible();

  // 2. Verify the presence of the descriptive text
  await expect(dashboardPage.introText).toBeVisible();
});

test("2. Renders all five Demo Cards with correct titles and demo buttons exist", async ({
  page,
  dashboardPage,
}) => {
  // Test 1: Verify all demo card titles are visible
  await expect(
    page.getByRole("heading", { name: "Quiz Generator" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Course Outline" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Personalized Content" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Lesson Planner" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Lessons" })).toBeVisible();

  //Test 2: Verify each demo button is visible
  await expect(dashboardPage.quizGeneratorCardButton).toBeVisible();
  await expect(dashboardPage.courseOutlineCardButton).toBeVisible();
  await expect(dashboardPage.personalizedContentCardButton).toBeVisible();
  await expect(dashboardPage.lessonPlanCardButton).toBeVisible();
  await expect(dashboardPage.lessonCardButton).toBeVisible();

  // // ASSERTION: Verify the resulting URL matches the expected href
  // await expect(page).toHaveURL("/quiz-generator");

  //  // Test 2: Verify the course outline is linked correctly and has the description
  // const courseOutlineButton = dashboardPage.courseOutlineCardButton;

  // // ACT: Click the Quiz Generator's View Demo button
  // await courseOutlineButton.click();

  // // ASSERTION: Verify the resulting URL matches the expected href
  // await expect(page).toHaveURL("/course-outline");
});

test("3. Shows the correct description for each tool", async ({
  dashboardPage,
}) => {
  // Test 3: Check for the descriptions (verifies data integrity)
  await expect(dashboardPage.quizGeneratorDescription).toBeVisible();
  await expect(dashboardPage.courseOutlineDescription).toBeVisible();
  await expect(dashboardPage.personalizedContentDescription).toBeVisible();
  await expect(dashboardPage.lessonPlanContentDescription).toBeVisible();
  await expect(dashboardPage.lessonCardDescription).toBeVisible();

  // await expect(
  //   page.getByText(/Transform any content into a personalized, adaptive/i),
  // ).toBeVisible();

  // await expect(
  //   page.getByText(/Quickly generate a full, adaptable course outline./i),
  // ).toBeVisible();

  // await expect(
  //   page.getByText(
  //     /Instantly rewrite any text or document into a format, tone/i,
  //   ),
  // ).toBeVisible();

  // await expect(
  //   page.getByText(/Plan your lessons perfectly based around/i),
  // ).toBeVisible();

  // await expect(
  //   page.getByText(/Create your lessons perfectly based around the/i),
  // ).toBeVisible();
});

// --- Test Group 1: Demo Card Navigation ---

test("4. Quiz Generator card navigates to /quiz-generator and verifies the heading", async ({
  page,
  quizListPage,
}) => {
  // Find the button inside the Quiz Generator card (first button on the page)
  const quizCardButton = page.getByRole("button", { name: "View Demo" }).nth(0);

  await quizCardButton.click();

  // // ASSERTION: Verify URL change
  await expect(page).toHaveURL(ROUTES.quizGenerator);

  // // ASSERTION: Verify the content on the new page
  await expect(quizListPage.heading).toBeVisible();
});

test("5. Content Mapping card navigates to /course-outline and verifies the heading", async ({
  page,
  courseOutlineListPage,
}) => {
  // Find the button inside the Content Mapping card (second button on the page)
  const contentCardButton = page
    .getByRole("button", { name: "View Demo" })
    .nth(1);

  await contentCardButton.click();

  // ASSERTION: Verify URL change
  await expect(page).toHaveURL(ROUTES.courseOutline);

  // ASSERTION: Verify the content on the new page
  await expect(courseOutlineListPage.heading).toBeVisible();
});

test("6. Personalized Content card navigates to /personalized-content and verifies the heading", async ({
  page,
}) => {
  // Find the button inside the Personalized Content card (third button on the page)
  const personalizedCardButton = page
    .getByRole("button", { name: "View Demo" })
    .nth(2);

  await personalizedCardButton.click();

  // ASSERTION: Verify URL change
  await expect(page).toHaveURL(ROUTES.personalizedContent);

  // ASSERTION: Verify the content on the new page
  await expect(
    page.getByRole("heading", { name: "Personalized Content Demo" }),
  ).toBeVisible();
});

test("7. Lesson Plan card navigates to /lesson-planner and verifies the heading", async ({
  page,
  lessonPlanPage,
}) => {
  // Find the button inside the Personalized Content card (third button on the page)
  const lessonPlanButton = page
    .getByRole("button", { name: "View Demo" })
    .nth(3);

  await lessonPlanButton.click();

  // ASSERTION: Verify URL change
  await expect(page).toHaveURL(ROUTES.lessonPlan);

  // ASSERTION: Verify the content on the new page
  await expect(lessonPlanPage.heading).toBeVisible();
});

test("8. Lesson card navigate to /lesson and verifies the heading", async ({
  page,
  dashboardPage,
  lessonListPage,
}) => {
  // const lessonButton = page.getByRole("button", { name: "View Demo" }).nth(4);

  // await lessonButton.click();

  await dashboardPage.visitLessonDemo();

  await expect(page).toHaveURL(ROUTES.lesson);

  await expect(lessonListPage.heading).toBeVisible();
});
