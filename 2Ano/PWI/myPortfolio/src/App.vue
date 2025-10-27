<script setup></script>

<template>
<div>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/projects">Projects</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
  </nav>
  <router-view></router-view>
</div>
</template>

<style scoped>
</style>