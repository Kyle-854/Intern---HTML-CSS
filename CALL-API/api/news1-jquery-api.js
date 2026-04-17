async function loadData(limit) {
    try {
        const data = await $.get(`https://69d315a1336103955f8e8baa.mockapi.io/creatives?type=news&page=1&limit=${limit}`);
    
        //-------------------- XỬ LÝ ---------------------
        const container = $('.news__items-container');

        container.empty(); // Xóa nội dung cũ trước khi thêm mới

        data.forEach((item) => {
            //url
                const url = item.url ? item.url : '#';
            //title
                const title  = item.title ? item.title : 'No Title';
            //decription
                const description = item.decription ? item.decription : 'No Description';
            //img_url
                const img_url = item.img_url ? item.img_url : '../../assets/images/new_img.png';

            //Khung item
            const htmlString = `
                <div class="news__item">
                <div class="news__img">
                    <img src="${img_url}" alt="Image">
                </div>

                <div class="news__content">
                    <h2 class="news__title">
                        ${title}
                    </h2>

                    <p class="news__decription">
                        ${description}
                    </p>
                </div>
            </div>
            `;

            const newItem = $(htmlString);

            const newsTile = newItem.find('.news__title');
            newsTile.on('click', function(){
                window.open(url, '_blank');
            });

            const newsImg = newItem.find('.news__img img');
            newsImg.on('click', function(){
                window.open(url, '_blank');
            });

            const newsDescript = newItem.find('.news__decription');
            newsDescript.on('click', function(){
                window.open(url, '_blank');
            });

            //nhét cái newItem vào cái html lại
            container.append(newItem);
        });
        
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}
// loadData();