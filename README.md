## Dokumentálás
## Követelmények
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[div, span, p, címsorok](#div,-span,-p,-címsorok)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Képek](#Képek)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Táblázat](#Táblázat)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Linkek, menü kialakítása](#Linkek,-menü-kialakítása)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Űrlap elemek](#Űrlap-elemek)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Számozott lista, pontozott lista](#Számozott-lista,-pontozott-lista)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Több darab html fájl legyen, minimum 4](#Több-darab-html-fájl-legyen,-minimum-4)
### div, span, p, címsorok
```html
<div id="header" class="header">
    <h2>Cat page title</h2>
</div>
```
```html
<h2>New element creation with <span class="stroke">Javascript</span> :<h2>
```
```html
<p class="textblock">This rather... </p>
```
### Képek
Ha változtatjuk a böngészőablak méretét, akkor aszerint fognak illeszkedni a képek. A képek alján rövid aláírások találhatóak.
```html
<div class="responsive">
    <div class="gallery">
        <img src="pictures/1676311185890.jpeg" alt="Cats" width="600" height="400">
        <div class="desc">With my former cat</div>
    </div>
</div>
```
### Táblázat
```html
<table class="customTable">
    <thead>
        <tr>
            <th class="stroke">Header 1</th>
            <th class="stroke">Header 2</th>
            <th class="stroke">Header 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Row 1</td>
            <td>Row 1</td>
            <td>Row 1</td>
        </tr>
        <tr>
            <td>Row 2</td>
            <td>Row 2</td>
            <td>Row 2</td>
        </tr>
        <tr>
            <td>Row 3</td>
            <td>Row 3</td>
            <td>Row 3</td>
        </tr>
        <tr>
            <td>Row 4</td>
            <td colspan="2" style="text-align: center;">Row 4</td>
        </tr>
    </tbody>
</table>
table.customTable {
    width: 31%;
    margin-left: auto;
    margin-right: auto;
    background-color: #FFFFFF;
    border-collapse: collapse;
    border-width: 5px;
    border-color: #7EA8F8;
    border-style: solid;
    color: #000000;
}

table.customTable td,
table.customTable th {
    border-width: 5px;
    border-color: #7EA8F8;
    border-style: solid;
    padding: 5px;
}

table.customTable thead {
    background-color: #7EA8F8;
}
```
### Linkek, menü kialakítása
```html
<nav>
    <ul id="navmenu">
        <li><a href="index.html">Index page</a></li>
        <li><a href="second.html">Second page</a></li>
        <li><a href="third.html">Third page</a></li>
        <li><a href="animationpage.html">Animation page</a></li>
        <li><a href="cat.html">Cat page</a></li>
    </ul>
</nav>
```
### Űrlap elemek
Egysoros, többsoros
```html
<div class="form">
    <form name="register" method="post">
        <div style="white-space:nowrap">
            <label for="firstname"><b>First name:</b></label>
            <input type="text" id="firstname">
        </div>
        <div style="white-space:nowrap">
            <label for="textarea"><b>Textarea:</b></label>
            <textarea id="textarea" style="resize:vertical;" cols="17" rows="2"></textarea>
        </div>
        <div style="white-space:nowrap">
            <label for="checkbox"><b>Checkbox:</b></label>
            <input type="checkbox" id="checkbox">
        </div>
        <div style="white-space:nowrap">
            <label for="selection"><b>Selection:</b></label>
            <select name="selection" id="selection">
                <option value="" selected disabled>---</option>
                <optgroup label="Ones">
                    <option value="one">One</option>
                </optgroup>
                <optgroup label="Twos">
                    <option value="two">Two</option>
                </optgroup>
            </select>
        </div>
        <div style="white-space:nowrap">
            <label class="radio" for="radio_one"><b>First</b></label>
            <input type="radio" id="radio_one" name="radio" value="first">
            <label class="radio" for="radio_two"><b>Second</b></label>
            <input type="radio" id="radio_two" name="radio" value="second">
            <label class="radio" for="radio_three"><b>Third</b></label>
            <input type="radio" id="radio_three" name="radio" value="third">
        </div>

        <div style="white-space:nowrap">
            <label for="date"><b>Date:</b></label>
            <input type="date" id="date">
        </div>

        <div style="white-space:nowrap">
            <label for="color" class="dateLabel"><b>Color palette:</b></label>
            <input type="color" style="cursor: pointer;">
        </div>

        <div style="white-space:nowrap">
            <input class="submitButton" type="submit" onclick="validateForm()" value="Submit">
        </div>

        <div style="white-space:nowrap">
            <button class="resetButton" type="reset" onclick="deleteError()">Reset</button>
        </div>
    </form>
</div>
```
### Számozott lista, pontozott lista
```html
<input type="text" id="input">
<button id="submit" onclick="addItem('ol')">Add</button>
<ol id="ol">
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ol>
```
Paraméterként megadom, hogy `ul` vagy `ol` típusú a lista. 
```javascript
function addItem(listType) {
    if (listType === "ol")
        list = document.getElementById("ol")
    else
        list = document.getElementById("ul")
```
Kitörlöm az hibaüzeneteket úgy, hogy előre megadtam az üzeneteknek mystyle class nevet így kigyűjtöm őket és kitörlöm őket egyesével.
```javascript
    const errors = document.getElementsByClassName("mystyle")
    let errorLength = errors.length - 1
    while (errorLength >= 0) {
        errors[errorLength].remove()
        errorLength--
    }
```
Új listaelemet hozok létre, aminek a text node-ja az input értéke lesz. Ha esetleg már létezik a listában az érték vagy üreselem, akkor nem illesztem be.
```javascript
    const newItemElement = document.createElement("li")
    if (!restrictions())
        return
    newItemElement.innerHTML = input.value
    list.append(newItemElement)
```
Elsőnek megnézem, hogy az input értéke nem üres vagy csak whitespace-k. Utána megnézem, hogy előfordult már e az érték a listában.
```javascript
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
```
Validáló gomb után beillesztem a hibaüzenetet
```javascript
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
```
### Több darab html fájl legyen, minimum 4
![Picture1](/markdown_folder/htmlfiles.png "picture1")
## css követelmények
### style attribútumban néhány elem formázása
```
