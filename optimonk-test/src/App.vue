<script setup lang="ts">
import Dashboard from '@components/Dashboard.vue';
import Header from '@components/Header/Header.vue';
import {campaigns} from '@/data/campaigns';

console.log('Campaigns:', campaigns);
</script>

<template>
  <Header />
  <Dashboard />
</template>
