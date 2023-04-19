<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const title = 'Jagu Template'
const description = 'A Nuxt starter template used by Jagu'
const ogImage = 'jagu-template-og-image.png'

useSEOHead({
  title,
  description,
  ogImage
})

</script>
