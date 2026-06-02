<script setup lang="ts">
import { computed, ref } from 'vue';
import { ChevronDown, ChevronUp, Monitor, Smartphone, Target, Users } from '@lucide/vue';
import type { CampaignMetrics } from '@/types/types';
import { formatNumber, formatPercent } from '@/utils/formatters';
import CampaignStepSummary from './CampaignStepSummary.vue';

const props = defineProps<{
  campaign: CampaignMetrics | null;
}>();

const emit = defineEmits<{
  focusStep: [stepId: string];
}>();

const isCollapsed = ref(false);
const DeviceIcon = computed(() => props.campaign?.device === 'mobile' ? Smartphone : Monitor);
</script>

<template>
  <section class="campaign-dashboard__overview">
    <div class="campaign-dashboard__overview-heading">
      <div>
        <p class="campaign-dashboard__subtitle">Selected campaign</p>
        <h2 class="campaign-dashboard__title">
          {{ campaign?.name ?? 'No campaign selected' }}
        </h2>
      </div>

      <div v-if="campaign" class="campaign-dashboard__device-pill">
        <component :is="DeviceIcon" class="size-4" />
        <span>{{ campaign.device }}</span>
      </div>
    </div>

    <div v-if="!isCollapsed">
      <div class="campaign-dashboard__summary-grid">
        <div class="campaign-dashboard__summary-card">
          <Target class="campaign-dashboard__summary-icon" />
          <p class="campaign-dashboard__summary-label">Conversion rate</p>
          <p class="campaign-dashboard__summary-value">
            {{ campaign ? formatPercent(campaign.overallConversionRate) : '-' }}
          </p>
        </div>
        <div class="campaign-dashboard__summary-card">
          <Users class="campaign-dashboard__summary-icon" />
          <p class="campaign-dashboard__summary-label">Visitors</p>
          <p class="campaign-dashboard__summary-value">
            {{ campaign ? formatNumber(campaign.viewsAtStart) : '-' }}
          </p>
        </div>
      </div>

      <CampaignStepSummary
        v-if="campaign"
        :steps="campaign.steps"
        @focus-step="emit('focusStep', $event)"
      />
    </div>

    <button
      class="campaign-dashboard__overview-toggle"
      type="button"
      :aria-expanded="!isCollapsed"
      @click="isCollapsed = !isCollapsed"
    >
      <span class="campaign-dashboard__overview-toggle-line" />
      <ChevronDown v-if="isCollapsed" class="size-4" />
      <ChevronUp v-else class="size-4" />
      <span class="campaign-dashboard__overview-toggle-line" />
    </button>
  </section>
</template>
