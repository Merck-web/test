<template>
  <q-page class="q-px-sm q-py-md">

    <TableDefault
      :data="data"
      @deleteRow="deleteRow"
      @editRow="editRow"
    />

    <q-dialog
      v-model="openDialog"
      @before-hide="editData.value = {}"
    >
      <q-card
        style="width: 100%; max-width: 1000px;"
      >
        <q-card-section class="row items-center bg-primary text-white">
          <div class="col">
            <div class="text-h5 text-white">
              Редактирование
            </div>
          </div>
          <div class="col-auto">
            <q-btn
              v-close-popup
              icon="close"
              color="white"
              dense
              flat
              round
            />
          </div>
        </q-card-section>

        <q-card-section
          class="q-pa-md"
        >
          <FormData
            ref="FormDataRef"
            :data="editData"
            :rules="rules"
            @updateField="(val, field) => editData[field] = val"
          />
        </q-card-section>

        <q-card-actions
          align="right"
        >
          <q-btn
            v-close-popup
            color="secondary"
            label="Отменить"
          />
          <q-btn
            color="primary"
            label="Изменить"
            @click="approveChanges"
          />
        </q-card-actions>
      </q-card>

    </q-dialog>

  </q-page>
</template>

<script setup>
import TableDefault from "components/TableDefault";
import {onMounted, ref, nextTick} from "vue";
import {useQuasar} from 'quasar';
import FormData from "components/FormData";
import formating_date from "src/scripts/formating_date";

const $q = useQuasar();
const data = ref([]);
const openDialog = ref(false);
const FormDataRef = ref(null);
const editData = ref({});

const rules = {
  firstName: [value => !!value || 'Обязательное поле'],
  lastName: [value => !!value || 'Обязательное поле'],
  middleName: [value => !!value || 'Обязательное поле'],
  birthDate: [value => !!value || 'Обязательное поле'],
  description: [value => !!value || 'Обязательное поле'],
}

function deleteRow(id) {
  try {
    const targetId = data.value.findIndex(item => item.id === id);
    data.value.splice(targetId, 1);
    for (let i = 0; i < data.value.length; i++) {
      data.value[i].id = i + 1;
    }
    localStorage.setItem('dataTable', JSON.stringify(data.value));
    $q.notify({
      type: 'positive',
      message: 'Строка успешно удалена',
      position: 'bottom-right',
    })
  } catch (e) {
    console.error(e);
    console.error('ERROR IN deleteRow');
    $q.notify({
      type: 'negative',
      message: 'Произошла ошибка',
      position: 'bottom-right',
    })
  }
}

async function editRow(id) {
  try {
    const targetObject = data.value.find(item => item.id === id);
    editData.value = structuredClone(targetObject);
    editData.value.birthDate = formating_date(editData.value.birthDate);
    await nextTick();
    openDialog.value = true;
  } catch (e) {
    console.error(e);
    console.error('ERROR IN editRow');
    $q.notify({
      type: 'negative',
      message: 'Произошла ошибка',
      position: 'bottom-right',
    })
  }
}

async function approveChanges() {
  const validate = await FormDataRef.value.validate();
  try {
    if (!validate) $q.notify({type: 'negative', message: 'Заполните обязательные поля!', position: 'bottom-right'});
    else {
      const indexObjectChanges = data.value.findIndex(item => item.id === editData.value.id);
      const newDate = editData.value.birthDate ? editData.value.birthDate.split('.').reverse().join('/') : null;
      data.value[indexObjectChanges] = {...editData.value, birthDate: newDate};
      localStorage.setItem('dataTable', JSON.stringify(data.value));
      $q.notify({
        type: 'positive',
        message: 'Данны успешно заменены',
        position: 'bottom-right',
      })
    }
  } catch (e) {
    console.error(e);
    console.error('ERROR IN approveChanges');
    $q.notify({
      type: 'negative',
      message: 'Произошла ошибка',
      position: 'bottom-right',
    })
  } finally {
    if (validate) openDialog.value = false;
  }
}


onMounted(_ => {
  data.value = JSON.parse(localStorage.getItem('dataTable')) || [];
})
</script>

