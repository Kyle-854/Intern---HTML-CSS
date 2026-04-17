async function loadData(limit) {
    try {
        const data = await $.get(`https://69d315a1336103955f8e8baa.mockapi.io/creatives?type=news&page=1&limit=${limit}`);
        
        const container = $('.news__items-container');
        container.empty(); 
        
        data.forEach(item => {
            //url
                const url = item.url ? item.url : '#';
            //img_url
                const img_url = item.img_url ? item.img_url : '../../assets/images/new_img.png';
            //title
                const title  = item.title ? item.title : 'No Title';

            const htmlString =`
                <div class="news__item">
                    <div class="news__img">
                        <img src="${img_url}" alt="image">
                    </div>

                    <p class="news__title">
                        ${title}
                    </p>
                </div>
            `;

            const newItem = $(htmlString);

            container.append(newItem);

            const newsTile = newItem.find('.news__title');
            newsTile.on('click', () => {
                window.open(url, '_blank');
            });

            const newsImg = newItem.find('.news__img');
            newsImg.on('click', () => {
                window.open(url, '_blank');
            });
        });
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}