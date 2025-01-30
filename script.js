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
                text: "Вы живете обычной жизнью...",
                choices: [
                    { text: "Нажать на ссылку", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Не нажимать на ссылку", nextStep: 1 }
                ]
            },
            // Другие шаги...
        ],
        start() {
            localStorage.removeItem('gameOver');
            this.currentStep = 0;
            this.title.style.display = 'block';
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
                this.choices.innerHTML = '';
                localStorage.setItem('gameOver', true);
            } else {
                this.currentStep = nextStep;
                this.showStep();
            }
        },
        displayGameOver() {
            this.story.innerHTML = `<p>Игра окончена! Вы не можете начать сначала.</p>`;
            this.choices.innerHTML = '';
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

    if (localStorage.getItem('gameOver')) {
        game.displayGameOver();
    } else {
        game.start();
    }
});
