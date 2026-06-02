<script setup lang="ts">
import { AlertTriangle } from '@lucide/vue';
import type { StepMetrics } from '@/types/types';
import { formatPercent } from '@/utils/formatters';

defineProps<{
  steps: StepMetrics[];
}>();

const emit = defineEmits<{
  focusStep: [stepId: string];
}>();
</script>

<template>
  <div class="campaign-dashboard__step-summary">
    <button
      v-for="(step, index) in steps"
      :key="step.id"
      class="campaign-dashboard__step-summary-item"
      :class="step.isWorstStep ? 'campaign-dashboard__step-summary-item--worst' : ''"
      type="button"
      @click="emit('focusStep', step.id)"
    >
      <span class="campaign-dashboard__step-summary-number">{{ index + 1 }}</span>
      <span class="campaign-dashboard__step-summary-name">{{ step.name }}</span>
      <span class="campaign-dashboard__step-summary-rate">
        <AlertTriangle v-if="step.isWorstStep" class="size-3.5" />
        {{ formatPercent(step.dropOffRate) }} drop
      </span>
    </button>
  </div>
</template>
