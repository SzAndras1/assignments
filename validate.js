function addNewElement(text) {
    let par = document.createElement("p")
    par.innerHTML = text
    document.getElementById("first").append(par)
}

function addNewDiv(text) {
    let par = document.createElement("div")
    par.innerHTML = text
    document.getElementById("second").append(par)
}

var a = 0
function validateForm() {
    // Gets every form element
    let form = document.forms[0]
    // if it stays true then the form is valid
    let flag = true

    // remove previous validateForm() function call's error messages
    const errors = document.getElementsByClassName("mystyle")
    let errorLength = errors.length - 1
    while (errorLength >= 0) {
        errors[errorLength].remove()
        errorLength--
    }

    // check every form element except radio (form.length - 1 because of the submit button)
    for (let i = 0; i < form.length - 1; i++) {
        let input = form.elements[i]
        if (input.id == "checkbox") {
            if (check(input)) {
                flag = false
                // insert error message
                insertAfter(input, 0)
            }
        }
        else if (input.id == "date") {
            if (input.value < "2022-01-01" || input.value > "2023-12-31") {
                flag = false
                insertAfter(input, 1)
            }
        }
        // text, textarea, select
        else if (input.value.length <= 2) {
            flag = false
            if (input.id == "selection")
                insertAfter(input, 2)
            else
                insertAfter(input, 3)
        }
    }

    // radio check
    let radios = document.getElementsByName("radio");
    let radio_decider = 0
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked)
            radio_decider += 1
    }
    if (radio_decider == 0) {
        flag = false
        insertAfter(radios[radios.length - 1], 2)
    }

    // after checking every input, following code decides that it will interrupt or accept the form
    if (flag) {
        alert("Valid form!")
    }
    else
        event.preventDefault()
}

// check checkbox status
function check(obj) {
    if (!obj.checked)
        return true
}

// inserting error message
function insertAfter(referenceNode, errorcode) {
    let newNode = document.createElement("p")
    newNode.className = "mystyle"
    switch (errorcode) {
        case (0):
            newNode.innerHTML = "Must be checked"
            break
        case (1):
            newNode.innerHTML = "Must be between 2022-01-01 and 2023-12-31"
            break
        case (2):
            newNode.innerHTML = "One must be selected"
            break
        case (3):
            newNode.innerHTML = "Must be at least 3 characters"
            break
    }
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}