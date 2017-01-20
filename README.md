#custom-alert.js
![custom-alert.js](https://raw.githubusercontent.com/PhilippeAssis/custom-alert/master/customAlert2.jpg)

Override the alert() and confirm() functions of JavaScript, allowing you to customize them. This application does not use jQuery or another framework, just JavaScript and CSS. Responsive design.

## Demo
[demo page](https://philippeassis.github.io/custom-alert)

## Install
#### NPM
```
npm install --save custom-alert
```

#### Bower
```
bower install --save custom-alert
```

### Apply

Default style
```html
<link rel="stylesheet" href="YOU/PATH/dist/css/custom-alert.css">
```

Default bootstrap style
```html
<link rel="stylesheet" href="YOU/PATH/dist/css/custom-alert-bootstrap.css"> 
```

and script
```html
<!--<script src="YOU/PATH/dist/js/custom-alert.min.js">-->
```

## Use

There are **two** ways to apply customAlert.

The first is to start the function by allowing it to automatically override the `alert()` and `confirm()` global (`window.alert`, `window.confirm`).
```javascript
    new customAlert();
    confirm("Confirm text", function(done){
        alert('Alert text')
    })
```

The second returning the functions in an object, so it passes `false` as an attribute of `customAlert()`
```javascript
    var custom = new customAlert(false);
    custom.confirm("Confirm text", function(done){
        custom.alert('Alert text')
    })
```
### alert(dialog, options || callback, callback)
Simply.
```javascript
    alert("Alert text")
```

Editing title and button text;
```javascript
    alert("Alert text", {title: 'Olá', button: "Go!"})
```

Performing a callback after the operation.
```javascript
    alert("Alert text", {title: 'Olá', button: "Go!"}, function(){
        //...
    })
```
### confirm(dialog, callback || {callbacks}, options)
Calling a callback to handle the result. In this case, the callback receives an argument with `true` or `false`
```javascript
    confirm("Alert text", function(done){
        if(done){
            alert('true')
        }
        else{
            alert('false')
        }
    })
```
Defining different callbacks for different results.
```javascript
    confirm("Comfirm text", {
        "success" : function(){
            //..
        },
        "cancel" : function(){
            //..
        }
    })
```
Setting Title and Text of Buttons.
```javascript
    confirm("Comfirm text", function(done){
        //..
    }, { 
        "title" : "Wellcome",
        "done": {
                "text": ":)",
        },
        "cancel": {
            "text" : ":(",
            "default": true
        }
    })
```

## Arguments and options

#### Alert
##### options
 - **title:**  The title.
 - **done:**  The button text.

#### Confirm
##### options
 - **title.text**  The title.
 - **title.default**  If true, set the default as default.
 - **title.bold**  Add bold text.
 - **done.text**  The done text.
 - **done.default**  If true, set the default as default.
 - **done.bold**  Add bold text.
 - **cancel:**  The cancel text.

##### callback
 - **success:**  if button done press.
 - **cancel:**  if button calcel press.
 - **only function:**  Gets an attribute with true or false.

## Keyboard events
The ENTER key performs the default button.

```javascript
{
    "cancel": {
        "default" : true
    }
}
```
In this example, the default button will be "Cancel", so by clicking ENTER on the keyboard, this button will be executed.
**By default the "default button" is done.**

I see an example on the [demo page](https://philippeassis.github.io/custom-alert)