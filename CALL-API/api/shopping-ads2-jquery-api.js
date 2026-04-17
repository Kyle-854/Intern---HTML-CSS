async function loadData(limit) {
    try {
        const data = await $.get(`https://69d315a1336103955f8e8baa.mockapi.io/creatives?type=shopping-ads&page=1&limit=${limit}`);
        
        const wrapper = $('.shopping-ads__wrapper');
        wrapper.empty();

        let currentContainer = null;

        data.forEach((item, index) => {

            if (index % 2 ===0) {
                currentContainer = $('<div class="items-container"></div>');
                wrapper.append(currentContainer);
            }

            //url
                const url = item.url ?? '#';
            //img_url
                const img_url = item.img_url ?? '../../assets/images/new_img.png';
            //title
                const title  = item.title ?? 'No Title';
            //price2
                const price2 = item.price2 ?? '';
            //price1
                const price1 = item.price1 ?? '';
            //recommend
                const recommend = item.recommend ?? '';
            //brand_logo
                const brand_logo = item.brand_logo ?? '../../assets/images/new_img.png';
            //brand_name
                const brand_name = item.brand_name ?? 'No Brand';
            //brand_url
                const brand_url = item.brand_url ?? '#';

            const htmlString = `
                <div class="item">
                    <div class="item__img">
                        <img src="${img_url}" alt="adidas">
                    </div>

                    <div class="item__content">
                        <p class="item__name">
                            ${title}
                        </p>

                        <div class="item__price1">
                            <p class="price1">${price1}</p>
                            <p class="price1 unit1">đ</p>
                        </div>
                        
                        <div class="item__price2">
                            <p class="price2">${price2}</p>
                            <p class="price2 unit2">đ</p>
                        </div>

                        <p class="item__recommend">${recommend}</p>

                        <a class="item__brand" href="${brand_url}" target="_blank">
                            <img class="brand__logo" src="${brand_logo}" alt="logo">
                            <p class="brand__name">${brand_name}</p>
                            <img class="verified" src="../../assets/images/logo-verified.svg" alt="verified">
                        </a>
                    </div>
                </div>
            `;

            const newItem = $(htmlString);
            
            const itemImg = newItem.find('.item__img');
            itemImg.on('click', function(){
                window.open(url, '_blank');
            });

            const itemName = newItem.find('.item__name');
            itemName.on('click', function(){
                window.open(url, '_blank');
            });

            const itemPrice1 = newItem.find('.item__price1');
            itemPrice1.on('click', function(){
                window.open(url, '_blank');
            });

            const itemPrice2 = newItem.find('.item__price2');
            itemPrice2.on('click', function(){
                window.open(url, '_blank');
            });

            const itemRecommend = newItem.find('.item__recommend');
            itemRecommend.on('click', function(){
                window.open(url, '_blank');
            });

            //Nếu price1 không có
            if(!price1){
                const item__price1 = newItem.find('.item__price1');
                item__price1.css('visibility', 'hidden');

                const p2 = newItem.find('.price2');
                p2.css('color', '#000');
            }

            //Nếu recommend không có
            if (!recommend) {
                const item__recommend = newItem.find('.item__recommend');
                item__recommend.css('visibility', 'hidden');
            }

            currentContainer.append(newItem);

        });
    } catch (error) {
        console.error('Lỗi:', error);
    }    
}