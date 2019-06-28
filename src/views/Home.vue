<template>
  <div class="home">
    <div class="control">
      <button id="reset">reset</button>
      <div >
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { threeDemo } from '@/utils/three'

export default {
  name: "home",
  components: {
    HelloWorld
  },

  data() {
    return {

    }
  },

  mounted() {
    this.handleThree()
  },

  methods: {
    handleThree() {
      threeDemo()
    }
  }
};
</script>

<style lang="scss">
  body { margin: 0; }

  .home {
    position: relative;
    .control {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 200px;
      height: 200px;
      background: #e0e0e0;
      .btn {

      }
    }
  }

  button {
  z-index: 1;
  position: relative;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(236, 32%, 26%);
  overflow: hidden;
  cursor: pointer;
}

button::after {
  content: '';
  z-index: -1;
  background-color: hsla(0, 0%, 100%, 0.2);
  position: absolute;
  top: -50%;
  bottom: -50%;
  width: 1.25em;
  transform: translate3d(-525%, 0, 0) rotate(35deg);
}

button:hover::after {
  transition: transform 0.45s ease-in-out;
  transform: translate3d(200%, 0, 0) rotate(35deg);
}

</style>
