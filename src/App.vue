<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { temperatureMask } from './helpers/temperature-mask'
import type { Temperature } from './types/temperature'

const celsiusTemperature = ref<string>('')
const pageContainerClass = ref<Temperature | undefined>()

function handleInputChange(event: Event) {
  const { value } = event.target as HTMLInputElement
  celsiusTemperature.value = temperatureMask(value)
}

function convertCelsiusToFahrenheit(celsius: number): number {
  const fahrenheitTemperature = celsius * 1.8 + 32
  return Number(fahrenheitTemperature.toFixed(0))
}

const message = computed(() =>
  celsiusTemperature.value.length === 0
    ? 'Type a temperature in Celsius to convert it to Fahrenheit'
    : `The temperature ${celsiusTemperature.value} converted to fahrenheit is ${convertCelsiusToFahrenheit(Number(celsiusTemperature.value))}`,
)

watch(celsiusTemperature, () => {
  const temperature: number = Number(celsiusTemperature.value)

  if (temperature < 0) {
    pageContainerClass.value = 'super-cold'
  }

  if (temperature >= 0 && temperature <= 20) {
    pageContainerClass.value = 'cold'
  }

  if (temperature > 20 && temperature <= 30) {
    pageContainerClass.value = 'hot'
  }

  if (temperature > 30) {
    pageContainerClass.value = 'super-hot'
  }
})
</script>

<template>
  <main class="main-page" :class="pageContainerClass">
    <div class="container">
      <section class="content">
        <input
          type="text"
          @input="handleInputChange"
          v-model="celsiusTemperature"
          class="temperature-input"
        />
        <span class="temperature-message">{{ message }}</span>
      </section>
    </div>
  </main>
</template>

<style scoped>
.main-page {
  background-color: var(--cold);
  height: 100vh;
  width: 100vw;
}

.content {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  justify-content: center;
}

.temperature-input {
  border-radius: 5px;
  border: none;
  height: 32px;
  width: 300px;
}

.super-cold {
  background-color: var(--super-cold);
}

.cold {
  background-color: var(--cold);
}

.hot {
  background-color: var(--hot);
}

.super-hot {
  background-color: var(--super-hot);
}
</style>
