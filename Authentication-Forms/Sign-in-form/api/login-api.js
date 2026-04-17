async function login() {
    const email = $('#email').val();
    const password = $('#password').val();

    if (!email || !password) {
        alert('Vui lòng nhập đầy đủ thông tin!!!');
        return;
    }

    try {
        const user = await $.get('https://69d315a1336103955f8e8baa.mockapi.io/users');
        
        const validUser = user.find(u => u.email === email && u.password === password);

        const emailInput = document.querySelector('#email');
        const passwordInput = document.querySelector('#password');
        const notCorrect = document.querySelector('.invalid-feedback');

        if(validUser){
            notCorrect.style.display = 'none';
            emailInput.style.border = '1px solid #DFE3E8';
            passwordInput.style.border = '1px solid #DFE3E8';
            alert('Đăng nhập thành công!!!');
        } else {
            notCorrect.style.display = 'block';
            emailInput.style.border = '2px solid #BA1A1A';
            passwordInput.style.border = '2px solid #BA1A1A';

        }    
    } catch (error) {
        console.error('Lỗi: ', error);
        alert('Lỗi kết nối !!!');
    }   
}
// login();