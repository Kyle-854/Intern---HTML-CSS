async function loadData() {
    try {
        const res = await fetch('https://69d315a1336103955f8e8baa.mockapi.io/creatives?type=video-ads');
        const data = (await res.json())[0];

        //---------------------- XỬ LÝ ----------------------
        //url
            const url = data.url ?? '#';
        //title
            const vid_title = document.querySelector('.video-ads__title');
            if(vid_title && data.title){
                vid_title.innerText = data.title;

                vid_title.addEventListener('click', () => {
                    window.open(url, '_blank');
                });
            }
        //img__url
            const vid_img = document.querySelector('.video-ads__Img img');
            if(vid_img && data.img_url){
                vid_img.src = data.img_url;

                vid_img.addEventListener('click', () => {
                    window.open(url, '_blank');
                });
            }
        //brand__name
            const vid_brand_name = document.querySelector('.partner strong');
            if(vid_brand_name && data.brand_name){
                vid_brand_name.innerText = data.brand_name;
            }
        //brand_url
            const brand_url = data.brand_url ?? '#';
            const partner = document.querySelector('.partner');
            if (partner) {
                partner.href = brand_url;
            }
        //decription
            const vid_decription = document.querySelector('.video-ads__decription');
            if(vid_decription && data.decription){
                vid_decription.innerText = data.decription;

                vid_decription.addEventListener('click', () => {
                    window.open(url, '_blank');
                });
            }
        //CHỐNG CLICK NHẦM
        const closeButton = document.getElementById('video-ads__close-button');
        if (closeButton) {
            closeButton.addEventListener('click', function(event){
                event.stopPropagation();
            });
        }
    } catch (error) {
        console.error('Lỗi: ', error);
    }
    
}
loadData();