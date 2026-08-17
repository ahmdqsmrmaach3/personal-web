const gameInstruction =
    document.getElementById("gameInstruction");

const gameInstructionBox =
    document.getElementById("gameInstructionBox");

const instructionTitle =
    document.getElementById("instructionTitle");

const instructionText =
    document.getElementById("instructionText");

const startGameBtn =
    document.getElementById("startGameBtn");

const closeGameInstruction =
    document.getElementById("closeGameInstruction");

const gameCards =
    document.querySelectorAll(".game-card");


const gameData = {

    memory: {

        title: "MEMORY GRID",

        text:
            "Beberapa node akan menyala selama beberapa saat. Ingat posisinya, lalu tekan kembali node yang sama setelah pola menghilang."

    },

    target: {

        title: "DATA TARGET",

        text:
            "Cari data packet yang muncul di area permainan dan tekan secepat mungkin. Semakin cepat kamu menemukannya, semakin tinggi skor yang kamu dapat."

    },

    math: {

        title: "MATH CHALLENGE",

        text:
            "Selesaikan soal matematika yang muncul dan pilih jawaban yang benar sebelum waktu habis."

    }

};


let selectedGame = null;

/* =========================================
   HIGH SCORE SYSTEM
========================================= */

const BEST_SCORE_KEYS = {

    memory:
        "nexus-best-memory",

    target:
        "nexus-best-target",

    math:
        "nexus-best-math"

};


function getBestScore(game) {

    return Number(
        localStorage.getItem(
            BEST_SCORE_KEYS[game]
        )
    ) || 0;

}


function saveBestScore(
    game,
    score
) {

    const currentBest =
        getBestScore(game);


    if (score > currentBest) {

        localStorage.setItem(
            BEST_SCORE_KEYS[game],
            score
        );

        return score;

    }


    return currentBest;

}


/* =========================================
   UPDATE BEST SCORE DISPLAY
========================================= */

function updateBestScoreDisplay(
    game,
    score
) {

    const element =
        document.querySelector(
            `.game-best-score[data-game-best="${game}"]`
        );


    if (element) {

        const best =
            Math.max(
                getBestScore(game),
                score
            );


        element.textContent =
            `BEST: ${best}`;

    }

}


/* =========================================
   GAME RUNTIME
========================================= */

const gameRuntime =
    document.createElement("div");

gameRuntime.id =
    "gameRuntime";

document.body.appendChild(
    gameRuntime
);


/* =========================================
   OPEN INSTRUCTION
========================================= */

function showGameInstruction(game) {

    const data =
        gameData[game];

    if (!data) return;


    selectedGame =
        game;


    instructionTitle.textContent =
        data.title;

    instructionText.textContent =
        data.text;


    gameInstruction.classList.add(
        "show"
    );

        /*
     * Glitch awal saat instruction muncul
     */
    setTimeout(() => {

        glitchGameInstruction();

    }, 60);


    /*
     * Burst kedua
     */
    setTimeout(() => {

        glitchGameInstruction();

    }, 260);


    /*
     * Burst ketiga
     */
    setTimeout(() => {

        glitchGameInstruction();

    }, 500);

}

/* =========================================
   GAME INSTRUCTION GLITCH
========================================= */

function glitchGameInstruction() {

    if (!gameInstructionBox) {
        return;
    }


    gameInstructionBox.classList.remove(
        "glitch-heavy"
    );


    void gameInstructionBox.offsetWidth;


    gameInstructionBox.classList.add(
        "glitch-heavy"
    );


    setTimeout(() => {

        gameInstructionBox.classList.remove(
            "glitch-heavy"
        );

    }, 460);

}


/* =========================================
   GAME CARD
========================================= */

gameCards.forEach(card => {

    const game =
        card.dataset.game;


    const best =
        getBestScore(game);


    const bestElement =
        document.createElement("small");


    bestElement.className =
        "game-best-score";


    bestElement.dataset.gameBest =
        game;


    bestElement.textContent =
        `BEST: ${best}`;


    card.appendChild(
        bestElement
    );


    card.addEventListener(
        "click",
        () => {

            showGameInstruction(
                card.dataset.game
            );

        }
    );

});

/* =========================================
   CANCEL
========================================= */

if (closeGameInstruction) {

    closeGameInstruction.addEventListener(
        "click",
        () => {

            gameInstruction.classList.remove(
                "show"
            );

            selectedGame =
                null;

        }
    );

}


/* =========================================
   START GAME
========================================= */

if (startGameBtn) {

    startGameBtn.addEventListener(
        "click",
        () => {

            gameInstruction.classList.remove(
                "show"
            );


            if (
                selectedGame === "memory"
            ) {

                startMemoryGame();

                return;

            }


            if (
                selectedGame === "target"
            ) {

                startTargetGame();

                return;

            }


            if (
               selectedGame === "math"
              ) {

                startMathGame();

              return;

            }


            console.log(
                "Game belum tersedia:",
                selectedGame
            );

        }
    );

}


/* =========================================
   MEMORY GRID
========================================= */

let memoryLevel = 1;
let memoryScore = 0;
let memoryPattern = [];
let memoryPlayer = [];
let memoryLocked = false;
let memoryGrid;


function startMemoryGame() {

    memoryLevel = 1;

    memoryScore = 0;

    gameRuntime.classList.add(
        "active"
    );

    renderMemoryGame();

    startMemoryRound();

}


function renderMemoryGame() {

    gameRuntime.innerHTML = `

        <div class="memory-game">

            <div class="memory-header">

                <span>
                    NEXUS // MEMORY GRID
                </span>

                <button id="memoryExit">
                    EXIT
                </button>

            </div>


            <div class="memory-info">

                <div>
                    <small>LEVEL</small>
                    <strong id="memoryLevel">
                        1
                    </strong>
                </div>

                <div>
                    <small>SCORE</small>
                    <strong id="memoryScore">
                        0
                    </strong>
                </div>

                <div>
                    <small>STATUS</small>
                    <strong id="memoryStatus">
                        MEMORIZE
                    </strong>
                </div>

            </div>


            <div
                id="memoryGrid"
                class="memory-grid"
            ></div>


            <p
                id="memoryHint"
                class="memory-hint"
            >
                Watch the pattern.
            </p>

        </div>

    `;


    memoryGrid =
        document.getElementById(
            "memoryGrid"
        );


    for (
        let i = 0;
        i < 16;
        i++
    ) {

        const cell =
            document.createElement("button");


        cell.className =
            "memory-cell";


        cell.dataset.index =
            i;


        cell.addEventListener(
            "click",
            () => {

                handleMemoryInput(i);

            }
        );


        memoryGrid.appendChild(
            cell
        );

    }


    const exitButton =
        document.getElementById(
            "memoryExit"
        );


    if (exitButton) {

        exitButton.addEventListener(
            "click",
            exitMemoryGame
        );

    }

}


function startMemoryRound() {

    memoryLocked = true;

    memoryPlayer = [];

    memoryPattern = [];


    const cells =
        document.querySelectorAll(
            ".memory-cell"
        );


    cells.forEach(cell => {

        cell.classList.remove(
            "active",
            "correct",
            "wrong"
        );

    });


    const patternLength =
        Math.min(
            2 + memoryLevel,
            10
        );


    while (
        memoryPattern.length <
        patternLength
    ) {

        const value =
            Math.floor(
                Math.random() * 16
            );


        if (
            !memoryPattern.includes(
                value
            )
        ) {

            memoryPattern.push(
                value
            );

        }

    }


    updateMemoryInfo(
        "MEMORIZE"
    );


    document.getElementById(
        "memoryHint"
    ).textContent =
        "Watch the pattern...";


    memoryPattern.forEach(
        (index, order) => {

            setTimeout(() => {

                const cell =
                    cells[index];


                if (cell) {

                    cell.classList.add(
                        "active"
                    );


                    setTimeout(() => {

                        cell.classList.remove(
                            "active"
                        );

                    }, 450);

                }

            }, order * 500);

        }
    );


    const revealTime =
        memoryPattern.length * 500 +
        600;


    setTimeout(() => {

        memoryLocked = false;

        updateMemoryInfo(
            "YOUR TURN"
        );


        document.getElementById(
            "memoryHint"
        ).textContent =
            "Tap the nodes you remember.";

    }, revealTime);

}


function handleMemoryInput(index) {

    if (memoryLocked) return;


    if (
        memoryPlayer.includes(
            index
        )
    ) {

        return;

    }


    memoryPlayer.push(index);


    const cells =
        document.querySelectorAll(
            ".memory-cell"
        );


    const cell =
        cells[index];


    if (!cell) return;


    if (
        memoryPattern.includes(
            index
        )
    ) {

        cell.classList.add(
            "correct"
        );


        if (
            memoryPlayer.length ===
            memoryPattern.length
        ) {

            memoryLocked = true;

            memoryScore +=
                memoryLevel * 100;

                saveBestScore(
    "memory",
    memoryScore
);

updateBestScoreDisplay(
    "memory",
    memoryScore
);


            memoryLevel++;


            updateMemoryInfo(
                "CORRECT"
            );


            setTimeout(() => {

                startMemoryRound();

            }, 900);

        }

    } else {

        cell.classList.add(
            "wrong"
        );


        memoryLocked = true;


        updateMemoryInfo(
            "FAILED"
        );


        document.getElementById(
            "memoryHint"
        ).textContent =
            "Pattern failed. Restarting...";


        setTimeout(() => {

            saveBestScore(
    "memory",
    memoryScore
);

            memoryLevel = 1;

            memoryScore = 0;

            updateMemoryInfo(
                "RESET"
            );


            startMemoryRound();

        }, 1200);

    }

}


function updateMemoryInfo(status) {

    const level =
        document.getElementById(
            "memoryLevel"
        );

    const score =
        document.getElementById(
            "memoryScore"
        );

    const statusElement =
        document.getElementById(
            "memoryStatus"
        );


    if (level) {

        level.textContent =
            memoryLevel;

    }


    if (score) {

        score.textContent =
            memoryScore;

    }


    if (statusElement) {

        statusElement.textContent =
            status;

    }

}


function exitMemoryGame() {

    memoryLocked = true;

    gameRuntime.classList.remove(
        "active"
    );

    gameRuntime.innerHTML = "";

    selectedGame =
        null;

}


/* =========================================
   DATA TARGET
========================================= */

let targetScore = 0;

let targetHits = 0;

let targetTime = 15;

let targetTimer = null;

let targetTimeout = null;

let targetRunning = false;


/* =========================================
   START TARGET
========================================= */

function startTargetGame() {

    targetScore = 0;

    targetHits = 0;

    targetTime = 15;

    targetRunning = true;


    gameRuntime.classList.add(
        "active"
    );


    renderTargetGame();

    spawnTarget();

    startTargetTimer();

}


/* =========================================
   RENDER
========================================= */

function renderTargetGame() {

    gameRuntime.innerHTML = `

        <div class="target-game">

            <div class="target-header">

                <span>
                    NEXUS // DATA TARGET
                </span>

                <button id="targetExit">
                    EXIT
                </button>

            </div>


            <div class="target-info">

                <div>
                    <small>SCORE</small>

                    <strong id="targetScore">
                        0
                    </strong>
                </div>


                <div>
                    <small>HITS</small>

                    <strong id="targetHits">
                        0
                    </strong>
                </div>


                <div>
                    <small>TIME</small>

                    <strong id="targetTime">
                        15
                    </strong>
                </div>

            </div>


            <div
                id="targetArena"
                class="target-arena"
            >

                <div
                    id="targetStatus"
                    class="target-status"
                >
                    TARGET SCANNING...
                </div>

            </div>


            <p class="target-hint">
                Tap the data packet as fast as you can.
            </p>

        </div>

    `;


    const exitButton =
        document.getElementById(
            "targetExit"
        );


    if (exitButton) {

        exitButton.addEventListener(
            "click",
            exitTargetGame
        );

    }

}


/* =========================================
   SPAWN TARGET
========================================= */

function spawnTarget() {

    if (!targetRunning) return;


    const arena =
        document.getElementById(
            "targetArena"
        );


    if (!arena) return;


    arena.querySelectorAll(
        ".data-target"
    ).forEach(target => {

        target.remove();

    });


    const target =
        document.createElement(
            "button"
        );


    target.className =
        "data-target";


    target.innerHTML = `

        <span class="target-core"></span>

        <span class="target-line line-top"></span>

        <span class="target-line line-right"></span>

        <span class="target-line line-bottom"></span>

        <span class="target-line line-left"></span>

    `;


    /*
     * Posisi acak tetapi tetap
     * aman untuk disentuh di HP.
     */

    const x =
        12 +
        Math.random() * 76;


    const y =
        18 +
        Math.random() * 62;


    target.style.left =
        `${x}%`;


    target.style.top =
        `${y}%`;


    target.addEventListener(
        "click",
        hitTarget
    );


    arena.appendChild(
        target
    );


    targetTimeout =
        setTimeout(() => {

            /*
             * Kalau pemain terlalu lambat,
             * target pindah sendiri.
             */

            if (targetRunningSafe()) {

                spawnTarget();

            }

        }, 1200);

}


/* =========================================
   TARGET HIT
========================================= */

function hitTarget(event) {

    event.stopPropagation();


    const target =
        event.currentTarget;


    if (!targetRunning) return;


    /*
     * Hit pertama kali memberi lebih banyak
     * poin. Setelah itu target sedikit
     * lebih cepat.
     */

    targetScore += 100;

    saveBestScore(
    "target",
    targetScore
);

updateBestScoreDisplay(
    "target",
    targetScore
);

    targetHits++;


    const score =
        document.getElementById(
            "targetScore"
        );

    const hits =
        document.getElementById(
            "targetHits"
        );


    if (score) {

        score.textContent =
            targetScore;

    }


    if (hits) {

        hits.textContent =
            targetHits;

    }


    target.classList.add(
        "target-hit"
    );


    clearTimeout(
        targetTimeout
    );


    setTimeout(() => {

        spawnTarget();

    }, 120);

}


/* =========================================
   TIMER
========================================= */

function startTargetTimer() {

    clearInterval(
        targetTimer
    );


    const timeElement =
        document.getElementById(
            "targetTime"
        );


    targetTimer =
        setInterval(() => {

            if (!targetRunning) {

                clearInterval(
                    targetTimer
                );

                return;

            }


            targetTime--;


            if (timeElement) {

                timeElement.textContent =
                    targetTime;

            }


            if (targetTime <= 0) {

                endTargetGame();

            }

        }, 1000);

}


/* =========================================
   END
========================================= */

function endTargetGame() {

    saveBestScore(
    "target",
    targetScore
);

    targetRunning = false;


    clearInterval(
        targetTimer
    );


    clearTimeout(
        targetTimeout
    );


    const arena =
        document.getElementById(
            "targetArena"
        );


    if (!arena) return;


    arena.innerHTML = `

        <div class="target-result">

            <span>
                TARGET SCAN COMPLETE
            </span>

            <strong>
                ${targetScore}
            </strong>

            <small>
                ${targetHits} TARGETS HIT
            </small>

            <button
                id="targetRestart"
            >
                PLAY AGAIN
            </button>

            <button
                id="targetBack"
            >
                EXIT
            </button>

        </div>

    `;


    document
        .getElementById(
            "targetRestart"
        )
        ?.addEventListener(
            "click",
            startTargetGame
        );


    document
        .getElementById(
            "targetBack"
        )
        ?.addEventListener(
            "click",
            exitTargetGame
        );

}


/* =========================================
   EXIT
========================================= */

function exitTargetGame() {

    targetRunning = false;


    clearInterval(
        targetTimer
    );


    clearTimeout(
        targetTimeout
    );


    gameRuntime.classList.remove(
        "active"
    );


    gameRuntime.innerHTML = "";


    selectedGame =
        null;

}


function targetRunningSafe() {

    return (
        targetRunning === true &&
        gameRuntime.classList.contains(
            "active"
        )
    );

}

/* =========================================
   MATH CHALLENGE
========================================= */

let mathLevel = 1;

let mathScore = 0;

let mathQuestion = 0;

let mathCorrect = 0;

let mathTime = 12;

let mathTimer = null;

let mathRunning = false;

let currentMathAnswer = null;


/* =========================================
   START MATH GAME
========================================= */

function startMathGame() {

    mathLevel = 1;

    mathScore = 0;

    mathQuestion = 0;

    mathCorrect = 0;

    mathRunning = true;


    gameRuntime.classList.add(
        "active"
    );


    renderMathGame();

    nextMathQuestion();

}


/* =========================================
   RENDER
========================================= */

function renderMathGame() {

    gameRuntime.innerHTML = `

        <div class="math-game">

            <div class="math-header">

                <span>
                    NEXUS // MATH CHALLENGE
                </span>


                <button id="mathExit">
                    EXIT
                </button>

            </div>


            <div class="math-info">

                <div>

                    <small>
                        LEVEL
                    </small>

                    <strong id="mathLevel">
                        1
                    </strong>

                </div>


                <div>

                    <small>
                        SCORE
                    </small>

                    <strong id="mathScore">
                        0
                    </strong>

                </div>


                <div>

                    <small>
                        TIME
                    </small>

                    <strong id="mathTime">
                        12
                    </strong>

                </div>

            </div>


            <div class="math-question-box">

                <span class="math-label">
                    SOLVE
                </span>


                <div id="mathQuestion">
                    --
                </div>

            </div>


            <div
                id="mathAnswers"
                class="math-answers"
            ></div>


            <p
                id="mathStatus"
                class="math-status"
            >
                SELECT THE CORRECT ANSWER
            </p>

        </div>

    `;


    document
        .getElementById("mathExit")
        ?.addEventListener(
            "click",
            exitMathGame
        );

}


/* =========================================
   GENERATE QUESTION
========================================= */

function generateMathQuestion() {

    let a;

    let b;

    let operator;

    let answer;


    /*
     * LEVEL 1
     * +
     * -
     */

    if (
        mathLevel <= 2
    ) {

        operator =
            Math.random() < .5
                ? "+"
                : "-";


        a =
            Math.floor(
                Math.random() * 40
            ) + 10;


        b =
            Math.floor(
                Math.random() * 30
            ) + 1;


        /*
         * Hindari hasil negatif
         * supaya level awal
         * lebih nyaman.
         */

        if (
            operator === "-" &&
            b > a
        ) {

            [a, b] =
                [b, a];

        }

    }


    /*
     * LEVEL 3-4
     * ×
     */

    else if (
        mathLevel <= 4
    ) {

        operator = "×";


        a =
            Math.floor(
                Math.random() * 12
            ) + 2;


        b =
            Math.floor(
                Math.random() * 10
            ) + 2;

    }


    /*
     * LEVEL 5+
     * ÷
     */

    else {

        operator = "÷";


        b =
            Math.floor(
                Math.random() * 9
            ) + 2;


        answer =
            Math.floor(
                Math.random() * 12
            ) + 2;


        a =
            b * answer;

    }


    if (
        answer === undefined
    ) {

        if (
            operator === "+"
        ) {

            answer =
                a + b;

        }


        if (
            operator === "-"
        ) {

            answer =
                a - b;

        }


        if (
            operator === "×"
        ) {

            answer =
                a * b;

        }

    }


    return {

        text:
            `${a} ${operator} ${b} = ?`,

        answer

    };

}


/* =========================================
   NEXT QUESTION
========================================= */

function nextMathQuestion() {

    if (!mathRunning) return;


    mathQuestion++;


    const question =
        generateMathQuestion();


    currentMathAnswer =
        question.answer;


    mathTime =
        Math.max(
            5,
            13 - mathLevel
        );


    updateMathInfo();


    const questionElement =
        document.getElementById(
            "mathQuestion"
        );


    if (questionElement) {

        questionElement.textContent =
            question.text;

    }


    createMathAnswers(
        currentMathAnswer
    );


    startMathTimer();

}


/* =========================================
   ANSWERS
========================================= */

function createMathAnswers(
    correctAnswer
) {

    const container =
        document.getElementById(
            "mathAnswers"
        );


    if (!container) return;


    container.innerHTML = "";


    const answers = [];


    answers.push(
        correctAnswer
    );


    /*
     * Buat 3 jawaban palsu
     */

    while (
        answers.length < 4
    ) {

        const offset =
            Math.floor(
                Math.random() * 11
            ) - 5;


        const fake =
            correctAnswer +
            offset;


        if (
            fake >= 0 &&
            !answers.includes(fake)
        ) {

            answers.push(
                fake
            );

        }

    }


    /*
     * Acak posisi jawaban
     */

    answers.sort(
        () => Math.random() - .5
    );


    answers.forEach(
        answer => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "math-answer";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => {

                    handleMathAnswer(
                        answer,
                        button
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );

}


/* =========================================
   HANDLE ANSWER
========================================= */

function handleMathAnswer(
    answer,
    button
) {

    if (!mathRunning) return;


    clearInterval(
        mathTimer
    );


    const buttons =
        document.querySelectorAll(
            ".math-answer"
        );


    buttons.forEach(
        item => {

            item.disabled = true;

        }
    );


    if (
        answer ===
        currentMathAnswer
    ) {

        button.classList.add(
            "correct"
        );


        mathCorrect++;


        mathScore +=
            100 * mathLevel;

            saveBestScore(
    "math",
    mathScore
);

updateBestScoreDisplay(
    "math",
    mathScore
);


        /*
         * Naik level setiap
         * 3 jawaban benar.
         */

        if (
            mathCorrect % 3 === 0
        ) {

            mathLevel++;

        }


        setMathStatus(
            "CORRECT!"
        );


        setTimeout(() => {

            nextMathQuestion();

        }, 700);

    } else {

        button.classList.add(
            "wrong"
        );


        buttons.forEach(
            item => {

                if (
                    Number(
                        item.textContent
                    ) ===
                    currentMathAnswer
                ) {

                    item.classList.add(
                        "correct"
                    );

                }

            }
        );


        setMathStatus(
            "WRONG ANSWER"
        );


        setTimeout(() => {

            nextMathQuestion();

        }, 900);

    }

}


/* =========================================
   TIMER
========================================= */

function startMathTimer() {

    clearInterval(
        mathTimer
    );


    updateMathInfo();


    mathTimer =
        setInterval(() => {

            mathTime--;


            updateMathInfo();


            if (
                mathTime <= 0
            ) {

                clearInterval(
                    mathTimer
                );


                handleMathTimeout();

            }

        }, 1000);

}


/* =========================================
   TIMEOUT
========================================= */

function handleMathTimeout() {

    const buttons =
        document.querySelectorAll(
            ".math-answer"
        );


    buttons.forEach(
        button => {

            button.disabled = true;


            if (
                Number(
                    button.textContent
                ) ===
                currentMathAnswer
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    setMathStatus(
        "TIME OUT"
    );


    setTimeout(() => {

        nextMathQuestion();

    }, 1000);

}


/* =========================================
   UPDATE INFO
========================================= */

function updateMathInfo() {

    const level =
        document.getElementById(
            "mathLevel"
        );


    const score =
        document.getElementById(
            "mathScore"
        );


    const time =
        document.getElementById(
            "mathTime"
        );


    if (level) {

        level.textContent =
            mathLevel;

    }


    if (score) {

        score.textContent =
            mathScore;

    }


    if (time) {

        time.textContent =
            mathTime;

    }

}


/* =========================================
   STATUS
========================================= */

function setMathStatus(
    text
) {

    const status =
        document.getElementById(
            "mathStatus"
        );


    if (status) {

        status.textContent =
            text;

    }

}


/* =========================================
   EXIT
========================================= */

function exitMathGame() {

    saveBestScore(
    "math",
    mathScore
    );

    mathRunning = false;


    clearInterval(
        mathTimer
    );


    gameRuntime.classList.remove(
        "active"
    );


    gameRuntime.innerHTML = "";


    selectedGame =
        null;

}

