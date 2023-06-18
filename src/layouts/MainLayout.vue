<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-accent" elevated>
      <q-toolbar>
        <q-toolbar-title class="text-grey-3">
          Test App
        </q-toolbar-title>

        <router-link
          v-slot="{isActive}"
          class="q-mr-md"
          :to="{name: RouterPages.ACCOUNT.MAIN  }"
        >
          <q-btn
            :color="isActive ? 'primary' : 'secondary'"
            label="Главная"
          />

        </router-link>

        <router-link
          v-slot="{isActive}"
          class="q-mr-md"
          :to="{name: RouterPages.ACCOUNT.CREATE  }"
        >
          <q-btn
            :color="isActive ? 'primary' : 'secondary'"
            label="Создать"
          />

        </router-link>

        <router-link
          v-slot="{isActive}"
          :to="{ name:  RouterPages.ACCOUNT.EDIT }"
        >
          <q-btn
            :color="isActive ? 'primary' : 'secondary'"
            label="Редактировать"
          />
        </router-link>

      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {RouterPages} from "src/scripts/scripts";
import {useRouter} from 'vue-router';
import {computed} from "vue";

const $router = useRouter();
const url = computed(() => $router.currentRoute.value.name);
</script>
