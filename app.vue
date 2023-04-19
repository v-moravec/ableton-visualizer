<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const title = 'Ableton Visualizer'
const description = 'AV for Ableton'
const ogImage = 'av-og-image.png'

useSEOHead({
  title,
  description,
  ogImage
})

</script>
