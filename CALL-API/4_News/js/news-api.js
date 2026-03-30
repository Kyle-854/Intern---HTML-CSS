async function loadData(limit) {
    try {
        const res = await fetch(`http://localhost:3001/creatives?type=news&_limit=${limit}`);
        const data = await res.json();
    
        //-------------------- XỬ LÝ ---------------------
        const container = document.querySelector('.news__items-container');
        const hasLine = container.dataset.line === 'true';
        const temp = document.querySelector('.temp');

        data.forEach((item, index) => {
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
                //img__url
                    const news__img = clone.querySelector('.news__img img');
                    if (news__img && item.img__url) {
                        news__img.src = item.img__url;
                    }

                container.appendChild(clone);

                //Thêm line
                if (hasLine && index < data.length - 1) {
                    const hr = document.createElement('hr');
                    hr.classList.add('line');
                    container.appendChild(hr);
                }
            }
        });
        temp.remove();
        
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}
// loadData();