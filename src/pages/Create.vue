<template>
  <q-page class="q-px-sm q-py-md">
    <FormData
      ref="FormDataRef"
      :data="data"
      :rules="rules"
      @updateField="(val, field) => data[field] = val"
    />
    <div class="row justify-center q-pa-md">
      <q-btn
        class="q-mr-sm"
        color="primary"
        label="Отменить"
        @click="$router.go(-1)"
      />
      <q-btn
        color="primary"
        label="Сохранить"
        @click="sendRequest"
      />
    </div>
  </q-page>
</template>

<script setup>
import {ref} from 'vue';
import FormData from "components/FormData";
import {useQuasar} from "quasar";
import {useRouter, onBeforeRouteLeave} from "vue-router";

const $router = useRouter();
const $q = useQuasar();
const FormDataRef = ref(null);
const data = ref({
  firstName: '',
  lastName:  '',
  middleName: '',
  birthDate:  '',
  description:  ''
});

const rules = {
  firstName:  [value => !!value || 'Обязательное поле'],
  lastName:  [value => !!value || 'Обязательное поле'],
  middleName:  [value => !!value || 'Обязательное поле'],
  birthDate:  [value => !!value || 'Обязательное поле'],
  description:  [value => !!value || 'Обязательное поле'],
}

async function sendRequest() {
  const validate = await FormDataRef.value.validate();
  if (!validate) $q.notify({type: 'negative', message: 'Заполните обязательные поля!', position: 'bottom-right'});
  else {
    try {
      let localData = JSON.parse(localStorage.getItem('dataTable')) || [];
      let newItem = {};
      for (const key in data.value){
        if (key === 'birthDate') newItem = {...newItem, [key]: data.value[key] ? (data.value[key]).split('.').reverse().join('/') : null};
        else newItem = {...newItem, [key]: data.value[key]};
      }
      localData.push(newItem);

      for (let i = 0; i < localData.length; i++) {
        localData[i].id = i + 1;
      }

      localStorage.setItem('dataTable', JSON.stringify(localData));
      clearData();
      await FormDataRef.value.resetValidate();
      $q.notify({type: 'positive', message: 'Данные успешно сохранены', position: 'bottom-right'});
    }
    catch (e) {
      console.error(e);
      console.error('ERROR IN sendRequest')
      $q.notify({type: 'negative', message: 'Произошла ошибка!', position: 'bottom-right'});
    }
  }
}

function clearData() {
  for (const key in data.value){
    data.value[key] = '';
  }
}

onBeforeRouteLeave((to, from, next) => {
  let changes = false;
  for (const item of Object.values(data.value)){
    if (!!item){
      changes = true;
      break;
    }
  }


  if (changes) {
    const answer = window.confirm('Вы уверены, что хотите покинуть эту страницу? У вас остались несохраненные данные.');
    if (answer) {
      next();
    }
    else {
      next(false);
    }
  }
  else {
    next();
  }
});


</script>

<style scoped>

</style>
