import json

import numpy as np
import pandas as pd

import requests

# Load useful functions
exec(
    requests.get(
        "https://raw.githubusercontent.com/RealityBending/scripts/main/data_OSF.py"
    ).text
)

# Connect to OSF and get files --------------------------------------------
token = ""
files = osf_listfiles(  # Function in the data_OSF.py script loaded above
    token=token,
    data_subproject="t2su5",  # Data subproject ID
    after_date="18/06/2024",
)


# Loop through files ======================================================
# Initialize empty dataframes
alldata = pd.DataFrame()
alldata_ig = pd.DataFrame()

for i, file in enumerate(files):
    print(f"File N°{i+1}/{len(files)}")  # Print progress

    # Skip if participant already in the dataset
    if (
        "Participant" in alldata.columns
        and file["name"] in alldata["Participant"].values
    ):
        continue

    data = osf_download(file)  # Function in the data_OSF.py script loaded above

    # Participant ----------------------------------------------------------
    data["screen"].unique()

    # Browser info -------------------------------------------------------
    browser = data[data["screen"] == "browser_info"].iloc[0]

    df = pd.DataFrame(
        {
            "Participant": file["name"],
            "Experiment_Duration": data["time_elapsed"].max() / 1000 / 60,
            "Date_OSF": file["date"],
            "Date": browser["date"],
            "Time": browser["time"],
            "Browser": browser["browser"],
            "Mobile": browser["mobile"],
            "Platform": browser["os"],
            "Screen_Width": browser["screen_width"],
            "Screen_Height": browser["screen_height"],
            "Language": browser["language"],
            "Source": browser["researcher"],
        },
        index=[0],
    )

    # Demographics -------------------------------------------------------
    demo = data[data["screen"] == "demographics"].iloc[0]
    demo = json.loads(demo["response"])

    df["Age"] = demo["age"]
    gender = demo["gender"]
    gender = "Male" if gender in ["мужской", "м"] else "Female"
    df["Gender"] = gender

    country = demo["Country"]
    country = "Ukraine" if country in ["Украина"] else country
    df["Country"] = country

    # TODO: nationality

    # IPIP6 --------------------------------------------------------------
    ipip6 = data[data["screen"] == "questionnaire_ipip6"].iloc[0]

    df["IPIP6_Duration"] = ipip6["rt"] / 1000 / 60

    ipip6 = json.loads(ipip6["response"])
    for item in ipip6:
        df["IPIP6_" + item] = ipip6[item]

    # Concatenate data ------------------------------------------------------
    alldata = pd.concat([alldata, df], axis=0, ignore_index=True)


# Save data ==============================================================

alldata.to_csv("../data/rawdata.csv", index=False)
print("Done!")
