const SUPABASE_URL = 'https://tctjqxhtwhaplpvkmucz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdGpxeGh0d2hhcGxwdmttdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDM1NzQsImV4cCI6MjA5MTk3OTU3NH0.8oPOL5359o6sSp4UBGpY_3LjC0gCLPOpECm4Bo81eQI';

async function handleSignUpSubmit() {
    // 1. Lấy Token từ bước trước
    const token = sessionStorage.getItem('userToken');
    
    if (!token) {
        alert("Dữ liệu bị mất, vui lòng đăng ký lại!");
        window.location.href = '../Sign-up-form/sign-up.html';
        return;
    }

    const realPassword = document.getElementById('password1').value;
    const btnSubmit = document.getElementById('btn_submit');

    btnSubmit.classList.add('loading');
    btnSubmit.disabled = true;

    try {
        // 2. Gọi API UPDATE User 
        const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
            method: 'PUT',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: realPassword, 
                data: {
                    raw_password: realPassword, // Đồng bộ pass qua table public cho dễ nhìn
                    status: 'active' // ĐỔI TRẠNG THÁI THÀNH KÍCH HOẠT
                }
            })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error_description || data.msg);

        // 3. THÀNH CÔNG
        alert("Kích hoạt tài khoản thành công!");
        sessionStorage.removeItem('userToken'); 
        window.location.href = '../Sign-in-form/sign-in.html'; 

    } catch (error) {
        console.error('LỖI KÍCH HOẠT:', error);
        alert("Có lỗi xảy ra: " + error.message);
    } finally {
        btnSubmit.classList.remove('loading');
        btnSubmit.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const confirmForm = document.getElementById('confirm-password-form');
    const btnSubmit = confirmForm.elements['btn_submit'];
    
    if (confirmForm) {
        confirmForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const pass1 = confirmForm.elements['password1'].value;
            const pass2 = confirmForm.elements['password2'].value;

            const cond1 = pass1.length > 0; // Not blank
            const cond2 = pass1.length >= 12; // Min 12 chars
            const cond3 = /[0-9]/.test(pass1) && /[!@#$%^&*(),.?":{}|<>_\-+=/[\]\\]/.test(pass1); // Number & Special char
            const cond4 = /[a-z]/.test(pass1) && /[A-Z]/.test(pass1); // Lowercase & Uppercase
            const cond5 = pass1 === pass2 && pass1.length > 0; // Passwords match

            if (cond1 && cond2 && cond3 && cond4 && cond5) {
                await handleSignUpSubmit();
            }
            else{
                console.warn('Lỗi: Nút Submit bị mất disable khi dữ liệu không hợp lệ');
                alert('Lỗi: Nút Submit bị mất disable khi dữ liệu không hợp lệ');
                btnSubmit.disabled = true;
            }

        });
    }
});  