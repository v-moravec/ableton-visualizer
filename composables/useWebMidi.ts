import {WebMidi} from 'webmidi'

export default async () => {
  await WebMidi.enable({})

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
}
