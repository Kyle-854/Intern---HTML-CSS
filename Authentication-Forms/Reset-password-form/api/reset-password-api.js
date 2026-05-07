const SUPABASE_URL = 'https://tctjqxhtwhaplpvkmucz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdGpxeGh0d2hhcGxwdmttdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDM1NzQsImV4cCI6MjA5MTk3OTU3NH0.8oPOL5359o6sSp4UBGpY_3LjC0gCLPOpECm4Bo81eQI';

async function handleResetSubmit() {
    // 1. LẤY TOKEN TỪ URL HASH (#access_token=...)
    let token = null;
    const hash = window.location.hash;
    if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        token = params.get('access_token');
    }

    if (!token) {
        alert("Liên kết đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu lại mã mới!");
        window.location.href = '../Forgot-password-form/forgot-password.html';
        return;
    }

    const realPassword = document.getElementById('password1').value;
    const btnSubmit = document.getElementById('btn_submit');

    btnSubmit.classList.add('loading');
    btnSubmit.disabled = true;

    try {
        // 2. GỌI API CẬP NHẬT MẬT KHẨU VỚI TOKEN VỪA LẤY ĐƯỢC
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
                    password: realPassword // Cập nhật luôn vào Table Editor cho đồng bộ
                }
            })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error_description || data.msg);

        // 3. THÀNH CÔNG
        alert("Cập nhật mật khẩu thành công! Vui lòng đăng nhập lại.");
        
        // Cập nhật xong thì xóa cái hash trên URL đi cho sạch sẽ
        window.history.replaceState(null, null, window.location.pathname);
        window.location.href = '../Sign-in-form/sign-in.html'; 

    } catch (error) {
        console.error('LỖI CẬP NHẬT MẬT KHẨU:', error);
        alert("Có lỗi xảy ra: " + error.message);
    } finally {
        btnSubmit.classList.remove('loading');
        btnSubmit.disabled = false;
    }
}

// BẮT SỰ KIỆN SUBMIT VÀ DOUBLE CHECK DỮ LIỆU
document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('reset-password-form');
    
    if (resetForm) {
        resetForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const pass1 = document.getElementById('password1').value;
            const pass2 = document.getElementById('password2').value;

            // Bê nguyên bộ kiểm tra 5 điều kiện
            const cond1 = pass1.length > 0;
            const cond2 = pass1.length >= 12;
            const cond3 = /[0-9]/.test(pass1) && /[!@#$%^&*(),.?":{}|<>_\-+=/[\]\\]/.test(pass1);
            const cond4 = /[a-z]/.test(pass1) && /[A-Z]/.test(pass1);
            const cond5 = pass1 === pass2 && pass1.length > 0;

            if (cond1 && cond2 && cond3 && cond4 && cond5) {
                await handleResetSubmit();
            } else {
                alert('Lỗi: Dữ liệu không hợp lệ, vui lòng kiểm tra lại!');
                const btnSubmit = document.getElementById('btn_submit');
                if (btnSubmit) btnSubmit.disabled = true;
            }
        });
    }
});