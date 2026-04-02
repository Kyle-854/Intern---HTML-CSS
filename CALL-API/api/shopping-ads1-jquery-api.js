async function loadData(limit) {
    try {
        const data = await $.get(`http://localhost:3001/creatives?type=shopping-ads&_limit=${limit}`);

        const container = $('.items-container');
        container.empty(); 

        data.forEach(function(item){
            //url
                const url = item.url ? item.url : '#';
            //img_url
                const img_url = item.img_url ? item.img_url : '../assets/images/new_img.png';
            //title
                const title  = item.title ? item.title : 'No Title';
            //price2
                const price2 = item.price2 ? item.price2 : '';
            //price1
                const price1 = item.price1 ? item.price1 : '';
            //recommend
                const recommend = item.recommend ? item.recommend : '';
            //brand_logo
                const brand_logo = item.brand_logo ? item.brand_logo : '../assets/images/new_img.png';
            //brand_name
                const brand_name = item.brand_name ? item.brand_name : 'No Brand';

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

                        <p class="item__recommend">Được yêu thích nhất</p>

                        <div class="item__brand">
                            <img class="brand__logo" src="${brand_logo}" alt="logo">
                            <p class="brand__name">${brand_name}</p>
                            <img class="verified" src="../assets/images/logo-verified.svg" alt="verified">
                        </div>
                    </div>
                </div>
            `;

            const newItem = $(htmlString);

            newItem.on('click', () => {
                window.open(url, '_blank');
            });

            //Nếu không có price1
            if(!price1){
                const item__price1 = newItem.find('.item__price1');
                item__price1.css('visibility', 'hidden');

                const p2 = newItem.find('.price2');
                p2.css('color', '#000');
            }

            //Nếu không có recommend
            if(!recommend){
                const item__recommend = newItem.find('.item__recommend');
                item__recommend.css('visibility', 'hidden');
            }


            container.append(newItem);
        });
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}