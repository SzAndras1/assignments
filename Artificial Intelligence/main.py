import random
import pandas as pd
import plotly.figure_factory as ff
from numpy.random import randn
from numpy import exp
from numpy.random import rand
    
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

def init_plot(flowshop):
    for i in range(len(flowshop)):
        for j in range(len(flowshop[0])):
            if(i == 0 and j == 0):
                pass  
            elif(j == 0 and i > 0):
                flowshop[i][j] += flowshop[i-1][j]
            else:
                flowshop[i][j] += flowshop[i][j-1]
    jobs = []
    for i in range(len(flowshop)):
        machine = "Machine "+str(i+1)
        for j in range(len(flowshop[0])):
            if(i == 0 and j == 0):
                jobs.append(dict(Task=machine, Start=0, Finish=flowshop[i][j], Resource=str(j)))
            elif(i > 0 and j == 0):
                jobs.append(dict(Task=machine, Start=flowshop[i-1][j], Finish=flowshop[i][j], Resource=str(j)))
            elif(len(flowshop[0]) > j):
                jobs.append(dict(Task=machine, Start=flowshop[i][j-1], Finish=flowshop[i][j], Resource=str(j)))

    colors = {'0': 'rgb(220, 0, 0)',
          '1': (1, 0.9, 0.16),
          '2': 'rgb(0, 255, 100)',
          '3': 'rgb(32, 43, 82)',
          '4': 'rgb(113, 231, 92)'}
            
    df = pd.DataFrame(jobs)
    fig = ff.create_gantt(df, colors=colors, index_col='Resource', title='Flowshop',
                      group_tasks=True)
    #fig.update_yaxes(autorange="reversed")
    fig.update_xaxes(type='linear')

    fig.show()
    
# Here be dragons
# https://machinelearningmastery.com/simulated-annealing-from-scratch-in-python/
def objective(x):
	return x**2

def simulated_annealing(objective, bounds, n_iterations, step_size, temp, i, j):
    index = random.randint(0,i-1)
    best = bounds[index]
    # evaluate the initial point
    best_eval = objective(best)
    # current working solution
    curr, curr_eval = best, best_eval
    scores = list()
    # run the algorithm
    for i in range(n_iterations):
        # take a step
        candidate = curr + randn(len(bounds)) * step_size
        # evaluate candidate point
        candidate_eval = objective(candidate)
        print(f'candidate_eval: {candidate_eval}, best_eval = {best_eval}')
        print(f'candidate_eval: {type(candidate_eval)}, best_eval = {type(best_eval)}')
        # check for new best solution
        if candidate_eval < best_eval:
            # store new best point
            best, best_eval = candidate, candidate_eval
            # keep track of scores
            scores.append(best_eval)
        # difference between candidate and current point evaluation
        diff = candidate_eval - curr_eval
        # calculate temperature for current epoch
        t = temp / float(i + 1)
        # calculate metropolis acceptance criterion
        metropolis = exp(-diff / t)
        # check if we should keep the new point
        if diff < 0 or rand() < metropolis:
            # store the new current point
            curr, curr_eval = candidate, candidate_eval
    return best
# Here be dragons

def init_gantt_chart(flowshop, deadlines):

    # initial datas for simulated annealing
    n_iterations = 10
    step_size = 0.1
    temp = 10

    for i in range(len(flowshop)):
        s = random.uniform(0, 1)
        for j in range(len(flowshop[0])):
            bounds = []
            if(i == 0 and j == 0):
                pass
            elif(i == 0 and j > 0):
                flowshop[i][j] += flowshop[i][j-1]
            elif(j == 0):
                flowshop[i][j] += flowshop[i-1][j]
            else:
                for k in range(i):
                    bounds.append(flowshop[i][j])
                best = simulated_annealing(objective, bounds, n_iterations, step_size, temp, i, j)
                flowshop[i][j] = best

    latencies = calculate_latencies(clone, deadlines)
    print(f'Sum T={sum(latencies)}')

    print(flowshop)

def calculate_latencies(table, deadlines):
    latencies = []
    for j in range(len(flowshop[0])):
        latency = table[len(flowshop)][j] - deadlines[j]
        latency = max(0,latency)
        latencies.append(latency)
    return latencies

def main():
    random.seed(231)
    flowshop, deadlines = init_flowshop_and_deadlines()
    # init_plot(flowshop) function works, but it shows my undeveloped gantt chart, not the assignment's required gantt chart
    init_gantt_chart(flowshop, deadlines)
    # if candidate_eval < best_eval: line 81, in simulated_annealing
    # ValueError: The truth value of an array with more than one element is ambiguous. Use a.any() or a.all()

if __name__ == "__main__":
    main()