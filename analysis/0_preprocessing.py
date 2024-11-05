import json
import numpy as np
import pandas as pd
import os

# Specify the path to the folder containing the files
path = "../../../../Downloads/OSF_raw_data/osfstorage-archive"
files = [f for f in os.listdir(path) if f.endswith('.csv')]

# Loop through files ======================================================
alldata = pd.DataFrame() # Initialize empty dataframes
alldata_ig = pd.DataFrame() # Initialize empty dataframes

for i, file in enumerate(files):
    print(f"File N°{i+1}") # Print progress

    # Skip if participant already in the dataset
    if (
        "Participant" in alldata.columns
        and file in alldata["Participant"].values
    ):
        continue

    # Full path to the file
    file_path = os.path.join(path, file) 
    # Load the data from the file into a DataFrame
    data = pd.read_csv(file_path)

    # Participant =========================================================
    data["screen"].unique()

    # Browser info --------------------------------------------------------
    browser = data[data["screen"] == "browser_info"].iloc[0]

    # Creating the DataFrame with participant data
    participant_name = os.path.splitext(file)[0]

    df = pd.DataFrame({
        "Participant": participant_name,
        "Experiment_Duration": data["time_elapsed"].max() / 1000 / 60,
        "Date": browser.get("date", np.nan),
        "Time": browser.get("time", np.nan),
        "Browser": browser.get("browser", np.nan),
        "Mobile": browser.get("mobile", np.nan),
        "Platform": browser.get("os", np.nan),
        "Screen_Width": browser.get("screen_width", np.nan),
        "Screen_Height": browser.get("screen_height", np.nan),
        "Language": browser.get("language", np.nan),
        "Source": browser.get("researcher", np.nan),
       }, index=[0])

    # Demographics --------------------------------------------------------
    demo = data[data["screen"] == "demographics"].iloc[0]
    demo = json.loads(demo["response"])

    # Age
    df["Age"] = demo["age"]
    df["Age"] = pd.to_numeric(df["Age"], errors="coerce")

    # Gender
    gender = demo["gender"]
    gender = "Male" if gender in ["мужской", "Мужской", "м", "М", "муж", "Муржской"] else gender
    gender = "Female" if gender in ["женский", "ж", "жен"] else gender

    # Assign NaN if gender is an empty string or cannot be identified
    gender = np.nan if gender in ["", "a"] else gender

    df["Gender"] = gender

    # Country
    country = demo["Country"]
    country = "Russia" if country in ["Россия", "Россия ", "россия", "Российская Федерация ", "Российская Федерация", "РФ"] else country
    country = "Georgia" if country in ["Грузия"] else country
    country = "Serbia" if country in ["Сербия"] else country
    country = "Ukraine" if country in ["Украина"] else country
    country = "Germany" if country in ["Германия", "германия", "Германия . Украина"] else country
    country = "Sweden" if country in ["Швеция"] else country
    country = "Belarus" if country in ["Беларусь"] else country
    country = "Israel" if country in ["израиль"] else country
    country = "Italy" if country in ["Италия"] else country
    country = "Czech Republic" if country in ["Чехия"] else country
    country = "Latvia" if country in ["Латвия"] else country

    # Assign NaN if country is an empty string or cannot be identified
    country = np.nan if country in ["", "a"] else country

    df["Country"] = country

    # Nationality
    nationality = demo["nationality"]
    nationality = (
        "Russian"
        if nationality
        in [
            "русский",
            "русская",
            "россиянин ",
            "россиянка",
            "Русский",
            "Россиянин ",
            "Россия",
            "нет/русский",
            "татарка/русская",
        ]
        else nationality
    )
    nationality = "Georgian" if nationality in ["грузин", "грузинка"] else nationality
    nationality = (
        "Ukrainian"
        if nationality in ["украинец", "украинка", "Украинец", "Украинка"]
        else nationality
    )
    nationality = (
        "Kazakh"
        if nationality in ["казах", "казашка", "Казах", "Казашка"]
        else nationality
    )
    nationality = (
        "Belarusian"
        if nationality in ["белорус", "белоруска", "Белорус", "Белоруска"]
        else nationality
    )
    nationality = (
        "Jew"
        if nationality in ["еврей", "еврейка"]
        else nationality
    )
    nationality = (
        "German"
        if nationality in ["немка"]
        else nationality
    )
    nationality = (
        "Tatar"
        if nationality in ["татарка"]
        else nationality
    )
    nationality = (
        "European"
        if nationality in ["европеец"]
        else nationality
    )

    # Assign NaN if nationality is an empty string
    nationality = np.nan if nationality in ["", "a"] else nationality

    df["Nationality"] = nationality

    # Questionnaires =====================================================
        # Questionnaire Order ------------------------------------------------
    # Select all screens start _with 'questionnaire'
    order = data["screen"].str.startswith("questionnaire")
    order[order.isna()] = False
    order = list(data[order]["screen"])

    # PID-5 --------------------------------------------------------------
    pid5 = data[data["screen"] == "questionnaire_pid5"].iloc[0]

    df["PID5_Duration"] = pid5["rt"] / 1000 / 60
    df["PID5_Order"] = order.index("questionnaire_pid5") + 1

    pid5 = json.loads(pid5["response"])
    for item in pid5:
        df["PID5_" + item] = pid5[item]

    # IPIP6 --------------------------------------------------------------
    ipip6 = data[data["screen"] == "questionnaire_ipip6"].iloc[0]

    df["IPIP6_Duration"] = ipip6["rt"] / 1000 / 60
    df["IPIP6_Order"] = order.index("questionnaire_ipip6") + 1

    ipip6 = json.loads(ipip6["response"])
    for item in ipip6:
        df["IPIP6_" + item] = ipip6[item]

        # Illusion Game ==================================================
    ig = data[data["screen"] == "IG_Trial"]
    ig = ig[ig["block"] != "Practice"]

    df_ig = ig[
        ["Illusion_Type", "Illusion_Difference", "Illusion_Strength"]
    ].reset_index(drop=True)
    df_ig["Participant"] = participant_name
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
alldata = alldata.drop(columns=["Platform"])

# Save data ==============================================================
alldata.to_csv("../data/rawdata_participants.csv", index=False)
alldata_ig.to_csv("../data/rawdata_IllusionGame.csv", index=False)
print("Done!")