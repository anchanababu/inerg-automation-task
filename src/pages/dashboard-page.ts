// pages/DashboardPage.ts

import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
    private readonly page : Page;
    private readonly HEADER : Locator;
    private readonly STATE_SELECTOR_DROPDOWN : Locator;
    private readonly MAP : Locator;
    private readonly DROPDOWN_OPTIONS : Locator;

    constructor(page : Page){
        this.page = page
        this.HEADER = page.getByRole('heading', { name: 'COVID-19 Tracker - India' });
        this.STATE_SELECTOR_DROPDOWN = page.locator('select.data-filter-input');
        this.DROPDOWN_OPTIONS = this.STATE_SELECTOR_DROPDOWN.locator('option');
        this.MAP = page.locator('div').nth(4);
    }

    async navigate() {
        await this.page.goto('/');
        await expect(this.HEADER).toBeVisible();
    }

    async selectStateByName(state: string) {
        try {
            // 1. Explicitly click the dropdown first (Some UIs need this to 'activate' the listener)
            await this.STATE_SELECTOR_DROPDOWN.click();

            // 2. Select the option
            await this.STATE_SELECTOR_DROPDOWN.selectOption({ label: state });

            // 3. IMPORTANT: Press 'Escape' or 'Tab' to close the dropdown overlay
            // This is often more reliable than clicking the header
            await this.page.keyboard.press('Escape');

            // 4. Wait for the results to load
            await this.page.waitForLoadState('networkidle'); 
            
            console.log(`Successfully selected state: ${state}`);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`FAILED to select state [${state}]. Error: ${errorMessage}`);
        }
    }

    /**
     * Scrapes the dropdown to get all valid state names and returns one at random.
     * @returns {Promise<string>} A randomly selected state name.
     */
    async getRandomStateName(): Promise<string> {
        try {
            // 1. Wait for options to be attached to the DOM
            await this.DROPDOWN_OPTIONS.first().waitFor({ state: 'attached', timeout: 5000 });

            // 2. Extract all text values from the <option> tags
            const allOptions = await this.DROPDOWN_OPTIONS.allInnerTexts();

            // 3. Filter out placeholders: remove empty strings or the "Select State" default
            const validStates = allOptions.filter(state => 
                state.trim() !== '' && 
                !state.toLowerCase().includes('select')
            );

            if (validStates.length === 0) {
                throw new Error("No valid states found in the dropdown options.");
            }

            // 4. Select a random index and return that state
            const randomIndex = Math.floor(Math.random() * validStates.length);
            const selectedState = validStates[randomIndex];
            
            console.log(`Randomly picked state for testing: ${selectedState}`);
            return selectedState;

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`FAILED to retrieve a random state name. Error: ${errorMessage}`);
        }
    }

}