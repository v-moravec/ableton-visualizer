<template>
  <div class="md:hidden w-min h-min">
    <label id="menuIcon" for="check">
      <input id="check" ref="checkbox" :value="modelValue" type="checkbox" @input="updateValue">
      <span class="menu-icon-span" :class="{'dark': false, 'checked1': modelValue}" />
      <span class="menu-icon-span" :class="{'dark': false, 'checked2': modelValue}" />
      <span class="menu-icon-span" :class="{'dark': false, 'checked3': modelValue}" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'MenuIcon',
  props: {
    modelValue: false
  },
  watch: {
    modelValue: {
      immediate: true,
      handler () {
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value === 'false');
    }
  }
}
</script>

<style scoped>
label {
  display:flex;
  flex-direction:column;
  width:70px;
  cursor:pointer;
  transform: scale(0.5);
}

label span {
  background: black;
  border-radius:10px;
  height:7px;
  margin: 7px 0;
  transition: all .4s  cubic-bezier(0.68, -0.6, 0.32, 1.6), background 0ms;
}


span:nth-of-type(1) {
  width:50%;
}

span:nth-of-type(2) {
  width:100%;
}

span:nth-of-type(3) {
  width:75%;
}

input[type="checkbox"] {
  display:none;
}

.checked1 {
  transform-origin:bottom;
  transform:rotatez(45deg) translate(8px,0px)
}

.checked2 {
  transform-origin:top;
  transform:rotatez(-45deg)
}

.checked3 {
  transform-origin:bottom;
  width:50% !important;
  transform: translate(30px,-11px) rotatez(45deg);
}

.dark {
  background: #333333 !important;
}
</style>
