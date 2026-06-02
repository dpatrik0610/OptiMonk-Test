<script setup lang="ts">
import Dashboard from '@components/Dashboard.vue';
import Header from '@components/Header/Header.vue';
import {campaigns} from '@/data/campaigns';
import { computeStepsMetrics } from '@/utils/metrics';
console.log('Campaigns:', campaigns);
const stepsMetrics = computeStepsMetrics(campaigns[0].steps);
for (const step of stepsMetrics) {
  console.log(`Step: ${step.name}, Conversion Rate: ${step.conversionRate.toFixed(2)}%`);
}
</script>

<template>
  <Header />
  <Dashboard />
</template>
