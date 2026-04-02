async function loadData(limit) {
    try {
        const data = await $.get(`http://localhost:3001/creatives?type=news&_limit=${limit}`);
        
        const container = $('.news__items-container');
        container.empty(); 
        
        data.forEach(item => {
            //url
                const url = item.url ? item.url : '#';
            //img_url
                const img_url = item.img_url ? item.img_url : '../assets/images/new_img.png';
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

            newItem.on('click', function(){
                window.open(url, '_blank');
            });

            container.append(newItem);
        });
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}