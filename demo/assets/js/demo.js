new customAlert();

function demo1() {
    alert("Hello!", {
        "title": "Demo Alert",
        "button": "Go!"
    }, function() {
        confirm("Ok?", function(done) {
            if (!done) {
                confirm("No?", function(done) {
                    if (!done) {
                        alert("Cry... :/")
                    }
                    else {
                        alert("Good!")
                    }
                }, {
                    "buttons": {
                        "done": "No, no... Good!",
                        "cancel": "No."
                    }
                })
            }
            else {
                alert("Good, good!")
            }

        }, {
            "title": "Demo Confirm",
            "buttons": {
                "done": ":)",
                "cancel": ":("
            }
        })
    })
}

demo1();


document.querySelector('code').innerHTML = demo1.toString()
