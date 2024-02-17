describe("FAQ APP", () => {
  describe("answer page", () => {
    beforeEach(async () => {
      const pageName = "page1";
      await Promise.all([
        page.goto(`${FRONT_URL}/pages/${pageName}`),
        page.waitForSelector("[data-test=answer-title]"),
      ]);
    });

    test("title", async () => {
      const title = await page.$eval(
        "[data-test=answer-title]",
        el => el.textContent,
      );
      expect(title).toEqual("page1");
    });
  });
});
