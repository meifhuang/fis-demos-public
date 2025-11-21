import { test, expect } from "../base-test";
import { ROUTES } from "../routes";

test('1. Navbar "Manage Personas" button navigates to /personas and verifies the heading', async ({
  page,
  navigationPage,
  managePersonasPage,
}) => {
  await navigationPage.managePersonasButton.click();

  // ASSERTION: Verify URL change
  await expect(page).toHaveURL(ROUTES.personas);

  // ASSERTION: Verify the content on the new page
  await expect(managePersonasPage.heading).toBeVisible();
});

test("2. Navbar Profile button navigates to /profile and verifies the heading", async ({
  page,
  navigationPage,
  profilePage,
}) => {
  await navigationPage.userProfileButton.click();

  // ASSERTION: Verify URL change
  await expect(page).toHaveURL(ROUTES.profile);

  // ASSERTION: Verify the content on the new page
  await expect(profilePage.heading).toBeVisible();
});

test('3. Navbar "Dashboard" link returns to the root page from a deep route', async ({
  page,
  navigationPage,
  dashboardPage,
}) => {
  // 1. ACT: Go to a deep route first (e.g., Manage Personas)
  await page.goto(ROUTES.personas);

  // Sanity check: Ensure we are not on the dashboard
  await expect(page).toHaveURL(ROUTES.personas);

  // 2. ACT: Click the dashboard link
  await navigationPage.dashboardButton.click();

  // 3. ASSERTION: Verify dashboard content is visible again (using the main headline)
  await expect(page).toHaveURL(ROUTES.dashboard);
  await expect(dashboardPage.heading).toBeVisible();
});
