#Importing necessary package before
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import random

class FinalData():
    
    def load_read(self):
        fertilizer_data_path = 'data/fertilizerN.csv'
        merge_fert = pd.read_csv(fertilizer_data_path)
        merge_crop = pd.read_csv('data/CropsN.csv')
        print("Displaying first 5 rows of fertilizer data:-",merge_fert.head())
        print("Displaying first 5 rows of fertilizer data:-",merge_crop.head())



        FinalData.preprocess(merge_fert,merge_crop)

    def preprocess(merge_fert,merge_crop):

        """
        Fertilizer data
        """

        del merge_fert['Unnamed: 0']
        print("Dsiplaying the statistic of the dataset:-",merge_fert.describe())
        print("Displaying the unique crop in the dataset:-",merge_fert['Crop'].unique())

        ##plotting
        fig, axs = plt.subplots(2, 2)
        axs[0, 0].plot(merge_fert["N"])
        axs[0, 0].set_title('Nitrogen plot')
        axs[0, 1].plot(merge_fert["P"])
        axs[0, 1].set_title('Phosphorus plot')
        axs[1, 0].plot(merge_fert["K"])
        axs[1, 0].set_title('Potassium plot')


        sns.heatmap(merge_fert.corr(),annot=True)


        """
        Crop Data
        """
        reco_fert = merge_fert
        #Add +/-3 for every NPK value
       
        temp = pd.DataFrame(columns = ['N','P','K'])
        for i in range(0,merge_crop.shape[0]):
            crop = merge_crop.label.iloc[i]

        N = reco_fert[reco_fert['Crop'] == crop]["N"].iloc[0] + random.randint(-20,20)
        P = reco_fert[reco_fert['Crop'] == crop]["P"].iloc[0] + random.randint(-5,20)
        K = reco_fert[reco_fert['Crop'] == crop]["K"].iloc[0] + random.randint(-5,5)
        d = {"N":N,"P":P,"K":K}
        #print(d)
        temp = temp.append(d,ignore_index = True)

        ## adding NPK data to merge crop dataframe

        merge_crop['N'] = temp['N']
        merge_crop['P'] = temp['P']
        merge_crop['K'] = temp['K']

        del merge_crop['Unnamed: 0']

        merge_crop = merge_crop[[ 'N', 'P', 'K','temperature', 'humidity', 'ph', 'rainfall', 'label']]

        print("Dsiplaying the final dataset :-",merge_crop)

        FinalData.make(merge_crop)

    def make(merge_crop):
        merge_crop.to_csv("data/cropsFinal.csv",index=False)


if __name__=="__main__":
    FD = FinalData()
    FD.load_read()