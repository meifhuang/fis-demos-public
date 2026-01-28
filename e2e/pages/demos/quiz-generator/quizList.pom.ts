import { Locator, Page } from "@playwright/test";

export class QuizListPage {
  readonly heading: Locator;

  readonly skeletonWrapper: Locator;
  readonly recordsContainer: Locator;
  readonly allCards: Locator;

  readonly exampleRecordCard: Locator;
  readonly exampleRecordTitle: Locator;
  readonly exampleRecordDescription: Locator;
  readonly exampleRecordTotalQuestions: Locator;
  readonly exampleRecordLearnerChip: Locator;
  readonly exampleRecordTakeButton: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Quiz Generator" });

    this.skeletonWrapper = page.getByTestId("list-skeleton-wrapper");
    this.recordsContainer = page.getByTestId("record-list-container");
    this.allCards = page.getByTestId("list-item-card");

    this.exampleRecordCard = page.getByTestId("list-item-card").first();
    this.exampleRecordTitle = this.exampleRecordCard.getByTestId(
      "quiz-list-record-title",
    );
    this.exampleRecordDescription = this.exampleRecordCard.getByTestId(
      "quiz-list-record-description",
    );
    this.exampleRecordTotalQuestions = this.exampleRecordCard.getByTestId(
      "quiz-list-total-questions",
    );
    this.exampleRecordLearnerChip = this.exampleRecordCard.getByTestId(
      "quiz-list-learner-chip",
    );
    this.exampleRecordTakeButton = this.exampleRecordCard.getByTestId(
      "quiz-list-button-take",
    );
  }

  async goto() {
    await this.page.goto("/quiz-generator");
  }

  async getNumberOfRecords() {
    const records = await this.allCards.all();

    return records.length;
  }
}
