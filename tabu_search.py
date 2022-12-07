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

def plot_couriers_coordinates(couriers):
    for i in couriers:
        print(i.id, end="")
        point = i.points
        for j in point:
            print(j, end="")
        print()

def plot_couriers_route(couriers):
    figure, axes = plt.subplots()
    for i in couriers:
        x=[]
        y=[]
        point = i.points
        for j in point:
            x.append(j.x)
            y.append(j.y)
        axes.plot(x,y)
    plt.show()

def sum_distance(couriers):
    sum_distance = 0
    base = Point(456,320)
    for i in couriers:
        i.distance += manhattan_distance(base,i.points[len(i.points)-1])
        i.points.append(base)
        sum_distance += i.distance
    print(f'Total distance: {sum_distance}m')

def manhattan_distance(point_a, point_b):
    return abs(point_a.x - point_b.x) + abs(point_a.y - point_b.y)

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

def tabu_search(cities, couriers):
    courier_index = 0
    city_index = 0
    for i in range(len(cities)):
        min_number = 0
        for j in range(len(couriers)):
            for k in range(len(cities)):
                last_item_of_courier_point_list = couriers[j].points[len(couriers[j].points)-1]
                distance = manhattan_distance(cities[k],last_item_of_courier_point_list)
                if(j == 0 and k == 0):
                    min_number = distance
                    courier_index = j
                    city_index = k
                elif(distance < min_number):
                    min_number = distance
                    courier_index = j
                    city_index = k
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
    random.seed(312)
    cities_number, couriers_number = init_cities_and_couriers_number()
    print(f'cities: {cities_number}, couriers: {couriers_number}')
    cities = init_cities_locations(cities_number)
    couriers = init_couriers(couriers_number)

    algorithm_number = input("Enter a number:\nTabu search shortest possible distance (1)\n Tabu search every courier get at least a route (2): ")
    if(algorithm_number == '1'):
        couriers = tabu_search(cities,couriers)
    elif(algorithm_number == '2'):
        couriers = tabu_search_second_solution(cities,couriers)
    
    sum_distance(couriers)    
    plot_couriers_route(couriers)
    #plot_couriers_coordinates(couriers)

    ## trying with example datas
    #newvegas_couries = 4
    #cities = example_points()
    #couriers = init_couriers(newvegas_couries)

if __name__ == "__main__":
    main()