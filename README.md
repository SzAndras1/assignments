## Computer Graphics

## Koncepció
A jelentben szerepel egy hajórakodó, egy kapu és egy kisebb tó. 
A hajórakodónak van egy indítópanelja, ami a `Q` billentyű 
lenyomására elindítja a hajórakodót és az indítópanelt. 
Az animáció elindul és a kamera egy magaslatba kerül.
Követi a kamera az animációt. `Q` lenyomása esetén megáll az
animáció és visszatér az animáció előtti állapotba a kamera.
Ha az animáció eléri a tervezett véget, akkor is ez történik.
Ezután ha megint lenyomjuk a `Q` betűt, akkor visszafele megy az
animáció és a kamera is.

A kaput megközelítve átteleportál egy alternatív világba. Itt egy
híresebb videójáték kezdőjelentét próbáltam ábrázolni.
Két transzparens textúra szerepel a programban. Az egyik a tó,
a másik az alternatív világban egy szöveg. Emellett köd ábrázolást
is sikerült implementálni az alternatív világban.

`R` billentyű jelenlegi koordinátákat ír ki, objektumok pontos
elhelyezésénél használtam. Jelenleg nem ír ki semmit, üres a függvény.

Az összes objektumot én csináltam Blender-ben.
## Irányítás
| Billentyű |               Cselekvés               |
|:---------:|:-------------------------------------:|
|     W     |                 Előre                 |
|     A     |                 Balra                 |
|     S     |                 Hátra                 |
|     D     |                Jobbra                 |
|     Q     |   Rakodó<br/>elindítása/leállítása    |
|     E     |       Rakodó<br/>manuális nézet       |
|     F     |      Rakodó<br/>előre irányítása      |
|     G     |      Rakodó<br/>hátra irányítása      |
|     R     | Konzolra kiíratás<br/> az app adatait |
|   Shift   |                Felfele                |
|   Space   |                Lefele                 |
|     1     |          Fényerő csökkentés           |
|     2     |            Fényerő növelés            |



