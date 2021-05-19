from download import simple_image_download as smp
import argparse
import re
import os
import urllib.request
import shutil
import requests

DEFAULT_NUM = 5
DEFAULT_QUERY = "furry art"
DEFAULT_FILENAME = "furry"

parser = argparse.ArgumentParser()
parser.add_argument('-q', action="store", dest="query")
parser.add_argument('-n', action="store", dest="num", type=int)
parser.add_argument('-f', action="store", dest="filename")

results = parser.parse_args()

res = smp
num = results.num or DEFAULT_NUM
query = results.query or DEFAULT_QUERY
filename = results.filename or DEFAULT_FILENAME

if input('Download from Google? (y/n)') == 'y':
    print('Collecting images for image processing + analysis. . . ')
    print('Quantity: ' + str(num))
    print('Query: ' + query)

    res().download(query, num, filename)
    print(res().urls(query, num, filename))

print('Downloading random images from picsum:')

# Paths
# get current working directory
cwd = os.getcwd()

# Images
# python 2 uses raw_input() to return a string, python 3 uses input()
imgNum = input('Enter number of images: ')
imgDim = input('Enter image size (e.g. 1920x1080): ').split('x')

# change directory to current working directory
# os.path.join(a,b) if you want to allow custom paths
os.chdir(cwd)
for i in range(1, int(imgNum) + 1):
    url = f"https://picsum.photos/{imgDim[0]}/{imgDim[1]}/?random"
    response = requests.get(url)
    if response.status_code == 200:
        if not os.path.isdir("dataset/notfurry"):
            os.mkdir("dataset/notfurry")
        output_file = f"dataset/notfurry/{str(i)}_notfurry.jpg"
    with urllib.request.urlopen(url) as \
            response, open(output_file, 'wb') as out_file:
        shutil.copyfileobj(response, out_file)


print('Finished. Check your directory, dataset/. ')
