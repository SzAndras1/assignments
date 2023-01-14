var list
function addItem(listType) {
    // get the exact list element which will be li's elements' parent element
    if (listType === "ol")
        list = document.getElementById("ol")
    else
        list = document.getElementById("ul")

    // remove previous addItem() function call's error messages
    const errors = document.getElementsByClassName("mystyle")
    let errorLength = errors.length - 1
    while (errorLength >= 0) {
        errors[errorLength].remove()
        errorLength--
    }

    const newItemElement = document.createElement("li")
    // error occurs if the input is empty, only consists whitespaces or already listed
    if (!restrictions())
        return
    newItemElement.innerHTML = input.value
    list.append(newItemElement)
}

function restrictions() {
    const input = document.getElementById("input")
    if (input.value.length == 0 || input.value.replace(/\s/g, '') === "") {
        insertError(0)
        return false
    }

    for (let i = 0; i < list.children.length; i++) {
        if (list.children[i].textContent === input.value) {
            insertError(1)
            return false
        }
    }
    return true
}

function insertError(errorcode) {
    let newNode = document.createElement("p")
    let referenceNode = document.getElementById("submit")
    newNode.className = "mystyle"
    if (errorcode === 0)
        newNode.innerHTML = "Must be at least 1 character"
    else
        newNode.innerHTML = "This item is already included"

    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}