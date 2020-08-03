
import os
import pandas as pd   
import pickle   
import json

def getJSON(csvFile, index=0):
    df = pd.read_csv(csvFile)
    print(df.iloc[index].to_json())

def getDF(d1):        
    d2 = {}
    for k in d1:
        v = []
        v.append(d1[k])
        d2[k]= v
    return pd.DataFrame(d2)

def training():
    df = pd.read_csv("Sensors.csv")
    X= df.drop("condition",axis=1)
#     dummy_row(X)
    Y = df["condition"]
    
    from sklearn.model_selection import train_test_split
    x_train, x_test, y_train, y_test = train_test_split(X,Y, train_size=0.8, random_state=11) 
    from sklearn.linear_model import LogisticRegression
    from sklearn.ensemble import RandomForestClassifier
    model = RandomForestClassifier(n_estimators=74,random_state=10)
    model.fit(x_train,y_train ) 
    pkl_filename = "mymodel.pkl"
    with open(pkl_filename, "wb") as f1:
        pickle.dump(model, f1)   

# training()
# def pred(jsonData):
#     x = json.loads(jsonData) 
# #     x = jsonData
# #     df = json_normalize(x) #normalize dont create column for null values
#     df = getDF(x)
# #     tmp = df.iloc[0]
# #     tmp.to_csv("tmp2.csv")    
# #     df = pre_proc(df)
#     with open("mymodel.pkl", "rb") as f1:
#         model = pickle.load(f1)    
#     if "condition" in df:
#         df.drop("condition", inplace=True, axis=1)
#     y = model.predict(df)
#     print(y)
#     return y
# # pred('{"sensor1":356,"sensor2":43,"condition":1}')

def pred(ob):
    # from pandas.io.json import json_normalize
    # ob= json.loads(ob)
    df = pd.DataFrame(ob,index=[0])
    # df = getDF(x)
    
    pkl_filename = "./mymodel.pkl"
    pkl_filename = os.path.join(os.path.abspath(os.path.dirname(__file__)),pkl_filename)
    with open(pkl_filename, "rb") as f1:
        model = pickle.load(f1)    
    if "condition" in df:
        df.drop("condition", inplace=True, axis=1)
    y = model.predict(df)
#     print(y)
    return y


    # getJSON("Sensors.csv",18)

    # pred('{"Accelerometer":13,"DPS":25,"Gyroscope":19,"BPS":37,"condition":0}')