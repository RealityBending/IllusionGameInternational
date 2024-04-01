// Retrieve and save browser info ========================================================
var demographics_browser_info = {
    type: jsPsychBrowserCheck,
    data: {
        screen: "browser_info",
        date: new Date().toLocaleDateString("fr-FR"),
        time: new Date().toLocaleTimeString("fr-FR"),
    },
    on_finish: function (data) {
        dat = jsPsych.data.get().filter({ screen: "browser_info" }).values()[0]

        // Rename
        data["screen_height"] = dat["height"]
        data["screen_width"] = dat["width"]

        // Add URL variables - ?sona_id=x&exp=1
        let urlvars = jsPsych.data.urlVariables()
        data["sona_id"] = urlvars["sona_id"]
        data["researcher"] = urlvars["exp"]
        data["language"] = urlvars["lang"]
    },
    inclusion_function: (data) => {
        return data.mobile === false
    },
    exclusion_message: (data) => {
        if (data.mobile) {
            return // This experiment is not available on mobile due to screen size restrictions.</b><br>Please return on laptop or computer."
            "<p><b> Данное исследование не адаптировано под мобильные устройства.</b><br>Пожалуйста, используйте ноутбук или компьютер.</p> "
        }
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
            prompt: "Укажите, пожалуйста, ваш возраст:",
            placeholder: "например, 31",
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
        // prompt: "Please enter your nationality",
        // placeholder: "e.g., Caucasian",
        {
            prompt: "Укажите, пожалуйста, вашу национальность:",
            placeholder: "например, беларус",
            name: "nationality",
        },
        // prompt: "In which country do you currently live?",
        // placeholder: "e.g., Republic of Belarus",
        // name: "Country",
        {
            prompt: "Укажите, пожалуйста, текущую страну вашего проживания:",
            placeholder: "например, Беларусь",
            name: "Country",
        },
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
    css_classes: ["narrow-text"],
    stimulus:
        // Logo and title
        "<img src='https://blogs.brighton.ac.uk/sussexwrites/files/2019/06/University-of-Sussex-logo-transparent.png' width='170px' align='right' style='margin-top: 10px; margin-right: 10px;'/><br><br><br><br><br>" +
        // Informed Consent
        "<h2>Информированное согласие</h2>" +
        // Overview
        // Invitation to Take Part
        "<p style='text-align: left; margin-left: 2%; margin-right: 2%;'><b>Приглашение принять участие</b><br>" +
        // You are being invited to take part in a research study to further our understanding of Human psychology. Thank you for carefully reading this information sheet. This study is being conducted by Dr Dominique Makowski from the School of Psychology, University of Sussex, who is happy to be contacted (D.Makowski@sussex.ac.uk) if you have any questions.</p>"
        "<p style='text-align: left; margin-left: 3%; margin-right: 3%;'>Вам предлагается принять участие в исследовании, которое поможет углубить наши знания о психологии человека. Пожалуйста, внимательно прочитайте данное информированное согласие.</p>" +
        // This study is being conducted by Dr Dominique Makowski from the School of Psychology, University of Sussex, who is happy to be contacted (D.Makowski@sussex.ac.uk) if you have any questions.</p>"
        "<p style='text-align: left; margin-left: 3%; margin-right: 3%;'>Данное исследование проводится доктором Домиником Маковски, преподавателем факультета психологии Университета Сассекс. Если у вас возникнут вопросы об исследовании, вы можете связаться с Домиником, используя почту D.Makowski@sussex.ac.uk.</p>" +
        // Description
        // Why have I been invited and what will I do?
        "<p style='text-align: left; margin-left: 2%; margin-right: 2%;'><b>Почему меня пригласили и что мне потребуется сделать?</b><br>" +
        // The goal is to study how Humans are impacted by visual illusions. In this study, you will be asked to complete a few questionnaires and perform some tasks where we will measure how fast and accurately you can perceive small visual differences.</p>"
        "<p style='text-align: left; margin-left: 3%; margin-right: 3%;'>Цель данного исследования заключается в изучении влияния иллюзий на человека. В рамках исследования вам будет предложено заполнить несколько опросников и выполнить ряд заданий. В процессе мы измерим, насколько точно и быстро вы способны замечать небольшие визуальные отличия.</p>" +
        // The whole experiment will take you <b>about 35 min</b> to complete. Please make sure that you are in a quiet environment, <b>on a computer</b> (the experiment is not mobile-friendly), and that you have time to complete it in one go.
        "<p style='text-align: left; margin-left: 3%; margin-right: 3%;'> Исследование займет около 35 минут. Пожалуйста, убедитесь, что у вас есть достаточное количество времени, чтобы завершить все задания за один раз, не прерываясь, а также тихое место и доступ к компьютеру или ноутбуку. К сожалению, исследование не предназначено для мобильных устройств/планшетов и не будет корректно отображаться на устройствах такого типа.</p>" +
        // Results and personal information
        // What will happen to the results and my personal information?
        "<p style='text-align: left; margin-left: 2%; margin-right: 2%;'><b>Как будут использованы результаты и предоставленная мною информация?</b><br>" +
        // The results of this research may be written into a scientific publication. Your anonymity will be ensured in the way described in the consent information below. Please read this information carefully and then, if you wish to take part, please acknowledge that you have fully understood this sheet, and that you consent to take part in the study as it is described here.
        "<p style='text-align: left; margin-left: 3%; margin-right: 3%;'>Результаты данного исследования могут быть опубликованы в научных журналах. Ваша анонимность будет обеспечена согласно принципам, изложенным в информированном согласии ниже. Пожалуйста, внимательно ознакомьтесь с этой информацией. Если вы согласны принять участие на предложенных условиях, пожалуйста, подтвердите, что вы полностью поняли содержание этого документа.</p>" +
        // Consent
        "<p style='text-align: left; margin-left: 2%; margin-right: 2%;'><b>Форма согласия</b><br></p>" +
        // Bullet points
        // I understand that by signing below I am agreeing to take part in the University of Sussex research described here, and that I have read and understood this information sheet
        "<li style='text-align: left; margin-left: 3%; margin-right: 3%;'>Я понимаю, что продолжая, я соглашаюсь принять участие в описанном исследовании Университета Сассекса и подтверждаю, что я прочитал(а) и понял(а) условия, изложенные в информированном согласии.</li>" +
        // I understand that my participation is entirely voluntary, that I can choose not to participate in part or all of the study, and that I can withdraw at any stage without having to give a reason and without being penalised in any way (e.g., if I am a student, my decision whether or not to take part will not affect my grades).
        "<li style='text-align: left; margin-left: 3%; margin-right: 3%;'>Я понимаю, что участвую в исследовании на волонтерских основаниях. Я также осознаю, что могу отказаться от участия на любом этапе исследования без объяснения причин и без каких-либо негативных последствий.</li>" +
        // I understand that since the study is anonymous, it will be impossible to withdraw my data once I have completed it.
        "<li style='text-align: left; margin-left: 3%; margin-right: 3%;'>Я понимаю, что мое участие в исследовании полностью анонимно и, как только я завершу прохождение, мои результаты будет невозможно идентифицировать и удалить.</li>" +
        // I understand that my personal data will be used for the purposes of this research study and will be handled in accordance with Data Protection legislation. 
        "<li style='text-align: left; margin-left: 3%; margin-right: 3%;'>Я понимаю, что предоставленные мною данные будут использованы в исследовательских целях и обработаны в соответствии с законодательством о защите персональных данных.</li>" +
        //I understand that the University's Privacy Notice provides further information on how the University uses personal data in its research.
        "<li style='text-align: left; margin-left: 3%; margin-right: 3%;'>Я понимаю, что Университет Сассекса предоставляет дополнительную информацию о том, как могут быть использованы персональные данные, в Уведомлении о конфиденциальности на сайте Университета.</li>" +
        // I understand that my collected data will be stored in a de-identified way. De-identified data may be made publically available through secured scientific online data repositories.
        "<li style='text-align: left; margin-left: 3%; margin-right: 3%;'>Я понимаю, что собранные данные будут сохранены в обезличенном виде. В такой форме они могут быть размещены в защищенных научных онлайн репозиториях хранения данных и общедоступны.</li>" +
        // Incentive
        // Please note that various checks will be performed to ensure the validity of the data. We reserve the right to withhold credit awards or reimbursement should we detect non-valid responses (e.g., random patterns of answers, instructions not read, ...).
        // By participating, you agree to follow the instructions and provide honest answers. If you do not wish to participate, simply close your browser.
        "<p style='text-align: left; margin-left: 3%; margin-right: 3%;'>Принимая участие, вы соглашаетесь следовать инструкциям и предоставлять честные ответы. Если вы не желаете принимать участие в исследовании, пожалуйста, просто закройте браузер.</li>" +
        "</p>" +
        // For further information about this research, or if you have any concerns, please contact Dr Dominique Makowski (D.Makowski@sussex.ac.uk). This research has been approved (ER/ASF25/3) by the ethics board of the School of Psychology. The University of Sussex has insurance in place to cover its legal liabilities in respect of this study.
        "<p style='text-align: left; margin-left: 1%; margin-right: 1%;'><br><sub><sup>В случае возникновения дополнительных вопросов об исследовании, пожалуйста, свяжитесь с доктором Домиником Маковски (D.Makowski@sussex.ac.uk). Это исследование было одобрено этическим комитетом факультета психологии Университета Сассекса под номером ER/ASF25/3. Университет Сассекса имеет страхование, которое покрывает его юридическую ответственность в отношении данного исследования.</sup></sub></p>",
    // choices: ["I read, understood, and I consent"],
    choices: ["Я подтверждаю, что данное информационное согласие было мною прочитано, изложенный текст понятен. Я подтверждаю свою готовность принять участие в исследовании."],
    data: { screen: "consent" },
}
