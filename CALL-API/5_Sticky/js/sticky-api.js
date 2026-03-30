async function loadData() {
    try {
        const res = await fetch('http://localhost:3001/creatives?type=sticky');
        const data = (await res.json())[0];

        //--------------------XỬ LÝ ----------------------
        //url
            const sticky_url = document.querySelector('.sticky');
            if (sticky_url && data.url) {
                sticky_url.addEventListener('click', function() {
                    window.open(data.url, '_blank');                        
                });
            }
        //title
            const title = document.querySelector('.sticky__title');
            if (title && data.title) {
                title.innerText = data.title;
            }
        //img__url
            const sticky_img  = document.querySelector('.sticky__img img');
            if (sticky_img && data.img__url) {
                sticky_img.src = data.img__url;
            }
        //brand__name
            const brand_name = document.querySelector('.partner strong');
            if(brand_name && data.brand__name) {
                brand_name.innerText = data.brand__name;
            }
        //cta, cta__url
            const cta = document.querySelector('.sticky__button-cta');
            if(cta && data.cta){
                cta.innerText = data.cta;
                
                if(data.cta__url){
                    cta.href = data.cta__url;
                    cta.target = '_blank';
                }

                cta.addEventListener('click', function(event){
                    event.stopPropagation();
                });
            }
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}
loadData();