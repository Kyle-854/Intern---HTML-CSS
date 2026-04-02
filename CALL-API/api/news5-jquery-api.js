async function loadData(limit) {
    try {
        const data = await $.get(`http://localhost:3001/creatives?type=news&_limit=${limit}`);
    
        const contentContainer = $('.news__content-container');
        contentContainer.empty();

        let container1 = null;
        let container2 = null;

        data.forEach((item, index) => {
            

            container1 = $('<div class="news__content-container"></div>');
            if (index < 4 ){

            }

        });
    
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}