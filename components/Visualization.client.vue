<template>
  <div style="overflow: hidden; position: relative">
    <transition>
      <div v-if="overlay" class="h-screen w-full bg-white absolute z-50">
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          <div class="h-[200px] sm:mb-10">
            <transition name="bounce">
              <svg v-if="loading" class="w-full" x="0" y="0" width="407" height="200" viewBox="0 0 407 200" fill="#1D1D1B" xmlns="http://www.w3.org/2000/svg"><path d="M63.13 75H6.44V5h18.4v55.79h38.29V75z" /> <path d="M106.52 30c11.2 0 23.4 2 31.49 9.8 8.09 7.8 9.3 18.2 9.3 24.89 0 13.6-5 21.5-9.3 25.7-9.39 9.2-23.59 9.6-33.19 9.6H74V30h32.52zm-14.1 56H103c4.8 0 12.8-.2 18.3-4.8 3.5-2.9 6.6-8.2 6.6-16.3 0-8.49-3.3-13.59-6.2-16.09-5.3-4.6-12.5-4.8-17.6-4.8H92.42V86z" class="d" /> <path d="M19.14 152.27v.4a8.71 8.71 0 0 0 2.7 6.69c3.6 3.5 9.9 3.8 13.5 3.8 5.3 0 8.1-.6 10-1.6a8.23 8.23 0 0 0 4.6-7c0-1.6-.7-4.3-4.9-6a65.34 65.34 0 0 0-9.69-2.3l-10.1-1.6c-7.6-1.2-16.5-2.6-21-7.6-1.6-1.8-3.9-5.2-3.9-11.2 0-8.1 3.3-13.9 9.6-17.9 7-4.39 15.7-5 22.9-5 12.69 0 19.69 1.9 24.39 4.69 8.3 4.9 9.6 11.7 9.4 17H48a7.4 7.4 0 0 0-4.19-6.4c-3.1-1.7-8.8-1.9-11.2-1.9-3.4 0-7.2.5-9.6 1.9a7.08 7.08 0 0 0-3.5 6.1c0 3.2 2.7 4.5 5 5.3 2 .7 4.6 1.3 12 2.5l8 1.3c6.2 1 13.1 2.3 17.8 5.8 5.9 4.4 7.1 10.4 7.1 15.3 0 8.49-3.8 13.79-8.2 17-3.6 2.6-10.3 5.4-24.69 5.4-11.1 0-23.8-.7-30.9-8.2-5.1-5.3-5.7-12-5.7-16.09v-.4l19.22.01z" /> <path d="M136.61 158.36a18.67 18.67 0 0 1-11 15.8c-4.8 2.1-10.9 2.7-19.1 2.7-11.5 0-20.2-1-26.69-7.5-5.8-5.8-7-12.7-7-19 0-5.2.9-13.7 7.6-20.2 7-6.8 16.69-7.9 24.69-7.9s18.4 1.3 25.3 8.2c6.29 6.3 6.89 14.5 6.89 20.6v1.8H90.82v.3a12.6 12.6 0 0 0 3.3 9.09c3 3 7.8 3.4 11.2 3.4 2.6 0 6.6-.2 9.1-1.4a7.99 7.99 0 0 0 4.5-5.9l17.69.01zm-17.39-14.49a10.76 10.76 0 0 0-3.6-7.8c-3-2.7-7.1-3-10.4-3-3.6 0-6.9.4-9.9 2.8a11.15 11.15 0 0 0-4.2 8h28.1z" /> <path d="M205.3 124.17h10.79v-15.1h17.6v15.1h11.8V135h-11.8v22.2c0 1.89 0 4.29 1.4 5.79.3.3 1.7 1.7 5.4 1.7 1.76 0 3.52-.26 5.2-.8v11a38.13 38.13 0 0 1-12 1.6c-3.6 0-10-.2-13.9-3.9-3.6-3.4-3.7-7.9-3.7-11V135H205.3v-10.83z" /> <path d="M251.88 104.28h17.6v11.79h-17.6v-11.79zm17.6 19.89V175h-17.6v-50.83h17.6z" /> <path d="M297 124.17v6.2c1.98-2.3 4.4-4.21 7.1-5.6a25.31 25.31 0 0 1 11.3-2.3c9.6 0 14.6 2.8 15.9 3.7 6.6 4.3 7.4 11.3 7.4 17.4V175h-17.6v-27.53c0-4.1-.4-8.3-3-10.8-1.3-1.3-3.6-2.4-7.1-2.4a12.17 12.17 0 0 0-9.2 3.6c-2.6 2.8-4.1 7.8-4.1 13.8V175h-17.62v-50.83H297z" /> <path d="M366.06 178.06a5.35 5.35 0 0 0 3.3 4.5c2.3.86 4.75 1.27 7.2 1.2 1.6 0 6.6-.1 9.5-2.8 2.9-2.7 3.09-7.1 3.09-9.6v-3.8h-.4a15 15 0 0 1-5.89 4.7c-2.3 1-5.8 1.7-11.7 1.7-7.2 0-13.7-1-19.5-6.4-5.5-5.2-6.8-11.39-6.8-17.69 0-10.2 3.5-16.4 7.2-20.2 5.9-5.9 13.5-7.1 19.8-7.1 5.4 0 8.9.9 11.3 2a15.7 15.7 0 0 1 6.49 5.5h.5v-5.9h16.6v44.59c0 3.5-.2 13.3-6.2 19.3-5.3 5.3-14.19 6.5-25.29 6.5-12.3 0-17.4-2.5-19.1-3.4-6.2-3.4-7.6-8.7-7.7-13.1h17.6zm.7-18.4c3 3.2 7.1 3.7 10 3.7 3.1 0 6.6-.6 9.3-3.4 2.7-2.8 3.79-7.69 3.79-11.19 0-3.8-1.2-8.6-3.79-11.4a13.38 13.38 0 0 0-9.8-3.8 11.76 11.76 0 0 0-8.8 3.5c-2.3 2.3-4.4 6.2-4.4 12 0 4.3 1.3 8.1 3.7 10.59z" /> <path d="M200.7 142.87c0-4.2-.1-9.5-4.3-13.9-5.7-6-17-6.7-24.09-6.7-9.1 0-17.4.8-23.1 6.4a16.24 16.24 0 0 0-4.9 11.9h17.8a7.11 7.11 0 0 1 2.9-5.5c2.4-1.7 6.4-1.8 7.6-1.8 2.4-.06 4.8.42 7 1.4a5.44 5.44 0 0 1 3.2 5 4.8 4.8 0 0 1-1.2 3.3c-1.5 1.6-4.6 1.8-9.29 2.2l-8 .7c-5.3.5-13.8 1.1-18.6 5.7-2.8 2.7-3.8 6.19-3.8 10 0 6.6 3.2 10.2 5.9 12.1 4.3 2.9 10.8 3.2 15.8 3.2 4.08.13 8.16-.37 12.09-1.5 3.13-.93 5.9-2.82 7.9-5.4h.4l1.1 5h16.4a59.87 59.87 0 0 1-.8-9.5l-.01-22.6zm-17.8 9.5c0 5.39-1.5 8.49-3.6 10.59-3.1 3.1-6.69 3.5-9.89 3.5-2.1 0-4.8-.1-6.7-1.6a5.45 5.45 0 0 1-2.1-4.3 5 5 0 0 1 2.4-4.29c1.7-1.1 4.2-1.5 7.1-1.8l3.7-.4c5-.5 7.09-.8 9.09-2.5v.8z" /></svg>
            </transition>
          </div>
          <span class="loader" />
        </div>
      </div>
    </transition>
    <div v-if="inputSoftware && showInputSelect" class="fixed z-10">
      <select v-model="inputSoftware">
        <option v-for="input in inputs" :key="input.id" :value="input">
          {{ input.name }}
        </option>
      </select>
    </div>
    <canvas ref="webgl" class="webgl" @wheel="killTimeline()" @mousedown="killTimeline()" />
  </div>
</template>

<script lang="ts" setup>
import Experience from '~/service/experience/Experience'
import {Input} from 'webmidi'

const experience = new Experience()
const webgl = ref<HTMLCanvasElement>()
const overlay = ref(true)
const loading = ref(true)

const inputSoftware = ref()
const inputs = ref<Input[]>([])

const showInputSelect = ref(false)

onMounted(async () => {
  // Elements in .client components are available only after nextTick()
  await nextTick()

  experience.setMembers(webgl.value)
  experience.resources.on('ready', () => {
    turnOffOverlay()
  })

  addEventListener('keypress', (event) => {
    if(event.key === 'h') {
      showInputSelect.value = !showInputSelect.value
    }
  })

  await useWebMidi()

  inputs.value = useMidiInputs()

  //Choose an input port
  inputSoftware.value = useMidiDevice()
  triggerRef(inputSoftware)
  //The 0 value is the first value in the array
  //meaning that we are going to use the first MIDI input we see
  //which in this case is 'LoopMIDI port'

  watch(inputSoftware, () => {
    addListeners()
  })

  addListeners()
})

onUnmounted(() => {
  experience.destroy()
})

function addListeners () {
  if(!inputSoftware.value) {
    return
  }

  //listen to all incoming "note on" input events
  inputSoftware.value.addListener('noteon',
    function(e) {
      //Show what we are receiving
      // console.log(e)
      //the function you want to trigger on a 'note on' event goes here
      if(!experience.world.noteOnMelody) {
        experience.world.ball.changeColor()
      }
      experience.world.noteOnMelody = true
    }, {
      channels: 1
    }
  )
  //The note off functionality will need its own event listener
  //You don't need to pair every single note on with a note off
  inputSoftware.value.addListener('noteoff',
    function(e) {
      //Show what we are receiving
      // console.log('Received \'noteoff\' message (' + e.note.name + e.note.octave + ') ' + e.note.number + '.')
      //the function you want to trigger on a 'note on' event goes here
      experience.world.noteOnMelody = false
    }, {
      channels: 1
    }
  )

  //listen to all incoming "note on" input events
  inputSoftware.value.addListener('noteon',
    function(e) {
      //Show what we are receiving
      // console.log(e)
      //the function you want to trigger on a 'note on' event goes here
      if(e.note.identifier === 'D2' || e.note.identifier === 'C2') {
        experience.world.ball2.changeColor()
        experience.world.ball3.changeColor()
        experience.world.noteOnDrums = true
      }
    }, {
      channels: 2
    }
  )

  //listen to all incoming "note on" input events
  inputSoftware.value.addListener('noteoff',
    function(e) {
      //Show what we are receiving
      // console.log(e)
      //the function you want to trigger on a 'note on' event goes here
      experience.world.noteOnDrums = false
    }, {
      channels: 2
    }
  )

  //listen to all incoming "note on" input events
  inputSoftware.value.addListener('noteon',
    function(e) {
      //Show what we are receiving
      console.log(e)
      //the function you want to trigger on a 'note on' event goes here
      experience.world.noteOnRhytm = true
    }, {
      channels: 3
    }
  )

  //listen to all incoming "note on" input events
  inputSoftware.value.addListener('noteoff',
    function(e) {
      //Show what we are receiving
      // console.log(e)
      //the function you want to trigger on a 'note on' event goes here
      experience.world.noteOnRhytm = false
    }, {
      channels: 3
    }
  )
}

function resetCamera () {
  experience.camera.reset()
}

function killTimeline () {
  experience.camera.killTimeline()
}

function turnOffOverlay () {
  loading.value = false
  setTimeout(() => {
    overlay.value = false
  }, 500)
}

</script>

<style scoped lang="scss">
.webgl {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

html {
  height: 100%;
  width: 100%;
}

body {
  height: 100%;
  width: 100%;
}

.point {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
}

.point .label {
  position: absolute;
  left: -35px;
  top: -15px;
  width: 70px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.001, 0.001);
  transition: 0.3s;

  @media (max-width: 767px) {
    width: 40px;
    height: 20px;
    left: -20px;
    top: -10px;
  }
}

.visible {
  z-index: 2;
}

.point.visible .label {
  opacity: 1;
  transform: scale(1, 1);
}

.button {
  font-family: "pragmatica-extended", sans-serif;
  @apply h-min bg-black text-white py-3 px-6 select-none font-medium rounded-2xl z-10 cursor-pointer;
}

.material-picker-button {
  height: 40px;
  width: 40px;
  background: black;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: pragmatica-extended, sans-serif;
  font-size: 13px;
}

.loader {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: black;
  box-shadow: 32px 0 #fff, -32px 0 #fff;
  position: relative;
  animation: flash 0.5s ease-out infinite alternate;
}

@keyframes flash {
  0% {
    background-color: #0009;
    box-shadow: 32px 0 #0009, -32px 0 #000;
  }
  50% {
    background-color: #000;
    box-shadow: 32px 0 #0009, -32px 0 #0009;
  }
  100% {
    background-color: #0009;
    box-shadow: 32px 0 #000, -32px 0 #0009;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
