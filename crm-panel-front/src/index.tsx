import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css";
import "nouislider/distribute/nouislider.css";
import "./styles/ace.css";
import "./styles/ace-themes.css";
import "./styles/index.css";
import "./i18n";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBatteryFull,
  faBatteryHalf,
  faBatteryQuarter,
  faBatteryEmpty,
  faBatteryThreeQuarters,
  faBell,
  faMoneyBillWave,
  faPlusCircle,
  faLink,
  faUnlink,
  faCaretSquareRight,
  faStepForward,
  faHistory,
  faGift,
  faRunning,
  faAngleDoubleUp,
  faShoppingCart,
  faArrowLeft,
  faCircle,
  faAngleRight,
  faConciergeBell,
  faUser,
  faKey,
  faTachometerAlt,
  faCartPlus,
  faTools,
  faCaretDown,
  faCheck,
  faAngleDoubleDown,
  faPowerOff,
  faEnvelope as fasEnvelope,
  faEdit,
  faCaretUp,
  faExclamationTriangle,
  faInfo,
  faMapMarker,
  faPhone,
  faAddressBook,
  faMobileAlt,
  faLock,
  faCalendarDay,
  faUserCircle,
  faUserFriends,
  faPen,
  faCogs,
  faCog,
  faPlus,
  faCloudUploadAlt,
  faTimes,
  faUpload,
  faFilter,
  faAngleUp,
  faArrowRight,
  faChevronUp,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faCommentDots,
  faEnvelopeOpen,
  faEnvelope,
  faIdCard,
} from "@fortawesome/free-regular-svg-icons";
import {
  faInstagram,
  faLinkedin,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import App from "./app";

config.autoAddCss = false;

library.add(
  faAngleDoubleUp,
  faAngleDoubleDown,
  faAngleUp,
  faArrowLeft,
  faArrowRight,
  faAngleRight,
  faBatteryFull,
  faBatteryHalf,
  faBatteryQuarter,
  faBatteryEmpty,
  faBatteryThreeQuarters,
  faBell,
  faCaretDown,
  faCaretUp,
  faCartPlus,
  faCaretSquareRight,
  faCheck,
  faChevronUp,
  faCircle,
  faClock,
  faCloudUploadAlt,
  faCog,
  faCogs,
  faCommentDots,
  faConciergeBell,
  faEdit,
  faEnvelopeOpen,
  faEnvelope,
  fasEnvelope,
  faExclamationTriangle,
  faFilter,
  faGift,
  faHistory,
  faInfo,
  faInstagram,
  faKey,
  faLink,
  faLinkedin,
  faMapMarker,
  faMoneyBillWave,
  faPen,
  faPhone,
  faPlus,
  faPlusCircle,
  faPowerOff,
  faRunning,
  faShoppingBasket,
  faShoppingCart,
  faStepForward,
  faTachometerAlt,
  faTools,
  faUser,
  faTimes,
  faTelegram,
  faUnlink,
  faMobileAlt,
  faAddressBook,
  faLock,
  faIdCard,
  faCalendarDay,
  faUpload,
  faUserCircle,
  faUserFriends
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// ReactDOM.render(<App />, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
