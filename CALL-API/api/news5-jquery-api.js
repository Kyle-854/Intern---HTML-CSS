async function loadData(limit) {
  try {
    limit = Math.max(4, Math.min(limit, 12));
    const data = await $.get(
      `https://69d315a1336103955f8e8baa.mockapi.io/creatives?type=news&page=1&limit=${limit}`,
    );

    const contentContainer = $(".news__content-container");
    contentContainer.empty();

    let container1 = null;
    let container2 = null;

    container1 = $('<div class="news__content1"></div>');
    contentContainer.append(container1);
    container2 = $('<div class="news__content2"></div>');
    contentContainer.append(container2);

    data.forEach((item, index) => {
      //url
      const url = item.url ? item.url : "#";
      //img_url
      const img_url = item.img_url
        ? item.img_url
        : "../assets/images/new_img.png";
      //title
      const title = item.title ? item.title : "No Title";

      if (index < 4) {
        const htmlString1 = `
            <div class="news__item1">
                <div class="news__item1__img">
                    <img src="${img_url}" alt="image">
                </div>
            
                <p class="news__title1">
                    ${title}
                </p>
            </div>
        `;

        const newsItem1 = $(htmlString1);

        container1.append(newsItem1);

        const newsTitle1 = newsItem1.find('.news__title1');
        newsTitle1.on('click', () => {
          window.open(url, '_blank');
        });

        const newsImg1 = newsItem1.find('.news__item1__img');
        newsImg1.on('click', () => {
          window.open(url, '_blank');
        });


      } else {
        if (index % 2 === 0) {
          item2_container = $('<div class="news__item2-container"></div>');
          container2.append(item2_container);
        }

        const htmlString2 = `
            <div class="news__item2">
                <div class="news__item2__img">
                    <img src="${img_url}" alt="image">
                </div>
            
                <p class="news__title2">
                    ${title}
                </p>
            </div>
        `;

        const newsItem2 = $(htmlString2);
        // newsItem2.on("click", () => {
        //   window.open(url, "_blank");
        // });
        item2_container.append(newsItem2);

        const newsTitle2 = newsItem2.find('.news__title2');
        newsTitle2.on('click', () => {
          window.open(url, '_blank');
        });

        const newsImg2 = newsItem2.find('.news__item2__img');
        newsImg2.on('click', () => {
          window.open(url, '_blank');
        });
      }
    });

    if (limit <= 4) {
      container2.remove();

      const ctn1 = contentContainer.find(".news__content1");
      ctn1.css({
        margin: "0",
        padding: "0",
        border: "0",
      });
    }

    if (limit > 4 && limit % 2 !== 0) {
      const lastItem = container2.find(".news__item2").last();
      lastItem.css({
        margin: "0",
        padding: "0",
        border: "0",
      });
    }
  } catch (error) {
    console.error("Lỗi: ", error);
  }
}
