import json
import numpy as np
import pandas as pd
import requests

# Load useful functions ===================================================
exec(
    requests.get(
        "https://raw.githubusercontent.com/RealityBending/scripts/main/data_OSF.py"
    ).text
)

# Connect to OSF and get files ============================================
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

    # Participant =========================================================
    data["screen"].unique()

    # Browser info --------------------------------------------------------
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
    
    # Demographics --------------------------------------------------------
    demo = data[data["screen"] == "demographics"].iloc[0]
    demo = json.loads(demo["response"])

    # Age
    df["Age"] = demo["age"]

    #Gender
    gender = demo["gender"]
    gender = "Male" if gender in ["мужской", "м", "муж", "Муржской"] else "Female"
    
    df["Gender"] = gender
    
    # Country
    country = demo["Country"]
    country = "Russia" if country in ["Россия"] else country
    country = "Georgia" if country in ["Грузия"] else country
    country = "Ukraine" if country in ["Украина"] else country
    country = "Germany" if country in ["Германия"] else country
    country = "Kazakhstan" if country in ["Казахстан"] else country
    country = "Belarus" if country in ["Беларусь"] else country
    
    df["Country"] = country
    
    # Nationality
    nationality = demo["nationality"]
    nationality = "Russian" if nationality in ["русский", "русская", "россиянин", "россиянка", "Русский", "Русская", "Россия"] else nationality
    nationality = "Georgian" if nationality in ["грузин", "грузинка"] else nationality
    nationality = "Ukrainian" if nationality in ["украинец", "украинка", "Украинец", "Украинка"] else nationality
    nationality = "Kazakh" if nationality in ["казах", "казашка", "Казах", "Казашка"] else nationality
    nationality = "Belarusian" if nationality in ["белорус", "белоруска", "Белорус", "Белоруска" ] else nationality
    
    # Assign NaN if nationality is an empty string
    nationality = np.nan if nationality in [""] else nationality
    
    df["Nationality"] = nationality
    
    # Questionnaires =====================================================
    # PID-5 --------------------------------------------------------------
    pid5 = data[data["screen"] == "questionnaire_pid5"].iloc[0]

    df["PID5_Duration"] = pid5["rt"] / 1000 / 60

    pid5 = json.loads(pid5["response"])
    for item in pid5:
        df["PID5_" + item] = pid5[item]
    
    # IPIP6 --------------------------------------------------------------
    ipip6 = data[data["screen"] == "questionnaire_ipip6"].iloc[0]
    
    df["IPIP6_Duration"] = ipip6["rt"] / 1000 / 60
    
    ipip6 = json.loads(ipip6["response"])
    for item in ipip6:
        df["IPIP6_" + item] = ipip6[item]

        # Illusion Game ==================================================
    ig = data[data["screen"] == "IG_Trial"]
    ig = ig[ig["block"] != "Practice"]

    df_ig = ig[
        ["Illusion_Type", "Illusion_Difference", "Illusion_Strength"]
    ].reset_index(drop=True)
    df_ig["Participant"] = file["name"]
    df_ig["File"] = [
        s.replace("https://realitybending.github.io/IllusionGame/v3/stimuli/", "")
        for s in ig["stimulus"].values
    ]
    df_ig["Block"] = ig["block"].values
    df_ig["Trial"] = ig["trial_number"].values
    df_ig["ISI"] = ig["isi"].values
    df_ig["RT"] = ig["rt"].values / 1000  # In seconds
    df_ig["Response"] = ig["response"].values
    df_ig["Response_Correct"] = ig["correct_response"].values
    df_ig["Error"] = (ig["correct"] == False).values.astype(int)

    # Reorder Columns ====================================================
    first_column = df_ig.pop("Participant")
    df_ig.insert(0, "Participant", first_column)

    # Concatenate data ===================================================
    alldata = pd.concat([alldata, df], axis=0, ignore_index=True)
    alldata_ig = pd.concat([alldata_ig, df_ig], axis=0, ignore_index=True)

# Remove columns =========================================================
alldata = alldata.drop(
    columns=["Browser", "Platform", "Screen_Width", "Screen_Height", "Time", "Date_OSF"]
)

# Save data ==============================================================
alldata.to_csv("../data/rawdata.csv", index=False)
alldata_ig.to_csv("../data/rawdata_IllusionGame.csv", index=False)
print("Done!")