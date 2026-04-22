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

function xuLyIndustryList(){
    const select = document.querySelector('.select');
    const selectTitle = document.querySelector('.select__title');
    const icDown = document.querySelector('.ic-down-small-fill');
    const icUp = document.querySelector('.ic-up-small-fill');
    const selectDropdown = document.querySelector('.select__dropdown');
    const items =document.querySelectorAll('.item');
    const selectText = document.querySelector('.select__text');

    selectTitle.addEventListener('click', (e) => {
        e.stopPropagation();

        if(getComputedStyle(icUp).display === 'none'){
            icUp.style.display = 'block';
            icDown.style.display = 'none';
            selectDropdown.style.display = 'block';
        }
        else{
            icDown.style.display = 'block';
            icUp.style.display = 'none';
            selectDropdown.style.display = 'none';
        }

        items.forEach((item) => {
            item.addEventListener('click', () => {
                selectText.innerHTML = item.innerHTML;
                selectText.style.color = '#000';

                items.forEach(i => i.classList.remove('active'));

                item.classList.add('active');

                icDown.style.display = 'block';
                icUp.style.display = 'none';
                selectDropdown.style.display = 'none';
            });

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
    const items =document.querySelectorAll('.item');
    const notFound =document.querySelector('.item-not-found');

    search.addEventListener('input', () => {
        const value = search.value.toLowerCase();
        let result = false;

        items.forEach(item => {
        const text = item.textContent.toLowerCase();

        if (text.includes(value)) {
            item.style.display = 'none';
            result = true;
        } else {
            item.style.display = 'block';
        }
    });

    if (result) {
        notFound.style.display = 'none';
    } else {
        notFound.style.display = 'block';
    }

    });
}
xuLySearch();

//CÁI Ô SEARCH BỊ LỖI: SAU KHI NHẬP KÍ TỰ VÀO VÀ XÓA ĐI THÌ CÁI .select bị co lại