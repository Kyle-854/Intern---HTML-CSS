const SUPABASE_URL = 'https://tctjqxhtwhaplpvkmucz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdGpxeGh0d2hhcGxwdmttdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDM1NzQsImV4cCI6MjA5MTk3OTU3NH0.8oPOL5359o6sSp4UBGpY_3LjC0gCLPOpECm4Bo81eQI';

async function handleResetSubmit() {
    // 1. Lấy Token từ URL hash
    let token = null;
    const hash = window.location.hash;
    if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        token = params.get('access_token');
    }

    if (!token) {
        alert("Không tìm thấy phiên xác thực. Vui lòng thử lại!");
        window.location.href = '../Forgot-password-form/forgot-password.html';
        return;
    }

    const realPassword = document.getElementById('password1').value;
    const btnSubmit = document.getElementById('btn_submit');

    btnSubmit.classList.add('loading');
    btnSubmit.disabled = true;

    try {
        // --- BƯỚC A: CẬP NHẬT BẢNG AUTHENTICATION ---
        const authRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
            method: 'PUT',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: realPassword, 
                data: {
                    password: realPassword,
                    status: 'active' 
                }
            })
        });

        const userData = await authRes.json();

        if (!authRes.ok) throw new Error(userData.error_description || userData.msg);

        // --- BƯỚC B: ĐỒNG BỘ SANG TABLE EDITOR (BẢNG USERS) ---
        // Chúng ta dùng email lấy được từ kết quả trả về của bước A để tìm đúng dòng cần update
        const userEmail = userData.email;

        const tableRes = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${userEmail}`, {
            method: 'PATCH', // Dùng PATCH để cập nhật dữ liệu đã có
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                password: realPassword, // Cập nhật cột password trong Table Editor
                status: 'active'        // Chuyển luôn sang active để login được
            })
        });

        if (!tableRes.ok) {
            console.error("Lỗi đồng bộ Table Editor, nhưng Auth đã đổi xong.");
        }

        // THÀNH CÔNG
        alert("Cập nhật mật khẩu thành công! Vui lòng đăng nhập lại.");
        window.history.replaceState(null, null, window.location.pathname);
        window.location.href = '../Sign-in-form/sign-in.html'; 

    } catch (error) {
        console.error('LỖI:', error);
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