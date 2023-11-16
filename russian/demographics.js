// Retrieve and save browser info
var demographics_browser_info = {
    type: jsPsychBrowserCheck,
    data: {
        screen: "browser_info",
        date: new Date().toLocaleDateString("fr-FR"),
        time: new Date().toLocaleTimeString("fr-FR"),
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
            // prompt: "Enter participant ID:",
            prompt: "Введите номер участника/участницы:",
            placeholder: "001",
            name: "Participant_ID",
        },
    ],
    // button_label: "Continue",
    button_label: "Продолжить",
    data: {
        screen: "participant_id",
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

var demographics_basic = {
    type: jsPsychSurveyText,
    questions: [
        // {
        //     prompt: "Please enter your age (in years)",
        //     placeholder: "e.g., '31'",
        //     name: "age",
        // },
        {
            prompt: "Укажите, пожалуйста, сколько вам полных лет:",
            placeholder: "например, 29",
            name: "age",
        },
        // {
        //     prompt: "Please enter your gender",
        //     placeholder: "e.g., Female",
        //     name: "gender",
        // },
        {
            prompt: "Укажите, пожалуйста, ваш пол:",
            placeholder: "например, женский",
            name: "gender",
        },
        // {
        //     prompt: "Please enter your ethnicity",
        //     prompt_ru: "Укажите, пожалуйста, Вашу этническую принадлежность"
        //     placeholder: "e.g., Caucasian",
        //     placeholder: "например, беларус"
        //     name: "ethnicity",
        // },
        // {
        //     prompt: "English level",
        //     placeholder: "native, fluent, intermediate, beginner",
        //     name: "english",
        // },
    ],
    data: {
        screen: "demographics",
    },
    button_label: "Продолжить",
}

var demographics_consent = {
    type: jsPsychHtmlButtonResponse,
    stimulus:
        // Logo
        //         "<img src='https://blogs.brighton.ac.uk/sussexwrites/files/2019/06/University-of-Sussex-logo-transparent.png' width='150px' align='right'/><br><br><br><br><br>" +
        "<img src='https://blogs.brighton.ac.uk/sussexwrites/files/2019/06/University-of-Sussex-logo-transparent.png' width='150px' style='position: absolute; top: 60px; right: 60px;'/>" +
        "<br><br><br><br><br>" +
        // Title
        // Informed Consent
        "<h3>Информированное согласие</h3>" +
        // In this study, you will be asked to complete a few questionnaires and perform some tests to see how fast you are. The goal is to study how Humans are impacted by visual illusions.The goal is to study how Humans are impacted by visual illusions.
        "<p style='margin-left: 24%; margin-right: 24%; text-align: left;'>В рамках данного исследования вам будет предложено заполнить несколько опросников и выполнить ряд тестов, направленных на изучение вашей скорости реакций. Цель исследования - изучить влияние визуальных иллюзий на человека.</p>" +
        // Your participation in this research will be kept completely confidential. <b>Your responses are entirely anonymous</b>, and no IP address or any identifiers are collected.
        "<p style='margin-left: 24%; margin-right: 24%; text-align: left;'>Ваше участие в исследовании будет строго конфиденциальным. <b>Любые ваши ответы будут полностью анонимны.</b> Идентификационные данные, включая IP адреса, не собираются. </p>" +
        // Your participation contributes to scientific advancement. <b>By participating, you agree to follow the instructions and provide honest answers.</b> If you do not wish to participate this survey, simply close your browser.
        "<p style='margin-left: 24%; margin-right: 24%; text-align: left;'>Ваше участие поможет развитию науки и научного знания. <b>Принимая участие, вы соглашаетесь следовать инструкциям и предоставлять честные ответы.</b> Если вы не желаете участвовать в этом исследовании, пожалуйста, просто закройте ваш браузер.</p>" +
        // "<p>Please note that various checks will be performed to ensure the validity of the data.<br>We reserve the right to return your participation or prorate reimbursement should we detect non-valid responses (e.g., random pattern of answers, instructions not read, ...).</p>"
        "<p style='margin-left: 24%; margin-right: 24%; text-align: left;'> Обратите внимание, что будут проведены различные проверки для обеспечения достоверности данных. Мы оставляем за собой право не включать данные, если выявим несоответствия (например, случайный порядок ответов, непрочитанные инструкции и прочее).</p>" +
        // If you have any questions about the project, please contact D.Makowski@sussex.ac.uk. This project has been reviewed and approved by the Ethics Committee of the University of Sussex (XXXX).
        "<p style='margin-left: 24%; margin-right: 23%; text-align: left;'><br><sub><sup>Если у вас возникнут любые вопросы об исследовании, пожалуйста, свяжитесь с нами по адресу D.Makowski@sussex.ac.uk. Данное исследование было рассмотрено и одобрено этическим комитетом университета Сассекса (XXXX).</sup></sub></p>",

    choices:
        // choices: "I read and consent"
        ["Я прочитал(а) и даю согласие"],
    data: { screen: "consent" },
}
