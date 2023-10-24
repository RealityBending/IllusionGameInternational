// Mini IPIP6 questionnaire
var ipip6_items = [
    "Я - душа любой вечеринки",
    "Я сопереживаю эмоциям других людей",
    "Я сразу выполняю домашние дела",
    "Мое настроение часто меняется",
    "У меня богатое воображение",
    "Я чувствую, что имею право на большее",
    "Я не многословен/многословна",
    "Меня не интересны проблемы других людей",
    "Мне трудно понимать абстрактные идеи",
    "Я люблю порядок",
    "Я устраиваю беспорядок",
    "Я заслуживаю большего в жизни",
    "У меня не очень хорошее воображение",
    "Я чувствую эмоции других людей",
    "Большую часть времени я расслаблен",
    "Меня легко расстроить",
    "Я редко чувствую себя грустным(ой)",
    "Я бы хотел(а), что бы меня увидели за рулем дорогой машины",
    "Я стараюсь оставаться в тени",
    "Меня не очень интересуют другие люди",
    "Меня не интересуют абстрактные идеи",
    "Я часто забываю положить вещи на место",
    "На вечеринках я общаюсь с большим количеством разных людей",
    "Я получил(а) бы много удовольствия от владения дорогими предметами роскоши",
]
var ipip6_dimensions = [
    "Extraversion_1",
    "Agreeableness_2",
    "Conscientiousness_3",
    "Neuroticism_4",
    "Openness_5",
    "HonestyHumility_6_R",
    "Extraversion_7_R",
    "Agreeableness_8_R",
    "Openness_9_R",
    "Conscientiousness_10",
    "Conscientiousness_11_R",
    "HonestyHumility_12_R",
    "Openness_13_R",
    "Agreeableness_14",
    "Neuroticism_15_R",
    "Neuroticism_16",
    "Neuroticism_17_R",
    "HonestyHumility_18_R",
    "Extraversion_19_R",
    "Agreeableness_20_R",
    "Openness_21_R",
    "Conscientiousness_22_R",
    "Extraversion_23",
    "HonestyHumility_24_R",
]

// Personality Inventory for DSM-V - Brief (Maladaptive Traits)
var pid_items = [
    "По мнению людей, я безрассудный человек",
    "Мне кажется, я действую только под влиянием импульса",
    "Я понимаю, что это неверно, но все равно принимаю опрометчивые решения",
    "Я часто ощущаю, что мои действия не имеют значения",
    "Другие видят меня безответственным человеком",
    "Я не умею планировать наперед",
    "Мои мысли часто непонятны другим",
    "Я беспокоюсь практически из-за всего",
    "Я легко расстраиваюсь, часто почти без причины",
    "Больше всего я боюсь остаться один",
    "Я зацикливаюсь на одном варианте, даже если очевидно, что он не работает",
    "Я видел вещи, которых на самом деле не было",
    "Я сторонюсь романтических отношений",
    "Меня не интересует дружба",
    "Меня легко приводят в раздражение самые разнообразные вещи",
    "Мне не нравится сближаться с людьми",
    "Ничего страшного не случится, если я задену чувства другого человека",
    "Я редко испытываю воодушевление по какому-либо поводу",
    "Я жажду внимания",
    "Мне часто приходится иметь дело с людьми, которые менее значительны, чем я",
    "Меня часто посещают мысли, которые кажутся мне вполне разумными, но другим они кажутся странными",
    "Я пользуюсь людьми, чтобы получить то, чего хочу",
    "Я часто «отключаюсь» и потом внезапно прихожу в сознание и понимаю, что прошло уже много времени",
    "Все вокруг часто кажется мне нереальным или, наоборот, реальнее, чем обычно",
    "Я легко пользуюсь другими в своих интересах",
]

var pid_dimensions = [
    "Disinhibition_1",
    "Disinhibition_2",
    "Disinhibition_3",
    "Detachment_4",
    "Disinhibition_5",
    "Disinhibition_6",
    "Psychoticism_7",
    "NegativeAffect_8",
    "NegativeAffect_9",
    "NegativeAffect_10",
    "NegativeAffect_11",
    "Psychoticism_12",
    "Detachment_13",
    "Detachment_14",
    "NegativeAffect_15",
    "Detachment_16",
    "Antagonism_17",
    "Detachment_18",
    "Antagonism_19",
    "Antagonism_20",
    "Psychoticism_21",
    "Antagonism_22",
    "Psychoticism_23",
    "Psychoticism_24",
    "Antagonism_25",
]

// Short Suggestibility Scale (SSS  21 items; Kotov, Bellman & Watson, 2004)
// From the Multidimensional Iowa Suggestibility Scale (MISS)
var sss_items = [
    "I am easily influenced by other people's opinions",
    "I can be influenced by a good commercial",
    "When someone coughs or sneezes, I usually feel the urge to do the same",
    "Imagining a refreshing drink can make me thirsty",
    "A good salesperson can really make me want their product",
    "I get a lot of good practical advice from magazines or TV",
    "If a product is nicely displayed, I usually want to buy it",
    "When I see someone shiver, I often feel a chill myself",
    "I get my style from certain celebrities",
    "When people tell me how they feel, I often notice that I feel the same way",
    "When making a decision, I often follow other people's advice",
    "Reading descriptions of tasty dishes can make my mouth water",
    "I get many good ideas from others",
    "I frequently change my opinion after talking with others",
    "After I see a commercial for lotion, sometimes my skin feels dry",
    "I discovered many of my favorite things through my friends",
    "I follow current fashion trends",
    "Thinking about something scary can make my heart pound",
    "I have picked-up many habits from my friends",
    "If I am told I don't look well, I start feeling ill",
    "It is important for me to fit in",
]

var sss_dimensions = [
    "SSS_1",
    "SSS_2",
    "SSS_3",
    "SSS_4",
    "SSS_5",
    "SSS_6",
    "SSS_7",
    "SSS_8",
    "SSS_9",
    "SSS_10",
    "SSS_11",
    "SSS_12",
    "SSS_13",
    "SSS_14",
    "SSS_15",
    "SSS_16",
    "SSS_17",
    "SSS_18",
    "SSS_19",
    "SSS_20",
    "SSS_21",
]

// Questionnaire ========================================================================

// Functions
function format_questions_analog(
    items,
    dimensions,
    ticks = ["Не верно", "Верно"]
) {
    var questions = []
    for (const [index, element] of items.entries()) {
        questions.push({
            prompt: "<b>" + element + "</b>",
            name: dimensions[index],
            ticks: ticks,
            required: false,
            min: 0,
            max: 1,
            step: 0.01,
            slider_start: 0.5,
        })
    }
    return questions
}

// IPIP
var ipip6_questionaire = {
    type: jsPsychMultipleSlider,
    // This function is loaded in RestingState.js
    questions: format_questions_analog(ipip6_items, ipip6_dimensions),
    randomize_question_order: false,
    preamble:
        "<p>Пожалуйста, ответите на следующие вопросы исходя из того, насколько точно каждое утверждение описывает Вас в целом.</p>",
    require_movement: false,
    slider_width: 600,
    data: {
        screen: "IPIP6",
    },
}

// PID
var pid_questions = []
for (const [index, element] of pid_items.entries()) {
    pid_questions.push({
        prompt: "<b>" + element + "</b>",
        name: pid_dimensions[index],
        labels: [
            "Совершенно неверно или часто неверно",
            "Иногда или в некоторой степени неверно",
            "Иногда или в некоторой степени верно",
            "Совершенно верно или часто верно",
        ],
        required: false,
    })
}

var pid5_questionaire = {
    type: jsPsychSurveyLikert,
    questions: pid_questions,
    randomize_question_order: false,
    preamble:
        "<p>Перед Вами список утверждений, которые разные люди могут использовать для того, чтобы охарактеризовать себя.</p>" +
        "<p>Пожалуйста, выберите ответ, который наилучшим образом описывает вас.</p>",
    require_movement: false,
    slider_width: 700,
    data: {
        screen: "PID5",
    },
}

// SSS
var sss_questions = []
for (const [index, element] of sss_items.entries()) {
    sss_questions.push({
        prompt: "<b>" + element + "</b>",
        name: sss_dimensions[index],
        labels: [
            "Not at all or very slightly",
            "A little",
            "Somewhat",
            "Quite a bit",
            "A lot",
        ],
        required: false,
    })
}

var sss_questionaire = {
    type: jsPsychSurveyLikert,
    questions: sss_questions,
    randomize_question_order: true,
    preamble:
        "<p><b>About your sensitivity and adaptability...</b></p>" +
        "<p>Please indicate to what extent the following statements apply to you.</p>",
    require_movement: false,
    slider_width: 700,
    data: {
        screen: "SSS",
    },
}
