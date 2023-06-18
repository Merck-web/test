import { boot } from 'quasar/wrappers';
import {RouterPages} from "src/scripts/scripts";
import formating_date from "src/scripts/formating_date";

export default boot(async ({ app, router }) => {
  app.config.globalProperties.$routerPages = RouterPages;
  app.config.globalProperties.$formattingDate = formating_date;
});
