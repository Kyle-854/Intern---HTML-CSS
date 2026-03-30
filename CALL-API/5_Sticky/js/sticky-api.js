async function loadData() {
    try {
        const res = await fetch('http://localhost:3000/creatives');
        const json = await res.json();

        //--------------------XỬ LÝ ----------------------
        const data = json.arr.find(item => item.type === 'sticky');
        if (data) {
            //url
                const sticky_url = document.querySelector('.sticky');
                if (sticky_url) {
                    sticky_url.addEventListener('click', function() {
                        window.open(data.url, '_blank');                        
                    });
                }
            //title
                const title = document.querySelector('.sticky__title');
                if (title) {
                    title.innerText = data.title;
                }
            //img__url
                const sticky_img  = document.querySelector('.sticky__img img');
                if (sticky_img) {
                    sticky_img.src = data.img__url;
                }
            //brand__name
                const brand_name = document.querySelector('.partner strong');
                if(brand_name) {
                    brand_name.innerText = data.brand__name;
                }
            //cta, cta__url
                const cta = document.querySelector('.sticky__button-cta');
                if(cta){
                    cta.innerText = data.cta;
                    cta.href = data.cta__url;
                    cta.target = '_blank';

                    cta.addEventListener('click', function(event){
                        event.stopPropagation();
                    });
                }
        }
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}
loadData();