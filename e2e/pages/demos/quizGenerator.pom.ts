import { Locator, Page } from "@playwright/test";

export class QuizGeneratorPage {
  readonly heading: Locator;
  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Quiz Generator" });
  }
}
