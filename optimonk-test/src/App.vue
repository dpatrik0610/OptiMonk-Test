<script setup lang="ts">
import Dashboard from '@components/Dashboard.vue';
import Header from '@components/Header/Header.vue';
import {campaigns} from '@/data/campaigns';
import { computeCampaignMetrics } from '@/utils/metrics';
console.log('Campaigns:', campaigns);
const campaignMetrics = campaigns.map(computeCampaignMetrics);
console.log('Campaign Metrics:', campaignMetrics);

</script>

<template>
  <Header />
  <Dashboard />
</template>
