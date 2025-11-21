import { Locator, Page } from "@playwright/test";

export class ContentMappingPage {
  readonly heading: Locator;
  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Content Mapping" });
  }
}
