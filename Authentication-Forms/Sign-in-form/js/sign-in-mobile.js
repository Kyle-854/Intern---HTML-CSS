function dropdownMenu(){
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
dropdownMenu();

function changeSubMenu(){
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

        activeLang();
        dropdown.style.visibility = 'hidden'
    });

    sub2.addEventListener('click', () => {
        const subflag = document.querySelector('.sub2 .flag');
        const sublanguage = document.querySelector('.sub2 .language');

        flag.src = subflag.src;
        language.innerHTML = sublanguage.innerHTML;

        activeLang();  
        dropdown.style.visibility = 'hidden'
    });
}
changeSubMenu();

function activeLang(){
    const sub1 = document.querySelector('.sub1');
    const sub1_lang = document.querySelector('.sub1 .language');
    const sub2 = document.querySelector('.sub2');
    const sub2_lang = document.querySelector('.sub2 .language');

    if(document.querySelector('.language').innerHTML === "ENG"){
        sub1.style.background = 'var(--color-primary-500, #048845)';
        sub1_lang.style.color = 'white';
        sub2.style.background = '';
        sub2_lang.style.color = '';

        translate("ENG");
    } 
    
    if(document.querySelector('.language').innerHTML === "VIE"){
        sub2.style.background = 'var(--color-primary-500, #048845)';
        sub2_lang.style.color = 'white';
        sub1.style.background = '';
        sub1_lang.style.color = '';

        translate("VIE");
    }
    
}
activeLang();

function translate(lang){
    const translations = {
        "ENG": {
            "title": "Sign In",
            "desc_text": "Welcome back!",
            "have_account": "Don't have an account? <a href=\"\https://smartads.tech\" target = \"_blank\">Get Started</a>",
            "password": "Password",
            "enterEmail": "Enter your email",
            "enterPass": "Enter your password",
            "btn_login": "Login",
            "forgot_pass": "Forgot password?",
            "ar": "Advertising Regulations",
            "tos": "Terms of service",
            "atac": "Advertiser Terms and Conditions",
            "pp": "Privacy Policy",
            "cookies": "Cookies",
            "reserved": "© 2026 SmartAds, FPT Online. All rights reserved."

        },
        "VIE": {
            "title": "Đăng nhập",
            "desc_text": "Chào mừng bạn quay lại!",
            "have_account": "Chưa có tài khoản? <a href=\"\https://smartads.tech\" target = \"_blank\">Đăng ký</a>",
            "password": "Mật khẩu",
            "enterEmail": "Nhập email",
            "enterPass": "Nhập mật khẩu",
            "btn_login": "Đăng nhập",
            "forgot_pass": "Quên mật khẩu?",
            "ar": "Quy định về quảng cáo",
            "tos": "Điều khoản dịch vụ",
            "atac": "Điều khoản và điều kiện của nhà quảng cáo",
            "pp": "Chính sách bảo mật",
            "cookies": "Chính sách",
            "reserved": "© 2026 SmartAds, FPT Online. Đã đăng ký bản quyền."
        }
    };

    if(lang){
        document.querySelector('title').innerHTML = translations[lang].title;
        document.querySelector('.title').innerHTML = translations[lang].desc_text;
        document.querySelector('.have-account').innerHTML = translations[lang].have_account;
        document.querySelector('.password-text').innerHTML = translations[lang].password;
        document.querySelector('#email').placeholder = translations[lang].enterEmail;
        document.querySelector('#password').placeholder = translations[lang].enterPass;
        document.querySelector('#btn_login').innerHTML = translations[lang].btn_login;
        document.querySelector('.forgot-password').innerHTML = translations[lang].forgot_pass;
        document.querySelector('.ar').innerHTML = translations[lang].ar;
        document.querySelector('.tos').innerHTML = translations[lang].tos;
        document.querySelector('.atac').innerHTML = translations[lang].atac;
        document.querySelector('.pp').innerHTML = translations[lang].pp;
        document.querySelector('.cookies').innerHTML = translations[lang].cookies;
        document.querySelector('.line3').innerHTML = translations[lang].reserved;
    }
}

function eyeOnOff(){
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
eyeOnOff();

