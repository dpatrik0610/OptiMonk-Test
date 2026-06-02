<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  isCritical?: boolean;
  value: number;
}>();

const safeValue = computed(() => Math.min(Math.max(props.value, 0), 1));
const width = computed(() => `${safeValue.value * 100}%`);
</script>

<template>
  <div
    class="progress-bar"
    role="progressbar"
    :aria-valuenow="safeValue * 100"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      class="progress-bar__fill"
      :class="props.isCritical ? 'progress-bar__fill--critical' : ''"
      :style="{ width }"
    />
  </div>
</template>
