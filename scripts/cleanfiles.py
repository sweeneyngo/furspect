import os
os.chdir(os.getcwd())
files = os.listdir('dataset/furry')
print(files)

for i, file in enumerate(files):
    ext = file.rsplit('.', 1)[1]
    os.rename(os.path.join('dataset/furry', file),
              os.path.join('dataset/furry', f'{str(i+1)}_furry.{ext}'))
