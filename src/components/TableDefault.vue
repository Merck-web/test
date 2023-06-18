<template>
  <div class="row">
    <div class="row items-center justify-end full-width q-px-md">
      <q-btn
        class="flex justify-center max-w-[50px]"
        color="primary"
        icon="arrow_left"
        dense
        :disable="page <= 1"
        @click="page -= 1"
      />
      <div
        class="q-mx-md flex justify-center text-weight-bolder text-2xl text-primary"
        v-text="page"
      />
      <q-btn
        class="flex justify-center max-w-[50px]"
        color="primary"
        icon="arrow_right"
        dense
        :disable="page >= maxPage"
        @click="page += 1"
      />
    </div>
    <div class="col-12 q-my-lg">
      <q-table
        :columns="columns"
        :rows="computedData"
        :rows-per-page-options="[3]"
        :title="`Всего заявок: ${data.length}`"
        hide-bottom
        wrap-cells
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              key="id"
              :props="props"
            >
              {{ props.row.id }}
            </q-td>
            <q-td
              key="firstName"
              :props="props"
            >
              {{ props.row.firstName }}
            </q-td>
            <q-td
              key="lastName"
              :props="props"
            >
              {{ props.row.lastName }}
            </q-td>
            <q-td
              key="middleName"
              :props="props"
            >
              {{ props.row.middleName }}
            </q-td>
            <q-td
              key="birthDate"
              :props="props"
            >
              {{ $formattingDate(props.row.birthDate) }}
            </q-td>
            <q-td
              key="description"
              :props="props"
            >
              {{ props.row.description }}
            </q-td>
            <q-td
              key="edit"
              :props="props"
            >
              <q-btn
                dense
                no-caps
                flat
                color="positive"
                icon="edit"
                @click="editRow(props.row.id)"
              />
            </q-td>
            <q-td
              key="delete"
              :props="props"
            >
              <q-btn
                dense
                no-caps
                flat
                color="secondary"
                icon="delete"
                @click="deleteRow(props.row.id)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div class="row items-center justify-end full-width q-px-md">
      <q-btn
        class="flex justify-center max-w-[50px]"
        color="primary"
        icon="arrow_left"
        dense
        :disable="page <= 1"
        @click="page -= 1"
      />
      <div
        class="q-mx-md flex justify-center text-weight-bolder text-2xl text-primary"
        v-text="page"
      />
      <q-btn
        class="flex justify-center max-w-[50px]"
        color="primary"
        icon="arrow_right"
        dense
        :disable="page >= maxPage"
        @click="page += 1"
      />
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useQuasar} from 'quasar';

const $q = useQuasar();

const props = defineProps({
  hideActions: {type: Boolean, default: false},
  data: {type: Array, default: []}
});

const emits = defineEmits(['deleteRow', 'editRow']);

const columns = ref([
  {
    name: 'id',
    field: 'id',
    label: 'ID',
    align: 'center',
    classes: 'bg-grey-3',
    style: 'max-width: 200px; font-size: 1rem; min-with: 50px; max-with: 50px;',
    headerClasses: 'bg-grey-3',
    headerStyle: 'font-size: 1rem; font-weight: 700; min-with: 50px; max-with: 50px;',
  },
  {
    name: 'firstName',
    field: 'firstName',
    label: 'Имя',
    align: 'center',
    style: 'max-width: 200px; font-size: 1rem; min-with: 100px; max-with: 100px;',
    headerStyle: 'font-size: 1rem; font-weight: 700; min-with: 100px; max-with: 100px;',
  },
  {
    name: 'lastName',
    field: 'lastName',
    label: 'Фамилия',
    align: 'center',
    style: 'font-size: 1rem; min-with: 100px; max-with: 100px;',
    headerStyle: 'font-size: 1rem; font-weight: 700; min-with: 100px; max-with: 100px;',
  },
  {
    name: 'middleName',
    field: 'middleName',
    label: 'Отчество',
    align: 'center',
    style: 'font-size: 1rem; min-with: 100px; max-with: 100px;',
    headerStyle: 'font-size: 1rem; font-weight: 700; min-with: 100px; max-with: 100px;',
  },
  {
    name: 'birthDate',
    field: 'birthDate',
    label: 'Дата рождения',
    align: 'center',
    style: 'font-size: 1rem; min-with: 100px; max-with: 100px;',
    headerStyle: 'font-size: 1rem; font-weight: 700; min-with: 100px; max-with: 100px;',
  },
  {
    name: 'description',
    field: 'description',
    label: 'Описание',
    align: 'center',
    style: 'font-size: 1rem; min-with: 200px; max-with: 200px;',
    headerStyle: 'font-size: 1rem; font-weight: 700; min-with: 200px; max-with: 200px;',
  },

]);
if (!props.hideActions) {
  columns.value.push({
      name: 'edit',
      field: 'edit',
      label: 'Редактировать',
      align: 'center',
      style: 'font-size: 1rem; width: 13%;',
      headerStyle: 'font-size: 1rem; font-weight: 700;',
    },
    {
      name: 'delete',
      field: 'delete',
      label: 'Удалить',
      align: 'center',
      style: 'font-size: 1rem; min-width: 50px;',
      headerStyle: 'font-size: 1rem; font-weight: 700;',
    },)
}

const page = ref(1);
const perPage = ref(3);

const maxPage = computed(() => Math.ceil(props.data.length / perPage.value));
const computedData = computed(() => {
  const indexOfLastPost = page.value * perPage.value;
  const indexOfFirstPost = indexOfLastPost - perPage.value;
  return props.data.slice(indexOfFirstPost, indexOfLastPost)
});

function deleteRow(id) {
  $q.dialog({
    title: 'Подтвердите действие',
    message: 'Вы уверены, что хотите удалить строку',
    ok: 'Подтвердить',
    cancel: 'Отмена',
    persistent: true
  }).onOk(_ => {
    emits('deleteRow', id)
  })
}

function editRow(id) {
  emits('editRow', id)
}
</script>

<style scoped>

</style>
