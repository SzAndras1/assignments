import random
import matplotlib.pyplot as plt
import numpy as np

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __str__(self):
        return f'(x:{self.x},y:{self.y})'

class Courier:
    def __init__(self,id,points=0,distance=0):
        self.id = id
        self.points = [Point(456,320)]
        self.distance = distance
    def __str__(self):
        return f'id: {self.id}, points:[{self.points}]'
    #def __repr__(self):
    #    return repr(self.points)

def plot_points(courier):
    x = []
    y = []
    index = 0
    for i in courier:
        if(index == 0):
            point = i.points
            for j in point:
                x.append(j.x)
                y.append(j.y)
        index += 1
    xlabels = np.asarray(x)
    ylabels = np.asarray(y)
    plt.plot(xlabels,ylabels)
    plt.show

def manhattan_distance(point_a, point_b):
    return abs(point_a.x - point_b.x) + abs(point_a.y - point_b.y)

def tabu_onepoint():
    pass

def tabu_search(cities, couriers):
    courier_index = 0
    city_index = 0
    j_index = 0
    for i in range(len(cities)):
        min_number = 0
        j_index = 0
        for j in couriers:
            for k in range(len(cities)):
                last_item_of_courier_point_list = couriers[j_index].points[len(couriers[j_index].points)-1]
                distance = manhattan_distance(cities[k],last_item_of_courier_point_list)
                if(j_index == 0 and k == 0):
                    min_number = distance
                    courier_index = j_index
                    city_index = k
                elif(distance < min_number):
                    min_number = distance
                    courier_index = j_index
                    city_index = k
            j_index += 1
        couriers[courier_index].points.append(cities[city_index])
        couriers[courier_index].distance += min_number
        cities.pop(city_index)
    return couriers

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

def init_couriers(couriers_number):
    couriers = []
    for i in range(couriers_number):
        couriers.append(Courier(i))
    return couriers

def init_cities_locations(cities_number):
    points = []
    for i in range(cities_number):
        points.append(Point(random.randint(0,1000), random.randint(0,1000)))
    return points

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

def main():
    random.seed(200)
    #cities_number, couriers_number = init_cities_and_couriers_number()
    #print(f'cities: {cities_number}, couriers: {couriers_number}')
    #warehouse = Point(456,320)
    #cities = init_cities_locations(cities_number)

    ## trying with example datas
    newvegas_couries = 4
    bbb = example_points()
    couriers = init_couriers(newvegas_couries)
    couriers = tabu_search(bbb,couriers)
    sum_distance = 0
    for i in couriers:
        print(f'{i.id}, distance: {i.distance}', end="")
        sum_distance += i.distance
        points = i.points
        for j in points:
            print(f'{j},')
        print()
    print(f'Total distance: {sum_distance}m')
    plot_points(couriers)

if __name__ == "__main__":
    main()