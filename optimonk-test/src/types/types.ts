export interface Step {
  id: string;
  name: string;
  type: 'teaser' | 'email' | 'success' | 'coupon' | 'exit-intent';
  views: number;
  proceeds: number;
  description: string;
}

export interface Campaign {
  id: string;
  name: string;
  device: 'desktop' | 'mobile';
  steps: Step[];
}

export interface StepMetrics extends Step{
    conversionRate: number;
    dropOffRate: number;
    isWorstStep: boolean;
}

export interface CampaignMetrics extends Campaign {
    overallConversionRate: number;
    steps: StepMetrics[];
    worstStepId: string | null;
    viewsAtStart: number;
    proceedsAtEnd: number;
}