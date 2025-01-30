document.addEventListener("DOMContentLoaded", function() {
    const storyElement = document.getElementById('story');
    const choicesElement = document.getElementById('choices');
    const titleElement = document.getElementById('title');
    const startButton = document.getElementById('start-button');

    const game = {
        story: storyElement,
        choices: choicesElement,
        title: titleElement,
        currentStep: 0,
        steps: [
            {
                text: "Вы живете обычной жизнью, каждый месяц вкладываете деньги, активно ведете социальные сети, работаете...",
                choices: [
                    { text: "Нажать на ссылку", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Не нажимать на ссылку", nextStep: 1 }
                ]
            },
            {
                text: "Вас просят заполнить информацию о вас, чтобы удостовериться, что это вы.",
                choices: [
                    { text: "Заполнить информацию", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Не заполнять информацию", nextStep: 2 }
                ]
            },
            {
                text: "Для работы и сайтов инвестиций вы регистрируетесь через номер. Вдруг вам звонит оператор и говорит...",
                choices: [
                    { text: "Верить оператору", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Не верить оператору", nextStep: 3 }
                ]
            },
            {
                text: "Вы нуждаетесь в срочных деньгах и нашли покупателя крипты по чуть высшей ставке и при продаже...",
                choices: [
                    { text: "Воспользоваться сайтом-посредником", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Не воспользоваться сайтом-посредником", nextStep: 4 }
                ]
            },
            {
                text: "На работе у вас пропадает связь, и вы не обращаете внимания. После рабочего дня едете домой и по дороге...",
                choices: [
                    { text: "Ничего не делать (простой сбой сети)", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Разобраться по приезду", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Нервничать", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Забыть про это", nextStep: 'end', outcome: "Вас заскамили." }
                ]
            }
        ],
        start() {
            localStorage.removeItem('gameOver'); // Удалить запись gameOver
            this.currentStep = 0;
            this.title.style.display = 'block'; // Восстановить заголовок при начале игры
            this.showStep();
        },
        showStep() {
            const step = this.steps[this.currentStep];
            this.story.innerHTML = `<p>${step.text}</p>`;
            this.choices.innerHTML = '';
            step.choices.forEach(choice => {
                const button = document.createElement('button');
                button.innerText = choice.text;
                button.onclick = () => this.choose(choice.nextStep, choice.outcome);
                this.choices.appendChild(button);
            });
        },
        choose(nextStep, outcome) {
            if (nextStep === 'end') {
                this.story.innerHTML = `<p>${outcome}</p>`;
                this.choices.innerHTML = ''; // Убираем возможность начать заново
                localStorage.setItem('gameOver', true); // Сохраняем состояние игры как проигранное
            } else {
                this.currentStep = nextStep;
                this.showStep();
            }
        },
        displayGameOver() {
            this.story.innerHTML = `<p>Игра окончена! Вы не можете начать сначала.</p>`;
            this.choices.innerHTML = ''; // Убираем возможность начать заново
        }
    };

    startButton.onclick = function() {
        const gameOver = localStorage.getItem('gameOver');
        if (!gameOver) {
            game.start();
        } else {
            game.displayGameOver();
        }
    };

    // Проверка на проигрыш при загрузке страницы
    if (localStorage.getItem('gameOver')) {
        game.displayGameOver();
    } else {
        game.start();
    }
});
