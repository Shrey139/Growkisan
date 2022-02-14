# #Importing necessary package before
import warnings
warnings.filterwarnings('ignore')

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle
from sklearn.metrics import classification_report
from sklearn import metrics
from sklearn import tree
from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
import xgboost as xgb
from sklearn.model_selection import GridSearchCV

class Recommender():
    def load_read(self):

        df = pd.read_csv('data/cropsFinal.csv')
        Recommender.preprocess(df)
       
       
    def preprocess(df):
        
        print("Displaying first 5 rows of the dataset:-",df.head())
        print("No of records:-",df.size)
        print("Dimension of dataset:-",df.shape)
        print("Column names:-",df.columns)
        print("Unique labels names:-",df['label'].unique())
        print("Type of data present:-",df.dtypes)
        print("Number of records for label:-",df['label'].value_counts())

        #Plotting
        sns.heatmap(df.corr(),annot=True)

        #Seperating features and target label

        features = df[['N', 'P','K','temperature', 'humidity', 'ph', 'rainfall']]
        target = df['label']

        Recommender.modelBuilding(features,target)

    def modelBuilding(features,target):

        # Initialzing empty lists to append all model's name and corresponding name
        acc = []
        model = []

        # splitting the data
        
        Xtrain, Xtest, Ytrain, Ytest = train_test_split(features,target,test_size = 0.2,random_state =2)

        Recommender.randomforest(Xtrain,Xtest,Ytrain,Ytest,acc,model,features,target)
        Recommender.GNB(Xtrain,Xtest,Ytrain,Ytest,acc,model,features, target)
        Recommender.SVM(Xtrain,Xtest,Ytrain,Ytest,acc,model,features, target)
        Recommender.logisticregression(Xtrain,Xtest,Ytrain,Ytest,acc,model,features, target)
        Recommender.Randomforest(Xtrain,Xtest,Ytrain,Ytest,acc,model,features, target)
        Recommender.xgboosts(Xtrain,Xtest,Ytrain,Ytest,acc,model,features, target)
        Recommender.accurcacy_plot(acc,model)



    def randomforest(Xtrain,Xtest,Ytrain,Ytest,acc,model,features,target):

        DecisionTree = DecisionTreeClassifier(criterion="entropy",random_state=2,max_depth=5)
        DecisionTree.fit(Xtrain,Ytrain)
        predicted_values = DecisionTree.predict(Xtest)
        x = metrics.accuracy_score(Ytest, predicted_values)
        acc.append(x)
        model.append('Decision Tree')
        print("DecisionTrees's Accuracy is: ", x*100)

        print("Classification report in case of Desision Tree: ",classification_report(Ytest,predicted_values))

        #cross validation 
        score = cross_val_score(DecisionTree, features, target, cv=5)
        print("CV score for decision tree", score)

        # save model with pickle

        DecisionTree_pkl_filename = 'models/DecisionTree.pkl'
        DecisionTree_Model_pkl = open(DecisionTree_pkl_filename, 'wb')
        pickle.dump(DecisionTree, DecisionTree_Model_pkl)
        DecisionTree_Model_pkl.close()


        
    def GNB(Xtrain,Xtest,Ytrain,Ytest,acc,model,features, target):
        NaiveBayes = GaussianNB()
        NaiveBayes.fit(Xtrain,Ytrain)
        predicted_values = NaiveBayes.predict(Xtest)
        x = metrics.accuracy_score(Ytest, predicted_values)
        acc.append(x)
        model.append('Naive Bayes')
        print("Naive Bayes's Accuracy is: ", x)

        print("Classification report in case of Naive Bayes classifier: ",classification_report(Ytest,predicted_values))

        # Cross validation
        score = cross_val_score(NaiveBayes,features,target,cv=5)
        print("CV score for GNB", score)

        # save model with pickle

        NaiveBayes_pkl_filename = 'models/NaiveBayes.pkl'
        NaiveBayes_Model_pkl = open(NaiveBayes_pkl_filename, 'wb')
        pickle.dump(NaiveBayes, NaiveBayes_Model_pkl)
        NaiveBayes_Model_pkl.close()

        
    def SVM(Xtrain,Xtest,Ytrain,Ytest,acc,model,features, target):

        SVM = SVC(gamma='auto')
        SVM.fit(Xtrain,Ytrain)
        predicted_values = SVM.predict(Xtest)
        x = metrics.accuracy_score(Ytest, predicted_values)
        #acc.append(x)
        #model.append('SVM')
        print("SVM's Accuracy is: ", x)

        print("Classification report in case of SVM classifier: ",classification_report(Ytest,predicted_values))

        # Hyper Parameter Tuning in SVM

        # defining parameter range
        param_grid = {'C': [0.1, 1, 10, 100, 1000], 
              'gamma': [1, 0.1, 0.01, 0.001, 0.0001],
              'kernel': ['rbf']} 
  
        grid = GridSearchCV(SVC(), param_grid, refit = True, verbose = 3)
  
        # fitting the model for grid search
        grid.fit(Xtrain, Ytrain)
        # print best parameter after tuning
        print("Best parameters in SVM: ".grid.best_params_)
  
        # print how our model looks after hyper-parameter tuning
        print("Best estimators:- ",grid.best_estimator_)

        grid_predictions = grid.predict(Xtest)
  
        # print classification report
        print("Classification report in case of SVM classifier after tuning on grid pridictions: ",classification_report(Ytest, grid_predictions))


        # new model SVMH with tuned parameters
        SVMH = SVC(C=100, gamma=0.0001, kernel='rbf')

        SVMH.fit(Xtrain,Ytrain)

        predicted_values1 = SVMH.predict(Xtest)

        x = metrics.accuracy_score(Ytest, predicted_values1)
        acc.append(x)
        model.append('SVMH')
        print("SVM's Accuracy is: ", x)

        print("Classification report in case of SVM classifier after tuning : ",classification_report(Ytest,predicted_values))

        # Cross validation
        score = cross_val_score(grid,features,target,cv=5)
        print("CV score for SVMH", score)

        # save model with pickle
        SVC_pkl_filename = 'models/SVC.pkl'

        SVC_Model_pkl = open(SVC_pkl_filename, 'wb')
        pickle.dump(SVC, SVC_Model_pkl)
        SVC_Model_pkl.close()

    def logisticregression(Xtrain,Xtest,Ytrain,Ytest,acc,model,features, target):
        LogReg = LogisticRegression(solver='liblinear',max_iter=120,random_state=50)
        LogReg.fit(Xtrain,Ytrain)
        predicted_values = LogReg.predict(Xtest)

        x = metrics.accuracy_score(Ytest, predicted_values)
        acc.append(x)
        model.append('Logistic Regression')
        print("Logistic Regression's Accuracy is: ", x)

        print("Classification report in case of Logistic Regression : ",classification_report(Ytest,predicted_values))

        # Cross validation
        score = cross_val_score(LogReg,features,target,cv=5)
        print("CV score for SVMH", score)

        #save model with pickle

        
        Logit_pkl_filename = 'models/LogisticRegression.pkl'
        Logit_Model_pkl = open(Logit_pkl_filename, 'wb')
        pickle.dump(LogReg, Logit_Model_pkl)
        Logit_Model_pkl.close()

    def Randomforest(Xtrain,Xtest,Ytrain,Ytest,acc,model,features, target):

        RF = RandomForestClassifier(n_estimators=20, random_state=0)
        RF.fit(Xtrain,Ytrain)

        predicted_values = RF.predict(Xtest)

        x = metrics.accuracy_score(Ytest, predicted_values)
        acc.append(x)
        model.append('RF')
        print("RF's Accuracy is: ", x)

        print("Classification report in case of Random forest classifier : ",classification_report(Ytest,predicted_values))

        # Cross validation
        score = cross_val_score(RF,features,target,cv=5)
        print("CV score for SVMH", score)

        #save model with pickle
        RandomForest_pkl_filename = 'models/RandomForest.pkl'
        RandomForest_Model_pkl = open(RandomForest_pkl_filename, 'wb')
        pickle.dump(RF, RandomForest_Model_pkl)
        RandomForest_Model_pkl.close()


    def xgboosts(Xtrain,Xtest,Ytrain,Ytest,acc,model,features, target):
        XB = xgb.XGBClassifier(eval_metric='merror')
        XB.fit(Xtrain,Ytrain)
        predicted_values = XB.predict(Xtest)
        x = metrics.accuracy_score(Ytest, predicted_values)
        acc.append(x)
        model.append('XGBoost')
        print("XGBoost's Accuracy is: ", x)

        print("Classification report in case of XgBoost classifier : ",classification_report(Ytest,predicted_values))

        # Cross validation
        score = cross_val_score(XB,features,target,cv=5)
        print("CV score for XGBoost", score)

        #save model with pickle
        XB_pkl_filename = 'models/XGBoost.pkl'
        XB_Model_pkl = open(XB_pkl_filename, 'wb')
        pickle.dump(XB, XB_Model_pkl)
        XB_Model_pkl.close()


    def accurcacy(acc,model):
        plt.figure(figsize=[10,5],dpi = 100)
        plt.title('Accuracy Comparison')
        plt.xlabel('Accuracy')
        plt.ylabel('Algorithm')
        sns.barplot(x = acc,y = model,palette='dark')

        accuracy_models = dict(zip(model, acc))
        for k, v in accuracy_models.items():
            print (k, '-->', v)


if __name__=="__main__":
    Rec = Recommender()
    Rec.load_read()
    """
    ## for prediction
    model= pickle.load(open('models/RandomForest.pkl','rb'))
    data = list(map(int,input("\nEnter the data : ").strip().split()))[:7]
    p = model.predict(np.array([data]))
    print(p[0])

    """




    




        








