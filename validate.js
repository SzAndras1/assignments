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

function validateForm() {
    let x = document.forms[0]
    let flag = true
    for (let i = 0; i < x.length - 1; i++) {
        if (x.elements[i].id == "checkbox") {
            if (check(x.elements[i]))
                flag = false
        }
        else if (x.elements[i].value.length <= 2)
            flag = false
    }
    if (flag == true)
        alert("Valid form!")
    else
        event.preventDefault()
    //TODO: give details about error
}

function check(obj) {
    if (!obj.checked)
        return true
}