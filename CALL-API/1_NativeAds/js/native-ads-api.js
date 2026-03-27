async function loadData(){
    try {
        const res = await fetch('http://localhost:3000/native-ads');
        const data = await res.json();

        //XỬ LÝ
        //url
        const nativeFrame = document.querySelector('.native');
        nativeFrame.addEventListener('click', function(){
            window.open(data.url, '_blank');
        });
        //title
        document.querySelector('.native__title').innerText = data.title;
        //img
        document.querySelector('.native__img').src = data.img__url;
        //brand__name
        document.querySelector('.partner').innerText = data.brand__name;
        //decription
        document.querySelector('.native__decription').innerText = data.decription;
        //brand__img

        //cta
        document.querySelector('.cta').innerText = data.cta;

    } catch (error) {
        console.error('Lỗi: ', error);
    }
}
// loadData();

const btnCallApi = document.getElementById('call-api');
btnCallApi.addEventListener('click', loadData);