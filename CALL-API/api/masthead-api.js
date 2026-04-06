async function loadData(){
    try {
        const res = await fetch('https://69d315a1336103955f8e8baa.mockapi.io/creatives?type=masthead');
        const data = (await res.json())[0];

        //------------------- XỬ LÝ -------------------
        //url
            const mastheadFrame = document.querySelector('.masthead');
            if (mastheadFrame && data.url) {
                mastheadFrame.addEventListener('click', function(){
                    window.open(data.url, '_blank');
                });
            }
        //title
            const masthead_title = document.querySelector('.masthead__title');
            if (masthead_title && data.title) {
                masthead_title.innerText = data.title;
            }
        //img__url
            const masthead_img = document.querySelector('.masthead__img img');
            if (masthead_img && data.img_url) {
                masthead_img.src = data.img_url;
            }
        //brand__name
            const masthead_brand_name = document.querySelector('.partner strong');
            if (masthead_brand_name && data.brand_name) {
                masthead_brand_name.innerText = data.brand_name;
            }
        //brand__img
            const masthead_brand_img = document.querySelector('.icon');
            if (masthead_brand_img && data.brand_img) {
                masthead_brand_img.src = data.brand_img;
            }

    } catch (error) {
        console.error('Lỗi: ', error);
    }
}

loadData();