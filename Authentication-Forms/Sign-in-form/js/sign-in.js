function setupDropdown(){
    const menu = document.querySelector('.menu');
    const dropdown = document.querySelector('.dropdown');

    menu.addEventListener('click', (event) => {
        event.stopPropagation();

        const temp = window.getComputedStyle(dropdown).visibility;

        if (temp === 'hidden'){
            dropdown.style.visibility = 'visible';
        } else {
            dropdown.style.visibility = 'hidden';
        }
    });

    document.addEventListener('click', (event) => {
        const clickInsideMenu = menu.contains(event.target);
        const clickInsideDropdown = dropdown.contains(event.target);

        if (!clickInsideMenu && !clickInsideDropdown){
            dropdown.style.visibility = 'hidden';
        }
    });
}
setupDropdown();

function handleLanguageSelect(){
    const flag = document.querySelector('.menu .flag');
    const language = document.querySelector('.menu .language');
    const sub1 = document.querySelector('.sub1');
    const sub2 = document.querySelector('.sub2');
    const dropdown = document.querySelector('.dropdown');

    sub1.addEventListener('click', () => {
        const subflag = document.querySelector('.sub1 .flag');
        const sublanguage = document.querySelector('.sub1 .language');

        flag.src = subflag.src;
        language.innerHTML = sublanguage.innerHTML;

        updateActiveLanguage();
        dropdown.style.visibility = 'hidden'
    });

    sub2.addEventListener('click', () => {
        const subflag = document.querySelector('.sub2 .flag');
        const sublanguage = document.querySelector('.sub2 .language');

        flag.src = subflag.src;
        language.innerHTML = sublanguage.innerHTML;

        updateActiveLanguage();  
        dropdown.style.visibility = 'hidden'
    });
}
handleLanguageSelect();

function updateActiveLanguage(){
    const sub1 = document.querySelector('.sub1');
    const sub1_lang = document.querySelector('.sub1 .language');
    const sub2 = document.querySelector('.sub2');
    const sub2_lang = document.querySelector('.sub2 .language');

    if(document.querySelector('.language').innerHTML === "ENG"){
        sub1.style.background = 'var(--color-primary-500, #048845)';
        sub1_lang.style.color = 'white';
        sub2.style.background = '';
        sub2_lang.style.color = '';

        applyTranslations("ENG");
    } 
    
    if(document.querySelector('.language').innerHTML === "VIE"){
        sub2.style.background = 'var(--color-primary-500, #048845)';
        sub2_lang.style.color = 'white';
        sub1.style.background = '';
        sub1_lang.style.color = '';

        applyTranslations("VIE");
    }
    
}
updateActiveLanguage();

function applyTranslations(lang){

    const trans = translations;

    if(lang){
        document.querySelector('title').innerHTML = trans[lang].title;
        document.querySelector('.title').innerHTML = trans[lang].desc_text;
        document.querySelector('.have-account').innerHTML = trans[lang].have_account;
        document.querySelector('.password-text').innerHTML = trans[lang].password;
        document.querySelector('#email').placeholder = trans[lang].enterEmail;
        document.querySelector('#password').placeholder = trans[lang].enterPass;
        document.querySelector('#btn_login .btn-text').innerHTML = trans[lang].btn_login;
        document.querySelector('.forgot-password').innerHTML = trans[lang].forgot_pass;
        document.querySelector('.ar').innerHTML = trans[lang].ar;
        document.querySelector('.tos').innerHTML = trans[lang].tos;
        document.querySelector('.atac').innerHTML = trans[lang].atac;
        document.querySelector('.pp').innerHTML = trans[lang].pp;
        document.querySelector('.cookies').innerHTML = trans[lang].cookies;
        document.querySelector('.line1').innerHTML = trans[lang].reserved;
        document.querySelector('.footer-line1__text').innerHTML = trans[lang].footer_line1;
        document.querySelector('.footer-line2__text').innerHTML = trans[lang].footer_line2;
    }
}

function setupPasswordToggle(){
    const eyeOn = document.querySelector('.eye-on');
    const eyeOff = document.querySelector('.eye-off');
    const password = document.querySelector('#password');

    eyeOn.addEventListener('click', () => {
        eyeOn.style.display = 'none';
        eyeOff.style.display = 'block';
        password.type = 'text';
    });

    eyeOff.addEventListener('click', () => {
        eyeOff.style.display = 'none';
        eyeOn.style.display = 'block';
        password.type = 'password';

    });
}
setupPasswordToggle();

function handleLoginFormSubmit(){
    const form = document.querySelector('form');
    const btn_login = document.querySelector('#btn_login');

    form.addEventListener('submit', async function(event){

        event.preventDefault();

        btn_login.classList.add('loading');
        btn_login.disabled = true;
        
        try {
            if(validateEmail()){
                await login();
            }
        } finally {
            btn_login.classList.remove('loading');
            btn_login.disabled = false;
        }
    });
}
handleLoginFormSubmit();

function setupLoginValidation(){
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const emailError = document.querySelector('.email-error');
    const passwordError = document.querySelector('.password-error');
    const btn_login = document.querySelector('#btn_login');

    btn_login.disabled = true;

    const check = () => {
        const emailCheck = email.value.trim();
        const passwordCheck = password.value;

        if (emailCheck !== '' && passwordCheck !== '') {
            btn_login.disabled = false;
        } else {
            btn_login.disabled = true;
        }
        
    }

    email.addEventListener('input', function(){
        emailError.style.display = 'none';
        email.style.border = '1px solid #DFE3E8';
        check();
    });
    password.addEventListener('input', function(){
        passwordError.style.display = 'none';
        password.style.border = '1px solid #DFE3E8';
        check();
    });
}
setupLoginValidation();

function validateEmail(){
    const email = document.querySelector('#email');
    const emailError = document.querySelector('.email-error');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email.value.trim())){
        emailError.style.display = 'block';
        email.style.border = '2px solid #BA1A1A';
        return false;
    }
    return true;
}

