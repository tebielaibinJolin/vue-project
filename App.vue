<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
router.push('/login')
</script>

<template>
  <RouterView id="router" style="border-radius: 5%" />
</template>
