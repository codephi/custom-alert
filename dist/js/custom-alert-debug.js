/**
 * customalerts.js
 * Author: Philippe Assis
 * Doc and repo: https://github.com/PhilippeAssis/custom-alert
 *
 * Alert e confirm personalizados.
 * FF, Chromer, IE(>=9)*
 *
 *                              ATENÇÂO
 * window.customalert e window.customconfirm devem permanecer com esses nomes,
 * a não ser que você saiba o que esta fazendo.
 */



function customAlert(inGlobalVar) {

    var mergeObjects = function(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    }

    var createDom = function(type) {
        this.el = document.createElement(type);

        this.attr = function(attr) {
            var $this = this;

            for (var key in attr) {
                $this.el.setAttribute(key, attr[key]);
            }

            return $this;
        }

        this.parent = function(parent, wrap) {
            wrap = (wrap) ? document.querySelector(wrap) : document;
            console.log(this.el)
            parent = wrap.querySelector(parent)
            parent.appendChild(this.el);
            return this;
        }


        this.html = function(html) {
            this.el.innerHTML = html
            return this;
        }

        return this;
    }

    function Alert(options) {
        this.defaultOptions = {
            'button': 'OK',
            'title': 'Alert!'
        };

        if (options) {
            this.defaultOptions = mergeObjects(this.defaultOptions, options);
        }

        this.options = this.defaultOptions;

        this.render = function(dialog, options) {
            var alertBox = document.querySelector("#customalert");
            alertBox.querySelector(".header").innerHTML = options.title;
            alertBox.querySelector(".body").innerHTML = dialog;
            alertBox.querySelector(".button-done").innerHTML = options.button;
            document.querySelector("html").style.overflow = "hidden";
            document.querySelector("#customalert-overlay").style.display = "block";
            alertBox.style.display = "block";
        };

        this.done = function() {
            document.querySelector("#customalert").style.display = null;
            document.querySelector("#customalert-overlay").style.display = null;
            document.querySelector("html").style.overflow = "auto";

            if (typeof this.callback == 'function') {
                this.callback.call()
            }
        }
    }

    function Confirm(options) {
        this.defaultOptions = {
            "buttons": {
                "done": "OK",
                "cancel": "cancel"
            },
            'title': 'Confirm it:'
        };

        if (options) {
            this.defaultOptions = mergeObjects(this.defaultOptions, options);
        }

        this.options = this.defaultOptions;

        this.callback = function(data) {};

        this.render = function(dialog, options) {
            var confirmBox = document.querySelector("#customconfirm");
            confirmBox.querySelector(".header").innerHTML = this.options.title;
            confirmBox.querySelector(".body").innerHTML = dialog;
            confirmBox.querySelector(".button-done").innerHTML = options.buttons.done;
            confirmBox.querySelector(".button-cancel").innerHTML = options.buttons.cancel;
            document.querySelector("html").style.overflow = "hidden";
            document.querySelector("#customconfirm-overlay").style.display = "block";
            confirmBox.style.display = "block";
        };

        this.done = function() {
            this.end();

            if (this.callbackSuccess) {
                return this.callbackSuccess();
            }

            this.callback(true);
        }

        this.cancel = function() {
            this.end();

            if (this.callbackCancel) {
                return this.callbackCancel();
            }

            this.callback(false);
        }

        this.end = function() {
            document.querySelector("#customconfirm").style.display = "none";
            document.querySelector("#customconfirm-overlay").style.display = "none";
            document.querySelector("html").style.overflow = "auto";
        }
    }


    window.customalert = new Alert();

    window.customconfirm = new Confirm();
    
    var cAlert, cConfirm;

    if (document.getElementById("customalert") == null) {
        createDom('div').attr({
            "id": "customalert-overlay",
            "class": "customalert-overlay"
        }).parent("body")

        createDom('div').attr({
            "id": "customalert",
            "class": "customalert customalert-alert"
        }).parent("body")

        createDom("div").attr({
            "class": "header"
        }).parent("#customalert");

        createDom("div").attr({
            "class": "body"
        }).parent("#customalert");

        createDom("div").attr({
            "class": "footer"
        }).parent("#customalert");

        createDom("button").attr({
            "class": "btn btn-primary custom-alert button-done",
            "onclick": "window.customalert.done()"
        }).parent(".footer", "#customalert");


        window.addEventListener('keydown', function(e) {
            var keynum;

            keynum = e.keyCode ? e.keyCode : e.which;

            if (keynum == 13) {
                if (document.getElementById("customconfirm").style.display == "block")
                    window.customconfirm.done();
                else if (document.getElementById("customalert").style.display == "block")
                    window.customalert.done();
            }
            else if (keynum == 27 && document.getElementById("customconfirm").style.display == "block")
                window.customconfirm.cancel();

        }, false);



        cAlert = window.Alert = function(dialog, options, callback) {
            if (typeof options == 'function') {
                window.customalert.callback = options;
                options = window.customalert.options;
            }
            else {
                window.customalert.callback = callback || null;
                options = mergeObjects(window.customalert.options, options);
            }

            window.customalert.render(dialog, options);
        };
    }

    if (document.getElementById("customconfirm") == null) {
        createDom('div').attr({
            "id": "customconfirm-overlay",
            "class": "customalert-overlay"
        }).parent("body")

        createDom('div').attr({
            "id": "customconfirm",
            "class": "customalert customalert-confirm"
        }).parent("body")

        createDom('div').attr({
            "class": "header",
        }).parent("#customconfirm")

        createDom('div').attr({
            "class": "body",
        }).parent("#customconfirm")

        createDom('div').attr({
            "class": "footer",
        }).parent("#customconfirm")

        createDom('button').attr({
            "class": "btn btn-success custom-alert button-done",
            "onclick": "window.customconfirm.done()"
        }).parent(".footer", "#customconfirm")

        createDom('button').attr({
            "class": "btn btn-danger button-cancel",
            "onclick": "window.customconfirm.cancel()"
        }).parent(".footer", "#customconfirm")

        cConfirm = window.Confirm = function(dialog, callback, options) {
            if (!options) {
                options = window.customconfirm.options;
            }

            if (typeof callback == 'object') {
                window.customconfirm.callbackSuccess = callback.success;
                window.customconfirm.callbackCancel = callback.cancel;
            }
            else {
                window.customconfirm.callback = callback;
            }

            window.customconfirm.render(dialog, options);
        };

    }
    
    
    if(inGlobalVar === false){
        return {
            "alert" : cAlert,
            "confirm" : cConfirm
        }
    }
    else{
        window.alert = cAlert
        window.confirm = cConfirm
    }
}
