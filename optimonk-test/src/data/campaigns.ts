import type { Campaign } from '@/types/types';
import raw from './campaigns.json';

function mapCampaign(campaigns: typeof raw.campaigns[number]) : Campaign {
    return {
        ...campaigns,
        device: campaigns.device as Campaign['device'],
        steps: campaigns.steps.map(step => ({
            ...step,
            type: step.type as Campaign['steps'][number]['type'],
        })),
    };
}

export const campaigns: Campaign[] = raw.campaigns.map(mapCampaign);