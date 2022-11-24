import random
import pandas as pd
import plotly.figure_factory as ff

def init_machines_jobs_deadlines():
    file = open("datas.txt", "r")
    table = []
    machines = int(file.readline())
    jobs = int(file.readline())
    for i in range(machines):
        column = []
        for j in range(jobs):
            column.append(random.randint(2,10))
        table.append(column)

    deadlines = []
    for i in range(jobs):
        deadlines.append(random.randint(15,26))
    return table, deadlines

def init_gantt_chart(table):
    for i in range(len(table)):
        for j in range(len(table[0])):
            if(i == 0 and j == 0):
                pass  
            elif(j == 0 and i>0):
                table[i][j] += table[i-1][j]
            else:
                table[i][j] += table[i][j-1]

    jobs = []
    for i in range(len(table)):
        machine = "Machine "+str(i+1)
        for j in range(len(table[0])):
            if(i == 0 and j == 0):
                jobs.append(dict(Task=machine, Start=0, Finish=table[i][j], Resource=str(j)))
            elif(i>0 and j == 0):
                jobs.append(dict(Task=machine, Start=table[i-1][j], Finish=table[i][j], Resource=str(j)))
            elif(len(table[0])>j):
                jobs.append(dict(Task=machine, Start=table[i][j-1], Finish=table[i][j], Resource=str(j)))

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
    
def simulated_annealing(table, deadlines):
    print("TBD")

def main():
    table, deadlines = init_machines_jobs_deadlines()
    #kezdetleges adatokkal ábrázolás
    init_gantt_chart(table)
    # Kell Latency[i] = Completed[i] - Deadline[i], T[i] = max(0,L[i]), Végeredmény: Sum(T[i])
    simulated_annealing(table, deadlines)

if __name__ == "__main__":
    main()