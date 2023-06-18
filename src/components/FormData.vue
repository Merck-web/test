<template>
  <q-form
    class="row justify-center"
    ref="formRef"
    greedy
  >

    <q-card class="col-lg-4 col-md-4 col-sm-6 col-12 q-ma-sm">
      <q-card-section>
        <RowTextWithLabel
          left-part="Введите имя"
          custom-right-part
          required
          vertical
        >
          <template v-slot:right>
            <q-input
              ref="firstNameRef"
              :model-value="props.data.firstName"
              label="Имя"
              flat
              :rules="props.rules.firstName"
              @update:model-value="val => $emit('updateField', val, 'firstName')"
            />
          </template>
        </RowTextWithLabel>
      </q-card-section>
    </q-card>

    <q-card class="col-lg-4 col-md-4 col-sm-6 col-12 q-ma-sm">
      <q-card-section>
        <RowTextWithLabel
          left-part="Введите фамилию"
          custom-right-part
          required
          vertical
        >
          <template v-slot:right>
            <q-input
              ref="lastNameRef"
              :model-value="props.data.lastName"
              label="Фамилия"
              flat
              :rules="props.rules.lastName"
              @update:model-value="val => $emit('updateField', val, 'lastName')"
            />
          </template>
        </RowTextWithLabel>
      </q-card-section>
    </q-card>

    <q-card class="col-lg-4 col-md-4 col-sm-6 col-12 q-ma-sm">
      <q-card-section>
        <RowTextWithLabel
          left-part="Введите отчество"
          custom-right-part
          vertical
        >
          <template v-slot:right>
            <q-input
              :model-value="props.data.middleName"
              label="Отчество"
              flat
              @update:model-value="val => $emit('updateField', val, 'middleName')"
            />
          </template>
        </RowTextWithLabel>
      </q-card-section>
    </q-card>

    <q-card class="col-lg-4 col-md-4 col-sm-6 col-12 q-ma-sm">
      <q-card-section>
        <RowTextWithLabel
          left-part="Введите дату рождения"
          custom-right-part
          vertical
        >
          <template v-slot:right>
            <q-input
              ref="inputRef"
              v-model="props.data.birthDate"
              label="Дата рождения"
              mask="##.##.####"
              :rules="rulesDate"
              @update:model-value="val => $emit('updateField', val, 'birthDate')"
            >
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  name="event"
                >
                  <q-popup-proxy
                    ref="datePopup"
                    transition-hide="scale"
                    transition-show="scale"
                  >
                    <q-date
                      v-model="props.data.birthDate"
                      mask="DD.MM.YYYY"
                      :locale="locale"
                      :options="blockDates"
                      minimal
                      @update:model-value="datePopup.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </template>
        </RowTextWithLabel>
      </q-card-section>
    </q-card>

    <q-card class="col-lg-4 col-md-4 col-sm-6 col-12 q-ma-sm">
      <q-card-section>
        <RowTextWithLabel
          left-part="Введите описание"
          custom-right-part
          vertical
        >
          <template v-slot:right>
            <q-input
              :model-value="props.data.description"
              label="Описание"
              maxlength="100"
              flat
              autogrow
              counter
              @update:model-value="val => $emit('updateField', val, 'description')"
            />
          </template>
        </RowTextWithLabel>
      </q-card-section>
    </q-card>

  </q-form>
</template>

<script setup>
import RowTextWithLabel from "components/RowTextWithLabel";
import {computed, ref} from 'vue';

const datePopup = ref(null);
const formRef = ref(null);
const firstNameRef = ref(null);
const lastNameRef = ref(null);

const emits = defineEmits(['updateField']);

defineExpose({
  validate,
  resetValidate
})

const locale = {
  days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье'.split('_'),
  daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
  months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
  monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_')
}

const props = defineProps({
  data:  { type: Object, default: {} },
  rules: { type: Object, default: {} }
})
const rulesDate = computed(_ => {
  return [
    value => value ? (/\d{2}.\d{2}.\d{4}/.test(value) || 'Укажите корректную дату') : true,
    value => value ? (!isNaN(Date.parse(value.split('.').reverse().join('-'))) || 'Укажите корректную дату') : true,
    value => value ? (+value.split(".")[2] >= (+(new Date().getFullYear()) - 100) && +value.split(".")[2] <= (+(new Date().getFullYear()) + 100) || 'Укажите корректную дату') : true,
  ]
})
function blockDates(date) {
  const dateNow = new Date().getFullYear();
  return Math.abs(dateNow - new Date(date).getFullYear()) <= 100
}

function validate() {
  return formRef.value.validate();
}

async function resetValidate() {
  await new Promise(v => setTimeout(v, 0));
  firstNameRef.value.resetValidation();
  lastNameRef.value.resetValidation();
}

</script>

