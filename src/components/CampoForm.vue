<script>
export default {
  name: 'CampoForm',
  // gli attributi non dichiarati (autocomplete, min, autofocus...) vanno sull'input
  inheritAttrs: false,
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { type: String, default: '' },
    tipo: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    errore: { type: String, default: '' },
    mostraErrore: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
}
</script>

<template>
  <div>
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="id"
      :value="modelValue"
      :type="tipo"
      class="form-control"
      :class="{ 'is-invalid': mostraErrore && errore }"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="invalid-feedback">{{ errore }}</div>
  </div>
</template>
