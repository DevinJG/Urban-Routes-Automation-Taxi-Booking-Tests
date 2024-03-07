const page = require('../../page');
const helper = require('../../helper');


describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    });

    it('should set the address', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
    });

    it('should select supportive plan', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const selectSupportiveMode = await $(page.supportiveMode);
        await selectSupportiveMode.waitForDisplayed();
        await selectSupportiveMode.click();
        await expect(selectSupportiveMode).toHaveElementClass('tcard-title');
    });

    it('should fill phone number', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.fillPhoneNumber(phoneNumber);
        await expect($(page.phoneNumberField)).toBeExisting();
    });

    it('Should Add Credit Card', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addCreditCard('1234567812345678', '123');
        await expect($(page.cardNumberField)).toHaveValue('1234567812345678');
        await expect($(page.codeField)).toHaveValue('123');
    });

    it('should message driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const messageField = await $(page.messageDriver);
        await messageField.setValue('Bring Coffee');
        const message = await messageField.getValue();
        await expect(message).toBe('Bring Coffee');
    });

    it('should order blankets and hankerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const selectBlanketsAndHankerchiefs = await $(page.selectBlanket);
        await selectBlanketsAndHankerchiefs.waitForDisplayed();
        await selectBlanketsAndHankerchiefs.click();
        await expect(selectBlanketsAndHankerchiefs).toBeEnabled();
    });

    it('should order two icecreams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const selectIcecreamButton = await $(page.iceCreamButton);
        await selectIcecreamButton.waitForDisplayed();
        await selectIcecreamButton.click();
        await selectIcecreamButton.click();
        const counterValueElement = await $(page.counterValue);
        const iceCreamQuantity = await counterValueElement.getText();
        await expect(iceCreamQuantity).toEqual('2');
    });

    it('should pop up car search modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const orderButton = await $(page.orderDriver);
        await orderButton.click();
        await expect (orderButton).toBeExisting();
    });
});
