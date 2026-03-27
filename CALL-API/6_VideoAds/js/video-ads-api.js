async function loadData() {
    const res = await fetch('http://localhost:3000/video-ads');
    const data = await res.json();

    //---------------------- XỬ LÝ ----------------------
    //url
        const videoAdsFrame = document.querySelector('.video-ads');
        if(videoAdsFrame){
            videoAdsFrame.addEventListener('click', function(){
                window.open(data.url, '_blank');
            });
        }
    //title
        const vid_title = document.querySelector('.video-ads__title');
        if(vid_title){
            vid_title.innerText = data.title;
        }
    //img__url
        const vid_img = document.querySelector('.video-ads__Img img');
        if(vid_img){
            vid_img.src = data.img__url;
        }
    //brand__name
    const vid_brand_name = document.querySelector('.partner strong');
    if(vid_brand_name){
        vid_brand_name.innerText = data.brand__name;
    }

    //decription
    const vid_decription = document.querySelector('.video-ads__decription');
    if(vid_decription){
        vid_decription.innerText = data.decription;
    }

    //CHỐNG CLICK NHẦM
    const closeButton = document.getElementById('video-ads__close-button');
    closeButton.addEventListener('click', function(event){
        event.stopPropagation();
    });
}
loadData();