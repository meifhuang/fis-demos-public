import { Locator, Page } from "@playwright/test";
import { expect } from "../../../base-test";

export class LessonPlanCreatePage {
  readonly heading: Locator;

  // Form Fields
  readonly sourceMaterialTitleField: Locator;
  readonly sourceMaterialContentField: Locator;
  readonly learnerProfileSelect: Locator;

  // Buttons
  readonly submitButton: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", {
      name: "Create New Lesson Plan",
    });

    // --- Locators for Form Fields ---
    this.sourceMaterialTitleField = page.getByTestId(
      "lesson-plan-create-source-material-title"
    );
    this.sourceMaterialContentField = page.getByTestId(
      "lesson-plan-create-source-material-content"
    );

    this.learnerProfileSelect = page.getByTestId(
      "lesson-plan-create-learner-profile"
    );

    // --- Locator for Submit Button ---
    this.submitButton = page.getByTestId("lesson-plan-create-submit");
  }

  async goto() {
    await this.page.goto("/lesson-plan/create");
  }

  async submitCreateForm() {
    await this.submitButton.click();
  }

  /**
   * Fills the form with valid data necessary for submission.
   * NOTE: Assumes Learner Profiles are loaded, selects the first one.
   */
  async fillRequiredFields() {
    await expect(this.learnerProfileSelect).toBeEnabled();

    await expect(this.learnerProfileSelect).toHaveText(
      "Select existing profile"
    );
    // await expect(this.learnerProfileSelect).not.toBeDisabled();

    // Select Learner Profile (Selects the first available option)
    await this.learnerProfileSelect.click();
    const firstOption = this.page.getByRole("option").first();
    await firstOption.click();

    // 1. Source material
    await this.sourceMaterialTitleField.fill(
      "Introduction to Atomic Structure"
    );
    await this.sourceMaterialContentField.fill(
      "Atoms are the basic building blocks of matter..."
    );
  }
}
