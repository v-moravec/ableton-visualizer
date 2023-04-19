import { WebMidi } from 'webmidi'

export default () => {
  return WebMidi.inputs[0]
}
