"use strict";

const messagesFromHost = {
    HTTP_OK : 200,
    XHR_READY : 4
};

/**
 * Класс для запросов на сервер
 */
export default class RequestToHost {

    /**
	 * Возвращает url backend сервера
     * @returns {string}
     */
    static baseUrl() {
        return  "https://brainrider.herokuapp.com/";
        // return  "http://localhost:5555/";
    }

    /**
	 * POST-запрос на сервер
     * @param {string} address
     * @param {string} user
     * @param callback
     */
    static requestPost(address, user, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", this.baseUrl() + address, true);
        xhr.withCredentials = true; //for cookies

        const body = JSON.stringify(user);

        xhr.setRequestHeader("Content-Type", "application/json; charset=utf8");

        xhr.send(body);

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== messagesFromHost.XHR_READY) {
                return;
            }
            if (+xhr.status !== messagesFromHost.HTTP_OK) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };
    }

    /**
	 * GET-запрос на сервер
     * @param {string} address - string with url
     * @param callback
     */
    static requestGet(address, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", this.baseUrl() + address, true);
        xhr.withCredentials = true;

        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== messagesFromHost.XHR_READY) {
                return;
            }
            if (+xhr.status !== messagesFromHost.HTTP_OK) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };
    }


    /**
	 * Запрашивает данные, полученные с Raspberry Pi3
     * @param callback
     */
    static data(callback) {
        RequestToHost.requestGet("datareader", callback);
    }
}
