import random
import copy
import matplotlib.pyplot as plt

class Element:
    def __init__(self,begin=0,end=0):
        self.begin = begin
        self.end = end
    def __str__(self):
        return f'({self.begin},{self.end})'

def plot_gantt_chart(elements):
    # https://www.geeksforgeeks.org/python-basic-gantt-chart-using-matplotlib/
    # reparameterized the code in the previous link
    fig, ax = plt.subplots()

    a = len(elements)
    b = 15*(a-1)+1
    c = a*10

    yticklabels = list(range(a,0,-1))
    xlim = elements[len(elements)-1][len(elements[0])-1].end
    y = list(range(c,0,-10))
    ylim = y[0]+10
    yticks = list(range(15,ylim-4,10))

    ax.set_ylim(0, ylim)
    ax.set_xlim(0, xlim)
    ax.set_xlabel('Time')
    ax.set_ylabel('Machines')
    ax.set_yticks(yticks)
    ax.set_yticklabels(yticklabels)
    
    colors = ['tab:blue','tab:orange','tab:green','tab:purple','tab:cyan','tab:red','tab:grey']
    index_i = 0

    for i in elements:
        index_j = 0
        for j in i:
            end_value = j.end-j.begin
            ax.broken_barh([(j.begin,end_value)],(y[index_i],9),facecolors=colors[index_j])
            index_j += 1
            if(index_j == len(colors)):
                index_j = 0
        index_i += 1
    plt.show()
    #plt.savefig("gantt_chart.png")

def calculate_latencies(flowshop, deadlines):
    latencies = []
    for i in range(len(flowshop[0])):
        latency = flowshop[len(flowshop)-1][i] - deadlines[i]
        latency = max(0,latency)
        latencies.append(latency)
    return latencies

def simulated_annealing(flowshop, i , j):
    best_value = 0
    return best_value

def init_elements(flowshop):
    flowshop = copy.deepcopy(flowshop)
    index = 0
    elements = []
    for i in range(len(flowshop)):
        row = []
        index = 0
        for j in range(len(flowshop[0])):
            if(i == 0 and j == 0):
                row.append(Element(0,flowshop[i][j]))
            elif(i == 0 and j > 0):
                flowshop[i][j] += flowshop[i][j-1]
                row.append(Element(flowshop[i][j-1],flowshop[i][j]))
            elif(j == 0):
                flowshop[i][j] += flowshop[i-1][j]
                row.append(Element(flowshop[i-1][j],flowshop[i][j]))
            else:
                # best_value = simulated_annealing(flowshop, i, j)
                value_a = row[index].end
                value_b = elements[i-1][j].end
                if(value_a >= value_b):
                    end_value = value_a + flowshop[i][j]
                    row.append(Element(value_a,end_value))
                    flowshop[i][j] += value_a
                else:
                    end_value = value_b + flowshop[i][j]
                    row.append(Element(value_b,end_value))
                    flowshop[i][j] += value_b
                    
                index += 1
        elements.append(row)

    plot_gantt_chart(elements)
    return flowshop
'''print("coordinates:")
    for i in range(len(elements)):
        for j in range(len(elements[0])):
            print(elements[i][j], end = '')
        print()
    print("flowshop values:")
    for i in flowshop:
        print(i)'''

def init_flowshop_and_deadlines():
    file = open("datas.txt", "r")
    flowshop = []
    machines = int(file.readline())
    jobs = int(file.readline())
    for i in range(machines):
        column = []
        for j in range(jobs):
            column.append(random.randint(2,10))
        flowshop.append(column)

    deadlines = []
    for i in range(jobs):
        deadlines.append(random.randint(15,26))
    return flowshop, deadlines

def main():
    random.seed(233)
    flowshop, deadlines = init_flowshop_and_deadlines()
    #deadlines = 25, 30, 30, 45, 30
    #flowshop = [[3,4,8,5,7],[4,5,7,3,6],[6,4,2,1,8],[7,6,2,5,4]]
    flowshop = init_elements(flowshop)
    latencies = calculate_latencies(flowshop,deadlines)
    print(f"T_sum: {sum(latencies)}")

if __name__ == "__main__":
    main()