import random
import matplotlib.pyplot as plt

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.distance = 0
    def __str__(self):
        return f'x:{self.x},y:{self.y}'

def plot_points(x,y):
    plt.plot(x,y)
    plt.show()

def manhattan_distance(point_a, point_b):
    return abs(point_a.x - point_b.x) + abs(point_a.y - point_b.y)

def tabu_onepoint():
    pass

def tabu_search(cities, couriers):
    routes = []
    base = Point(456,320)
    results = []
    courier_with_stations = []
    k = 0
    for i in range(len(cities)):
        for j in range(len(cities)):
            md = manhattan_distance(base,cities[j])
            results.append(md)
            cities[j].distance = md
        optimal_point = results.index(min(results))
        if(k == 4):
            k = 0
        courier_with_stations.append({
            "courier":k,
            "point":cities[optimal_point]
        })
        k += 1
        cities.pop(optimal_point)
        results.clear()
    final_xs = []
    final_ys = []
    for i in courier_with_stations:
        print(f'courier:{i["courier"]} {i["point"]}')
        final_xs.append(i["point"].x)
        final_ys.append(i["point"].y)
    plot_points(final_xs,final_ys)
    # results = manhattan_distance(,)
    return results

def example_points():
    file = open("example_datas.txt","r")
    points = []
    first = file.readline()
    second = file.readline()
    x_coordinates = first.split(" ")
    y_coordinates = second.split(" ")
    for i in range(16):
        points.append(Point(int(x_coordinates[i]),int(y_coordinates[i])))
    return points

def init_cities_locations(cities_number):
    points = []
    for i in range(cities_number):
        points.append(Point(random.randint(0,1000), random.randint(0,1000)))
    return points

def init_cities_and_couriers_number():
    index = random.randint(0,5)
    cities_number = [10,20,50,100,200,500]
    cities = cities_number[index]
    couriers = 0
    couriers_number = [1,2,4,5]
    couriers_number_if_large_cities = [10,20]
    if(cities <= 50):
        index = random.randint(0,3)
        couriers = couriers_number[index]
    else:
        index = random.randint(0,1)
        couriers = couriers_number_if_large_cities[index]
    return cities, couriers

def main():
    random.seed(200)
    cities_number, couriers_number = init_cities_and_couriers_number()
    print(f'cities: {cities_number}, couriers: {couriers_number}')
    warehouse = Point(456,320)
    cities = init_cities_locations(cities_number)

    ## trying with example datas
    newvegas_couries = 4
    bbb = example_points()
    results = tabu_search(bbb,newvegas_couries)

    # print(sum(results))

if __name__ == "__main__":
    main()