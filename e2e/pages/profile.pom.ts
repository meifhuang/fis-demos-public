import { Locator, Page } from "@playwright/test";

export class ProfilePage {
  readonly heading: Locator;
  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Profile" });
  }
}
