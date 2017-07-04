/**
 * Check the title of the current browser window
 * @param  {Type}     falseCase     Whether to check if the title matches the
 *                                  expected value or not
 * @param  {Type}     expectedTitle The expected title
 * @param  {Function} done          Function to execute when finished
 */
module.exports = (expectedText) => {
    /**
     * The title of the current browser window
     * @type {String}
     */
    const title = browser.element("#app").getText();
    expect(title).to.equal(expectedText);
 
};