## Assignments

### link to artificial-intelligence branch: https://github.com/SzAndras1/assignments/tree/artificial-intelligence

### link to web-technologies-1 branch: https://github.com/SzAndras1/assignments/tree/web-technologies-1

### link to graphics branch: https://github.com/SzAndras1/assignments/tree/graphics

# Semesterproject - Önéletrajzok

### Start

1. run mongodb if it is not running automatically
2. `cd .\backend\bin`
3. `npm i`
4. `npm start`
5. `cd ..`
6. `cd .\frontend\`
7. `npm i`
8. `ng serve`

### MongoDB stuck

Mongodb URI bezavarhat a db-operations.js-ben, ezért `localhost:27017` vagy `0.0.0.0:27017`-ra kell állítani,
ha `node.js` nem válaszol.

### Regisztrálás
[Registerwrong](md-pictures/registerwrong.png "registerwrong")
### Bejelentkezés

### Listázás

### Önéletrajz részletei

### canMatchGuard

canMatchGuard függvény biztosítja a routing-nál, hogy csak akkor legyen elérhető a `resume-list` és
a `resume-details` komponensek, ha be vagyunk jelentkezve. Ez Guard a `user-service`-ben található `subjectIsLoggedIn`
`BehaviorSubject` értékét figyeli.
