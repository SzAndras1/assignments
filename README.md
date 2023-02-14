## Table of contents
### [HTML követelmények](#htmlkov)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[div, span, p, címsorok](#div)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Képek](#kep)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Táblázat](#tabla)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Linkek, menü kialakítása](#linkek)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Űrlap elemek](#urlap)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Számozott lista, pontozott lista](#listak)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Több darab html fájl legyen, minimum 4](#htmlek)
### [CSS követelmények](#csskov)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Style attribútumban néhány elem formázása](#styleattr)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Azonosító alapján formázás](#azonosito)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Osztály alapján formázás](#osztaly)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Táblázat formázása](#tablaformazas)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Menü kialakítása](#menu)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Háttérszín](#hatterszin)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Linkek formázása](#linkekformazasa)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Űrlap elemek, gombok formázása](#urlapformazas)
### [Javascript követelmények](#javasckov)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Form ellenőrzés, elemek kiválasztása html tag, osztály, azonosító alapján](#formjs)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Animáció](#animacio)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Új html elem készítés](#ujelem)

## HTML követelmények <a name="htmlkov"></a>
### div, span, p, címsorok <a name="div"></a>
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
### Képek <a name="kep"></a>
Ha változtatjuk a böngészőablak méretét, akkor aszerint fognak illeszkedni a képek. A képek alján rövid aláírások találhatóak.
```html
<div class="responsive">
    <div class="gallery">
        <img src="pictures/1676311185890.jpeg" alt="Cats" width="600" height="400">
        <div class="desc">With my former cat</div>
    </div>
</div>
```
### Táblázat <a name="tabla"></a>
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
```
### Linkek <a name="linkek"></a>
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
### Űrlap elemek <a name="urlap"></a>
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
### Számozott lista, pontozott lista <a name="listak"></a>
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
### Több darab html fájl legyen, minimum 4 <a name="htmlek"></a>
![Picture1](/markdown_folder/htmlfiles.png "picture1")
## CSS követelmények <a name="csskov"></a>
### Style attribútumban néhány elem formázása <a name="styleattr">
```html
<div id="initial" style="height:500px">
```
### Azonosító alapján formázás <a name="azonosito"></a>
```css
#navmenu {
	list-style-type: none;
	margin: 0;
	padding: 0;
	overflow: hidden;
	background-color: #333;
}
```
### Osztály alapján formázás <a name="osztaly"></a>
```css
.mystyle {
    letter-spacing: 2px;
    color: #ff0000;
    margin-top: 2%;
}
```
### Táblázat formázás <a name="tablaformazas"></a>
```css
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
### Menü kialakítása <a name="menu"></a>
```css
#navmenu {
	list-style-type: none;
	margin: 0;
	padding: 0;
	overflow: hidden;
	background-color: #333;
}

#navmenu li {
	float: left;
}
```
### Háttérszín <a name="hatterszin"></a>
```css
body{
	background: #f8f7f7;
	font: 1.2em "Fira Sans", sans-serif;
}
```
### Linkek formázása <a name="linkekformazasa"></a>
```css
li a {
	display: block;
	color: white;
	text-align: center;
	padding: 14px 16px;
	text-decoration: none;
}

li a:hover {
	background-color: #111;
}
```
### Űrlap elemek, gombok formázása <a name="urlapformazas"></a>
```css
input[type=text],
select {
    width: 150px;
    padding: 3px 5px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
.resetButton {
	background-color:#ffffff;
	border-radius:5px;
	border:1px solid #000000;
	display:inline-block;
	cursor:pointer;
	color:#000000;
	padding:8px 40px;
	margin-bottom: 10px;
	text-decoration:none;
}
```
## Javascript, JQuery követelmények <a name="javasckov"></a>
### Form ellenőrzés, elemek kiválasztása html tag, osztály, azonosító alapján <a name="formjs"></a>
Az űrlapokat összegyűjtöm a form változóba és létrehozok egy boolean változót, ami alapján végzi el az űrlapot
```javascript
function validateForm() {
    let form = document.forms[0]
    let flag = true
```
Ha hibás az űrlap, akkor hibaüzeneteket hozok létre. Mielőtt lefutna a `validateForm()` függvény, törlöm a hibaüzeneteket.
```javascript
function deleteError(){
    const errors = document.getElementsByClassName("mystyle")
    const errorFrame = document.getElementsByClassName("errorFrame")
    let errorLength = errors.length - 1
    while (errorLength >= 0) {
        errors[errorLength].remove()
        errorLength--
    }

    let errorFrameLength = errorFrame.length -1
    while(errorFrameLength >= 0){
        errorFrame[errorFrameLength].className = "default"
        errorFrameLength--
    }
}
```
Radio kivételével az összes elem validálása
```javascript
    for (let i = 0; i < form.length - 1; i++) {
        let input = form.elements[i]
        if (input.id == "checkbox") {
            if (check(input)) {
                flag = false
                insertAfter(input, 0)
            }
        }
        else if (input.id == "date") {
            if (input.value < "2022-01-01" || input.value > "2023-12-31") {
                flag = false
                insertAfter(input, 1)
            }
        }
        else if (input.value.length <= 2) {
            flag = false
            if (input.id == "selection")
                insertAfter(input, 2)
            else
                unsertAfter(input, 3)
        }
    }
```
Checkbox-nál a validáló függvény
```javascript
function check(obj) {
    if (!obj.checked)
        return true
}
```
Radio validálás
```javascript
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
```
Hibaüzenet beszúrása, mystyle és errorframe class hozzáadás, hogy változzon a kinézet.
```javascript
function insertAfter(referenceNode, errorCode) {
    let newNode = document.createElement("p")
    newNode.className = "mystyle"
    document.ns
    switch (errorCode) {
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
    let everyInput = document.getElementsByTagName("input")
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    if(newNode.previousSibling.type === "radio"){
        let radios = document.getElementsByName("radio");
        for(let i = 0;i<radios.length;i++)
            radios[i].className = "errorFrame"
    }
    else
        newNode.previousSibling.className = "errorFrame"
}
```
### Animáció
```javascript
$('#mybutton').click(function () {
    $("#picture").animate({
        height: '+=60px',
        width: '+=150px'
    });
    $("#picture").animate({ height: "toggle" });
    $("#picture").animate({ left: 300 });
    $("#picture").animate({ height: "toggle" }, 500);
    $("#picture").animate({ borderWidth: "5px" });
    $("#picture").animate({ left: 0 });
    $("#picture").animate({
        height: '-=60px',
        width: '-=150px'
    });
    $("#picture").animate({ borderWidth: "0px" });
});
```

### Új html elem készítés <a name="ujelem"></a>
```javascript
function addNewElement(text,type) {
    let par = document.createElement(type)
    par.innerHTML = text
    document.getElementById("first").append(par)
}
```