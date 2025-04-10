const circles = document.querySelectorAll('.circle');
const redBackground = document.querySelector('.red-background');
const yinYangEmpty = document.getElementById('yin-yang-empty');
const yinYangBalance = document.getElementById('yin-yang-balance');
const yinYangYang = document.getElementById('yin-yang-yang');
const yinYangYin = document.getElementById('yin-yang-yin');
const dominanceText = document.getElementById('dominance-text');
const yinPercentageDisplay = document.getElementById('yin-percentage');
const yangPercentageDisplay = document.getElementById('yang-percentage');
const percentageDisplayElement = document.querySelector('.percentage-display');
const resetButton = document.getElementById('reset-button');

let formFilled = false;
let responses = {};
let answeredForms = new Set();
let allFormsAnswered = false;

yinYangEmpty.style.display = 'block';

const questions = {
    form1: [
        { question: 'Intenso ou Calmo?', options: [{ text: 'Intenso', value: 'Yin' }, { text: 'Calmo', value: 'Yang' }] },
        { question: 'Expansivo ou Contrativo?', options: [{ text: 'Expansivo', value: 'Yin' }, { text: 'Contrativo', value: 'Yang' }] },
        { question: 'Acelerado ou Lento?', options: [{ text: 'Acelerado', value: 'Yin' }, { text: 'Lento', value: 'Yang' }] },
        { question: 'Mediador e incendiário', options: [{ text: 'Incendiário', value: 'Yin' }, { text: 'Mediador', value: 'Yang' }] },
        { question: 'Coragem ou Medo?', options: [{ text: 'Coragem', value: 'Yin' }, { text: 'Medo', value: 'Yang' }] }
    ],
    form2: [
        { question: 'Inabalável ou Mutável?', options: [{ text: 'Mutável', value: 'Yang' }, { text: 'Ínabalável', value: 'Yin' }] },
        { question: 'Receptivo ou Dominador?', options: [{ text: 'Receptivo', value: 'Yang' }, { text: 'Dominador', value: 'Yin' }] },
        { question: 'Guardião ou Invasor?', options: [{ text: 'Guardião', value: 'Yang' }, { text: 'Invasor', value: 'Yin' }] },
        { question: 'Rigidez ou Leveza?', options: [{ text: 'Rigidez', value: 'Yang' }, { text: 'Leveza', value: 'Yin' }] },
        { question: 'Silencioso ou Barulhento?', options: [{ text: 'Silencioso', value: 'Yang' }, { text: 'Barulhento', value: 'Yin' }] }
    ],
    form3: [
        { question: 'Fluido ou Estático?', options: [{ text: 'Fluido', value: 'Yang' }, { text: 'Estático', value: 'Yin' }] },
        { question: 'Adaptável ou Resistente?', options: [{ text: 'Adaptável', value: 'Yang' }, { text: 'Resistente', value: 'Yin' }] },
        { question: 'Profundo ou Superficial?', options: [{ text: 'Profundo', value: 'Yang' }, { text: 'Superficial', value: 'Yin' }] },
        { question: 'Pensar ou Reagir?', options: [{ text: 'Pensar', value: 'Yang' }, { text: 'Reagir', value: 'Yin' }] },
        { question: 'Transparente ou Opaco?', options: [{ text: 'Transparente', value: 'Yang' }, { text: 'Opaco', value: 'Yin' }] }
    ],
    form4: [
        { question: 'Florescente ou Degradante?', options: [{ text: 'Florescente', value: 'Yin' }, { text: 'Desgrandante', value: 'Yang' }] },
        { question: 'Flexível ou Rígido?', options: [{ text: 'Flexível', value: 'Yang' }, { text: 'Rígido', value: 'Yin' }] },
        { question: 'Direcionado ou Difuso?', options: [{ text: 'Direcionado', value: 'Yin' }, { text: 'Difuso', value: 'Yang' }] },
        { question: 'Frutífero ou Estagnado?', options: [{ text: 'Frutífero', value: 'Yin' }, { text: 'Estagnado', value: 'Yang' }] },
        { question: 'Ordem ou Caos?', options: [{ text: 'Caos', value: 'Yin' }, { text: 'Ordem', value: 'Yang' }] }
    ],
    form5: [
        { question: 'Contagiante ou Solitude?', options: [{ text: 'Contagiante', value: 'Yin' }, { text: 'Solitude', value: 'Yang' }] },
        { question: 'Concentrado ou Disperso?', options: [{ text: 'Concentrado', value: 'Yin' }, { text: 'Disperso', value: 'Yang' }] },
        { question: 'Calculista ou Impulsivo?', options: [{ text: 'Calculista', value: 'Yin' }, { text: 'Impulsivo', value: 'Yang' }] },
        { question: 'Refinado ou Desleixado?', options: [{ text: 'Refinado', value: 'Yin' }, { text: 'Desleixado', value: 'Yang' }] },
        { question: 'Sombra ou Luz?', options: [{ text: 'Sombra', value: 'Yin' }, { text: 'Luz', value: 'Yang' }] }
    ]
};

circles.forEach(circle => {
    circle.addEventListener('click', () => {
        const formId = circle.dataset.form;
        if (!answeredForms.has(formId)) {
            createForm(formId);
        }
    });
});

function createForm(formId) {
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    modal.appendChild(closeButton);

    const currentQuestions = questions[formId];
    const form = document.createElement('form');
    let submitButton;

    currentQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-options'); // Cria o div para cada pergunta

        const label = document.createElement('label');
        label.textContent = q.question.replace(/\(([^)]+)\)\?$/, `(${document.querySelector(`.circle[data-form="${formId}"] .front`).textContent})?`);
        questionDiv.appendChild(label); // Adiciona a label da pergunta ao div

        const optionsDiv = document.createElement('div'); // Cria um div para as opções (checkbox e label)
        q.options.forEach(option => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = `question${formId}_${index}`;
            checkbox.value = option.value;
            checkbox.addEventListener('change', () => {
                if (form.querySelectorAll('input[type="checkbox"]:checked').length > 0) {
                    submitButton.disabled = false;
                } else {
                    submitButton.disabled = true;
                }
            });
            optionsDiv.appendChild(checkbox); // Adiciona a checkbox ao div de opções

            const optionLabel = document.createElement('label');
            optionLabel.innerHTML = `<span>${option.text}</span>`;
            optionsDiv.appendChild(optionLabel); // Adiciona a label da opção ao div de opções
        });
        questionDiv.appendChild(optionsDiv); // Adiciona o div de opções ao div da pergunta
        form.appendChild(questionDiv); // Adiciona o div da pergunta ao formulário
    });

    submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Responder';
    submitButton.disabled = true;
    form.appendChild(submitButton);

    modal.appendChild(form);
    redBackground.appendChild(modal);
    modal.style.display = 'block';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const answers = {};
        formData.forEach((value, key) => {
            if (!answers[key]) {
                answers[key] = [];
            }
            answers[key].push(value);
        });
        responses[formId] = answers;
        modal.style.display = 'none';
        formFilled = true;
        answeredForms.add(formId);
        circles.forEach(circle => {
            if (circle.dataset.form === formId) {
                circle.classList.add('answered');
            }
        });
        showResults();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal && event.target.classList.contains('modal')) {
            modal.style.display = 'none';
        }
    });
}

function showResults() {
    let yinScore = 0;
    let yangScore = 0;

    for (const formId in responses) {
        const answers = responses[formId];
        for (const questionKey in answers) {
            const answerValues = answers[questionKey];
            answerValues.forEach(answerValue => {
                if (answerValue === 'Yin') {
                    yinScore++;
                } else if (answerValue === 'Yang') {
                    yangScore++;
                }
            });
        }
    }

    const totalScore = yinScore + yangScore;
    const yinPercentage = totalScore > 0 ? (yinScore / totalScore) * 100 : 50;
    const yangPercentage = totalScore > 0 ? (yangScore / totalScore) * 100 : 50;

    yinPercentageDisplay.textContent = `${yinPercentage.toFixed(0)}%`;
    yangPercentageDisplay.textContent = `${yangPercentage.toFixed(0)}%`;
    percentageDisplayElement.style.display = 'flex';

    if (yinPercentage > yangPercentage) {
        yinYangYin.style.display = 'block';
        yinYangYang.style.display = 'none';
        yinYangBalance.style.display = 'none';
        yinYangEmpty.style.display = 'none';
        dominanceText.textContent = 'Mais Yin';
    } else if (yangPercentage > yinPercentage) {
        yinYangYang.style.display = 'block';
        yinYangYin.style.display = 'none';
        yinYangBalance.style.display = 'none';
        yinYangEmpty.style.display = 'none';
        dominanceText.textContent = 'Mais Yang';
    } else {
        yinYangBalance.style.display = 'block';
        yinYangYang.style.display = 'none';
        yinYangYin.style.display = 'none';
        yinYangEmpty.style.display = 'none';
        dominanceText.textContent = 'Equilíbrio';
    }
}

function resetResults() {
    responses = {};
    formFilled = false;
    yinYangEmpty.style.display = 'block';
    yinYangBalance.style.display = 'none';
    yinYangYang.style.display = 'none';
    yinYangYin.style.display = 'none';
    dominanceText.textContent = '';
    percentageDisplayElement.style.display = 'none';
    allFormsAnswered = false;

    const forms = document.querySelectorAll('.modal form'); // Seleciona os formulários dentro dos modais
    forms.forEach(form => {
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    });

    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.remove();
    });

    answeredForms.clear();
    circles.forEach(circle => {
        circle.classList.remove('answered');
        circle.style.transform = 'rotateY(0deg)';
    });
}

window.onload = () => {
    resetButton.addEventListener('click', resetResults);
};