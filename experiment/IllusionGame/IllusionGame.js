// Global variables ===============================================================================
var block_number = 1 // block indexing variable
var trial_number = 1 // trial indexing variable

// Instructions ==================================================================================
// General instructions
var IG_instructions = {
    type: jsPsychHtmlButtonResponse,
    // choices_eng: "Start the practice!"
    choices: ["Начать тренировку!"],
    stimulus:
    // Illusion Game
        "<p><b>Игра Иллюзий</b></p>" +
        // instruction_eng: "In this game of speed and reflex, you will need to make visual judgments (for instance, which circle is the biggest, or which line is the longest), as fast and as correctly as possible, while <b>resisting different visual illusions."
        "<p>В этой игре на скорость реакции Вам нужно будет как можно быстрее и точнее <b>дать визуальную оценку</b> объектам. <br>Например, выбрать, какой круг больше или какая линия длиннее, <b>сопротивляясь эффектам иллюзий.</b></p>" +
        // instruction_eng: "We are going to start with some examples of all the illusions you will encounter in the game."
        "<p>Мы начнем с примеров всех иллюзий, которые Вы можете встретить в игре.</p>",
    data: { screen: "IG_instructions" },
}

// Instructions for Illusion Trials

var mullerlyer_instructions =
    // instruction_eng: "In this part, two horizontal red lines will appear one above the other"
    "<p>В этой части тренировки на экране появятся две красные горизонтальные линии, расположенные друг под другом.</p>" +
    // instruction_eng: "Your task is to select which <b>line is longer</b> in length as fast as you can, without making errors.
    "<p>Ваша задача - как можно быстрее и без ошибок определить, <b>какая из линий длиннее</b>.</p>" +
    // instruction_eng: "Don't get distracted by the surrounding black arrows at the end of the red lines!"
    "<p>Пожалуйста, постарайтесь не обращать внимания на черные стрелки в конце красных линий!</p>" +
    // instruction_eng: "Press the UP or the DOWN arrow to indicate where is the longer red line"
    "<p>Нажмите на <b>стрелку ВВЕРХ или ВНИЗ</b> на клавиатуре, чтобы указать, где находится <b>более длинная красная линия.</b></p>" +
    "<div style='float: center'><img src='IllusionGame/images/MullerLyer_Demo.png' height='200'></img>" +
    "<p><img src='IllusionGame/images/answer_updown_keyboard.PNG' height='100'></img></p>" +
    // instruction_eng: "In this example, the correct answer is the UP arrow."
    "<p class='small'>В этом примере правильный ответ - верхняя линяя, то есть <b>стрелка вверх</b>.</p></div>" +
    // instruction_eng: "Are you ready? Press ENTER to start."
    "<p>Вы готовы? <br><b>Нажмите ENTER, чтобы начать.</b><br></p>"

var ebbinghaus_instructions =
    // instruction_eng: "In this part, two red circles will appear side by side on the screen."
    "<p>В этой части тренировки на экране появятся два красных круга, расположенные рядом.</p>" +
    // instruction_eng: "Your task is to select which <b>red circle is bigger</b> in size as fast as you can, without making errors."
    "<p>Ваша задача - определить как можно быстрее, <b>какой красный круг больше</b>, не допустив ошибку.</p>" +
    // instruction_eng: "Don't get distracted by the surrounding black circles around the red circles."
    "<p>Постарайтесь не отвлекаться на черные круги вокруг красных кругов!</p>" +
    // instruction_eng: "Press <b>the LEFT or the RIGHT arrow</b> to indicate which is the bigger red circle."
    "<p>Нажмите <b>на ЛЕВУЮ или на ПРАВУЮ стрелку</b> на клавиатуре, чтобы выбрать, <b>какой красный круг больше.</b></p>" +
    "<div style='float: center'><img src='IllusionGame/images/Ebbinghaus_Demo.png' height='200'></img>" +
    "<p><img src='IllusionGame/images/answer_leftright_keyboard.PNG' height='100'></img></p>" +
    // instruction_eng: "In this example, the correct answer is the <b>LEFT arrow</b>."
    "<p class='small'>В этом примере верный ответ - левый круг, то есть <b>левая стрелка</b>).</p></div>" +
    // instruction_eng: "Are you ready? Press ENTER to start
    "<p>Вы готовы? <br><b>Нажмите ENTER, чтобы начать.</b><br></p>"

var verticalhorizontal_instructions =
    // instruction_eng: "In this part, two red lines will appear side by side."
    "<p>В этой части тренировки на экране появятся две красные линии, расположенные рядом.</p>" +
    // instruction_eng: "Your task is to tell <b>which line is longer</b> in length, regardless of their orientation, as fast as you can, and without making errors."
    "<p>Ваша задача - как можно быстрее и без ошибок определить, <b>какая линяя длиннее</b>, несмотря их расположение.</p>" +
    // instruction_eng: "Don't get distracted by the orientation of the lines!"
    "<p>Пожалуйста, пострайтесь не отвлекаться на то, как расположены линии! </p>" +
    // instruction_eng: "Press <b>the LEFT or the RIGHT arrow</b> to indicate which line is the longer one."
    "<p>Нажмите <b>на ЛЕВУЮ или на ПРАВУЮ стрелку</b> на клавиатуре, чтобы указать, где находится <b>более длинная линия.</b></p>" +
    "<div style='float: center'><img src='IllusionGame/images/VerticalHorizontal_Demo.png' height='200'></img>" +
    "<p><img src='IllusionGame/images/answer_leftright_keyboard.PNG' height='100'></img></p>" +
    // instruction_eng: "In this example, the correct answer is the <b>LEFT arrow</b>."
    "<p class='small'>В этом примере верный ответ - линия слева, то есть <b>левая стрелка</b>).</p></div>" +
    // instruction_eng: "Are you ready? Press ENTER to start"
    "<p>Вы готовы? <br><b>Нажмите ENTER, чтобы начать.</b><br></p>"

function add_blocknumber(instructions, block) {
    return "<p><b>Part " + block + "/6" + "</b></p>" + instructions
}

// Math utilities =================================================================================
function randomInteger(min = 1, max = 10) {
    return Math.round(Math.random() * (max - min) + min)
}

function cumulative_probability(x, mean, sd) {
    var z = (x - mean) / Math.sqrt(2 * sd * sd)
    var t = 1 / (1 + 0.3275911 * Math.abs(z))
    var a1 = 0.254829592
    var a2 = -0.284496736
    var a3 = 1.421413741
    var a4 = -1.453152027
    var a5 = 1.061405429
    var erf =
        1 -
        ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z)
    var sign = 1
    if (z < 0) {
        sign = -1
    }
    return (1 / 2) * (1 + sign * erf)
}

function round_digits(x, digits = 2) {
    return Number(
        Math.round(parseFloat(x + "e" + digits)) + "e-" + digits
    ).toFixed(digits)
}

// EEG / Physio trigger
// [x, y, width, height] in pixels. Set to [0, 0, 0, 0] to disable.
const marker_position = [0, 0, 100, 100]

function ig_create_marker(marker_position, color = "black") {
    const html = `<div id="marker" style="position: absolute; background-color: ${color};\
left:${marker_position[0]}px; top:${marker_position[1]}px; \
width:${marker_position[2]}px; height:${marker_position[3]}px";></div>`
    document.querySelector("body").insertAdjacentHTML("beforeend", html)
}
// Feedback and Debriefing ========================================================================
function get_results(illusion_mean, illusion_sd, illusion_type) {
    if (typeof illusion_type != "undefined") {
        var trials = jsPsych.data
            .get()
            .filter({ screen: "IG_Trial", type: illusion_type }) // results by block
    } else {
        var trials = jsPsych.data.get().filter({ screen: "IG_Trial" }) // overall results
    }
    var correct_trials = trials.filter({ correct: true })
    var proportion_correct = correct_trials.count() / trials.count()
    var rt_mean = trials.select("rt").mean()
    if (correct_trials.count() > 0) {
        var rt_mean_correct = correct_trials.select("rt").mean()
        var ies = rt_mean_correct / proportion_correct // compute inverse efficiency score
        var score_to_display = 100 - ies / 35
        if (score_to_display < 0) {
            score_to_display = 0
        }
        var percentile =
            100 - cumulative_probability(ies, illusion_mean, illusion_sd) * 100
    } else {
        var rt_mean_correct = ""
        var ies = ""
        var percentile = 0
        var score_to_display = 0
    }
    return {
        accuracy: proportion_correct,
        mean_reaction_time: rt_mean,
        mean_reaction_time_correct: rt_mean_correct,
        inverse_efficiency: ies,
        percentage: percentile,
        score: score_to_display,
    }
}

function get_debrief_display(results, type = "Block") {
    if (type === "Block") {
        // Debrief at end of each block
        var score =
            "<p>Your score for this illusion is " +
            '<p style="color: black; font-size: 48px; font-weight: bold;">' +
            Math.round(results.score * 10) / 10 +
            " %</p>"
    } else if (type === "Final") {
        // Final debriefing at end of game
        var score =
            // Your final score is</strong
            "<p><strong>Ваш итоговый результат</strong> " +
            '<p style="color: black; font-size: 48px; font-weight: bold;">&#127881; ' +
            Math.round(results.score) +
            " &#127881;</p>"
    }

    return {
        display_score: score,
        display_accuracy:
            // Correct Responses
            "<p style='color:rgb(76,175,80);'> Правильные ответы: <b>" +
            round_digits(results.accuracy * 100) +
            "" +
            "%</b></p>",
        display_rt:
            // Average Response Time
            "<p style='color:rgb(139, 195, 74);'> Среднее время ответа: <b>" +
            round_digits(results.mean_reaction_time) +
            "</b> ms.</p>",
        display_comparison:
            // You performed better than
            "<p style='color:rgb(76,175,80);'>Вы справились лучше, чем <b>" +
            round_digits(results.percentage) +
            // of the population
            "</b>% людей.</p>",
    }
}

// Trial Creation ================================================================================
function jittered_fixation_cross() {
    var fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function () {
            return (
                '<p style="color: black; font-size: 80px; padding-left: ' +
                randomInteger(0, 50) +
                "%; padding-right: " +
                randomInteger(0, 50) +
                "%; padding-top: " +
                randomInteger(0, 50) +
                "%; padding-bottom: " +
                randomInteger(0, 50) +
                '%">+</p>'
            )
        },
        choices: "NO_KEYS", // No response is accepted
        // trial_duration: 0, // (for testing)
        trial_duration: function () {
            return randomInteger(600, 1100)
        },
        save_trial_parameters: {
            trial_duration: true,
        },
        data: { screen: "IG_FixationCross" },
    }
    return fixation
}

// Trial
function IG_create_trial(
    illusion_name = "Ponzo",
    type = "updown",
    marker = true
) {
    if (type == "updown") {
        var trial = {
            type: jsPsychImageKeyboardResponse,
            stimulus: function () {
                return jsPsych.timelineVariable("stimulus")
            },
            choices: ["arrowup", "arrowdown"],
            data: function () {
                return jsPsych.timelineVariable("data")
            },
            on_load: function () {
                if (marker) {
                    ig_create_marker(marker_position)
                }
            },
            on_finish: function (data) {
                if (marker) {
                    document.querySelector("#marker").remove()
                }
                data.prestimulus_duration =
                    jsPsych.data.get().last(2).values()[0].time_elapsed -
                    jsPsych.data.get().last(3).values()[0].time_elapsed
                // Score the response as correct or incorrect.
                if (data.response != -1) {
                    if (
                        jsPsych.pluginAPI.compareKeys(
                            data.response,
                            data.correct_response
                        )
                    ) {
                        data.correct = true
                    } else {
                        data.correct = false
                    }
                } else {
                    // code mouse clicks as correct or wrong
                    if (data.click_x < window.innerHeight / 2) {
                        // use window.innerHeight for up vs down presses
                        data.response = "arrowdown"
                    } else {
                        data.response = "arrowup"
                    }
                    if (
                        jsPsych.pluginAPI.compareKeys(
                            data.response,
                            data.correct_response
                        )
                    ) {
                        data.correct = true
                    } else {
                        data.correct = false
                    }
                }
                // track block and trial numbers
                data.type = illusion_name
                data.illusion_strength = function () {
                    return jsPsych.timelineVariable("Illusion_Strength")
                }
                data.illusion_difference = function () {
                    return jsPsych.timelineVariable("Difference")
                }
                data.block_number = block_number
                data.trial_number = trial_number
                trial_number += 1
            },
        }
    } else {
        var trial = {
            type: jsPsychImageKeyboardResponse,
            stimulus: function () {
                return jsPsych.timelineVariable("stimulus")
            },
            choices: ["arrowleft", "arrowright"],
            data: function () {
                return jsPsych.timelineVariable("data")
            },
            on_load: function () {
                if (marker) {
                    ig_create_marker(marker_position)
                }
            },
            on_finish: function (data) {
                if (marker) {
                    document.querySelector("#marker").remove()
                }
                data.prestimulus_duration =
                    jsPsych.data.get().last(2).values()[0].time_elapsed -
                    jsPsych.data.get().last(3).values()[0].time_elapsed
                // Score the response as correct or incorrect.
                if (data.response != -1) {
                    if (
                        jsPsych.pluginAPI.compareKeys(
                            data.response,
                            data.correct_response
                        )
                    ) {
                        data.correct = true
                    } else {
                        data.correct = false
                    }
                } else {
                    // code mouse clicks as correct or wrong
                    if (data.click_x < window.innerWidth / 2) {
                        // use window.innerHeight for up vs down presses
                        data.response = "arrowleft"
                    } else {
                        data.response = "arrowright"
                    }
                    if (
                        jsPsych.pluginAPI.compareKeys(
                            data.response,
                            data.correct_response
                        )
                    ) {
                        data.correct = true
                    } else {
                        data.correct = false
                    }
                }
                // track block and trial numbers
                data.type = illusion_name
                data.illusion_strength = function () {
                    return jsPsych.timelineVariable("Illusion_Strength")
                }
                data.illusion_difference = function () {
                    return jsPsych.timelineVariable("Difference")
                }
                data.block_number = block_number
                data.trial_number = trial_number
                trial_number += 1
            },
        }
    }
    return trial
}

function IG_make_trials(
    stimuli,
    instructions,
    illusion_name,
    type,
    marker = true,
    debrief = true
) {
    var timeline = []

    // Set stimuli (var stimuli is loaded in stimuli/stimuli.js)
    var stim_list = stimuli.filter(
        (stimuli) => stimuli.data.Illusion_Type === illusion_name
    )

    // Preload images
    timeline.push({
        type: jsPsychPreload,
        images: stim_list.map((a) => a.stimulus),
    })

    // Instructions
    timeline.push({
        type: jsPsychHtmlKeyboardResponse,
        on_start: function () {
            document.body.style.cursor = "none"
        },
        choices: ["enter"],
        stimulus: instructions,
        post_trial_gap: 500,
    })

    // Create Trials timeline
    timeline.push({
        timeline: [
            jittered_fixation_cross(),
            IG_create_trial(illusion_name, (type = type), (marker = marker)),
        ],
        timeline_variables: stim_list,
        randomize_order: true,
        repetitions: 1,
    })

    // Debriefing Information
    if (debrief) {
        if (stimuli == stimuli_part1 || stimuli == stimuli_part2) {
            timeline.push(create_debrief((illusion_name = illusion_name)))
        } else if (stimuli === stimuli_training) {
            timeline.push({
                type: jsPsychHtmlButtonResponse,
                // choices_eng: "Continue"
                choices: ["Продолжить"],
                post_trial_gap: 500,
                on_start: function () {
                    document.body.style.cursor = "auto"
                },
                stimulus: function () {
                    var results = get_results(1000, 400, illusion_name)
                    var show_screen = get_debrief_display(results)
                    return (
                        show_screen.display_accuracy +
                        "<hr>" +
                        show_screen.display_rt
                        //"<hr><p>Can you do better in the next illusion?</p>"
                    )
                },
                data: { screen: "practice_block_results" },
            })
        }
    }
    return timeline
}

// Practice trials ================================================================================
var ebbinghaus_practice = IG_make_trials(
    (stimuli = stimuli_training),
    // instructions_eng: "Practice"
    (instructions = "<p><b>Тренировка</b></p>" + ebbinghaus_instructions),
    (illusion_name = "Ebbinghaus"),
    (type = "leftright"),
    (marker = false)
)

var mullerlyer_practice = IG_make_trials(
    (stimuli = stimuli_training),
    // instructions_eng: "Practice"
    (instructions = "<p><b>Тренировка</b></p>" + mullerlyer_instructions),
    (illusion_name = "MullerLyer"),
    (type = "updown"),
    (marker = false)
)

var verticalhorizontal_practice = IG_make_trials(
    (stimuli = stimuli_training),
    // instructions_eng: "Practice"
    (instructions = "<p><b>Тренировка</b></p>" + verticalhorizontal_instructions),
    (illusion_name = "VerticalHorizontal"),
    (type = "leftright"),
    (marker = false)
)

var IG_practice_end = {
    type: jsPsychHtmlButtonResponse,
    // choices_eng: "Let's Play"
    choices: ["Начать игру!"],
    stimulus:
        // instruction_eng: "TRAINING COMPLETED
        "<p><b>ТРЕНИРОВКА ЗАВЕРШЕНА</b></p>" +
        // instruction_eng: "In the next phase, there will be more trials, and some might be harder too.<br> Moreover, after each illusion block, a <b>score</b> will be calculated based on speed (time you took to answer) and accuracy (number of errors)."
        "<p>На следующем этапе игры испытаний будет больше, а некоторые из них могут быть сложнее.<br> Более того, после каждого блока иллюзий Ваш <b>результат</b> будет подсчитан <br>исходя из Вашей скорости (времени, которое Вы затратили на ответы) и точности (количества ошибок).<br></p>" +
        // instruction_eng: "Try to keep up a high score!"
        "<p><i>Постарайтесь удержать высокий результат!</i></p><br>" +
        // instruction_eng: "Note that it can be really challenging at times, so you will need to rely on your intuition and gut feeling to answer as fast as you can without making errors"
        "<p>Обратите внимание, что иногда может быть <i>очень сложно</i> определить верный ответ. <br>Поэтому Вам придется полагаться на <b>интуицию</b> и ощущения, чтобы ответить как можно быстрее, не допустив ошибки.<br></p>" +
        // instruction_eng: "Each illusion block will be repeated two times (so that you have the opportunity to improve your score), but the order of the blocks is random."
        "<p>Каждый блок с иллюзиями будет повторен два раза, чтобы у Вас была возможность улучшить свой результат. <br>Однако порядок блоков будет случаным.<br></p>" +
        // instruction_eng: "Remember, your goal is to be as <b>fast</b> and <b>accurate</b> as possible. Good luck!"
        "<p>Помните, Ваша цель - действовать настолько <b>быстро</b> и <b>точно</b>, насколько это возможно. Удачи!</p><br>",
    data: { screen: "practice_debrief" },
    on_finish: function () {
        block_number = 1 // reset block number for illusion trials
    },
}

// Block trials ==================================================================================
function create_debrief(illusion_name = "Ponzo") {
    var debrief = {
        type: jsPsychHtmlButtonResponse,
        // choices_eng: "Continue"
        choices: ["Продолжить"],
        on_start: function () {
            document.body.style.cursor = "auto"
        },
        stimulus: function () {
            var results = get_results(
                1000, // population_scores[illusion_name]["IES_Mean"][0],
                400, // population_scores[illusion_name]["IES_SD"][0],
                illusion_name
            )
            var show_screen = get_debrief_display(results)
            return (
                show_screen.display_score +
                // "<hr>" +
                // // For debugging purposes, show the raw data.
                // show_screen.display_accuracy +
                // "<hr>" +
                // show_screen.display_rt +
                // "<hr>" +
                // //
                // show_screen.display_comparison +
                // eng: "Can you do better in the next illusion?"
                "<hr><p>Попробуете справиться лучше со следующей иллюзией?</p>"
            )
        },
        data: { screen: "block_results" },
        // Reset trial number and update block number
        on_finish: function () {
            block_number += 1
            trial_number = 1
        },
    }
    return debrief
}

function IG_create_block(
    stimuli,
    show_blocknumber = true,
    show_marker = false
) {
    /* ---------------------- MULLERLYER ILLUSION --------------------- */
    var timeline_mullerlyer = IG_make_trials(
        stimuli,
        (instructions = function (show_blocknumber) {
            if (show_blocknumber) {
                return add_blocknumber(mullerlyer_instructions, block_number)
            } else {
                return mullerlyer_instructions
            }
        }),
        (illusion_name = "MullerLyer"),
        (type = "updown"),
        (marker = show_marker)
    )

    /* --------------------- EBBINGHAUS ILLUSION ---------------------- */
    var timeline_ebbinghaus = IG_make_trials(
        stimuli,
        (instructions = function (show_blocknumber) {
            if (show_blocknumber) {
                return add_blocknumber(ebbinghaus_instructions, block_number)
            } else {
                return ebbinghaus_instructions
            }
        }),
        (illusion_name = "Ebbinghaus"),
        (type = "leftright"),
        (marker = show_marker)
    )

    /* ----------------- VERTICAL-HORIZONTAL ILLUSION ----------------- */
    var timeline_verticalhorizontal = IG_make_trials(
        stimuli,
        (instructions = function (show_blocknumber) {
            if (show_blocknumber) {
                return add_blocknumber(
                    verticalhorizontal_instructions,
                    block_number
                )
            } else {
                return verticalhorizontal_instructions
            }
        }),
        (illusion_name = "VerticalHorizontal"),
        (type = "leftright"),
        (marker = show_marker)
    )

    /* ------------------------ Timeline ----------------------------- */
    var task_block = {
        timeline: [
            { timeline: timeline_mullerlyer },
            { timeline: timeline_ebbinghaus },
            { timeline: timeline_verticalhorizontal },
        ],
        randomize_order: true,
    }
    return task_block
}
