<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import type { CampaignMetrics } from '@/types/types';
import CampaignOverview from './CampaignOverview.vue';
import FunnelStepCard from './FunnelStepCard.vue';
import './Dashboard.css';

const props = defineProps<{
  campaign: CampaignMetrics | null;
}>();

const activeStepId = ref(props.campaign?.worstStepId ?? props.campaign?.steps[0]?.id ?? null);

watch(
  () => props.campaign?.id,
  () => {
    activeStepId.value = props.campaign?.worstStepId ?? props.campaign?.steps[0]?.id ?? null;
  },
);

async function focusStep(stepId: string): Promise<void> {
  activeStepId.value = stepId;
  await nextTick();
  document.getElementById(`funnel-step-${stepId}`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}
</script>

<template>
  <section class="campaign-dashboard">
    <CampaignOverview :campaign="campaign" @focus-step="focusStep" />

    <div class="campaign-dashboard__content">
      <div class="campaign-dashboard__steps">
        <template v-for="(step, index) in campaign?.steps ?? []" :key="step.id">
          <FunnelStepCard
            :step="step"
            :index="index"
            :is-worst="step.isWorstStep"
            :is-active="step.id === activeStepId"
            @focus="focusStep(step.id)"
          />

          <div
            v-if="index < (campaign?.steps.length ?? 0) - 1"
            class="campaign-dashboard__flow"
            aria-hidden="true"
          >
            <span class="campaign-dashboard__flow-line" />
            <span class="campaign-dashboard__flow-node" />
            <span class="campaign-dashboard__flow-line" />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
