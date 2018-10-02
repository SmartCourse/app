<template>
    <Card>
      <div class="content">
        <CardHeader>Submit a Review</CardHeader>
          <form>
            <AppInput placeholder="Review title..." v-model="title"/><br>
            <textarea placeholder="Your review here.." v-model="body"></textarea><br>

            <h4>Would you recommend this course?</h4>
            <input type="radio" value="true" v-model="recommend"> Yes
            <input type="radio" value="false" v-model="recommend"> No

            <h4>How would you rate the difficulty of this course?</h4>
            <label style="float:left;">Easy</label>
            <label style="float:right;">Hard</label>
            <input type="range" min="1" max="3" class="slider" v-model="difficulty">
            <br>

            <!-- should probs be a separate component -->
            <AppButton @click.native="callback({title, body, recommend, difficulty})">Submit</AppButton>
            <!-- errors will be injected here -->
            <slot></slot>
          </form>
      </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import CardHeader from '@/components/Card/Header'
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'

export default {
  name: 'ReviewForm',
  components: {
    Card,
    CardHeader,
    AppButton,
    AppInput
  },
  props: {
    callback: Function
  },
  data () {
    return {
      title: '',
      body: '',
      recommend: '',
      difficulty: 2
    }
  }
}
</script>

<style scoped lang='less'>

.content {
  padding: 20px;
}

textarea {
  border: var(--border);
  border-radius: 2px;
  font: inherit;
  resize: none;
  padding: 10px;
  outline: none;
  margin: 10px 0px;
  width: calc(100% - 20px);
  height: 100px;
  transition: 0.2s border ease-in-out;
}

textarea:focus, textarea:active {
  border: 1px solid #acc;
}

.slider {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%;
    height: 25px;
    border-radius: 5px;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider:hover {
    opacity: 1;
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: var(--theme);
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: var(--theme);
    cursor: pointer;
}

</style>
