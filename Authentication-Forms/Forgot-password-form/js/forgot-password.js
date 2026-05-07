const SUPABASE_URL = 'https://tctjqxhtwhaplpvkmucz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdGpxeGh0d2hhcGxwdmttdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDM1NzQsImV4cCI6MjA5MTk3OTU3NH0.8oPOL5359o6sSp4UBGpY_3LjC0gCLPOpECm4Bo81eQI';

let currentLang = 'ENG';

document.addEventListener('DOMContentLoaded', () => {
    setupLanguageSwitcher();
    applyTranslations(currentLang);
    setupFormLogic(); // Hàm này chứa cả validate và submit API
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
    if (typeof translationsForgotPassword === 'undefined') return;
    const temp = translationsForgotPassword[lang];

    document.querySelector('.content__title').innerHTML = temp.title;
    document.querySelector('.content__description').innerHTML = temp.desc;
    document.querySelector('.email-error').innerHTML = temp.err_email;

    const form = document.getElementById('forgot-password__form');
    if (form) {
        const emailInput = form.elements['email'];
        if (emailInput) emailInput.placeholder = temp.placeholder;

        const btnSubmit = form.elements['btn_submit'];
        if (btnSubmit) {
            const btnText = btnSubmit.querySelector('.btn-text');
            if (btnText) btnText.innerHTML = temp.btn_submit;
        }
    }

    const confirmTitle = document.querySelector('.confirm-email__title');
    if (confirmTitle) confirmTitle.innerHTML = temp.confirm_title;

    const confirmDesc = document.querySelector('.confirm-email__description');
    if (confirmDesc) {
        const emailSpan = document.getElementById('your-email');
        const emailValue = emailSpan ? emailSpan.innerText : 'email@domain.com';
        confirmDesc.innerHTML = temp.confirm_desc.replace('{email}', `<span id="your-email">${emailValue}</span>`);
    }

    const countdownContainer = document.querySelector('.confirm-email__countdown');
    if (countdownContainer) {
        const countdownSpan = document.getElementById('countdown');
        const countdownValue = countdownSpan ? countdownSpan.innerText : '120s';
        countdownContainer.innerHTML = temp.countdown_text + `<span id="countdown">${countdownValue}</span>`;
    }

    document.querySelector('.line1').innerHTML = temp.reserved;
    document.querySelector('.ar').innerHTML = temp.ar;
    document.querySelector('.tos').innerHTML = temp.tos;
    document.querySelector('.atac').innerHTML = temp.atac;
    document.querySelector('.pp').innerHTML = temp.pp;
    document.querySelector('.cookies').innerHTML = temp.cookies;
}

function setupFormLogic() {
    const form = document.getElementById('forgot-password__form');
    if (!form) return;

    const emailInput = form.elements['email'];
    const btnSubmit = form.elements['btn_submit'];
    const emailError = document.querySelector('.email-error');

    btnSubmit.disabled = true;

    emailInput.addEventListener('input', () => {
        const emailValue = emailInput.value.trim();

        emailError.style.display = 'none';
        emailInput.style.border = '1px solid #DFE3E8';
        emailInput.style.marginBottom = '20px';

        btnSubmit.disabled = emailValue === '';
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Ngăn trình duyệt reload
        
        const emailValue = emailInput.value.trim();

        btnSubmit.classList.add('loading');
        btnSubmit.disabled = true;

        try {
            const res = await fetch(`${SUPABASE_URL}/functions/v1/check-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify({ email: emailValue })
            });

            const data = await res.json();

            if (data.exists) {
                // EMAIL TỒN TẠI: Ẩn form, hiện phần đếm ngược
                document.querySelector('.forgot-password__content').style.display = 'none';
                document.querySelector('.forgot-password__confirm-email').style.display = 'flex';
                
                const yourEmailSpan = document.getElementById('your-email');
                if (yourEmailSpan) yourEmailSpan.innerText = emailValue;

                // CHỈ KHI NÀO THÀNH CÔNG MỚI GỌI HÀM ĐẾM NGƯỢC
                xuLyCountdown(); 
            } else {
                // EMAIL KHÔNG TỒN TẠI: Hiện lỗi, đổi viền đỏ
                emailError.style.display = 'block';
                emailInput.style.border = '2px solid #BA1A1A';
                emailInput.style.marginBottom = '4px';
            }

        } catch (error) {
            console.error("Lỗi kết nối:", error);
            alert("Lỗi hệ thống, vui lòng thử lại sau!");
        } finally {
            // Tắt trạng thái xoay xoay
            btnSubmit.classList.remove('loading');
            
            // Nếu vẫn đang còn nội dung chữ bên trong input thì bật nút lại để user có thể bấm tiếp
            if (emailInput.value.trim() !== '') {
                btnSubmit.disabled = false;
            }
        }
    });
}

function xuLyCountdown() {
    let time = 5;
    
    const timer = setInterval(() => {
        time--;
        const currentCountdown = document.getElementById('countdown');
        
        if (currentCountdown) {
            currentCountdown.innerHTML = time + 's';
        }

        if (time <= 0){
            clearInterval(timer);
            if (currentCountdown) currentCountdown.innerHTML = '0s';
            
            window.location.href = '../Reset-password-form/reset-password.html'; 
        }
    }, 1000);
}