const SUPABASE_URL = 'https://tctjqxhtwhaplpvkmucz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdGpxeGh0d2hhcGxwdmttdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDM1NzQsImV4cCI6MjA5MTk3OTU3NH0.8oPOL5359o6sSp4UBGpY_3LjC0gCLPOpECm4Bo81eQI';

async function handleResetSubmit() {
    /* LƯU Ý QUAN TRỌNG VỀ TOKEN: 
       Để Supabase cho phép đổi mật khẩu, bạn cần một Token hợp lệ. 
       Trong thực tế, Supabase sẽ gửi 1 link chứa token vào email của user.
       Ở đây mình viết sẵn code lấy token từ URL hash (nếu user click từ email) 
       hoặc từ sessionStorage (nếu bạn đang tự giả lập luồng test).
    */
    let token = sessionStorage.getItem('userToken'); // Lấy tạm nếu bạn đang test
    
    // Nếu click từ link email thực tế của Supabase, token sẽ nằm ở URL
    if (window.location.hash) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        if (hashParams.get('access_token')) {
            token = hashParams.get('access_token');
        }
    }

    if (!token) {
        alert("Không tìm thấy phiên xác thực. Vui lòng thử lại chức năng Quên mật khẩu từ đầu!");
        window.location.href = '../Forgot-password-form/forgot-password.html';
        return;
    }

    const realPassword = document.getElementById('password1').value;
    const btnSubmit = document.getElementById('btn_submit');

    btnSubmit.classList.add('loading');
    btnSubmit.disabled = true;

    try {
        // Gọi API UPDATE User để đổi mật khẩu mới
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

        // THÀNH CÔNG
        alert("Cập nhật mật khẩu thành công! Vui lòng đăng nhập lại.");
        sessionStorage.removeItem('userToken'); // Xóa token đi cho sạch
        window.location.href = '../Sign-in-form/sign-in.html'; // Chuyển về trang đăng nhập

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

            // Lấy giá trị input (có thể lấy qua id hoặc elements tùy HTML)
            const pass1 = document.getElementById('password1').value;
            const pass2 = document.getElementById('password2').value;

            // Bê nguyên bộ kiểm tra 5 điều kiện
            const cond1 = pass1.length > 0; // Not blank
            const cond2 = pass1.length >= 12; // Min 12 chars
            const cond3 = /[0-9]/.test(pass1) && /[!@#$%^&*(),.?":{}|<>_\-+=/[\]\\]/.test(pass1); // Number & Special char
            const cond4 = /[a-z]/.test(pass1) && /[A-Z]/.test(pass1); // Lowercase & Uppercase
            const cond5 = pass1 === pass2 && pass1.length > 0; // Passwords match

            // Double check
            if (cond1 && cond2 && cond3 && cond4 && cond5) {
                // Thỏa mãn toàn bộ điều kiện -> Gọi API
                await handleResetSubmit();
            } else {
                console.warn('Lỗi: Nút Submit bị ép mất disable khi dữ liệu không hợp lệ');
                alert('Lỗi: Dữ liệu không hợp lệ, vui lòng kiểm tra lại!');
                
                const btnSubmit = document.getElementById('btn_submit');
                if (btnSubmit) btnSubmit.disabled = true;
            }
        });
    }
});