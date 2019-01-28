<template>
    <div class="menu">
        <button
            class="material-icons menu-button"
            type="menu"
            title="Toggle Menu"
            @click="toggleMenu"
            @blur="blurHandler"
        >
            {{toggled ? 'not_interested' : 'more_vert'}}
        </button>
        <ol
            ref="dropdown"
            :class="['menu-items', {'drop-down-active': toggled}]"
        >
            <MenuItem
                v-for="item in menu"
                @click.native="item.action && item.action(); toggleMenu()"
                tabindex="0"
                :key="item.label">
                {{ item.label }}
            </MenuItem>
        </ol>
    </div>
</template>

<script>
import MenuItem from './MenuItem'

export default {
  components: {
    MenuItem
  },
  props: {
    menu: {
      type: Array
    }
  },
  data() {
    return {
      toggled: false
    }
  },
  methods: {
    toggleMenu() {
      this.toggled = !this.toggled
    },
    blurHandler(event) {
      if (this.$refs.dropdown.contains(event.relatedTarget)) {
        return
      }
      this.toggled = false
    }
  }
}
</script>

<style scoped>
.menu {
    position: absolute;
}

.menu-button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    color: var(--soft-black);
    height: 24px;
}

.menu-button:hover, .menu-button:active, .menu-button:focus {
    color: var(--black);
}

.menu-items {
    padding: 3.5px 7px;
    border: var(--border);
    background-color: var(--white);
    visibility: hidden;
    top: 24px;
    right: 10px;
    position: absolute;
}

.drop-down-active {
    visibility: visible;

}
</style>
