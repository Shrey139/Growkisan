import pandas as pd


class DataPrep():

    def change_case(i):
        """
        to lower the cases
        """
        i = i.replace(" ", "")
        i = i.lower()
        return i

    def load_read(self):
        """
        Data is read from data folder 
        """
        crop_data_path = 'data/crops.csv'
        fertilizer_data_path = 'data/fertilizer.csv'
        crop = pd.read_csv(crop_data_path)
        fert = pd.read_csv(fertilizer_data_path)
        print("Displaying first 5 rows of our crop dataset-", crop.head())
        print("Displaying first 5 rows of our fertilizer dataset:-", fert.head())
        print("Displaying about the crop dataset:-", crop.info)
        print("Displaying about the fertilizer dataset:-", fert.info)
        DataPrep.preprocess(crop, fert)

    def preprocess(crop, fert):
        print(crop.isnull().sum())
        print(fert.isnull().sum())
        fert['Crop'] = fert['Crop'].apply(DataPrep.change_case)
        crop['label'] = crop['label'].apply(DataPrep.change_case)

        # make some changes in ferttilizer dataset

        fert['Crop'] = fert['Crop'].replace('mungbeans', 'mungbean')
        fert['Crop'] = fert['Crop'].replace('lentils(masoordal)', 'lentil')
        fert['Crop'] = fert['Crop'].replace(
            'pigeonpeas(toordal)', 'pigeonpeas')
        fert['Crop'] = fert['Crop'].replace('mothbean(matki)', 'mothbeans')
        fert['Crop'] = fert['Crop'].replace('chickpeas(channa)', 'chickpea')
        del fert['Unnamed: 0']
        crop_names = crop['label'].unique()
        print("Displaying unique crop present:-",crop_names)

        DataPrep.making_datasets(crop,fert,crop_names)

    def making_datasets(crop,fert,crop_names):

        # finding crop names from the fertilizer 

        crop_names_from_fert = fert['Crop'].unique()
        print("Print crop names from the fertilzer data:-",crop_names_from_fert)

        for i in crop_names_from_fert:
            print(crop[crop['label'] == i])
        
        print("Displaying the labels of the crops:-",crop['label'])
        
        extract_labels = []
        for i in crop_names_from_fert:
            if i in crop_names:
                extract_labels.append(i)

        #using extract labesl on crop to get all the data related to those labels
        new_crop = pd.DataFrame(columns = crop.columns)
        new_fert = pd.DataFrame(columns = fert.columns)

        for label in extract_labels:
            new_crop = new_crop.append(crop[crop['label'] == label])

        for label in extract_labels:
            new_fert = new_fert.append(fert[fert['Crop'] == label].iloc[0])
        
        DataPrep.display_and_make(new_crop,new_fert)

    def display_and_make(new_crop,new_fert):

        print("Displaying the new crop data set:-",new_crop)
        print("Displaying the new fertilizer data set:-",new_fert)
    

        new_crop.to_csv('data/CropsN.csv')
        new_fert.to_csv('data/fertilizerN.csv')

if __name__=="__main__":
    DP = DataPrep()
    DP.load_read()