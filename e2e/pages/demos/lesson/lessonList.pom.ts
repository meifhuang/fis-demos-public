import { Locator, Page } from "@playwright/test";

export class LessonListPage {
  readonly heading: Locator;

  readonly skeletonWrapper: Locator;
  readonly recordsContainer: Locator;
  readonly allCards: Locator;
  readonly createButton: Locator;

  readonly exampleRecordCard: Locator;
  readonly exampleRecordTitle: Locator;
  readonly exampleRecordContent: Locator;
  readonly exampleRecordLearnerChip: Locator;
  readonly exampleRecordViewButton: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Lesson Demo" });

    this.skeletonWrapper = page.getByTestId("list-skeleton-wrapper");
    this.recordsContainer = page.getByTestId("record-list-container");
    this.allCards = page.getByTestId("list-item-card");
    this.createButton = page.getByTestId("create-new-button");

    this.exampleRecordCard = page.getByTestId("list-item-card").first();
    this.exampleRecordTitle = this.exampleRecordCard.getByTestId(
      "lesson-list-record-title",
    );
    this.exampleRecordContent = this.exampleRecordCard.getByTestId(
      "lesson-list-record-content",
    );
    this.exampleRecordLearnerChip = this.exampleRecordCard.getByTestId(
      "lesson-list-learner-chip",
    );
    this.exampleRecordViewButton = this.exampleRecordCard.getByTestId(
      "lesson-list-button-view",
    );
  }

  async goto() {
    await this.page.goto("/lesson");
  }

  async getNumberOfRecords() {
    const records = await this.allCards.all();

    return records.length;
  }
}
