<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue';
import { computed, ref } from 'vue';
import type { CampaignMetrics } from '@/types/types';
import { formatPercent } from '@/utils/formatters';
import SidebarItem from './SidebarItem.vue';
import './Sidebar.css';

const props = defineProps<{
  campaigns: CampaignMetrics[];
}>();

const emit = defineEmits<{
  select: [campaign: CampaignMetrics];
}>();

const isCollapsed = ref(false);
const selectedCampaignId = ref(props.campaigns[0]?.id ?? '');

const sortedCampaigns = computed(() =>
  [...props.campaigns].sort((first, second) => second.overallConversionRate - first.overallConversionRate),
);

function selectCampaign(campaign: CampaignMetrics): void {
  selectedCampaignId.value = campaign.id;
  emit('select', campaign);
}
</script>

<template>
  <aside
    class="campaign-sidebar"
    :class="isCollapsed ? 'campaign-sidebar--collapsed' : 'campaign-sidebar--expanded'"
  >
    <div class="campaign-sidebar__header">
      <h2 class="campaign-sidebar__title md:hidden">Campaigns</h2>
      <h2 v-if="!isCollapsed" class="campaign-sidebar__title hidden md:block">Campaigns</h2>
      <button
        class="campaign-sidebar__toggle"
        type="button" :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="isCollapsed = !isCollapsed">
        <ChevronRight v-if="isCollapsed" class="size-4" />
        <ChevronLeft v-else class="size-4" />
      </button>
    </div>

    <nav class="campaign-sidebar__list">
      <button
        v-for="campaign in sortedCampaigns"
        :key="campaign.id"
        class="sidebar-item"
        :class="[
          campaign.id === selectedCampaignId ? 'sidebar-item--selected' : 'sidebar-item--idle',
          isCollapsed ? 'sidebar-item--collapsed' : '',
        ]"
        type="button"
        @click="selectCampaign(campaign)"
      >
        <div class="md:hidden">
          <SidebarItem :campaign="campaign" />
        </div>

        <template v-if="isCollapsed">
          <span class="sidebar-item__collapsed-title">
            {{ campaign.name.slice(0, 1) }}
          </span>
          <span class="sidebar-item__collapsed-rate">
            {{ formatPercent(campaign.overallConversionRate) }}
          </span>
        </template>

        <div v-else class="hidden md:block">
          <SidebarItem :campaign="campaign" />
        </div>
      </button>
    </nav>
  </aside>
</template>
