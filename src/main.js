import { createApp } from "vue";
import { createPinia } from "pinia";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// PrimeVue
import PrimeVue from "primevue/config";
import Carousel from "primevue/carousel";
import Button from "primevue/button";
import Breadcrumb from "primevue/breadcrumb";
import Calendar from "primevue/calendar";
import Rating from "primevue/rating";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import Steps from "primevue/steps";
import RadioButton from "primevue/radiobutton";
import MultiSelect from "primevue/multiselect";
import Slider from "primevue/slider";
import CascadeSelect from "primevue/cascadeselect";
import Card from "primevue/card";
import ScrollTop from "primevue/scrolltop";
import ScrollPanel from "primevue/scrollpanel";
import Tooltip from "primevue/tooltip";
import Fieldset from "primevue/fieldset";
import Divider from 'primevue/divider';


import App from "./App.vue";
import router from "./router";
// Primeflex
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";

import "./assets/main.css";
import { VueRestrictedInputDirective } from "vue-restricted-input";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found", // @deprecated Use 'emptySearchMessage' option instead.
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyMessage: "No available options",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
    },
  },
});
app.use(VueSweetalert2);
window.Swal =  app.config.globalProperties.$swal;
//Components
app.component("Button", Button);
app.component("Carousel", Carousel);
app.component("Breadcrumb", Breadcrumb);
app.component("Calendar", Calendar);
app.component("Rating", Rating);
app.component("InputText", InputText);
app.component("Dialog", Dialog);
app.component("Textarea", Textarea);
app.component("Steps", Steps);
app.component("RadioButton", RadioButton);
app.component("MultiSelect", MultiSelect);
app.component("Slider", Slider);
app.component("CascadeSelect", CascadeSelect);
app.component("Card", Card);
app.component("ScrollTop", ScrollTop);
app.component("ScrollPanel", ScrollPanel);
app.component("Fieldset", Fieldset);
app.component("Divider", Divider);

app.directive("mask", VueRestrictedInputDirective);
app.directive("tooltip", Tooltip);

app.mount("#app");
