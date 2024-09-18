const words_dict = [
    { word: "level with", meaning: "坦率告知" },
    { word: "incumbent president", meaning: "现任总统" },
    { word: "qualms", meaning: "顾虑" },
    { word: "complicit", meaning: "同谋" },
    { word: "withering attack", meaning: "猛烈攻击" },
    { word: "lifting off the ground", meaning: "刚刚起步" },
    { word: "flaunting", meaning: "炫耀" },
    { word: "scrutiny", meaning: "审查" },
    { word: "vulgar", meaning: "粗俗的" },
    { word: "ostentatious", meaning: "炫耀的" },
    { word: "ingrained", meaning: "融入" },
    { word: "sedentary", meaning: "久坐不动的" },
    { word: "lay the groundwork", meaning: "打下基础" },
    { word: "heightened", meaning: "增加的" },
    { word: "fidgeting", meaning: "小动作" },
    { word: "desensitised", meaning: "脱敏" },
    { word: "premise", meaning: "前提" },
    { word: "squalid", meaning: "恶劣脏乱的" },
    { word: "amenities", meaning: "便利设施" },
    { word: "foundry", meaning: "铸造厂" },
    { word: "gaffe", meaning: "失误" },
    { word: "dazzle", meaning: "使惊叹" },
    { word: "battered economy", meaning: "受重创的经济" },
    { word: "rosier", meaning: "更乐观的" },
    { word: "tackle structural problems", meaning: "解决结构性问题" },
    { word: "tall order", meaning: "难以完成的任务" },
    { word: "broad-based economy", meaning: "基础广泛的经济" },
    { word: "heed", meaning: "关心" },
    { word: "ride on coattails", meaning: "借助东风" },
    { word: "backlash", meaning: "强烈反对" },
    { word: "missteps", meaning: "失误" },
    { word: "short-changed", meaning: "感到不公" },
    { word: "drenched", meaning: "浸透的" },
    { word: "stench", meaning: "恶臭" },
    { word: "time scale", meaning: "时间表" },
    { word: "euphoric", meaning: "欣喜若狂的" },
    { word: "lean on discounts", meaning: "依靠折扣" },
    { word: "savvy", meaning: "精明的" },
    { word: "trading down", meaning: "选择更便宜的选项" },
    { word: "hanging onto", meaning: "维持" },
    { word: "prolific", meaning: "多产的" },
    { word: "oppressive temperatures", meaning: "炎热的温度" },
    { word: "mortified", meaning: "极度尴尬" },
    { word: "after-effects", meaning: "后遗症" },
    { word: "over-representation", meaning: "过度代表" },
    { word: "turf them out", meaning: "赶出去" },
    { word: "slew of initiatives", meaning: "一系列举措" },
    { word: "flurry", meaning: "轰动" },
    { word: "stymied", meaning: "阻碍" }

];

let questions = [];
let currentQuestion = 0;
let corrects = 0;

function generateQuestions() {
    questions = words_dict.map(item => {
        const correctAnswer = item.meaning;
        const otherOptions = words_dict
            .filter(w => w.word !== item.word)
            .map(w => w.meaning)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const options = [...otherOptions, correctAnswer].sort(() => 0.5 - Math.random());
        console.log(questions)
        return {
            question: `Word "${item.word}"?`,
            options: options,
            correct: options.indexOf(correctAnswer) + 1
        };
    });
    document.getElementById('correct').textContent = `${corrects} / ${questions.length}`
    // Shuffle the questions
    questions.sort(() => 0.5 - Math.random());
}

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').textContent = q.question;
    for (let i = 0; i < 4; i++) {
        document.getElementById('option' + (i + 1)).textContent = q.options[i];
    }
}

function checkAnswer(option) {
    const correct = questions[currentQuestion].correct;
    if (option === correct) {
        corrects += 1;
        alert("Correct!");
    } else {
        alert("Wrong! The correct answer is: " + questions[currentQuestion].options[correct - 1]);
    }

    // Update the score display before moving to the next question
    document.getElementById('correct').textContent = `${corrects} / ${questions.length}`;
    // Update the progress bar
    updateProgressBar();

    // Move to the next question
    currentQuestion = (currentQuestion + 1) % questions.length;

    loadQuestion();
}

function updateProgressBar() {
    const progressPercentage = (currentQuestion / questions.length) * 100;
    document.getElementById('progress').style.width = progressPercentage + '%';
}

// Add this new function to handle keypress events
function handleKeyPress(event) {
    const key = event.key;
    if (['1', '2', '3', '4'].includes(key)) {
        checkAnswer(parseInt(key));
    }
}

window.onload = function() {
    generateQuestions();
    loadQuestion();

    // Add event listener for keypress
    document.addEventListener('keypress', handleKeyPress);
};