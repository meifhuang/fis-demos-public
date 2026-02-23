import { test, expect } from "../../base-test";

test.describe("List of generated lessons", () => {
  test.beforeEach(async ({ lessonListPage: lessonPage }) => {
    await lessonPage.goto();

    await expect(lessonPage.skeletonWrapper).not.toBeVisible({
      timeout: 10000,
    });

    await expect(lessonPage.recordsContainer).toBeVisible();
  });

  test("should render the list title and create button", async ({
    page,
    lessonListPage,
  }) => {
    await expect(lessonListPage.heading).toBeVisible();

    // Verify Create Button
    const createButton = page.getByTestId("create-new-button");
    await expect(createButton).toBeVisible();
    await expect(createButton).toHaveText(/Create New/);
  });

  test("should render the correct number of list items", async ({ page }) => {
    const listItems = page.getByTestId("list-item-card");
    await expect(listItems).toHaveCount(1);
  });

  test("should display content and action buttons for the first course record", async ({
    lessonListPage,
  }) => {
    // Title
    await expect(lessonListPage.exampleRecordTitle).toBeVisible();

    // Description
    await expect(lessonListPage.exampleRecordContent).toBeVisible();

    // Learner Chip Verification
    await expect(lessonListPage.exampleRecordLearnerChip).toBeVisible();

    // --- Button Verification ---

    // View Button
    await expect(lessonListPage.exampleRecordViewButton).toBeVisible();
  });

  test("should show loading skeleton initially", async ({
    page,
    lessonListPage,
  }) => {
    // Reload the page to catch the initial loading state
    await page.reload();

    // Verify the skeleton is visible immediately
    await expect(lessonListPage.skeletonWrapper).toBeVisible();

    // Wait for loading to complete and verify the data appears
    await expect(lessonListPage.recordsContainer).toBeVisible();
  });
});
