<script setup lang="ts">
import { AlertTriangle } from '@lucide/vue';
import type { CampaignMetrics } from '@/types/types';
import { formatPercent } from '@/utils/formatters';
import SidebarTitle from './SidebarTitle.vue';

defineProps<{
  campaign: CampaignMetrics;
}>();
</script>

<template>
  <div class="sidebar-item__top">
    <SidebarTitle :campaign="campaign" />
    <div class="sidebar-item__rate flex items-center gap-1">
      <AlertTriangle
        v-if="campaign.overallConversionRate < 0.2"
        class="size-3.5 sidebar-item__warning"
      />
      {{ formatPercent(campaign.overallConversionRate) }}
    </div>
  </div>
</template>
