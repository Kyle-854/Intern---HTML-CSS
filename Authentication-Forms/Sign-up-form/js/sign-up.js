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

        // applyTranslations("ENG");
    } 
    
    if(document.querySelector('.language').innerHTML === "VIE"){
        sub2.style.background = 'var(--color-primary-500, #048845)';
        sub2_lang.style.color = 'white';
        sub1.style.background = '';
        sub1_lang.style.color = '';

        // applyTranslations("VIE");
    }
    
}
updateActiveLanguage();

// function applyTranslations(lang){

//     const trans = translations;

//     if(lang){
//         const temp = trans[lang];
//         document.querySelector('title').innerHTML = temp.title;
//         document.querySelector('.title').innerHTML = temp.desc_text;
//         document.querySelector('.have-account').innerHTML = temp.have_account;
//         document.querySelector('.password-text').innerHTML = temp.password;
//         document.querySelector('#email').placeholder = temp.enter_email;
//         document.querySelector('#password').placeholder = temp.enter_pass;
//         document.querySelector('#btn_login .btn-text').innerHTML = temp.btn_login;
//         document.querySelector('.forgot-password').innerHTML = temp.forgot_pass;
//         document.querySelector('.ar').innerHTML = temp.ar;
//         document.querySelector('.tos').innerHTML = temp.tos;
//         document.querySelector('.atac').innerHTML = temp.atac;
//         document.querySelector('.pp').innerHTML = temp.pp;
//         document.querySelector('.cookies').innerHTML = temp.cookies;
//         document.querySelector('.line1').innerHTML = temp.reserved;
//         document.querySelector('.footer-line1__text').innerHTML = temp.footer_line1;
//         document.querySelector('.footer-line2__text').innerHTML = temp.footer_line2;
//         document.querySelector('.email-error').innerHTML = temp.email_error;
//         document.querySelector('.password-error').innerHTML = temp.password_error;
//     }
// }

function xuLyRadioButton(){
    const ads = document.querySelector('.ads-option');
    const pub = document.querySelector('.pub-option');
    const adsTitle = document.querySelector('.ads__title');
    const pubTitle = document.querySelector('.pub__title');
    const rdoAds = document.querySelector('.rdo-ads');
    const rdoPub = document.querySelector('.rdo-pub');
    const rightSideHeader1 = document.querySelector('.right-side__header1');
    const rightSideHeader2 = document.querySelector('.right-side__header2');
    const rightSide = document.querySelector('.right-side');

    

    ads.addEventListener('click', () => {
        rdoAds.checked = true;

        ads.style.border = '2px solid #048845';
        pub.style.border = '2px solid #F0F2F4';

        adsTitle.style.color = '#048845';
        pubTitle.style.color = '#000';

        rightSideHeader1.style.display = 'block';
        rightSideHeader2.style.display = 'none';

        rightSide.style.backgroundImage = 
            "url('../../../assets/images/ads-zone-signup-advertiser.png'), linear-gradient(180deg, #F7F7F7 0%, #F5F5F5 90.1%)";
    });

    pub.addEventListener('click', () => {
        rdoPub.checked = true;

        pub.style.border = '2px solid #048845';
        ads.style.border = '2px solid #F0F2F4';

        pubTitle.style.color = '#048845';
        adsTitle.style.color = '#000';

        rightSideHeader2.style.display = 'block';
        rightSideHeader1.style.display = 'none';

        rightSide.style.backgroundImage = 
            "url('../../../assets/images/ads-zone-signup-publisher.png'), linear-gradient(180deg, #F7F7F7 0%, #F5F5F5 90.1%)";
    });
    
}
xuLyRadioButton();

function xuLyChuyenForm(){
    const formStep1 = document.querySelector('#select-option-form');
    const formStep2 = document.querySelector('#sign-up-ads-form');
    const rdoAds = document.querySelector('.rdo-ads');
    const rdoPub = document.querySelector('.rdo-pub');
    const industryContainer = document.querySelector('.industry-container');
    const companyNameContainer = document.querySelector('.company-name-container');
    const backToHome = document.querySelector('.back-to-home');
    const backStep1 = document.querySelector('#back-step1');
    const backStep2 = document.querySelector('#back-step2');
    const descriptionStep1 = document.querySelector('#content-description-step1');
    const descriptionStep2 = document.querySelector('#content-description-step2');
    const text1Step1 = document.querySelector('#text1-step1');
    const text1Step2 = document.querySelector('#text1-step2');
    const text2 = document.querySelector('.text2');
    const step2 = document.querySelector('.step2');

    let form;
    let isForm2 = false;

    formStep1.addEventListener('submit', (e) => {
        e.preventDefault();
        isForm2 = true;

        if(rdoAds.checked){
            form = 'ads';
            
            industryContainer.style.display = 'block';
            companyNameContainer.style.display = 'block';
        }
        
        if(rdoPub.checked){
            form = 'pub';
            
            industryContainer.style.display = 'none';
            companyNameContainer.style.display = 'none';
        }

        formStep1.style.display = 'none';
        formStep2.style.display = 'block';
        backStep1.style.display = 'none';
        backStep2.style.display = 'block';
        descriptionStep1.style.display = 'none';
        descriptionStep2.style.display = 'block';
        text1Step1.style.display = 'none';
        text1Step2.style.display = 'block';
        text2.innerHTML = '2/2';
        step2.style.background = '#048845';

        xuLySignUp(form);

    });

    backToHome.addEventListener('click', (e) => {
        if (isForm2) {
            e.preventDefault();
            isForm2 = false;

            formStep1.style.display = 'block';
            formStep2.style.display = 'none';
            backStep1.style.display = 'block';
            backStep2.style.display = 'none';
            descriptionStep1.style.display = 'block';
            descriptionStep2.style.display = 'none';
            text1Step1.style.display = 'block';
            text1Step2.style.display = 'none';
            text2.innerHTML = '1/2';
            step2.style.background = '#E8E8E8';


        }
    });

    
}
xuLyChuyenForm();

function showIndustry(){
    const ul = document.querySelector('.list');

    ul.innerHTML = Object.values(industryData).map(item => 
        `<li class="item">${item.ENG}</li>`
    ).join('');
}
showIndustry();

function xuLyIndustryList(){
    const select = document.querySelector('.select');
    const selectTitle = document.querySelector('.select__title');
    const icDown = document.querySelector('.ic-down-small-fill');
    const icUp = document.querySelector('.ic-up-small-fill');
    const selectDropdown = document.querySelector('.select__dropdown');
    const selectText = document.querySelector('.select__text');
    const list =document.querySelector('.list');

    selectTitle.addEventListener('click', (e) => {
        e.stopPropagation();

        const isOpen = selectDropdown.style.display === 'block';

        selectDropdown.style.display = isOpen ? 'none' : 'block';
        icUp.style.display = isOpen ? 'none' : 'block';
        icDown.style.display = isOpen ? 'block' : 'none';

        list.addEventListener('click', (e) => {
            const item = e.target.closest('.item');
            if (!item) return;

            // bỏ qua "not found"
            if (item.classList.contains('item-not-found')) return;

            selectText.innerHTML = item.innerHTML;
            selectText.style.color = '#000';

            // remove active cũ
            document.querySelectorAll('.item').forEach(i => i.classList.remove('active'));

            // set active mới
            item.classList.add('active');

            // đóng dropdown
            selectDropdown.style.display = 'none';
            icUp.style.display = 'none';
            icDown.style.display = 'block';
        });
    });

    document.addEventListener('click', (e) => {
        if (!select.contains(e.target)) {
            icDown.style.display = 'block';
            icUp.style.display = 'none';
            selectDropdown.style.display = 'none';
        }
    });
}
xuLyIndustryList();

function xuLySearch() {
    const search = document.querySelector('.search');
    const ul =document.querySelector('.list');

    search.addEventListener('input', () => {        

        const keyword = search.value.toLowerCase().trim();

        // lọc data
        const filtered = Object.values(industryData).filter(item => 
            item.ENG.toLowerCase().includes(keyword)
        );

        // render lại list
        if (filtered.length > 0) {
            ul.innerHTML = filtered.map(item => 
                `<li class="item">${item.ENG}</li>`
            ).join('');
        } else {
            ul.innerHTML = `<li class="item item-not-found">No results found</li>`;
        }

    });
}
xuLySearch();

// CÁI Ô SEARCH BỊ LỖI: SAU KHI NHẬP KÍ TỰ VÀO VÀ XÓA ĐI THÌ CÁI .select bị co lại

function xuLyFullName(fullname){
    const regex = /^[\p{L} ]+$/u;
    const temp = fullname.value.trim().replace(/\s+/g, " ");
    
    return  temp.length >= 5 && regex.test(temp);
}

function xuLyEmail(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.value);
}

function xuLyPhoneNumber(phoneNumber){
    const phoneNumberRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    return phoneNumberRegex.test(phoneNumber.value);
}

function xuLySignUp(role){
    const form = document.querySelector('#sign-up-ads-form');
    const fullName = document.querySelector('#full-name');
    const email = document.querySelector('#email');
    const checkBox = document.querySelector('.agree-checkbox');
    const selectText = document.querySelector('.select__text');

    const btn_signUp = document.querySelector('#btn_sign-up');
    const phoneNumber = document.querySelector('#phone-number');
    const fullnameError = document.querySelector('.fullname-error');
    const emailErrorInvalid = document.querySelector('.email-error__invalid');
    const emailErrorExists = document.querySelector('.email-error__exists');
    const phoneNumberError = document.querySelector('.phone-number-error');


    let temp;
    btn_signUp.disabled = true;

    const check = () =>{
        const fullNameCheck = fullName.value.trim();
        const emailCheck = email.value.trim();
        const phoneNumberCheck = phoneNumber.value.trim();

        if(
            fullNameCheck !== '' && 
            emailCheck !== '' && 
            phoneNumberCheck !== '' && 
            checkBox.checked &&
            role === 'ads' &&
            selectText.innerHTML === 'Select your industry'
        ){
            btn_signUp.disabled = false;
        } else{
            btn_signUp.disabled = true;
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        temp = true;

        if (!xuLyFullName(fullName)) {
            temp = false;
            fullnameError.style.display = 'block';
            fullName.style.border = '2px solid #BA1A1A';
            fullName.style.marginBottom = '4px';
        }

        if (!xuLyEmail(email)) {
            temp = false;
            emailErrorInvalid.style.display = 'block';
            email.style.border = '2px solid #BA1A1A';
            email.style.marginBottom = '4px';
        }

        if (!xuLyPhoneNumber(phoneNumber)) {
            temp = false;
            phoneNumberError.style.display = 'block';
            phoneNumber.style.border = '2px solid #BA1A1A';
            phoneNumber.style.marginBottom = '4px';
        }

        if(checkBox.checked === false){
            temp = false;
        }

        if (temp) {
            btn_signUp.classList.add('loading');
            btn_signUp.disabled = true;

            try {
                await handleCheckEmailExists();
            } finally {
                btn_signUp.classList.remove('loading');
                btn_signUp.disabled = false;
            }
        }
    });

    fullName.addEventListener('input', () => {
        fullnameError.style.display = 'none';
        fullName.style.border = '1px solid #DFE3E8';
        fullName.style.marginBottom = '12px';
        check();

    });

    email.addEventListener('input', () => {
        emailErrorExists.style.display = 'none';
        emailErrorInvalid.style.display = 'none';
        email.style.border = '1px solid #DFE3E8';
        email.style.marginBottom = '12px';
        check();

    });

    phoneNumber.addEventListener('input', () => {
        phoneNumberError.style.display = 'none';
        phoneNumber.style.border = '1px solid #DFE3E8';
        phoneNumber.style.marginBottom = '12px';
        check();

    });

    checkBox.addEventListener('change', () => {
        check();
    });
}
// xuLySignUp();

const SUPABASE_URL = 'https://tctjqxhtwhaplpvkmucz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdGpxeGh0d2hhcGxwdmttdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDM1NzQsImV4cCI6MjA5MTk3OTU3NH0.8oPOL5359o6sSp4UBGpY_3LjC0gCLPOpECm4Bo81eQI';

async function handleCheckEmailExists() {
    const emailInput = document.querySelector('#email');
    const email = emailInput.value.trim();
    const confirmContainer = document.querySelector('.confirm-email-container');
    const emailErrorExists = document.querySelector('.email-error__exists');

    try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/check-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        //EMAIL ĐÃ TỒN TẠI
        if (data.exists) {
            emailErrorExists.style.display = 'block';
            emailInput.style.border = '2px solid #BA1A1A';
            emailInput.style.marginBottom = '4px';
            return;
        }

        //EMAIL CHƯA TỒN TẠI → HIỆN UI
        confirmContainer.style.display = 'block';

        let time = 3;
        const countdownEl = confirmContainer.querySelector('.countdown');

        const interval = setInterval(() => {
            time--;

            if (countdownEl) {
                countdownEl.innerText = time;
            }

            if (time === 0) {
                clearInterval(interval);
                window.location.href = '../../Confirm-password-form/confirm-password.html';
            }

        }, 1000);

    } catch (error) {
        console.error('Lỗi:', error);
    }
}