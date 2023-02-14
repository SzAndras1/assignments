## Dokumentálás
## Követelmények
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Számozott lista, pontozott lista](#Számozott-lista,-pontozott-lista)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Képek](#Képek)
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Linkek, menü kialakítása](#Linkek,-menü-kialakítása)
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
### Képek
Ha változtatjuk a böngészőablak méretét, akkor aszerint fognak illeszkedni a képek. A képek alján rövid aláírások találhatóak.
```html
<div class="responsive">
    <div class="gallery">
            <img src="pictures/1676311185890.jpeg" alt="Cats" width="600" height="400">
            </a>
            <div class="desc">With my former cat</div>
        </div>
    </div>
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
