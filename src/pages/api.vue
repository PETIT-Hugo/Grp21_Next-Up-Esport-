<template>
  <div>
    <h1>API Page</h1>
    <MatchDetails />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';import MatchDetails from '@/components/MatchDetails.vue';

export default defineComponent({
  name: 'ApiPage',
  components: {
    MatchDetails
  }
});
</script>