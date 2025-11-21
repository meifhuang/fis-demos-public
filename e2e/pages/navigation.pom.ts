import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  // Top-Level Navigation Elements
  readonly dashboardButton: Locator;
  readonly managePersonasButton: Locator;

  // User Profile Button
  readonly userProfileButton: Locator;

  constructor(readonly page: Page) {
    // Top-Level Navigation Elements
    this.dashboardButton = page.getByRole("link", { name: "Dashboard" });
    this.managePersonasButton = page.getByRole("link", {
      name: "Manage Personas",
    });

    // User Profile Button
    this.userProfileButton = page.getByTestId("user-profile");
  }
}
