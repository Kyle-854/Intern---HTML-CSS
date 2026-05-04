const SUPABASE_URL = 'https://tctjqxhtwhaplpvkmucz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdGpxeGh0d2hhcGxwdmttdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDM1NzQsImV4cCI6MjA5MTk3OTU3NH0.8oPOL5359o6sSp4UBGpY_3LjC0gCLPOpECm4Bo81eQI';

async function handleSignUpSubmit() {
    const userDataString = sessionStorage.getItem('signUpData');
    
    if (!userDataString) {
        alert("Dữ liệu đăng ký bị mất, vui lòng thực hiện lại từ đầu!");
        window.location.href = '../Sign-up-form/sign-up.html';
        return;
    }

    const userData = JSON.parse(userDataString);
    const password = document.getElementById('password1').value;
    const btnSubmit = document.getElementById('btn_submit');

    btnSubmit.classList.add('loading');
    btnSubmit.disabled = true;

    try {
        const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userData.email,
                password: password,
                data: {
                    full_name: userData.fullName,
                    phone: userData.phone,
                    role: userData.role,
                    industry: userData.industry,
                    company: userData.company,
                    raw_password: password // THÊM DÒNG NÀY ĐỂ TRUYỀN MẬT KHẨU CHO TRIGGER
                }
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error_description || data.msg || 'Đăng ký thất bại');
        }

        alert("Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.");
        
        sessionStorage.removeItem('signUpData'); 
        
        window.location.href = `../Sign-in-form/sign-in.html`; 

    } catch (error) {
        console.error('LỖI ĐĂNG KÝ:', error);
        alert("Có lỗi xảy ra: " + error.message);
    } finally {
        btnSubmit.classList.remove('loading');
        btnSubmit.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const confirmForm = document.getElementById('confirm-password-form');
    
    if (confirmForm) {
        confirmForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSignUpSubmit();
        });
    }
});