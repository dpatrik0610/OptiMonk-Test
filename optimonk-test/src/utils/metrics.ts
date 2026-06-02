import type { Campaign, CampaignMetrics, StepMetrics } from "@/types/types";

export function computeCampaignMetrics( campaign : Campaign ): CampaignMetrics {
    const computedStepsMetrics = computeStepsMetrics(campaign.steps);
    const worstStepId = findWorstStepId(computedStepsMetrics);

    const start = campaign.steps[0]?.views || 0;
    const proceedsAtEnd = campaign.steps[campaign.steps.length - 1]?.proceeds || 0;
    return {
        ...campaign,
        overallConversionRate: calculateConversionRate(start, proceedsAtEnd),
        steps: flagWorstStepInMetrics(computedStepsMetrics, worstStepId),
        worstStepId,
        viewsAtStart: start,
        proceedsAtEnd: proceedsAtEnd,
    };
}

function calculateConversionRate(views: number, proceeds: number): number {
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
function computeStepsMetrics( steps: Campaign['steps'] ) : StepMetrics[] {
    if (steps.length === 0) throw new Error('Steps array cannot be empty');

    const stepWithMetrics = steps.map(step => {
        const conversionRate = calculateConversionRate(step.views, step.proceeds);
        const dropOffRate = 1 - conversionRate;

        return { ...step, conversionRate, dropOffRate, isWorstStep: false };
    });

    return stepWithMetrics;
}

/**
 * Finds the ID of the step with the lowest conversion rate.
 * @param stepsMetrics - An array of step metrics.
 * @returns The ID of the worst step or null if the array is empty.
 */
function findWorstStepId( stepsMetrics: StepMetrics[] ) : string | null {
    if (stepsMetrics.length === 0) throw new Error('Steps metrics array cannot be empty');
    let worstStepId: string | null = null;
    let lowestConversionRate = Infinity;

    stepsMetrics.forEach(step => {
        if (step.conversionRate < lowestConversionRate) {
            lowestConversionRate = step.conversionRate;
            worstStepId = step.id;
        }
    });

    return worstStepId;
}

/**
 * Flags the worst step in the metrics array.
 * @param computedStepsMetrics - An array of step metrics.
 * @param worstStepId - The ID of the worst step.
 * @returns An array of StepMetrics with the worst step flagged.
 */
function flagWorstStepInMetrics(computedStepsMetrics: StepMetrics[], worstStepId: string | null): StepMetrics[] {
    if (worstStepId === null) throw new Error('Worst step ID cannot be null');
    return computedStepsMetrics.map(step => ({
        ...step,
        isWorstStep: step.id === worstStepId,
    }));
}

