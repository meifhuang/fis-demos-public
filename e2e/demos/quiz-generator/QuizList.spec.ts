import { test, expect } from "../../base-test";

test.describe("List of generated quizzes", () => {
  test.beforeEach(async ({ quizListPage: quizPage }) => {
    await quizPage.goto();

    // Wait for the simulated loading state to clear (100ms delay in React component)
    await expect(quizPage.skeletonWrapper).not.toBeVisible();

    // Wait for the records container to appear
    await expect(quizPage.recordsContainer).toBeVisible();
  });

  test("should render the list title and create button", async ({
    page,
    quizListPage,
  }) => {
    // Verify Title
    await expect(quizListPage.heading).toBeVisible();

    // Verify Create Button
    const createButton = page.getByTestId("create-new-button");
    await expect(createButton).toBeVisible();
    await expect(createButton).toHaveText(/Create New/);
  });

  // TODO: this runs against the "public" schema in development. Ideally, it
  // should use the "test_public" schema or a mock.
  test("should render the correct number of list items", async ({ page }) => {
    const listItems = page.getByTestId("list-item-card");
    await expect(listItems).toHaveCount(1);
  });

  test("should display content and action buttons for the first course record", async ({
    quizListPage,
  }) => {
    // --- Content Verification ---

    // Title
    await expect(quizListPage.exampleRecordTitle).toBeVisible();

    // Description
    await expect(quizListPage.exampleRecordDescription).toBeVisible();

    // Questions
    await expect(quizListPage.exampleRecordTotalQuestions).toBeVisible();

    // Learner Chip Verification
    await expect(quizListPage.exampleRecordLearnerChip).toBeVisible();

    // --- Button Verification ---

    // Take Button
    await expect(quizListPage.exampleRecordTakeButton).toBeVisible();

    // Edit Button
    await expect(quizListPage.exampleRecordEditButton).toBeVisible();
  });

  test("should show loading skeleton initially", async ({
    page,
    quizListPage,
  }) => {
    // Reload the page to catch the initial loading state
    await page.reload();

    // Verify the skeleton is visible immediately
    await expect(quizListPage.skeletonWrapper).toBeVisible();

    // Wait for loading to complete and verify the data appears
    await expect(quizListPage.recordsContainer).toBeVisible();
  });
});
