async function loadData() {
    try {
        const res = await fetch('http://localhost:3001/creatives?type=video-ads');
        const data = (await res.json())[0];

        //---------------------- XỬ LÝ ----------------------
        //url
            const videoAdsFrame = document.querySelector('.video-ads');
            if(videoAdsFrame && data.url){
                videoAdsFrame.addEventListener('click', function(){
                    window.open(data.url, '_blank');
                });
            }
        //title
            const vid_title = document.querySelector('.video-ads__title');
            if(vid_title && data.title){
                vid_title.innerText = data.title;
            }
        //img__url
            const vid_img = document.querySelector('.video-ads__Img img');
            if(vid_img && data.img_url){
                vid_img.src = data.img_url;
            }
        //brand__name
            const vid_brand_name = document.querySelector('.partner strong');
            if(vid_brand_name && data.brand_name){
                vid_brand_name.innerText = data.brand_name;
            }
        //decription
            const vid_decription = document.querySelector('.video-ads__decription');
            if(vid_decription && data.decription){
                vid_decription.innerText = data.decription;
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