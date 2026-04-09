async function loadData() {
    try {
        const res = await fetch('https://69d315a1336103955f8e8baa.mockapi.io/creatives?type=sticky');
        const data = (await res.json())[0];

        //--------------------XỬ LÝ ----------------------
        //url
            // const sticky_url = document.querySelector('.sticky');
            // if (sticky_url && data.url) {
            //     sticky_url.addEventListener('click', function() {
            //         window.open(data.url, '_blank');                        
            //     });
            // }

            const url = data.url ?? '#';
        //title
            const title = document.querySelector('.sticky__title');
            if (title && data.title) {
                title.innerText = data.title;

                title.addEventListener('click', () => {
                    window.open(url, '_blank');
                });
            }
        //img__url
            const sticky_img  = document.querySelector('.sticky__img img');
            if (sticky_img && data.img_url) {
                sticky_img.src = data.img_url;

                sticky_img.addEventListener('click', () => {
                    window.open(url, '_blank');
                });
            }
        //brand__name
            const brand_name = document.querySelector('.partner strong');
            if(brand_name && data.brand_name) {
                brand_name.innerText = data.brand_name;
            }
        //brand_url
            const brand_url = data.brand_url ?? '#';
            const partner = document.querySelector('.partner');
            if (partner) {
                partner.href = brand_url;
            }
        //cta, cta__url
            const cta = document.querySelector('.sticky__button-cta');
            if(cta && data.cta){
                cta.innerText = data.cta;
                
                if(data.cta_url){
                    cta.href = data.cta_url;
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