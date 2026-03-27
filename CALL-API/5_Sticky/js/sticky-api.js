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
                const img_url = document.querySelector('.sticky__img img');
                if (img_url) {
                    img_url.scr = data.img__url;
                }
            //brand__name

            //cta

            //cta__url
        }
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}
loadData();