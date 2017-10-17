"use strict";

import DataPage from "./../views/data-page/DataPage.js";
import Debugger from "./Debugger.js";
import "./../styles/main.css";

class MainApp {

    constructor () {
        Debugger.print("Application was created");
        new DataPage();
    }
}

window.addEventListener("load", function () {
    new MainApp();
});
