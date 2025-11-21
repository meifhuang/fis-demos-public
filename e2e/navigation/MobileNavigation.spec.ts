import { test, expect } from "../base-test";
import { ROUTES } from "../routes";

test.beforeEach(async ({ page }) => {
  // Set viewport to mobile dimensions
  await page.setViewportSize({ width: 375, height: 667 });
});

test("1. Mobile Navbar Menu Toggle opens and closes the mobile menu", async ({
  mobileNavigationPage,
}) => {
  // 1. ACT: Click the NavbarMenuToggle to open the mobile menu
  await mobileNavigationPage.openMenuButton.click();

  // 2. ASSERTION: Verify the mobile menu is open by checking for a known link
  await expect(mobileNavigationPage.dashboardLink).toBeVisible();

  // 3. ACT: Click the NavbarMenuToggle again to close the mobile menu
  await mobileNavigationPage.closeMenuButton.click();

  // 4. ASSERTION: Verify the mobile menu is closed by checking that the link is not visible
  await expect(mobileNavigationPage.dashboardLink).not.toBeVisible();
});

test("2. Mobile Navbar links navigate correctly when menu is open", async ({
  page,
  mobileNavigationPage,
  managePersonasPage,
}) => {
  // 1. ACT: Open the mobile menu
  await mobileNavigationPage.openMenuButton.click();

  // 2. ACT: Click the "Manage Personas" link in the mobile menu
  await mobileNavigationPage.managePersonasLink.click();

  // 3. ASSERTION: Verify URL change
  await expect(page).toHaveURL(ROUTES.personas);

  // 4. ASSERTION: Verify the content on the new page
  await expect(managePersonasPage.heading).toBeVisible();
});

test("3. Mobile menu closes after navigation", async ({
  page,
  mobileNavigationPage,
}) => {
  // 1. ACT: Open the mobile menu
  await mobileNavigationPage.openMenuButton.click();

  // 2. ACT: Click the "Manage Personas" link in the mobile menu
  await mobileNavigationPage.managePersonasLink.click();

  // 3. ASSERTION: Verify URL change
  await expect(page).toHaveURL(ROUTES.personas);

  // 4. ASSERTION: Verify the mobile menu is closed by checking that the link is not visible
  await expect(mobileNavigationPage.managePersonasLink).not.toBeVisible();
});
