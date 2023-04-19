<template>
  <div class="relative overflow-hidden">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-center h-screen">
        <div class="w-[700px] max-w-full">
          <h1>
            Jagu Nuxt Template
          </h1>
          <p>
            Remove <span class="text-highlight">&lt;JaguWelcome /></span> component in
            <span class="text-highlight">pages/index.vue</span> and start developing.
          </p>
        </div>
        <div class="p-10">
          <img class="w-64" src="~assets/svg/jagu-logo.svg" alt="jagu-logo">
        </div>
      </div>
    </div>
    <div class="absolute z-[-1] top-0 right-0 -scale-100 translate-x-1/3 -translate-y-1/3">
      <img class="w-full" src="~assets/png/blob-gradient-wide.png" alt="blob">
    </div>
    <div class="absolute z-[-1] bottom-0 left-0 -translate-x-1/3 translate-y-1/3">
      <img class="w-full" src="~assets/png/blob-gradient-wide.png" alt="blob">
    </div>
  </div>
</template>

<script setup>
import { WebMidi } from 'webmidi'

onMounted(async () => {
  await WebMidi.enable(function(err) { //check if WebMidi.js is enabled
    if (err) {
      console.log('WebMidi could not be enabled.', err)
    } else {
      console.log('WebMidi enabled!')
    }
  })

  //name our visible MIDI input and output ports
  console.log('---')
  console.log('Inputs Ports: ')
  for (let i = 0; i < WebMidi.inputs.length; i++) {
    console.log(i + ': ' + WebMidi.inputs[i].name)
  }

  console.log('---')
  console.log('Output Ports: ');
  for (let i = 0; i < WebMidi.outputs.length; i++) {
    console.log(i + ': ' + WebMidi.outputs[i].name)
  }

  //Choose an input port
  const inputSoftware = WebMidi.inputs[0]
  //The 0 value is the first value in the array
  //meaning that we are going to use the first MIDI input we see
  //which in this case is 'LoopMIDI port'
  console.log(inputSoftware)

  //listen to all incoming "note on" input events
  inputSoftware.addListener('noteon',
    function(e) {
      //Show what we are receiving
      console.log(e)
      //the function you want to trigger on a 'note on' event goes here

    }, {
      channels: 1
    }
  )
  //The note off functionality will need its own event listener
  //You don't need to pair every single note on with a note off
  inputSoftware.addListener('noteoff',
    function(e) {
      //Show what we are receiving
      console.log('Received \'noteoff\' message (' + e.note.name + e.note.octave + ') ' + e.note.number + '.')
      //the function you want to trigger on a 'note on' event goes here

    },
    {
      channels: 1
    }
  )
})
</script>

<style lang="scss" scoped>
.text-highlight {
  @apply bg-jagu-orange px-2 text-white font-medium;
}
</style>
