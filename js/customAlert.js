/**
 * customAlerts.js
 * Author: Philippe Assis
 * Doc and repo: https://github.com/PhilippeAssis/custom-alert
 *
 * Alert e confirm personalizados.
 * FF, Chromer, IE(>=9)*
 *
 *                              ATENÇÂO
 * window.customAlert e window.customConfirm devem permanecer com esses nomes,
 * a não ser que você saiba o que esta fazendo.
 */
var customKit = {
    createDiv: function (attr, name, parent) {
        var div = document.createElement("div");
        div.setAttribute(attr, name);
        if (parent) {
            var parent = document.getElementById(parent)
            parent.appendChild(div);
            return;
        }

        document.body.appendChild(div);
    },
    mergeObjects: function (obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    }
};

function customAlert(options) {

    this.defaultOptions = {
        'ok': 'OK',
        'title': 'Alert!'
    };

    if (options)
        this.defaultOptions = customKit.mergeObjects(this.defaultOptions, options);

    this.options = this.defaultOptions;

    if (document.getElementById("customAlert") == null) {
        customKit.createDiv("id", "customAlert-overlay");
        customKit.createDiv("id", "customAlert");
        customKit.createDiv("class", "header", "customAlert");
        customKit.createDiv("class", "body", "customAlert");
        customKit.createDiv("class", "footer", "customAlert");

        //Os nomes podem ser alterados, window.alert e window.Alert, ao seu gosto!
        window.alert = window.Alert = function (dialog, options) {
            if (options)
                window.customAlert.options = customKit.mergeObjects(window.customAlert.options, options);
            window.customAlert.render(dialog);
        };
    }

    this.render = function (dialog) {
        alertBox = document.getElementById("customAlert");
        alertBox.getElementsByClassName("header")[0].innerHTML = this.options.title;
        alertBox.getElementsByClassName("body")[0].innerHTML = dialog;
        alertBox.getElementsByClassName("footer")[0].innerHTML = "<button onclick=\"window.customAlert.ok()\">" + this.options.ok + "</button>";
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
        document.getElementById("customAlert-overlay").style.display = "block";
        alertBox.style.display = "block";
    };

    this.ok = function () {
        document.getElementById("customAlert").style.display = "none";
        document.getElementById("customAlert-overlay").style.display = "none";
        document.getElementsByTagName("html")[0].style.overflow = "auto";
        this.options = this.defaultOptions;
    }
}

function customConfirm(options) {

    this.defaultOptions = {
        'yes': 'YES',
        'no': 'NO',
        'title': 'Confirm it:',
        'return': false
    };

    if (options)
        this.defaultOptions = customKit.mergeObjects(this.defaultOptions, options);

    this.options = this.defaultOptions;

    if (document.getElementById("customConfirm") == null) {
        customKit.createDiv("id", "customConfirm-overlay");
        customKit.createDiv("id", "customConfirm");
        customKit.createDiv("class", "header", "customConfirm");
        customKit.createDiv("class", "body", "customConfirm");
        customKit.createDiv("class", "footer", "customConfirm");

        //Os nomes podem ser alterados, window.confirm e window.Confirm, ao seu gosto!
        window.confirm = window.Confirm = function (dialog, callback, options) {
            if (options)
                window.customConfirm.options = customKit.mergeObjects(window.customConfirm.options, options);
            window.customConfirm.render(dialog, callback);
        };
    }

    this.callback = function (data) {
        if (data != undefined) console.log(data)
    };

    this.render = function (dialog, callback) {
        this.callback = callback;
        confirmBox = document.getElementById("customConfirm");
        confirmBox.getElementsByClassName("header")[0].innerHTML = this.options.title;
        confirmBox.getElementsByClassName("body")[0].innerHTML = dialog;
        confirmBox.getElementsByClassName("footer")[0].innerHTML = "<button class=\"confirm\" onclick=\"window.customConfirm.ok()\">" + (this.options.yes) + "</button><button class=\"cancel\" onclick=\"window.customConfirm.cancel()\">" + (this.options.no) + "</button>";
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
        document.getElementById("customConfirm-overlay").style.display = "block";
        confirmBox.style.display = "block";
    };

    this.ok = function () {
        this.end();
        if (this.options.return) {
            this.clear();
            this.callback(true);
            return;
        }

        this.clear();
        this.callback();
    }

    this.cancel = function () {
        this.end();
        if (this.options.return) {
            this.clear();
            this.callback(false);
            return;
        }
        this.clear();
    }

    this.end = function () {
        document.getElementById("customConfirm").style.display = "none";
        document.getElementById("customConfirm-overlay").style.display = "none";
        document.getElementsByTagName("html")[0].style.overflow = "auto";
    }

    this.clear = function () {
        this.options = this.defaultOptions;
    }
}

/*
 * window.customAlert e window.customConfirm devem permanecer com esses nomes, a não se que vc saiba o que esta fazendo.
 * Vocẽ pode adicionar configuraçãos na declaração de ambos, ex: new customConfirm({execute:false});
 * */
window.customAlert = new customAlert({title: ''});

window.customConfirm = new customConfirm({title: ''});