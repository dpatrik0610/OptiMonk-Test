<script setup lang="ts">
import { ref } from 'vue';
import SideBar from '@components/CampaignSidebar/Sidebar.vue';
import Dashboard from '@components/layout/Dashboard.vue';
import Header from '@components/layout/Header.vue';
import {campaigns} from '@/data/campaigns';
import { computeCampaignMetrics } from '@/utils/metrics';
import type { CampaignMetrics } from '@/types/types';

const campaignMetrics = campaigns.map(computeCampaignMetrics);
const selectedCampaign = ref<CampaignMetrics | null>(campaignMetrics[0] ?? null);

function selectCampaign(campaign: CampaignMetrics): void {
  selectedCampaign.value = campaign;
}

console.log('Campaign Metrics:', campaignMetrics);

</script>

<template>
  <main class="min-h-screen bg-background text-foreground">
    <Header />
    <div class="md:flex">
      <SideBar :campaigns="campaignMetrics" @select="selectCampaign" />
      <div class="min-w-0 flex-1">
        <Dashboard />
      </div>
    </div>
  </main>
</template>
