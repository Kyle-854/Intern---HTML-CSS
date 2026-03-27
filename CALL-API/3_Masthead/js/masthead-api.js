async function loadData(){
    try {
        const res = await fetch('http://localhost:3000/creatives');
        const json = await res.json();

        //------------------- XỬ LÝ -------------------
        const data = json.arr.find(item => item.type === 'masthead');
        if(data){
            //url
                const mastheadFrame = document.querySelector('.masthead');
                if (mastheadFrame) {
                    mastheadFrame.addEventListener('click', function(){
                        window.open(data.url, '_blank');
                    });
                }
            //title
                const masthead_title = document.querySelector('.masthead__title');
                if (masthead_title) {
                    masthead_title.innerText = data.title;
                }
            //img__url
                const masthead_img = document.querySelector('.masthead__img img');
                if (masthead_img) {
                    masthead_img.src = data.img__url;
                }
            //brand__name
                const masthead_brand_name = document.querySelector('.partner strong');
                if (masthead_brand_name) {
                    masthead_brand_name.innerText = data.brand__name;
                }
            //brand__img
                const masthead_brand_img = document.querySelector('.icon');
                if (masthead_brand_img) {
                    masthead_brand_img.src = data.brand__img;
                }
        }

    } catch (error) {
        console.error('Lỗi: ', error);
    }
}

loadData();