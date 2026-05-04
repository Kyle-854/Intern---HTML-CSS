const SUPABASE_URL = 'https://tctjqxhtwhaplpvkmucz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdGpxeGh0d2hhcGxwdmttdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDM1NzQsImV4cCI6MjA5MTk3OTU3NH0.8oPOL5359o6sSp4UBGpY_3LjC0gCLPOpECm4Bo81eQI';

async function handleSignUpSubmit() {
    // 1. Lấy Token từ bước trước
    const token = sessionStorage.getItem('userToken');
    
    if (!token) {
        alert("Dữ liệu bị mất, vui lòng đăng ký lại!");
        window.location.href = '../../Sign-up-form/sign-up.html';
        return;
    }

    const realPassword = document.getElementById('password1').value;
    const btnSubmit = document.getElementById('btn_submit');

    btnSubmit.classList.add('loading');
    btnSubmit.disabled = true;

    try {
        // 2. Gọi API UPDATE User (Dùng method PUT)
        const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
            method: 'PUT',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${token}`, // Dùng Token thay vì Anon Key đơn thuần
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: realPassword, // Đổi pass ảo thành pass thật
                data: {
                    raw_password: realPassword, // Đồng bộ pass qua table public cho bạn dễ nhìn
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
    
    if (confirmForm) {
        confirmForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSignUpSubmit();
        });
    }
});