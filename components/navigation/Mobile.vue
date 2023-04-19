<template>
  <transition name="fade">
    <div v-if="menu" class="mobile-menu-container fixed z-10">
      <div class="mobile-menu">
        <NuxtLink
          v-for="link in props.links"
          :key="link.hash"
          ref="linksRef"
          class="nav-link group transition duration-300"
          :to="link.path"
          @click="$emit('update:menu', false)"
        >
          {{ link.text }}
          <span :id="link.ref + 'Span'" class="relative -top-1.5 block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black" />
        </NuxtLink>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  menu: {
    type: Boolean,
    default: false
  },
  links: {
    type: Array,
    default: () => []
  }
})

defineEmits([
  'update:menu'
])
</script>

<style lang="scss" scoped>
.mobile-menu-container {
  background: white;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mobile-menu {
  display: flex;
  @media (max-width: 700px) {
    flex-direction: column;
    align-content: center;
    justify-items: center;

    .nav-link {
      margin-right: 0 !important;
      margin-bottom: 20px;
      text-align: center;
    }
  }
}
</style>
