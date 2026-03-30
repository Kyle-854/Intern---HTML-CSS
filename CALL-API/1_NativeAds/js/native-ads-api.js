async function loadData(){
    try {
        const res = await fetch('http://localhost:3001/creatives?type=native-ads');
        const data = (await res.json())[0];

        //-------------------XỬ LÝ----------------------
        //url
            const nativeFrame = document.querySelector('.native');
            if(nativeFrame && data.url){
                nativeFrame.addEventListener('click', function(){
                    window.open(data.url, '_blank');
                });
            }
        //title
            const native_title = document.querySelector('.native__title');
            if (native_title && data.title) {
                native_title.innerText = data.title;
            }
        //img
            const native_img = document.querySelector('.native__img');
            if (native_img && data.img__url) {
                native_img.src = data.img__url;
            }
        //brand__name
            const native_brand_name = document.querySelector('.partner');
            if (native_brand_name && data.brand__name) {
                native_brand_name.innerText = data.brand__name;
            }
        //decription
            const native_decription = document.querySelector('.native__decription');
            if (native_decription && data.decription) {
                native_decription.innerText = data.decription;
            }
        //cta
            const native_cta = document.querySelector('.cta');
            if (native_cta && data.cta) {
                native_cta.innerText = data.cta;
            }
        //cta__url
            const native_cta_url = document.querySelector('.native__register');
            if (native_cta_url && data.cta__url) {
                native_cta_url.href = data.cta__url;
                native_cta_url.target = '_blank';

                native_cta_url.addEventListener('click', function(event){
                    event.stopPropagation();
                });
            }

    } catch (error) {
        console.error('Lỗi: ', error);
    }
}
// loadData();

const btnCallApi = document.getElementById('call-api');
btnCallApi.addEventListener('click', loadData);