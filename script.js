

// 四六级单词库
const wordList = [
    { word: "abandon", meaning: "放弃，遗弃" },
    { word: "ability", meaning: "能力，才能" },
    { word: "abnormal", meaning: "反常的，异常的" },
    { word: "aboard", meaning: "在船(车)上，上船" },
    { word: "absolute", meaning: "绝对的，完全的" },
    { word: "absorb", meaning: "吸收，吸引" },
    { word: "abstract", meaning: "抽象的，摘要" },
    { word: "abundant", meaning: "丰富的，充裕的" },
    { word: "abuse", meaning: "滥用，虐待" },
    { word: "academic", meaning: "学术的，学者" },
    { word: "accelerate", meaning: "加速，促进" },
    { word: "acceptance", meaning: "接受，验收" },
    { word: "access", meaning: "接近，进入" },
    { word: "accident", meaning: "事故，意外" },
    { word: "accommodation", meaning: "住宿，膳宿" },
    { word: "accompany", meaning: "陪伴，伴随" },
    { word: "accomplish", meaning: "完成，实现" },
    { word: "accordance", meaning: "一致，和谐" },
    { word: "account", meaning: "账户，解释" },
    { word: "accumulate", meaning: "积累，积聚" },
    { word: "accuracy", meaning: "准确性" },
    { word: "accuse", meaning: "指责，控告" },
    { word: "achieve", meaning: "实现，达到" },
    { word: "acknowledge", meaning: "承认，致谢" },
    { word: "acquire", meaning: "获得，学到" },
    { word: "acquisition", meaning: "获得，习得" },
    { word: "action", meaning: "行动，活动" },
    { word: "active", meaning: "活跃的，积极的" },
    { word: "activity", meaning: "活动，活力" },
    { word: "actual", meaning: "实际的，真实的" },
    { word: "acute", meaning: "尖锐的，剧烈的" },
    { word: "adapt", meaning: "适应，改编" },
    { word: "addiction", meaning: "上瘾，沉溺" },
    { word: "additional", meaning: "额外的，附加的" },
    { word: "adequate", meaning: "足够的，适当的" },
    { word: "adjust", meaning: "调整，适应" },
    { word: "administration", meaning: "管理，行政" },
    { word: "admire", meaning: "钦佩，羡慕" },
    { word: "admission", meaning: "承认，入场" },
    { word: "admit", meaning: "承认，允许进入" },
    { word: "adopt", meaning: "采用，收养" },
    { word: "adult", meaning: "成年人" },
    { word: "advance", meaning: "前进，提前" },
    { word: "advanced", meaning: "先进的，高级的" },
    { word: "advantage", meaning: "优势，有利条件" },
    { word: "adventure", meaning: "冒险，奇遇" },
    { word: "advertisement", meaning: "广告" },
    { word: "advocate", meaning: "提倡，拥护" },
    { word: "aerospace", meaning: "航空航天" },
    { word: "affect", meaning: "影响，感动" }
];

// 游戏变量
let currentWord;
let score = 0;
let level = 1;
let time = 60;
let timer;
let gameActive = false;
let usedWords = [];

// DOM元素
const wordElement = document.getElementById('word');
const optionsElement = document.getElementById('options');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const finalLevelElement = document.getElementById('final-level');
const restartBtn = document.getElementById('restart-btn');

// 初始化游戏
function initGame() {
    score = 0;
    level = 1;
    time = 60;
    usedWords = [];
    gameActive = false;
    updateDisplay();
    wordElement.textContent = '点击开始';
    optionsElement.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    gameOverElement.style.display = 'none';
}

// 更新显示
function updateDisplay() {
    timeElement.textContent = time;
    scoreElement.textContent = score;
    levelElement.textContent = level;
}

// 获取随机单词
function getRandomWord() {
    let availableWords = wordList.filter(word => !usedWords.includes(word));
    if (availableWords.length === 0) {
        usedWords = [];
        availableWords = wordList;
    }
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const word = availableWords[randomIndex];
    usedWords.push(word);
    return word;
}

// 生成选项
function generateOptions(correctMeaning) {
    const options = [correctMeaning];
    while (options.length < 4) {
        const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        if (!options.includes(randomWord.meaning)) {
            options.push(randomWord.meaning);
        }
    }
    // 打乱选项顺序
    return options.sort(() => Math.random() - 0.5);
}

// 显示单词和选项
function displayWord() {
    currentWord = getRandomWord();
    wordElement.textContent = currentWord.word;
    
    const options = generateOptions(currentWord.meaning);
    optionsElement.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(button, option));
        optionsElement.appendChild(button);
    });
}

// 检查答案
function checkAnswer(button, selectedMeaning) {
    if (!gameActive) return;
    
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => btn.disabled = true);
    
    if (selectedMeaning === currentWord.meaning) {
        button.classList.add('correct');
        score += 10 * level;
        // 每答对5题升一级
        if (score % (50 * level) === 0) {
            level++;
            // 升级后增加时间
            time += 10;
        }
    } else {
        button.classList.add('incorrect');
        // 标记正确答案
        optionButtons.forEach(btn => {
            if (btn.textContent === currentWord.meaning) {
                btn.classList.add('correct');
            }
        });
    }
    
    updateDisplay();
    
    // 延迟显示下一个单词
    setTimeout(() => {
        displayWord();
    }, 1000);
}

// 开始游戏
function startGame() {
    gameActive = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    displayWord();
    startTimer();
}

// 暂停游戏
function pauseGame() {
    gameActive = false;
    clearInterval(timer);
    pauseBtn.textContent = gameActive ? '暂停' : '继续';
}

// 继续游戏
function resumeGame() {
    gameActive = true;
    startTimer();
    pauseBtn.textContent = '暂停';
}

// 重置游戏
function resetGame() {
    pauseGame();
    initGame();
}

// 开始计时器
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        time--;
        timeElement.textContent = time;
        
        // 时间结束
        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

// 结束游戏
function endGame() {
    gameActive = false;
    clearInterval(timer);
    gameOverElement.style.display = 'flex';
    finalScoreElement.textContent = score;
    finalLevelElement.textContent = level;
}

// 事件监听
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', () => {
    if (gameActive) {
        pauseGame();
    } else {
        resumeGame();
    }
});
resetBtn.addEventListener('click', resetGame);
restartBtn.addEventListener('click', initGame);

// 初始化游戏
initGame();