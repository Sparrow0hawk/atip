import { readFile } from "fs/promises";
import { expect, test, type Page } from "@playwright/test";
import {
  clearExistingInterventions,
  clickMap,
  loadInitialPage,
} from "./shared.ts";

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await loadInitialPage(browser);
});
test.beforeEach(async () => {
  await clearExistingInterventions(page);
});

test("clearing all while a feature is open works", async () => {
  await page.getByRole("button", { name: "New point" }).click();
  await clickMap(page, 500, 500);
  page.on("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Clear all" }).click();
  // Make sure AttributeMode resets to nothing being selected
  await expect(
    page.getByText("Click an object to fill out its attributes")
  ).toBeVisible();
});

test("creating a new point opens a form", async () => {
  await page.getByRole("button", { name: "New point" }).click();
  await clickMap(page, 500, 500);

  await page.getByRole("button", { name: "1) Untitled point" }).isVisible();
  await page.getByLabel("Description:").click();
});

test("creating a new freehand polygon opens a form", async () => {
  await page.getByRole("button", { name: "New polygon (freehand)" }).click();
  await clickMap(page, 500, 500);
  await clickMap(page, 400, 500);
  await clickMap(page, 400, 600);
  await page.getByRole("button", { name: "Finish" }).click();

  await page.getByRole("button", { name: "1) Untitled area" }).isVisible();
  await page.getByLabel("Description:").click();
});

test("creating a new snapped polygon opens a form", async () => {
  await page.getByRole("button", { name: "New polygon (snapped)" }).click();
  await clickMap(page, 500, 500);
  await clickMap(page, 400, 500);
  await clickMap(page, 400, 600);
  await page.getByRole("button", { name: "Finish" }).click();

  await page.getByRole("button", { name: "1) Untitled area" }).isVisible();
  await page.getByLabel("Description:").click();
});

test("creating a new route opens a form, and auto-fill sets its name", async () => {
  await page.getByRole("button", { name: "New route" }).click();
  await clickMap(page, 500, 500);
  await clickMap(page, 400, 500);
  await page.getByRole("button", { name: "Finish" }).click();

  await page.getByRole("button", { name: "1) Untitled route" }).isVisible();
  await page.getByLabel("Description:").click();

  // This button only works after RouteInfo is loaded. And note because the
  // button is located inside a label, getByRole doesn't seem to work.
  await page.getByText("Auto-fill").click();
  await page
    .getByRole("button", {
      name: "1) Route from ??? and Brighton Road to Emerald Quay and Harbour Way",
    })
    .isVisible();
});

test("editing geometry of a polygon works", async () => {
  // Create a polygon
  await page.getByRole("button", { name: "New polygon (snapped)" }).click();
  await clickMap(page, 241, 579);
  await clickMap(page, 235, 431);
  await clickMap(page, 465, 459);
  await page.getByRole("button", { name: "Finish" }).click();
  await page.getByRole("button", { name: "1) Untitled area" }).isVisible();
  await page.getByLabel("Description:").click();

  // Click off the polygon to close the form
  await clickMap(page, 284, 284);
  // Make sure the form is closed
  await expect(page.getByLabel("Description:")).not.toBeVisible();

  // Click the polygon to open the form
  await clickMap(page, 312, 501);
  await page.getByLabel("Description:").click();

  // Edit geometry, and click the polygon again
  await page.getByRole("button", { name: "Edit geometry" }).click();
  await clickMap(page, 312, 501);
  // This button indicates the mode is working
  await page.getByRole("button", { name: "Finish" }).click();
});

test("testing adding interventions, then deleting one, then adding another", async () => {
  await page.getByRole("button", { name: "New route" }).click();
  await clickMap(page, 522, 468);
  await clickMap(page, 192, 513);
  await page.getByRole("button", { name: "Finish" }).click();
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "1) Untitled route" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "New route" }).click();
  await clickMap(page, 196, 375);
  await clickMap(page, 481, 399);
  await page.getByRole("button", { name: "Finish" }).click();

  await page.getByRole("button", { name: "1) Untitled route" }).isVisible();
});

test("testing add a route and save it", async () => {
  await page.getByRole("button", { name: "New route" }).click();
  await clickMap(page, 522, 468);
  await clickMap(page, 192, 513);
  await page.getByRole("button", { name: "Finish" }).click();
  // wait to make sure intervention attributes appear
  await page.getByRole("button", { name: "Save" }).waitFor();
  await page.getByRole("button", { name: "Save" }).click();

  await expect(
    page.getByRole("button", { name: "1) Untitled route" })
  ).toBeVisible();
});
