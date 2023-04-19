<template>
  <div>
    <div class="backdrop-blur bg-white/90 supports-backdrop-blur:bg-white/60 fixed w-full z-50 border-b">
      <div
        class="w-full max-h-14 flex container mx-auto items-center justify-between z-10 p-4"
      >
        <NuxtLink
          class="animate-slide-down logo group"
          style="display: flex; align-items: center"
          :to="{path: '/'}"
        >
          <img class="h-8 w-auto" src="~assets/svg/jagu-logo.svg" width="96" height="58" alt="Jagu logo">
        </NuxtLink>
        <div v-if="$route.path === '/'" class="hidden md:flex">
          <NuxtLink
            v-for="link in links"
            :key="link.path"
            ref="linksRef"
            class="nav-link group transition duration-300"
            :to="link.path"
          >
            {{ link.text }}
            <span :id="link.ref + 'Span'" class="relative -top-1.5 block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-jagu-orange" />
          </NuxtLink>
        </div>
        <NavigationMenuIcon ref="menuIconRef" v-model="menu" class="z-10" />
      </div>
    </div>
    <NavigationMobile v-model:menu="menu" :links="links" />
  </div>
</template>

<script setup>
const menu = ref(false)

const links = [
  {
    path: 'https://nuxt.com',
    text: 'Nuxt documentation',
    ref: 'nuxt-docs'
  },
  //TODO Add links.
]
const linksRef = ref(null)

const DOWN = false
const UP = true

let sections
let direction = DOWN
let prevYPosition = 0

const setScrollDirection = () => {
  if (window.scrollY > prevYPosition) {
    direction = DOWN
  } else {
    direction = UP
  }

  prevYPosition = window.scrollY
}

const getTargetSection = (target) => {
  if (direction === UP) return target

  if (target.nextElementSibling) {
    return target.nextElementSibling
  } else {
    return target
  }
}

const shouldUpdate = (entry) => {
  if (direction === DOWN && !entry.isIntersecting) {
    return true
  }

  if (direction === UP && entry.isIntersecting) {
    return true
  }

  return false
}

const updateMarker = (target) => {
  const id = target.id

  /* Do nothing if no target ID */
  if (!id) return

  linksRef.value.forEach((elRef) => {
    elRef.$el.querySelector('span').classList.remove('!max-w-full')
  })

  const el = document.querySelector('#' + id + 'Span')

  if(el) {
    el.classList.add('!max-w-full')
  }

  console.log('Target:', target)
}

onMounted(() => {
  sections = [...document.querySelectorAll('section')]

  const options = {
    root: document,
    rootMargin: '-56px',
    threshold: 0
  }

  const onIntersect = (entries) => {
    setScrollDirection()
    entries.forEach((entry) => {
      if(!shouldUpdate(entry)) return

      const target = getTargetSection(entry.target)
      updateMarker(target)
    })
  }

  const observer = new IntersectionObserver(onIntersect, options)

  sections.forEach((section) => {
    observer.observe(section)
  })
})
</script>

<style lang="scss" scoped>

$n: 6;

.nav-link {
  animation: fade-in 1s ease-in-out forwards;
  opacity: 0;

  @for $x from 1 through ($n - 1) {
    &:nth-child(#{$x}) {
      animation-delay: ($n - $x) * 100ms;
    }
  }

  cursor: pointer;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
}

@keyframes fade-in {
  100% {
    opacity: 1;
  }
}

#nav {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  padding: 10px 0;
  justify-content: center;
  width: 100%;

  .nav-inner {
    border-radius: 25px;
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a {
    text-decoration: none;
    @apply text-jagu-orange hover:text-jagu-blue font-semibold;
  }
}

.contact {
  background: var(--primary);
  padding: 4px 15px;
  color: white !important;
  border-radius: 24px;
  margin-right: 0 !important;

  &:hover {
    background: var(--blue);
  }
}

.logo-text {
  margin-right: 5px;

  @media (max-width: 1200px) {
    display: none;
  }
}

#logoTopBar {
  fill: #F89815;
  height: 25px;
  width: 40px;
}
</style>
