let currentLang = 'ENG';

document.addEventListener('DOMContentLoaded', () => {
    setupLanguageSwitcher();
    applyTranslations(currentLang);
    
    setupPasswordToggle('eye-on1', 'eye-off1', 'password1');
    setupPasswordToggle('eye-on2', 'eye-off2', 'password2');
    
    setupValidation();
});

function setupLanguageSwitcher() {
    const menu = document.querySelector('.menu');
    const dropdown = document.querySelector('.dropdown');
    const sub1 = document.querySelector('.sub1');
    const sub2 = document.querySelector('.sub2');
    const flag = document.querySelector('.menu .flag');
    const language = document.querySelector('.menu .language');

    menu.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.style.visibility = dropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
    });

    document.addEventListener('click', () => dropdown.style.visibility = 'hidden');

    sub1.addEventListener('click', () => switchLanguage('ENG', sub1, sub2, flag, language));
    sub2.addEventListener('click', () => switchLanguage('VIE', sub2, sub1, flag, language));
}

function switchLanguage(lang, activeSub, inactiveSub, flagNode, langNode) {
    activeSub.style.background = 'var(--color-primary-500, #048845)';
    activeSub.querySelector('.language').style.color = 'white';
    inactiveSub.style.background = '';
    inactiveSub.querySelector('.language').style.color = '';

    flagNode.src = activeSub.querySelector('.flag').src;
    langNode.innerHTML = lang;
    currentLang = lang;
    
    applyTranslations(lang);
}

function applyTranslations(lang) {
    if(!translationsReset) return;
    const temp = translationsReset[lang];

    document.querySelector('.content__title').innerHTML = temp.title;
    document.querySelector('.content__description').innerHTML = temp.desc;
    
    const labels = document.querySelectorAll('.password-text');
    if(labels[0]) labels[0].innerHTML = temp.newPassword;
    if(labels[1]) labels[1].innerHTML = temp.confirm_label;

    document.querySelector('#password1').placeholder = temp.enter_pass;
    document.querySelector('#password2').placeholder = temp.confirm_placeholder;

    document.querySelector('.error-text__password-blank').innerHTML = temp.err_blank;
    document.querySelector('.error-text__min-12-chars').innerHTML = temp.err_min;
    document.querySelector('.error-text__number-special-char').innerHTML = temp.err_special;
    document.querySelector('.error-text__low-up').innerHTML = temp.err_case;
    document.querySelector('.error-text__must-match').innerHTML = temp.err_match;

    document.querySelector('.btn-text').innerHTML = temp.btn_submit;
    document.querySelector('.line1').innerHTML = temp.reserved;
    document.querySelector('.ar').innerHTML = temp.ar;
    document.querySelector('.tos').innerHTML = temp.tos;
    document.querySelector('.atac').innerHTML = temp.atac;
    document.querySelector('.pp').innerHTML = temp.pp;
    document.querySelector('.cookies').innerHTML = temp.cookies;
}

function setupPasswordToggle(eyeOnClass, eyeOffClass, inputId) {
    const eyeOn = document.querySelector(`.${eyeOnClass}`);
    const eyeOff = document.querySelector(`.${eyeOffClass}`);
    const passwordInput = document.getElementById(inputId);

    eyeOn.addEventListener('click', () => {
        eyeOn.style.display = 'none';
        eyeOff.style.display = 'block';
        passwordInput.type = 'text';
    });

    eyeOff.addEventListener('click', () => {
        eyeOff.style.display = 'none';
        eyeOn.style.display = 'block';
        passwordInput.type = 'password';
    });
}

function setupValidation() {
    const pass1 = document.getElementById('password1');
    const pass2 = document.getElementById('password2');
    const btnSubmit = document.getElementById('btn_submit');
    const errors = document.querySelectorAll('.error-container');
    
    let hasInteracted = false; 
    let isBlurred = false;     
    
    btnSubmit.disabled = true;

    const validate = () => {
        const v1 = pass1.value;
        const v2 = pass2.value;

        const cond1 = v1.length > 0; // Not blank
        const cond2 = v1.length >= 12; // Min 12 chars
        const cond3 = /[0-9]/.test(v1) && /[!@#$%^&*(),.?":{}|<>_\-+=/[\]\\]/.test(v1); // Number & Special char
        const cond4 = /[a-z]/.test(v1) && /[A-Z]/.test(v1); // Lowercase & Uppercase
        const cond5 = v1 === v2 && v1.length > 0; // Passwords match

        const conditions = [cond1, cond2, cond3, cond4, cond5];
        let allValid = true;

        errors.forEach((errorEl, index) => {
            // Xóa tất cả class trạng thái cũ
            errorEl.classList.remove('state-gray', 'state-red', 'state-green');

            if (conditions[index]) {
                errorEl.classList.add('state-green');
            } else {
                allValid = false;
                
                if (isBlurred || v1.length > 0 || v2.length > 0) {
                    errorEl.classList.add('state-red');
                } else {
                    errorEl.classList.add('state-gray');
                }
            }
        });

        btnSubmit.disabled = !allValid;
    };

    const onFocus = () => {
        isBlurred = false;
        if (!hasInteracted) {
            hasInteracted = true;
            errors.forEach(e => e.style.display = 'flex'); 
        }
        validate();
    };

    const onBlur = () => {
        isBlurred = true;
        validate(); 
    };

    pass1.addEventListener('focus', onFocus);
    pass2.addEventListener('focus', onFocus);
    pass1.addEventListener('blur', onBlur);
    pass2.addEventListener('blur', onBlur);
    pass1.addEventListener('input', validate);
    pass2.addEventListener('input', validate);
}

