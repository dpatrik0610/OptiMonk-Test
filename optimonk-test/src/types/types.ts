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
