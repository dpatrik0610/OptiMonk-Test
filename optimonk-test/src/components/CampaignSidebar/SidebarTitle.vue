<script setup lang="ts">
import type { CampaignMetrics } from '@/types/types';
import { Smartphone, Monitor } from '@lucide/vue';

const props = defineProps<{
  campaign: CampaignMetrics;
}>();

const DeviceIcon = props.campaign.device === 'mobile' ? Smartphone : Monitor;
</script>

<template>
<div class="flex items-center gap-2">
    <component :is="DeviceIcon" class="size-3.5" />
    <h3 class="sidebar-item__title">
        {{ campaign.name }}
    </h3>
</div>
</template>