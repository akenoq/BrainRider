"use strict";

import RequestToHost from "../../script/RequestToHost.js";

export default class DataPage {

    constructor() {
        this.sendRequestForData();
    }

    static pagePath() {
        return "/data";
    }

    static renderLeaderBoard(resp) {
        document.querySelector(".data-page__table").innerHTML = "";
        let template = require("./data-page.pug");
        let locals = resp;
        document.querySelector(".data-page__table").innerHTML = template(locals);
    }

    sendRequestForData() {
        RequestToHost.data((err, resp) => {
            if (err) {
                return alert("No data from Raspberry Pi3");
            }
            DataPage.renderLeaderBoard(resp);
        });
    }

    addEventsOnButtons() {
        document.querySelector(".main-menu__button-data").addEventListener("click", () => {
            this.sendRequestForData();
        });
    }
}
