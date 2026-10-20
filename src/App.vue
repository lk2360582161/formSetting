	<template>
	  <a-config-provider>
	    <div id="app">
	      <form-builder />
	    </div>
	  </a-config-provider>
	</template>
	<script lang="ts" setup>
	import FormBuilder from './view/form-builder/index.vue';
	</script>
	<style>
	#app {
	  font-family: Avenir, Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	</style>