import { Page, Locator, expect } from '@playwright/test';
import { CommonUtils } from '../utils/commonutils';

export class ResultsPage{
    private readonly page : Page
    private readonly RESULTS_HEADER : Locator;
    private readonly DATA_CARDS : Locator;
    private readonly PIE_CHART : Locator;
    private readonly LINE_CHART : Locator;
    private readonly CHART_POINTS : Locator;
    private readonly ACTIVE_TOOLTIP : Locator;
    private readonly CARD_DATA : Locator;

    constructor(page : Page){
        this.page = page;
        this.RESULTS_HEADER = page.getByRole('heading', { name: 'Results for ' })
        this.DATA_CARDS = page.locator('.display-data');
        this.CARD_DATA = page.locator('.display-data p');
        this.PIE_CHART = page.locator('.pielayer .trace');
        this.LINE_CHART = page.locator('.cartesianlayer .subplot.xy')
        this.CHART_POINTS = this.page.locator('g.trace.scatter .points path.point')
        this.ACTIVE_TOOLTIP = this.page.locator('.hoverlayer .hovertext:visible, .hoverlayer g.hovertext').first();
    }

    async verifyResultsPageLoaded() {
        // Group the locators you want to check
        const pageElements = {
            "Results Header": this.RESULTS_HEADER,
            "Stats Cards": this.DATA_CARDS,
            "Interactive Pie Chart": this.PIE_CHART,
            "History Line Chart": this.LINE_CHART
        };

        // Call the reusable utility
        await CommonUtils.ensureElementsVisible(pageElements);
    }

    async getChartData(): Promise<Record<string, string>> {
    const chartData: Record<string, string> = {};
    
    try {
        const chartPoints = this.CHART_POINTS;
        const totalPoints = await chartPoints.count();

        if (totalPoints === 0) {
            throw new Error("No chart points found on the Results page.");
        }

        for (let i = 0; i < totalPoints; i++) {
            const currentPoint = chartPoints.nth(i);
            
            await currentPoint.scrollIntoViewIfNeeded();
            await currentPoint.hover({ force: true });
            await this.page.waitForTimeout(500);
            
            const activeTooltip = this.ACTIVE_TOOLTIP;
            const textElements = activeTooltip.locator('text');

            // Wait for data to populate the SVG nodes
            await expect(textElements.first()).not.toHaveText('', { timeout: 5000 });

            // Extraction
            const labelText = await textElements.nth(0).textContent() || ""; 
            const valueText = await textElements.nth(1).textContent() || ""; 

            const parts = valueText.replace(/[()]/g, '').split(','); 
            
            const cleanKey = parts[0].trim();
            const cleanValue = parts[1].trim(); 
            
            chartData[cleanKey] = cleanValue;
        }

        return chartData;

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`CRITICAL: Failed to extract Chart Data. Details: ${errorMessage}`);
    }
}

async getSummaryCardData(): Promise<Record<string, string>> {
    const cardData: Record<string, string> = {};

    try {
        const cardRows = this.CARD_DATA;
        const count = await cardRows.count();

        for (let i = 0; i < count; i++) {
            const row = cardRows.nth(i);
            const label = await row.locator('strong').innerText();
            const fullText = await row.textContent() || "";
            const rawValue = fullText.replace(label, "").trim();

            const cleanLabel = label.replace(":", "").trim();
            
            // --- Formatting Logic ---
            let formattedValue = rawValue;
            const numericValue = parseFloat(rawValue);

            if (numericValue >= 10000) {
                formattedValue = (numericValue / 1000).toFixed(3) + 'k';
            }else {
                formattedValue = rawValue;   
            }

            cardData[cleanLabel] = formattedValue;
        }

        return cardData;

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`CRITICAL: Card Data extraction failed. ${errorMessage}`);
    }
}

}