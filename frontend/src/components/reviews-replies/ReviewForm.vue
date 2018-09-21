<template>
    <Card>
      <div class="content">
          <h3>Submit a Review</h3>
          <p>
            <input type="text" placeholder="Review title..." v-model="title"><br>
            <textarea placeholder="Your review here.." v-model="body"></textarea><br>
            Course Difficulty
            <span>
              <p style="text-align:left">Easy</p>
              <p style="text-align:center">Med</p>
              <p style="text-align:right">Hard</p>
            </span>
            <input type="range" min="1" max="3" class="slider" v-bind:value="num" v-on:input="doSomething($event.target.value)">
            {{this.num}}
            <!-- should probs be a separate component -->
            <AppButton @click.native="callback({title, body})">Submit</AppButton>
            <!-- errors will be injected here -->
            <slot></slot>
          </p>
      </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import AppButton from '@/components/AppButton'

export default {
  name: 'ReviewForm',
  components: {
    Card,
    AppButton
  },
  props: {
    callback: Function
  },
  data () {
    return {
      title: '',
      body: '',
      num: 2
    }
  },
  methods: {
    doSomething(val) {
      this.num = val
    }
  }
}
</script>

<style scoped lang='less'>

.content {
  padding: 0px 60px;
}

input[type=text] {
  border: var(--border);
  border-radius: 2px;
  font: inherit;
  resize: none;
  padding: 5px;
  outline: none;
  margin: 10px 0px;
  width: 100%;
  height: 20px;
  transition: 0.2s border ease-in-out;
}

textarea {
  border: var(--border);
  border-radius: 2px;
  font: inherit;
  resize: none;
  padding: 5px;
  outline: none;
  margin: 10px 0px;
  width: 100%;
  height: 100px;
  transition: 0.2s border ease-in-out;
}

textarea:focus, textarea:active {
  border: 1px solid #acc;
}

/* The slider itself */
.slider {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 25px; /* Specified height */
    background: #d3d3d3; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
}

/* Mouse-over effects */
.slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #4CAF50; /* Green background */
    cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #4CAF50; /* Green background */
    cursor: pointer; /* Cursor on hover */
}

</style>
