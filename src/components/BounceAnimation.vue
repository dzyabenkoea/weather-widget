<template>
  <div class="pl1">
    <div class="pl1__a"></div>
    <div class="pl1__b"></div>
    <div class="pl1__c"></div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="sass">
.pl1, .pl2
  justify-content: space-around
  &__a, &__b, &__c
    border-radius: 50%
    width: 1em
    height: 1em
    transform-origin: 50% 100%
.pl1
  &__a, &__b, &__c
    animation: bounce1 1s linear infinite
.pl1
  display: flex
  margin: 1.5em
  width: 6em
  height: 6em
  --c1: white
  &__a
    background: var(--c1)
  &__b
    background: var(--c1)
    animation-delay: 0.1s
  &__c
    background: var(--c1)
    animation-delay: 0.2s

/* Animations */
@keyframes bounce1
  from, to
    transform: translateY(0) scale(1,1)
    animation-timing-function: ease-in
  45%
    transform: translateY(1.5em) scale(1,1)
    animation-timing-function: linear
  50%
    transform: translateY(1.5em) scale(1.5,0.5)
    animation-timing-function: linear
  55%
    transform: translateY(1.5em) scale(1,1)
    animation-timing-function: ease-out
</style>