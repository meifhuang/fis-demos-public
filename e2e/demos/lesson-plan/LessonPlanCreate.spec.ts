import { test, expect } from "../../base-test";

test.describe("Creation of a new Lesson Plan", () => {
  test.beforeEach(async ({ lessonPlanCreatePage }) => {
    // Navigate to the creation page before each test
    await lessonPlanCreatePage.goto();
    // Wait for the heading to ensure the page has loaded
    await expect(lessonPlanCreatePage.heading).toBeVisible();
  });

  test("Submit button is enabled when custom source material selected and filled", async ({
    lessonPlanCreatePage,
  }) => {
    await lessonPlanCreatePage.customSourceMaterialFillAll();

    // The submit button should now be enabled
    await expect(lessonPlanCreatePage.submitButton).toBeEnabled();
  });

  test("Submit button is enabled when preset source material selected", async ({
    lessonPlanCreatePage,
  }) => {
    await lessonPlanCreatePage.presetSourceMaterialFillAll();

    // The submit button should now be enabled
    await expect(lessonPlanCreatePage.submitButton).toBeEnabled();
  });
});
