from kaggle.api.kaggle_api_extended import KaggleApi
import zipfile
import os
from shutil import copyfile
from random import random
from random import seed


DATASET = "alessiocorrado99/animals10"

# requires /.kaggle/kaggle.json
def fetch_kaggle():

    api = KaggleApi()
    api.authenticate()
    api.dataset_download_files(f"{DATASET}")

    zf = zipfile.ZipFile("animals10.zip")
    zf.extractall("raw-img")
    zf.close()

    classes = os.listdir("raw-img/raw-img")
    print(classes)
    for subdir in ["train", "validation"]:
        for label in classes:
            new = os.path.join(subdir, label)
            print(new)
            os.makedirs(new, exist_ok=True)

    seed(1)
    for label in classes:
        head = os.path.join("raw-img/raw-img", label)

        for file in os.listdir(head):
            src = os.path.join(head, file)
            dst = os.path.join("train", label, file)

            if random() < 0.2:
                dst = os.path.join("validation", label, file)

            print(f"Travelling from {src} to {dst}!")
            copyfile(src, dst)


def conjoin_furry_dir():

    label = "furry"
    zf = zipfile.ZipFile("furry.zip")
    zf.extractall(label)
    zf.close()

    for subdir in ["train", "validation"]:
        new = os.path.join(subdir, label)
        os.makedirs(new, exist_ok=True)

    seed(1)
    head = os.path.join(label, "furry")

    for file in os.listdir(head):
        src = os.path.join(head, file)
        dst = os.path.join("train", label, file)

        if random() < 0.2:
            dst = os.path.join("validation", label, file)

        print(f"Travelling from {src} to {dst}!")
        copyfile(src, dst)


def main():
    if "raw-img" in os.listdir():
        print("Dataset already exists!")
    fetch_kaggle()
    conjoin_furry_dir()


if __name__ == "__main__":
    main()
