import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUserSecret,
  faSpinner,
  faTrash,
  faPlusCircle,
  faPlay,
  faEye,
  faTimes,
  faRetweet
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUserSecret,
  faSpinner,
  faTrash,
  faPlusCircle,
  faPlay,
  faEye,
  faTimes,
  faRetweet
);
Vue.component("fa-icon", FontAwesomeIcon);
