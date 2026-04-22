    import { test,expect } from '@playwright/test';
    import { DashboardPage } from '../pages/dashboard-page'
    import { ResultsPage } from '../pages/results-page'

    test.describe('State Selection Tests', () => {
        
        test('User should view same data for display cards and line chart for a given state', async ({ page }) => {
            const dashboard = new DashboardPage(page);
            const results = new ResultsPage(page);

            await dashboard.navigate();
            const state = await dashboard.getRandomStateName();
            await dashboard.selectStateByName(state);
            await results.verifyResultsPageLoaded();

            const chartData = await results.getChartData();
            console.log(chartData);
            const cardData = await results.getSummaryCardData();
            console.log(cardData);

            Object.keys(cardData).forEach(key => {
                const actualChartValue = chartData[key];
                const expectedCardValue = cardData[key];
                expect(actualChartValue, 
                    `DATA MISMATCH: The value for ${key} in the Chart (${actualChartValue}) ` +
                    `does not match the Summary Card (${expectedCardValue})`
                ).toBe(expectedCardValue);
            });
        });

    })