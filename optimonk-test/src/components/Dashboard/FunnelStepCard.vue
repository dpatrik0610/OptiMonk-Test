<script setup lang="ts">
import { ArrowRight, Users } from '@lucide/vue';
import type { StepMetrics } from '@/types/types';
import { formatNumber, formatPercent } from '@/utils/formatters';
import ProgressBar from './ProgressBar.vue';

defineProps<{
  index: number;
  isActive: boolean;
  isWorst: boolean;
  step: StepMetrics;
}>();

const emit = defineEmits<{
  focus: [];
}>();
</script>

<template>
  <button
    :id="`funnel-step-${step.id}`"
    class="campaign-dashboard__step"
    :class="[
      isWorst ? 'campaign-dashboard__step--worst' : '',
      isActive ? 'campaign-dashboard__step--active' : '',
    ]"
    type="button"
    @click="emit('focus')"
  >
    <div class="campaign-dashboard__step-header">
      <div>
        <div class="campaign-dashboard__step-heading">
          <span
            class="campaign-dashboard__step-number"
            :class="isWorst ? 'campaign-dashboard__step-number--critical' : ''"
          >
            {{ index + 1 }}
          </span>
          <h3 class="campaign-dashboard__step-title">{{ step.name }}</h3>
          <span v-if="isWorst" class="campaign-dashboard__problem-badge">Worst drop-off</span>
        </div>
        <p class="campaign-dashboard__step-meta">{{ step.description }}</p>
      </div>
    </div>

    <div class="campaign-dashboard__step-story">
      <div class="campaign-dashboard__audience-card">
        <Users class="size-4 text-primary" />
        <div>
          <p class="campaign-dashboard__metric-label">Entered this step</p>
          <p class="campaign-dashboard__metric-value">{{ formatNumber(step.views) }}</p>
        </div>
      </div>

      <ArrowRight class="campaign-dashboard__story-arrow" />

      <div class="campaign-dashboard__audience-card">
        <div>
          <p class="campaign-dashboard__metric-label">Moved forward</p>
          <p class="campaign-dashboard__metric-value">{{ formatNumber(step.proceeds) }}</p>
        </div>
      </div>

      <div class="campaign-dashboard__outcome-card" :class="isWorst ? 'campaign-dashboard__outcome-card--critical' : ''">
        <p class="campaign-dashboard__metric-label">Step conversion</p>
        <p class="campaign-dashboard__outcome-value">{{ formatPercent(step.conversionRate) }}</p>
      </div>
    </div>

    <div class="campaign-dashboard__dropoff">
      <div class="campaign-dashboard__dropoff-header">
        <div>
          <p class="campaign-dashboard__dropoff-title">Drop-off loss</p>
          <p class="campaign-dashboard__dropoff-note">
            {{ formatNumber(step.views - step.proceeds) }} visitors did not continue
          </p>
        </div>
        <p
          class="campaign-dashboard__dropoff-value"
          :class="isWorst ? 'campaign-dashboard__dropoff-value--critical' : ''"
        >
          {{ formatPercent(step.dropOffRate) }}
        </p>
      </div>
      <ProgressBar :value="step.dropOffRate" :is-critical="isWorst" />
    </div>
  </button>
</template>
