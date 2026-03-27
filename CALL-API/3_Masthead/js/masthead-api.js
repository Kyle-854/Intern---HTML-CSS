async function loadData(){
    const res = await fetch('http://localhost:3000/masthead');
    const data = await res.json();

    //------------------- XỬ LÝ -------------------
    //url
        const mastheadFrame = document.querySelector('.masthead');
        mastheadFrame.addEventListener('click', function(){
            window.open(data.url, '_blank');
        });
    //title
        document.querySelector('.masthead__title').innerText = data.title;
    //img__url
        document.querySelector('.masthead__img img').src = data.img__url;
    //brand__name
        document.querySelector('.partner strong').innerText = data.brand__name;
    //brand__img
        document.querySelector('.icon').src = data.brand__img;
}

loadData();