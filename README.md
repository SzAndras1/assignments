## Artificial intelligence
### [Link a Vehicle Routing Problem tabu keresés algoritmussal megoldáshoz](#Vehicle-Routing-Problem-tabu-keresés-algoritmussal-megoldás)
### Link a Flowshop határidőkkel probléma szimulált hűtés algoritmussal megoldáshoz

## Vehicle Routing Problem tabu keresés algoritmussal megoldás
A feladat kiírás szerint véletlenszerűen kell kiválasztani, hogy mennyi város és futár legyen. Megjegyzés: Ha 50 vagy több város van, akkor 10 vagy 20 futár van.
```python
def init_cities_and_couriers_number():
    index = random.randint(0,5)
    ci_number = [10,20,50,100,200,500]
    cities = ci_number[index]
    couriers = 0
    co_number = [1,2,4,5]
    couriers_number_if_large_cities = [10,20]
    if(cities <= 50):
        index = random.randint(0,3)
        couriers = co_number[index]
    else:
        index = random.randint(0,1)
        couriers = couriers_number_if_large_cities[index]
    return cities, couriers
```
Város osztály, ami csak a koordinátákat tartalmazza
```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __str__(self):
        return f'(x:{self.x},y:{self.y})'
```
Futár osztály tartalmazza a futár id-ját, a listát amiben tárolni fogjuk a bejárt városok koordinátáit, alapértelmezetten az első eleme a kiinduló pont, és az össztávolságot
```python
class Courier:
    def __init__(self,id,points=0,distance=0):
        self.id = id
        self.points = [Point(456,320)]
        self.distance = distance
    def __str__(self):
        return f'id: {self.id}, points:[{self.points}]'
```
Város objektumok létrehozása
```python
def init_cities_locations(cities_number):
    points = []
    for i in range(cities_number):
        points.append(Point(random.randint(0,1000), random.randint(0,1000)))
    return points
```
Futár objektumok létrehozása
```python
def init_couriers(couriers_number):
    couriers = []
    for i in range(couriers_number):
        couriers.append(Courier(i))
    return couriers
```
#### Első megoldás:

Tabu keresés egy tweak-el (csavarral): Ha egy futár érint egy várost, akkor azt a várost töröljük abból a listából, amelyik a városokat tárolja.

Előny: Harmadik for ciklus egyre kevesebbet kell mennie, hisz csökken a városok listája. A lehető legkevesebb utat járják be a futárok.

Hátrány: Nem mindegyik futár indul el.

Első for ciklus a városok mennyiségéig megy, hisz nem akarjuk azt az esetet, hogy egy pontot egy futár többször érintse (kivétel a kiindulási pont). Második for ciklus a futárok mennyiségig megy. Harmadik for ciklus a városok mennyiségéig megy.
```python
def tabu_search(cities, couriers):
    courier_index = 0
    city_index = 0
    for i in range(len(cities)):
        min_number = 0
        for j in range(len(couriers)):
            for k in range(len(cities)):
```
last_item_of_courier_point_list: egy futárnak a jelenlegi koordinátái

distance: manhatttan távolság két pont között (abs(x1-x2) + abs(y1-y2))
```python
                last_item_of_courier_point_list = couriers[j].points[len(couriers[j].points)-1]
                distance = manhattan_distance(cities[k],last_item_of_courier_point_list)
                elif(distance < min_number):
                    min_number = distance
                    courier_index = j
                    city_index = k
```
Első az első város és a kiinduló pont közötti távolság lesz az első minimum érték
```python
                if(j == 0 and k == 0):
                    min_number = distance
                    courier_index = j
                    city_index = k
```
Utána keressük a legrövidebb távolságot
```python
                elif(distance < min_number):
                    min_number = distance
                    courier_index = j
                    city_index = k
```
Miután megvan a legrövidebb távolsághoz tartozó város indexe és a hozzátartozó futárnak az indexe, hozzáadjuk a város objektumot az adott futár érintett városok listájába. A megtett távolságot hozzáadjuk a futár megfelelő adattagjához. Végül az adott várost kitöröljük a városok listájából.
```python
        couriers[courier_index].points.append(cities[city_index])
        couriers[courier_index].distance += min_number
        cities.pop(city_index)
    return couriers
```
Hozzáadjuk a futárok érintett városok listájába a kiinduló pontot, majd kiíjra összes futár megtett távolságának összegét
```python
def sum_distance(couriers):
    sum_distance = 0
    base = Point(456,320)
    for i in couriers:
        i.distance += manhattan_distance(base,i.points[len(i.points)-1])
        i.points.append(base)
        sum_distance += i.distance
    print(f'Total distance: {sum_distance}m')
```
#### Második megoldás:

Elsőnek minden futárnak talál egy várost, utána keressük a legrövidebb távokat.

Előny: mindegyik futárnak van legalább egy városcíme
```python
def tabu_search_second_solution(cities, couriers):
    courier_index = 0
    city_index = 0
    for i in range(len(cities)):
        min_number = 10000
        for j in range(len(couriers)):
            for k in range(len(cities)):
                if(i < len(couriers)):
                    if(len(couriers[j].points) == 1):
                        last_item_of_courier_point_list = couriers[j].points[len(couriers[j].points)-1]
                        distance = manhattan_distance(cities[k],last_item_of_courier_point_list)
                        if(distance < min_number):
                            min_number = distance
                            courier_index = j
                            city_index = k
                else:
                    last_item_of_courier_point_list = couriers[j].points[len(couriers[j].points)-1]
                    distance = manhattan_distance(cities[k],last_item_of_courier_point_list)
                    if(distance < min_number):
                        min_number = distance
                        courier_index = j
                        city_index = k
        couriers[courier_index].points.append(cities[city_index])
        couriers[courier_index].distance += min_number
        cities.pop(city_index)
    return couriers

```
### Megoldás (ábrázolás)
312-es seed, 500 város, 10 futár

#### Első megoldás:

Teljes távolság: 27304m

![Result1](/result_pictures/tabusearch_312_1.png "result1")

#### Második megoldás:

Teljes távolság: 28210m

![Result2](/result_pictures/tabusearch_312_2.png "result2")

302-es seed, 200 város, 20 futár

#### Első megoldás:

![Result3](/result_pictures/tabusearch_302_1.png "result3")

Teljes távolság: 18206m

#### Második megoldás:

Teljes távolság: 22530m

![Result4](/result_pictures/tabusearch_302_2.png "result4")

500-as seed, 200 város, 20 futár

#### Első megoldás:

Teljes távolság: 12896m

![Result5](/result_pictures/tabusearch_500_1.png "result5")

#### Második megoldás:

Teljes távolság: 19548m

![Result6](/result_pictures/tabusearch_500_2.png "result6")

### Tervek

* Második megoldás algoritmusát optimalizálni
* Egy harmadik megoldás, ami a második megoldás alapját veszi, viszont csak akkor adunk egy futárhoz egy várost, ha csak eggyel több lokációja lesz, mint a többi városnak
