async function loadData() {
    try {
        const res = await fetch('http://localhost:3000/brand-video');
        const data = await res.json();

        //----------------------XỬ LÝ----------------------
        //url
            const brandVideoFrame = document.querySelector('.brand-video');
            brandVideoFrame.addEventListener('click', function(){
                window.open(data.url, '_blank');
            });
        //title
            document.querySelector('.brand-video__title').innerText = data.title;
        //poster
            document.querySelector('.vid').poster = data.poster;
        //brand__name
            document.querySelector('.partner').innerText = data.brand__name;
        //video
            document.querySelector('.vid').src = data.video;
            document.querySelector('.vid').load();

        // CHẶN CLICK LAN TRUYỀN (Để bấm play/pause video không bị nhảy trang)
            const videoElement = document.querySelector('.vid');
            
            videoElement.addEventListener('click', function(event) {
                event.stopPropagation(); // Lệnh chặn đứng sự kiện click tại đây
            });

    } catch (error) {
        console.error('Lỗi: ', error);
    }
}

loadData();