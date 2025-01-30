document.addEventListener("DOMContentLoaded", function() {
    const game = {
        story: document.getElementById('story'),
        choices: document.getElementById('choices'),
        title: document.getElementById('title'),
        currentStep: 0,
        steps: [
            {
                text: "Вы живете обычной жизнью, каждый месяц вкладываете деньги, активно ведете социальные сети, работаете в крупной компании. В один прекрасный день вам приходит письмо от оператора с уникальным предложением. В письме говорится, что вы давно не меняли тариф, и установлена ссылка с подписью 'перейдите на официальный сайт для подробностей'.",
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
                text: "Для работы и сайтов инвестиций вы регистрируетесь через номер. Вдруг вам звонит оператор и говорит, что ваш номер взломали, и предлагает помочь. Он просит вас зайти в банки и перекинуть деньги на другие счета, а вашу криптовалюту — на кошельки людей, которые предоставляют услуги страховщика.",
                choices: [
                    { text: "Верить оператору", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Не верить оператору", nextStep: 3 }
                ]
            },
            {
                text: "Вы нуждаетесь в срочных деньгах и нашли покупателя крипты по чуть высшей ставке и при продаже надо отправлять валюту через сайт посредник.",
                choices: [
                    { text: "Воспользоваться сайтом-посредником", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Не воспользоваться сайтом-посредником", nextStep: 4 }
                ]
            },
            {
                text: "На работе у вас пропадает связь, и вы не обращаете внимания. После рабочего дня едете домой и понимаете, что 5 минут как нет связи.",
                choices: [
                    { text: "Ничего не делать (простой сбой сети)", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Разобраться по приезду", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Нервничать", nextStep: 'end', outcome: "Вас заскамили." },
                    { text: "Забыть про это", nextStep: 'end', outcome: "Вас заскамили." }
                ]
            }
        ],
        start() {
            const gameOver = localStorage.getItem('gameOver');
            if (gameOver) {
                this.displayGameOver();
            } else {
                this.currentStep = 0;
                this.showStep();
            }
        },
        showStep() {
            const step = this.steps[this.currentStep];
            this.story.innerHTML = <p>${step.text}</p>;
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
                this.story.innerHTML = <p>${outcome}</p>;
                this.choices.innerHTML = ''; // Убираем возможность начать заново
                this.title.innerText = "Тема - Мошенничество (Подмена сим карты)"; // Меняем заголовок
                localStorage.setItem('gameOver', true); // Сохраняем состояние игры как проигранное
            } else {
                this.currentStep = nextStep;
                this.showStep();
            }
        },
        displayGameOver() {
            this.story.innerHTML = <p>Игра окончена! Вы не можете начать сначала.</p>;
            this.choices.innerHTML = ''; // Убираем возможность начать заново
        }
    };

    document.getElementById('start-button').onclick = function() {
        game.start();
    };
});
