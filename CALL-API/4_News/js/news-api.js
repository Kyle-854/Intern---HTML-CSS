async function loadData(limit) {
    try {
        const res = await fetch(`http://localhost:3001/creatives?type=news&_limit=${limit}`);
        const data = await res.json();
    
        //-------------------- XỬ LÝ ---------------------
        const container = document.querySelector('.news__items-container');
        const temp = document.querySelector('.temp');

        data.forEach((item) => {
            const clone = temp.cloneNode(true); //tương đương .news__item

            if (clone) {
                clone.style.display = 'flex';

                clone.classList.remove('temp');

                //url
                    if (item.url) {
                        clone.addEventListener('click', () => {
                            window.open(item.url, '_blank');
                        });
                    }
                //title
                    const title = clone.querySelector('.news__title');
                    if (title && item.title) {
                        title.innerText = item.title;
                    }
                //decription
                    const decription = clone.querySelector('.news__decription');
                    if (decription && item.decription) {
                        decription.innerText = item.decription;
                    }
                //img_url
                    const news__img = clone.querySelector('.news__img img');
                    if (news__img && item.img_url) {
                        news__img.src = item.img_url;
                    }

                container.appendChild(clone);
            }
        });
        temp.remove();
        
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}
// loadData();