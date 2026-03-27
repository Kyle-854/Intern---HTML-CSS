async function loadData() {
    try {
        const res = await fetch('http://localhost:3000/creatives');
        const json = await res.json();

        //----------------------XỬ LÝ----------------------
        const data = json.arr.find(item => item.type === 'brand-video');
        if (data) {
            //url
                const brandVideoFrame = document.querySelector('.brand-video');
                if (brandVideoFrame) {
                    brandVideoFrame.addEventListener('click', function(){
                        window.open(data.url, '_blank');
                    });
                }
            //title
                const bvtitle = document.querySelector('.brand-video__title');
                if (bvtitle) {
                    bvtitle.innerText = data.title;
                }
            //poster
                const bvposter = document.querySelector('.vid');
                if (bvposter) {
                    bvposter.poster = data.poster;
                }
            //brand__name
                const bvbrandname = document.querySelector('.partner strong');
                if (bvbrandname) {
                    bvbrandname.innerText = data.brand__name;
                }
            //video
                const bvvideo = document.querySelector('.vid');
                if (bvvideo) {
                    bvvideo.src = data.video;
                    bvvideo.load();

                    bvvideo.addEventListener('click', function(event) {
                        event.stopPropagation(); // Lệnh chặn đứng sự kiện click tại đây
                    });
                }
        }

    } catch (error) {
        console.error('Lỗi: ', error);
    }
}

loadData();