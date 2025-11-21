import { Locator, Page } from "@playwright/test";

export class PersonalizedContentPage {
  readonly heading: Locator;
  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Personalized Content" });
  }
}
