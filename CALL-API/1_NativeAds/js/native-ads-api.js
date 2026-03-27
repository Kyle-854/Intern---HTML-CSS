async function loadData(){
    try {
        const res = await fetch('http://localhost:3000/native-ads');
        const data = await res.json();

        //XỬ LÝ
        //url
        const nativeFrame = document.querySelector('.native');
        if(nativeFrame){
            nativeFrame.addEventListener('click', function(){
                window.open(data.url, '_blank');
            });
        }
        //title
        const native_title = document.querySelector('.native__title');
        if (native_title) {
            native_title.innerText = data.title;
        }
        //img
        const native_img = document.querySelector('.native__img');
        if (native_img) {
            native_img.src = data.img__url;
        }
        //brand__name
        const native_brand_name = document.querySelector('.partner');
        if (native_brand_name) {
            native_brand_name.innerText = data.brand__name;
        }
        //decription
        const native_decription = document.querySelector('.native__decription');
        if (native_decription) {
            native_decription.innerText = data.decription;
        }
        //cta
        const native_cta = document.querySelector('.cta');
        if (native_cta) {
            native_cta.innerText = data.cta;
        }
        //brand__img


    } catch (error) {
        console.error('Lỗi: ', error);
    }
}
// loadData();

const btnCallApi = document.getElementById('call-api');
btnCallApi.addEventListener('click', loadData);