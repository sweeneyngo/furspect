from kaggle.api.kaggle_api_extended import KaggleApi
from zipfile import Zipfile
import os

DATASET = 'alessiocorrado99/animals10'

# requires /.kaggle/kaggle.json
def fetch_kaggle():
    api = KaggleApi()
    api.authenticate()
    api.dataset_download_files(f'{DATASET}')

    zf = Zipfile('animals10.zip')
    zf.extractall('raw-img')
    zf.close()

def get_data_extract():
    if "raw-img" in os.listdir():
        print("Dataset already exists!")
