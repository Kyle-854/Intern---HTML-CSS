async function loadData(limit) {
    try {
        const res = await fetch(`https://69d315a1336103955f8e8baa.mockapi.io/creatives?type=shopping-ads&page=1&limit=${limit}`);
        const data = await res.json();

        //--------------XỬ LÝ--------------
        const wrapper = document.querySelector('.shopping-ads__wrapper');
        
        // Lấy 2 cái khuôn ra
        const tempContainer = document.querySelector('.temp-container');
        const tempItem = document.querySelector('.temp-item');
        
        let currentContainer = null;

        // Vòng lặp đổ dữ liệu
        data.forEach((itemData, index) => {
            // Cứ mỗi 2 item, tạo 1 cái Container mới
            if (index % 2 === 0) {
                currentContainer = tempContainer.cloneNode(false); 
                currentContainer.style.display = 'flex';
                currentContainer.classList.remove('temp-container');
                wrapper.appendChild(currentContainer);
            }

            // Nhân bản cái Item
            const cloneItem = tempItem.cloneNode(true);
            cloneItem.style.display = 'flex'; 
            cloneItem.classList.remove('temp-item');

            // --- ĐỔ DỮ LIỆU ---
            //url
            const url = itemData.url ?? '#';
            //img_url
            const img = cloneItem.querySelector('.item__img img');
            if (img && itemData.img_url){
                img.src = itemData.img_url;

                img.addEventListener('click', function(){
                    window.open(url, '_blank');
                });
            }
            //title
            const name = cloneItem.querySelector('.item__name');
            if (name && itemData.title){
                name.innerText = itemData.title;

                name.addEventListener('click', function(){
                    window.open(url, '_blank');
                });
            }

            //price2
                const price2 = cloneItem.querySelector('.price2');
                if (price2 && itemData.price2) {
                    price2.innerText = itemData.price2;

                    price2.addEventListener('click', function(){
                        window.open(url, '_blank');
                    });
                }
            //price1
                const price1 = cloneItem.querySelector('.price1');
                if (price1 && itemData.price1) {
                    price1.innerText = itemData.price1;

                    price1.addEventListener('click', function(){
                        window.open(url, '_blank');
                    });
                }

                if(!itemData.price1){
                    const item__price1 = cloneItem.querySelector('.item__price1');
                    if(item__price1){
                        item__price1.style.visibility = 'hidden';
                    }
                    price2.style.color = '#222222';
                    const unit2 = cloneItem.querySelector('.unit2');
                    if(unit2){
                        unit2.style.color = '#222222';
                    }
                }
            //recommend
                const recommend = cloneItem.querySelector('.item__recommend');
                if (recommend && itemData.recommend) {
                    recommend.innerText = itemData.recommend;

                    recommend.addEventListener('click', function(){
                        window.open(url, '_blank');
                    });
                }

                if(!itemData.recommend && recommend){
                    recommend.style.visibility = 'hidden';
                }
            //brand_logo
                const brand_logo = cloneItem.querySelector('.brand__logo');
                if (brand_logo && itemData.brand_logo) {
                    brand_logo.src = itemData.brand_logo;
                }
            //brand_name
                const brand_name = cloneItem.querySelector('.brand__name');
                if (brand_name && itemData.brand_name) {
                    brand_name.innerText = itemData.brand_name;
                }
            //brand_url
                const brand_url = itemData.brand_url ?? '#';
                const item__brand = cloneItem.querySelector('.item__brand');
                if (item__brand) {
                    item__brand.href = brand_url;
                }

            // Nhét Item vào Container
            currentContainer.appendChild(cloneItem);
        });
        tempContainer.remove();
        tempItem.remove();
    } catch (error) {
        console.error('Lỗi:', error);
    }
    
}