// Retrieve and save browser info
var demographics_browser_info = {
    type: jsPsychBrowserCheck,
    data: {
        screen: "browser_info",
    },
    on_finish: function () {
        data = jsPsych.data.get().filter({ screen: "browser_info" }).values()[0]
        jsPsych.data.addProperties({
            ["screen_height"]: data["height"],
            ["screen_width"]: data["width"],
        })
        for (var key in data) {
            if (
                [
                    "vsync_rate",
                    "os",
                    "mobile",
                    "browser",
                    "browser_version",
                ].includes(key)
            ) {
                jsPsych.data.addProperties({
                    [key]: data[key],
                })
            }
        }
        jsPsych.data.addProperties()
    },
}

// Participant ID
var demographics_participant_id = {
    type: jsPsychSurveyText,
    questions: [
        {
            // prompt: "Введите номер участника/участницы:",
            prompt: "Enter participant ID:",
            placeholder: "001",
            name: "Participant_ID",
        },
    ],
    data: {
        screen: "participant_id",
        date: new Date().toLocaleDateString("fr-FR"),
        time: new Date().toLocaleTimeString("fr-FR"),
    },
    on_finish: function () {
        // Store `participant_id` so that it can be reused later
        jsPsych.data.addProperties({
            participant_id: jsPsych.data.get().last().values()[0]["response"][
                "Participant_ID"
            ],
        })
    },
}

// var demographics = {
//     type: jsPsychSurveyText,
//     questions: [
//         {
//             prompt: "Please enter your age (in years)",
//             placeholder: "e.g., '31'",
//             name: "age",
//         },
//         {
//             prompt: "Please enter your gender",
//             placeholder: "e.g., Female",
//             name: "gender",
//         },
//         {
//             prompt: "Please enter your ethnicity",
//             placeholder: "e.g., Caucasian",
//             name: "ethnicity",
//         },
//         {
//             prompt: "English level",
//             placeholder: "native, fluent, intermediate, beginner",
//             name: "english",
//         },
//     ],
//     data: {
//         screen: "demographics",
//     },
// }
// timeline.push(demographics)
