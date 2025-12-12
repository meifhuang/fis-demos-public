import { Locator, Page } from "@playwright/test";

export class LessonPlanPage {
  readonly heading: Locator;
  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Lesson Plan" });
  }
}
