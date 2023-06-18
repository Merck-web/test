<template>
  <q-page class="q-px-sm q-py-md">
    <TableDefault
      :data="data"
      :hide-actions="true"
    />
  </q-page>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import TableDefault from "components/TableDefault";


const data = ref([])
onMounted(_=> {
  data.value = JSON.parse(localStorage.getItem('dataTable')) || [];
})
</script>
