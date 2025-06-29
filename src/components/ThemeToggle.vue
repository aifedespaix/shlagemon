<script setup lang="ts">
const isDark = useDark()
const toggle = useToggle(isDark)
</script>

<template>
  <label class="theme-toggle" aria-label="Changer de thème">
    <span class="theme-toggle-wrap">
      <input
        id="theme-toggle"
        class="theme-toggle-input"
        type="checkbox"
        role="switch"
        name="theme"
        value="dark"
        :checked="isDark"
        @change="toggle()"
      >
      <span class="theme-toggle-fill" />
      <span class="theme-toggle-icon">
        <span class="theme-toggle-icon-part" />
        <span class="theme-toggle-icon-part" />
        <span class="theme-toggle-icon-part" />
        <span class="theme-toggle-icon-part" />
        <span class="theme-toggle-icon-part" />
        <span class="theme-toggle-icon-part" />
        <span class="theme-toggle-icon-part" />
        <span class="theme-toggle-icon-part" />
        <span class="theme-toggle-icon-part" />
      </span>
    </span>
  </label>
</template>

<style scoped>
:root {
  --transDur: 0.3s;
  --primary: hsl(198, 90%, 55%);
  --primaryT: hsla(198, 90%, 55%, 0.4);
  --bg: hsl(48, 90%, 85%);
}

.theme-toggle {
  position: relative;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
}

.theme-toggle-fill,
.theme-toggle-icon {
  transition: 0.3s;
}

.theme-toggle-fill {
  background-color: var(--bg);
  display: block;
  mix-blend-mode: difference;
  position: fixed;
  inset: 0;
  height: 100%;
  transform: translateX(-100%);
  pointer-events: none;
}

.theme-toggle-icon,
.theme-toggle-input {
  z-index: 1;
}

.theme-toggle-icon,
.theme-toggle-icon-part {
  position: absolute;
}

.theme-toggle-icon {
  display: block;
  top: 0.5em;
  left: 0.5em;
  width: 1.5em;
  height: 1.5em;
}

.theme-toggle-icon-part {
  border-radius: 50%;
  box-shadow: 0.4em -0.4em 0 0.5em hsl(0, 0%, 100%) inset;
  top: calc(50% - 0.5em);
  left: calc(50% - 0.5em);
  width: 1em;
  height: 1em;
  transition:
    box-shadow var(--transDur) ease-in-out,
    opacity var(--transDur) ease-in-out,
    transform var(--transDur) ease-in-out;
  transform: scale(0.5);
}

.theme-toggle-icon-part ~ .theme-toggle-icon-part {
  background-color: hsl(0, 0%, 100%);
  border-radius: 0.05em;
  top: 50%;
  left: calc(50% - 0.05em);
  transform: rotate(0deg) translateY(0.5em);
  transform-origin: 50% 0;
  width: 0.1em;
  height: 0.2em;
}

.theme-toggle-icon-part:nth-child(3) {
  transform: rotate(45deg) translateY(0.45em);
}
.theme-toggle-icon-part:nth-child(4) {
  transform: rotate(90deg) translateY(0.45em);
}
.theme-toggle-icon-part:nth-child(5) {
  transform: rotate(135deg) translateY(0.45em);
}
.theme-toggle-icon-part:nth-child(6) {
  transform: rotate(180deg) translateY(0.45em);
}
.theme-toggle-icon-part:nth-child(7) {
  transform: rotate(225deg) translateY(0.45em);
}
.theme-toggle-icon-part:nth-child(8) {
  transform: rotate(270deg) translateY(0.5em);
}
.theme-toggle-icon-part:nth-child(9) {
  transform: rotate(315deg) translateY(0.5em);
}

.theme-toggle-input,
.theme-toggle-input:before {
  display: block;
}

.theme-toggle-input {
  background-color: hsl(48, 90%, 85%);
  border-radius: 25% / 50%;
  box-shadow: 0 0 0 0.125em var(--primaryT);
  padding: 0.25em;
  width: 6em;
  height: 3em;
  -webkit-appearance: none;
  appearance: none;
  transition:
    background-color var(--transDur) ease-in-out,
    box-shadow 0.15s ease-in-out,
    transform var(--transDur) ease-in-out;
}

.theme-toggle-input:before {
  background-color: hsl(48, 90%, 55%);
  border-radius: 50%;
  content: '';
  width: 2.5em;
  height: 2.5em;
  transition: 0.3s;
}

.theme-toggle-input:focus {
  box-shadow: 0 0 0 0.125em var(--primary);
  outline: transparent;
}

.theme-toggle-input:checked {
  background-color: hsl(198, 90%, 15%);
}

.theme-toggle-input:checked:before,
.theme-toggle-input:checked ~ .theme-toggle-icon {
  transform: translateX(3em);
}

.theme-toggle-input:checked:before {
  background-color: hsl(198, 90%, 55%);
}

.theme-toggle-input:checked ~ .theme-toggle-fill {
  transform: translateX(0);
}

.theme-toggle-input:checked ~ .theme-toggle-icon .theme-toggle-icon-part:nth-child(1) {
  box-shadow: 0.2em -0.2em 0 0.2em hsl(0, 0%, 100%) inset;
  transform: scale(1);
  top: 0.2em;
  left: -0.2em;
}

.theme-toggle-input:checked ~ .theme-toggle-icon .theme-toggle-icon-part ~ .theme-toggle-icon-part {
  opacity: 0;
}

.theme-toggle-input:checked ~ .theme-toggle-icon .theme-toggle-icon-part:nth-child(2) {
  transform: rotate(45deg) translateY(0.8em);
}
.theme-toggle-input:checked ~ .theme-toggle-icon .theme-toggle-icon-part:nth-child(3) {
  transform: rotate(90deg) translateY(0.8em);
}
.theme-toggle-input:checked ~ .theme-toggle-icon .theme-toggle-icon-part:nth-child(4) {
  transform: rotate(135deg) translateY(0.8em);
}
.theme-toggle-input:checked ~ .theme-toggle-icon .theme-toggle-icon-part:nth-child(5) {
  transform: rotate(180deg) translateY(0.8em);
}
.theme-toggle-input:checked ~ .theme-toggle-icon .theme-toggle-icon-part:nth-child(6) {
  transform: rotate(225deg) translateY(0.8em);
}
.theme-toggle-input:checked ~ .theme-toggle-icon .theme-toggle-icon-part:nth-child(7) {
  transform: rotate(270deg) translateY(0.8em);
}
.theme-toggle-input:checked ~ .theme-toggle-icon .theme-toggle-icon-part:nth-child(8) {
  transform: rotate(315deg) translateY(0.8em);
}
.theme-toggle-input:checked ~ .theme-toggle-icon .theme-toggle-icon-part:nth-child(9) {
  transform: rotate(360deg) translateY(0.8em);
}

.theme-toggle-wrap {
  margin: 0 0.75em;
}

@supports selector(:focus-visible) {
  .theme-toggle-input:focus {
    box-shadow: 0 0 0 0.125em var(--primaryT);
  }
  .theme-toggle-input:focus-visible {
    box-shadow: 0 0 0 0.125em var(--primary);
  }
}
</style>
