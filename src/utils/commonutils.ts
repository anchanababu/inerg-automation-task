import { Locator, expect } from '@playwright/test';

export class CommonUtils {
    /**
     * Reusable utility to validate multiple elements are displayed and attached.
     * @param locators - An object mapping friendly names to Playwright Locators
     * @param timeout - Maximum time to wait in milliseconds
     */
    static async ensureElementsVisible(
        locators: Record<string, Locator>, 
        timeout: number = 10000
    ): Promise<void> {
        console.log(`Checking visibility for ${Object.keys(locators).length} elements...`);

        for (const [name, locator] of Object.entries(locators)) {
            try {
                await locator.waitFor({ state: 'attached', timeout });
                await expect(locator).toBeVisible({ timeout });
            } catch (error) {
                throw new Error(
                    `STOP: Element [${name}] failed to display/attach within ${timeout / 1000}s. ` +
                    `Validation failed at this point.`
                );
            }
        }
        console.log("All requested elements are confirmed visible and attached.");
    }
}