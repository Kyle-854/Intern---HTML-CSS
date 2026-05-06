let currentRole = null;
let selectedIndustry = null;
let currentLang = 'ENG';

document.addEventListener('DOMContentLoaded', () => {
    setupDropdown();
    handleLanguageSelect();
    updateActiveLanguage();
    xuLyRadioButton();
    xuLyChuyenForm();
    showIndustry();
    xuLyIndustryList();
    xuLySearch();
    xuLySignUp();
});

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

        currentLang = 'ENG';
        applyTranslations("ENG");
    } 
    
    if(document.querySelector('.language').innerHTML === "VIE"){
        sub2.style.background = 'var(--color-primary-500, #048845)';
        sub2_lang.style.color = 'white';
        sub1.style.background = '';
        sub1_lang.style.color = '';

        currentLang = 'VIE';
        applyTranslations("VIE");
    }

    showIndustry();
}

function applyTranslations(lang){

    if(lang){
        const temp = translationsSignUp[lang];
        
        // Buttons & Links
        document.querySelector('#back-step1').innerHTML = temp.back_to_home;
        document.querySelector('#back-step2').innerHTML = temp.back;
        document.querySelector('.title').innerHTML = temp.title;
        document.querySelector('#content-description-step1').innerHTML = temp.desc_step1;
        document.querySelector('#content-description-step2').innerHTML = temp.desc_step2;
        
        // Roles (Advertiser / Publisher)
        document.querySelector('.ads__title').innerHTML = temp.ads_title;
        document.querySelector('.ads__description').innerHTML = temp.ads_desc;
        document.querySelector('.pub__title').innerHTML = temp.pub_title;
        document.querySelector('.pub__description').innerHTML = temp.pub_desc;
        document.querySelector('#select-option-form .btn_action').innerHTML = temp.btn_continue;

        // Form Inputs
        const inputTexts = document.querySelectorAll('.input__text');
        if(inputTexts.length >= 4) {
            inputTexts[0].innerHTML = temp.fullname;
            inputTexts[1].innerHTML = temp.email;
            inputTexts[2].innerHTML = temp.phone;
            inputTexts[3].innerHTML = temp.industry;
        }
        document.querySelector('.company-name-container .input__text').innerHTML = temp.company;
        
        // Placeholders
        document.querySelector('#full-name').placeholder = temp.fullname_placeholder;
        document.querySelector('#email').placeholder = temp.email_placeholder;
        document.querySelector('#phone-number').placeholder = temp.phone_placeholder;
        
        // Nếu user chưa chọn ngành nghề nào thì đổi placeholder
        if(!selectedIndustry) {
            document.querySelector('.select__text').innerHTML = temp.industry_placeholder;
        }
        document.querySelector('.company-name-container .input__place').placeholder = temp.company_placeholder;
        
        // Agreements & Buttons
        document.querySelector('.agree-container p').innerHTML = temp.agree;
        document.querySelector('#btn_sign-up').childNodes[2].textContent = " " + temp.btn_signup; // Giữ lại thẻ span .spinner
        document.querySelector('.have-account').innerHTML = temp.have_account;

        // Progress text
        document.querySelector('#text1-step1').innerHTML = temp.text1_step1;
        document.querySelector('#text1-step2').innerHTML = temp.text1_step2;

        // Right side Banners
        const rightSideTitles = document.querySelectorAll('.right-side__title');
        const rightSideDescs = document.querySelectorAll('.right-side__description');
        if(rightSideTitles.length >= 2) {
            rightSideTitles[0].innerHTML = temp.right_title1;
            rightSideDescs[0].innerHTML = temp.right_desc1;
            rightSideTitles[1].innerHTML = temp.right_title2;
            rightSideDescs[1].innerHTML = temp.right_desc2;
        }

        // Errors
        document.querySelector('.fullname-error').innerHTML = temp.err_fullname;
        document.querySelector('.email-error__invalid').innerHTML = temp.err_email_invalid;
        document.querySelector('.email-error__exists').innerHTML = temp.err_email_exists;
        document.querySelector('.phone-number-error').innerHTML = temp.err_phone;
        document.querySelector('.company-name-error').innerHTML = temp.err_company;

        // Footers
        document.querySelector('.footer-line1__text').innerHTML = temp.footer_line1;
        document.querySelector('.footer-line2__text').innerHTML = temp.footer_line2;

        document.querySelector('.line1').innerHTML =temp.reserved;
        document.querySelector('.ar').innerHTML = temp.ar;
        document.querySelector('.tos').innerHTML = temp.tos;
        document.querySelector('.atac').innerHTML = temp.atac;
        document.querySelector('.pp').innerHTML = temp.pp;
        document.querySelector('.cookies').innerHTML = temp.cookies;


        // Confirm email
        const confirmTitle = document.querySelector('.confirm-email__title');
        const confirmDesc = document.querySelector('.confirm-email__text');
        
        if (confirmTitle && confirmDesc) {
            confirmTitle.innerHTML = temp.confirm_title;
            
            // 1. Lấy email hiện tại trên màn hình (để không bị mất khi đang xem màn hình này mà user ấn đổi ngôn ngữ)
            const currentEmailSpan = document.querySelector('.confirm-email__your-email');
            let currentEmailValue = 'email@domain.com';
            
            // Nếu độ dài của email khác chữ "email@domain.com" mặc định, nghĩa là user đã submit
            if (currentEmailSpan && currentEmailSpan.innerText !== 'email@domain.com' && currentEmailSpan.innerText !== '') {
                currentEmailValue = currentEmailSpan.innerText;
            } else {
                // Hoặc lấy trực tiếp từ ô input email nếu họ chưa submit
                const inputEmailVal = document.querySelector('#email').value.trim();
                if(inputEmailVal) currentEmailValue = inputEmailVal;
            }

            // 2. Thay đoạn text bằng ngôn ngữ mới
            confirmDesc.innerHTML = temp.confirm_desc;

            // 3. Gắn lại đúng email của user vào thẻ span vừa được tạo ra
            document.querySelector('.confirm-email__your-email').innerText = currentEmailValue;
        }
    }
}

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

    let isForm2 = false;

    formStep1.addEventListener('submit', (e) => {
        e.preventDefault();
        isForm2 = true;

        if(rdoAds.checked){
            currentRole = 'ads';
            
            industryContainer.style.display = 'block';
            companyNameContainer.style.display = 'block';
        }
        
        if(rdoPub.checked){
            currentRole = 'pub';
            
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

            resetFormUI();
            check();
        }
    });

    
}

function showIndustry(){
    const ul = document.querySelector('.list');

    ul.innerHTML = Object.values(industryData).map(item => 
        `<li class="item">${item[currentLang]}</li>`
    ).join('');
    
    // Reset lựa chọn nếu ngôn ngữ thay đổi để tránh lệch data
    selectedIndustry = null;
    const selectText = document.querySelector('.select__text');
    selectText.innerHTML = translationsSignUp[currentLang].industry_placeholder;
    selectText.style.color = '#aaa';
}

function resetFormUI() {
    // reset input
    document.querySelector('#full-name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#phone-number').value = '';
    document.querySelector('.agree-checkbox').checked = false;

    // reset error text
    document.querySelector('.fullname-error').style.display = 'none';
    document.querySelector('.email-error__invalid').style.display = 'none';
    document.querySelector('.email-error__exists').style.display = 'none';
    document.querySelector('.phone-number-error').style.display = 'none';

    // reset border
    const inputPlace = document.querySelectorAll('.input__place');
    inputPlace.forEach(input => {
        input.style.border = '1px solid #DFE3E8';
        input.style.marginBottom = '12px';
    });

    // reset industry
    selectedIndustry = null;
    const selectText = document.querySelector('.select__text');
    selectText.innerHTML = translationsSignUp[currentLang].industry_placeholder;
    selectText.style.color = '#aaa';

    document.querySelectorAll('.item').forEach(i => i.classList.remove('active'));

    // reset company
    document.querySelector('.company-name-container .input__place').value = '';
}

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
    
    });

    list.addEventListener('click', (e) => {
        const item = e.target.closest('.item');
        if (!item) return;

        // bỏ qua "not found"
        if (item.classList.contains('item-not-found')) return;

        selectedIndustry = item.innerHTML;

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

        check();
    });

    document.addEventListener('click', (e) => {
        if (!select.contains(e.target)) {
            icDown.style.display = 'block';
            icUp.style.display = 'none';
            selectDropdown.style.display = 'none';
        }
    });
}

function xuLySearch() {
    const search = document.querySelector('.search');
    const ul = document.querySelector('.list');

    search.addEventListener('input', () => {        
        const keyword = search.value.toLowerCase().trim();

        // Lọc data theo ngôn ngữ hiện tại
        const filtered = Object.values(industryData).filter(item => 
            item[currentLang].toLowerCase().includes(keyword)
        );

        // Render lại list
        if (filtered.length > 0) {
            ul.innerHTML = filtered.map(item => 
                `<li class="item">${item[currentLang]}</li>`
            ).join('');
        } else {
            const notFoundText = currentLang === 'ENG' ? "No results found" : "Không tìm thấy kết quả";
            ul.innerHTML = `<li class="item item-not-found">${notFoundText}</li>`;
        }
    });
}

// function xuLyFullName(fullname){
//     const temp = fullname.value.trim();
    
//     return  temp.length >= 5;
// }

// function xuLyEmail(email){
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email.value);
// }

// function xuLyPhoneNumber(phoneNumber){
//     const phoneNumberRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
//     return phoneNumberRegex.test(phoneNumber.value);
// }

const check = () =>{
    const isIndustryValid = selectedIndustry !== null;

    const fullName = document.querySelector('#full-name');
    const email = document.querySelector('#email');
    const checkBox = document.querySelector('.agree-checkbox');
    const phoneNumber = document.querySelector('#phone-number');
    const btn_signUp = document.querySelector('#btn_sign-up');

    const isCommonValid = 
        fullName.value.trim() !== '' && 
        email.value.trim() !== '' && 
        phoneNumber.value.trim() !== '' && 
        checkBox.checked;

    const isValid = 
        (currentRole === 'ads' && isCommonValid && isIndustryValid) ||
        (currentRole === 'pub' && isCommonValid);
        
    btn_signUp.disabled = !isValid;
}

function xuLySignUp(){
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

    check();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        temp = true;

        //validate fullname
        if (fullName.value.trim().length < 5) {
            temp = false;
            fullnameError.style.display = 'block';
            fullName.style.border = '2px solid #BA1A1A';
            fullName.style.marginBottom = '4px';
        }

        //validate email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email.value)) {
            temp = false;
            emailErrorInvalid.style.display = 'block';
            email.style.border = '2px solid #BA1A1A';
            email.style.marginBottom = '4px';
        }

        //validate phonenumber
        const phoneNumberRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
        if (!phoneNumberRegex.test(phoneNumber.value)) {
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

const SUPABASE_URL = 'https://tctjqxhtwhaplpvkmucz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdGpxeGh0d2hhcGxwdmttdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDM1NzQsImV4cCI6MjA5MTk3OTU3NH0.8oPOL5359o6sSp4UBGpY_3LjC0gCLPOpECm4Bo81eQI';

async function handleCheckEmailExists() {
    const emailInput = document.querySelector('#email');
    const email = emailInput.value.trim();
    const confirmContainer = document.querySelector('.confirm-email-container');
    const emailErrorExists = document.querySelector('.email-error__exists');
    const leftSideContent = document.querySelector('.left-side__content'); 
    const leftSideFooter = document.querySelector('.left-side__footer');
    const yourEmail = document.querySelector('.confirm-email__your-email');


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

        // Tạo mật khẩu ảo mặc định
        const dummyPassword = "Chưa đặt mật khẩu";
        const companyEl = document.querySelector('.company-name-container .input__place');
        const companyInput = companyEl ? companyEl.value.trim() : ''; // Nếu có ô đó thì lấy giá trị, không thì để chuỗi rỗng

        // Gọi API tạo User ngay lập tức vào Supabase Auth
        const signUpRes = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: dummyPassword, // Nhét pass ảo vào
                data: {
                    full_name: document.querySelector('#full-name').value.trim(),
                    phone: document.querySelector('#phone-number').value.trim(),
                    role: currentRole, // 'ads' hoặc 'pub'
                    industry: selectedIndustry,
                    company: companyInput,
                    raw_password: 'Chưa đặt mật khẩu', // Hiện chữ này trong Table Editor
                    status: 'pending' // TRẠNG THÁI CHỜ
                }
            })
        });

        const signUpData = await signUpRes.json();

        // Nếu tạo user lỗi thì báo cho người dùng biết
        if (!signUpRes.ok) {
            alert("Không thể tạo hồ sơ tạm: " + (signUpData.error_description || signUpData.msg));
            return; 
        }

        // Lưu chìa khóa (Token) của người này vào session để mang sang trang Confirm Password
        if (signUpData.access_token) {
            sessionStorage.setItem('userToken', signUpData.access_token);
        } else {
            console.error("Lỗi: Không nhận được Token từ Supabase!");
        }

        //EMAIL CHƯA TỒN TẠI → HIỆN UI
        confirmContainer.style.display = 'flex';
        leftSideContent.style.display = 'none';
        leftSideFooter.style.display = 'none';
        yourEmail.innerHTML = email;

        let time = 5;
        const countdownEl = confirmContainer.querySelector('.countdown');

        const interval = setInterval(() => {
            time--;

            if (countdownEl) {
                countdownEl.innerText = time;
            }

            if (time === 0) {
                clearInterval(interval);
                window.location.href = '/Authentication-Forms/Confirm-password-form/confirm-password.html';
            }

        }, 1000);

    } catch (error) {
        console.error('Lỗi:', error);
    }
}