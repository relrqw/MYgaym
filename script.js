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
                    { text: "Нажать на ссылку", nextStep: 'end', outcome: "Вас заскамили.", image: "image1.jpg" },
                    { text: "Не нажимать на ссылку", nextStep: 1, image: "image2.jpg" }
                ]
            },
            {
                text: "Вас просят заполнить информацию о вас, чтобы удостовериться, что это вы.",
                choices: [
                    { text: "Заполнить информацию", nextStep: 'end', outcome: "Вас заскамили.", image: "image3.jpg" },
                    { text: "Не заполнять информацию", nextStep: 2, image: "image4.jpg" }
                ]
            },
            // Добавьте остальные шаги таким же образом
        ],
        start() {
            localStorage.removeItem('gameOver'); // Удалить запись gameOver
            this.currentStep = 0;
            this.title.style.display = 'block'; // Восстановить заголовок при начале игры
            this.showStep();
        },
        showStep() {
            const step = this.steps[this.currentStep];
            this.story.innerHTML = `<img src="${step.choices[0].image}" alt="Уместное изображение"><p>${step.text}</p>`;
            this.choices.innerHTML = '';
            step.choices.forEach(choice => {
                const button = document.createElement('button');
                button.innerText = choice.text;
                button.onclick = () => this.choose(choice.nextStep, choice.outcome, choice.image);
                this.choices.appendChild(button);
            });
        },
        choose(nextStep, outcome, image) {
            if (nextStep === 'end') {
                this.story.innerHTML = `<img src="${image}" alt="Уместное изображение"><p>${outcome}</p>`;
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
