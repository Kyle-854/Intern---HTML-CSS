async function loadData() {
    try {
        const res = await fetch('https://69d315a1336103955f8e8baa.mockapi.io/creatives?type=brand-video');
        const data = (await res.json())[0];

        //----------------------XỬ LÝ----------------------
        //url
            const url = data.url ?? '#';
        //title
            const bvtitle = document.querySelector('.brand-video__title');
            if (bvtitle && data.title) {
                bvtitle.innerText = data.title;

                bvtitle.addEventListener('click', () => {
                    window.open(url, '_blank');
                });
            }
        //poster
            const bvposter = document.querySelector('.vid');
            if (bvposter && data.poster) {
                bvposter.poster = data.poster;
            }
        //brand__name & brand_url
            const bvbrandname = document.querySelector('.partner strong');
            if (bvbrandname && data.brand_name) {
                bvbrandname.innerText = data.brand_name;
            }
        //brand_url
            const bvbrandurl = document.querySelector('.partner');
            if (bvbrandurl && data.brand_url) {
                bvbrandurl.href = data.brand_url;
                bvbrandurl.target = '_blank';
            }
                
        
        //video
            const bvvideo = document.querySelector('.vid');
            if (bvvideo && data.video) {
                bvvideo.src = data.video;
                bvvideo.load();

                bvvideo.addEventListener('click', function(event) {
                    event.stopPropagation(); // Lệnh chặn đứng sự kiện click tại đây
                });
            }

    } catch (error) {
        console.error('Lỗi: ', error);
    }
}

loadData();