<script setup lang="ts">
import { computed, ref } from 'vue'
import { allowOnlyNumbers } from './helpers/allow-only-numbers'

const celsiusTemperature = ref<string>('')

function handleInputChange(event: Event) {
  const { value } = event.target as HTMLInputElement
  celsiusTemperature.value = allowOnlyNumbers(value)
}

function convertCelsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32
}

const message = computed(() =>
  celsiusTemperature.value.length === 0
    ? 'Type a temperature in Celsius to convert it to Fahrenheit'
    : `The temperature ${celsiusTemperature.value} converted to fahrenheit is ${convertCelsiusToFahrenheit(Number(celsiusTemperature.value))}`,
)
</script>

<template>
  <input type="text" @input="handleInputChange" v-model="celsiusTemperature" />
  <span>{{ message }}</span>
</template>

<style scoped></style>
