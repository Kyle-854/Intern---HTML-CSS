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
        const temp = trans[lang];
        document.querySelector('title').innerHTML = temp.title;
        document.querySelector('.title').innerHTML = temp.desc_text;
        document.querySelector('.have-account').innerHTML = temp.have_account;
        document.querySelector('.password-text').innerHTML = temp.password;
        document.querySelector('#email').placeholder = temp.enter_email;
        document.querySelector('#password').placeholder = temp.enter_pass;
        document.querySelector('#btn_login .btn-text').innerHTML = temp.btn_login;
        document.querySelector('.forgot-password').innerHTML = temp.forgot_pass;
        document.querySelector('.ar').innerHTML = temp.ar;
        document.querySelector('.tos').innerHTML = temp.tos;
        document.querySelector('.atac').innerHTML = temp.atac;
        document.querySelector('.pp').innerHTML = temp.pp;
        document.querySelector('.cookies').innerHTML = temp.cookies;
        document.querySelector('.line1').innerHTML = temp.reserved;
        document.querySelector('.footer-line1__text').innerHTML = temp.footer_line1;
        document.querySelector('.footer-line2__text').innerHTML = temp.footer_line2;
        document.querySelector('.email-error').innerHTML = temp.email_error;
        document.querySelector('.password-error').innerHTML = temp.password_error;
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

            btn_login.addEventListener('mouseenter', () => {
                btn_login.style.cursor = 'pointer';
                btn_login.style.boxShadow = '0 0 0 2px #E5E5E5';
                btn_login.style.background = '#047B3E';

            });

            btn_login.addEventListener('mouseleave', () => {
                btn_login.style.cursor = 'default';
                btn_login.style.background = '#048845';
                btn_login.style.boxShadow = 'none';
            });
        } else {
            btn_login.disabled = true;

            btn_login.addEventListener('mouseenter', () => {
                btn_login.style.cursor = 'default';
                btn_login.style.background = '#048845';
                btn_login.style.boxShadow = 'none';
            });
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

