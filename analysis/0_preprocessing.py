import os

import osfclient
import pandas as pd

osf = osfclient.OSF().project("t2su5")

for storage in osf.storages:
    for file in storage.files:
        data = pd.read_csv(file._download_url)
