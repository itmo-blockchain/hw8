<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Upload from './components/Upload.vue';
import Download from './components/Download.vue';
import { ref } from 'vue'

const file = ref(null)
const isUploading = ref(false)

const makeUpload = () => {
  isUploading.value = true
}

const makeDownload = () => {
  isUploading.value = false
}
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="HW8" />
    </div>
  </header>

  <main>
      <ul id="menu">
        <li @click="makeUpload">Upload</li>
        <li @click="makeDownload">Download</li>
      </ul>

      <Upload v-if="isUploading"/>
      <Download v-else/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  #menu {
    margin: 0;
    margin-bottom: 10pt;
    padding: 0;
    display: flex;
    list-style: none;
  }

  #menu li {
    margin: 0 1rem 0 0;
    cursor: pointer;
  }

  #menu li:last-child {
    margin: 0;
  }

  #menu li:hover {
    color: var(--vt-c-text-dark-1);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
