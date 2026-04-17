const SUPABASE_URL = 'https://tctjqxhtwhaplpvkmucz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdGpxeGh0d2hhcGxwdmttdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDM1NzQsImV4cCI6MjA5MTk3OTU3NH0.8oPOL5359o6sSp4UBGpY_3LjC0gCLPOpECm4Bo81eQI';

async function login() {
    const $email = $('#email');
    const email = $email.val().trim();
    const $password = $('#password');
    const password = $password.val();
    const $passwordError = $('.password-error');

    try {
        const res = await $.ajax({
            url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
            type: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (res.access_token) {
            console.log("Đăng nhập thành công! Token là:", res.access_token);
            alert("Đăng nhập thành công!");
        } 
    } catch (error) {
        console.error('LỖI: ', error);
        if(error.status === 400){
            $passwordError.css('display', 'block');
            $password.css('border', '2px solid #BA1A1A');
        }
    }
}
// login();