
module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '//input[@name="code"]',
    cardNumberField: '#number',
    messageDriver: '//input[@name="comment"]',
    counterValue: '//div[@class="counter-value"][1]',
    body: '.plc',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportiveMode: 'div=Supportive',
    paymentMethod: '.pp-text',
    addCard: 'div=Add card', 
    selectBlanket: '//span[@class="slider round"][1]',
    orderDriver:'.smart-button',
    iceCreamButton:'//div[@class="counter-plus"][1]',
    linkButton: "//button[text()='Link']",

    //div[@data-for='tariff-card-4']
    // Modals
    phoneNumberModal: '.modal',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    addCreditCard: async function(creditCardNumber, codeCreditField) {
    await $(this.paymentMethod).click();
    await $(this.paymentMethod).waitForDisplayed();
    const addCardButton = await $(this.addCard);
    await addCardButton.waitForClickable();
    await addCardButton.click();
    const cardNumberField = await $(this.cardNumberField);
    await cardNumberField.waitForClickable();
    await cardNumberField.click();
    await cardNumberField.setValue(creditCardNumber);
    const codeNumberField = await $(this.codeField);
    await codeNumberField.setValue(codeCreditField);
    const clickBody= await $(this.body);
    await clickBody.click();
    const linkButton = await $(this.linkButton);
    await linkButton.waitForEnabled();
    await linkButton.click();
    },


};