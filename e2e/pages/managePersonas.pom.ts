import { Locator, Page } from "@playwright/test";

export class ManagePersonasPage {
  readonly heading: Locator;
  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Manage Personas" });
  }
}
