# this is copy-pasted from lehui's directory: https://github.com/lokhunliao/cs361/

# import libraries for processing http requests
from flask import Flask
from flask import request
from flask_cors import CORS

# import libraries for calculating stats and measures
import scipy.stats as stats
import pandas as pd
import networkx as nx
import numpy as np


app = Flask(__name__)
CORS(app)

@app.route("/", methods=["POST"])
def handle_response():

    # get body request
    message = request.json

    # get values of message
    print('SERVICE: received file: ', message["file"])

    # use pandas read_csv() function to get file as pandas dataframe
    # df = pd.read_csv('sampleData/{}'.format(message['file'])) # this reads the entire file
    # df = pd.read_csv('sampleData/{}'.format(message['file'])) # this reads the entire file 
    df = pd.read_csv(message['file'])

    # declare dict of results and add to it later
    output = []

    if (message["type"] != "edge_list"): # types that are not an edge list can just use a dataframe

        # assume first column is the data we want
        data = df.iloc[:, 0]

        # calculate standard deviation
        if "std-dev" in message['stats']:
            output.append(["stdDev", stats.tstd(data)])
        
        # calculate variance
        if "var" in message['stats']:
            output.append(["var", stats.variation(data)])

        # calculate mean
        if "mean" in message['stats']:
            output.append(["mean", data.mean(0)])

        if "median" in message['stats']:
            output.append(["median", data.median(0)])

        if "line-best-fit" in message['stats']:
            output.append(list(np.polyfit(data.index, data, 1)))


    if (message["type"] == "edge-list"): # types that are an edge list must be converted to a graph

        # assume first column is for sources and second column is for targets
        reader = pd.read_csv(message['file'], chunksize=10)
        df = pd.concat(reader, ignore_index=True)
        graph = nx.from_pandas_edgelist(df, source=df.columns[0], target=df.columns[1])

        if 'num-of-vertices' in message['stats']:
            output.append(['numOfVertices', graph.number_of_nodes()])

        if 'num-of-edges' in message['stats']:
            output.append(['numOfEdges', graph.number_of_edges()])

        if 'vertex-connectivity' in message['stats']:
            output.append(['vertex-connectivity', nx.node_connectivity(graph)])
        
        if 'edge-connectivity' in message['stats']:
            output.append(['edge-connectivity', nx.edge_connectivity(graph)])

        if 'graph-density' in message['stats']:
            output.append(['graph-density', nx.density(graph)])

    # return output
    return {"stats" : output}

# TO RUN: flask --app service run

# https://stackoverflow.com/questions/30673079/send-json-to-flask-using-requests
# https://flask.palletsprojects.com/en/2.3.x/quickstart/#a-minimal-application
# https://flask.palletsprojects.com/en/2.3.x/quickstart/#about-responses
# https://flask.palletsprojects.com/en/2.3.x/quickstart/#accessing-request-data
# https://flask-cors.readthedocs.io/en/latest/
# https://poshcode.gitbook.io/powershell-faq/src/getting-started/environment-variables