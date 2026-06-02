import type { Campaign, CampaignMetrics, StepMetrics } from "@/types/types";

// export function computeCampaignMetrics( campaign : Campaign ): CampaignMetrics {
//     const computedStepsMetrics = computeStepsMetrics(campaign.steps);
// }

export function calculateConversionRate(views: number, proceeds: number): number {
    if (views === 0) {
        return 0;
    }
    return (proceeds / views);
}

/**
 * Computes the metrics for each step in a campaign, including conversion rate and drop-off rate.
 * @param steps - An array of steps in the campaign.
 * @returns An array of StepMetrics with conversion rate, drop-off rate, and worst step with placeholder value.
 * @throws Will throw an error if the steps array is empty.
 */
export function computeStepsMetrics( steps: Campaign['steps'] ) : StepMetrics[] {
    if (steps.length === 0) throw new Error('Steps array cannot be empty');

    const stepWithMetrics = steps.map(step => {
        const conversionRate = calculateConversionRate(step.views, step.proceeds);
        const dropOffRate = 1 - conversionRate;

        return { ...step, conversionRate, dropOffRate, isWorstStep: false };
    });

    return stepWithMetrics;
}