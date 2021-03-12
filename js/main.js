document.addEventListener('DOMContentLoaded', () => {


  const getDataXml = (url, callback) => {

    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) return;
      if (request.status === 200) {
        const response = JSON.parse(request.response);
        callback(response)
      } else {
        console.error(new Error('Ошибка: ' + request.statusText));
      }
    });

    request.send();
  };


  // const getDataFetch = (url, callback) => {

  //   fetch(url)
  //   .then((response) => {
  //     if (response.ok){
  //       return response.json()
  //     }
  //     throw new Error(response.statusText)
  //   })
  //   .then(callback)
  //   .catch((err) => {
  //     console.log(err);
  //   });
  
  // };


  const tabs = () => {

    const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
    const cardDetailsTitleElem = document.querySelector('.card-details__title');
    const cardDetailsImageElem = document.querySelector('.card__image_item');
    const cardDetailsPriceElem = document.querySelector('.card-details__price');
    const descriptionMemory = document.querySelector('.description__memory');

    const dataPhones = [{
        name: 'Смартфон Apple iPhone 12 Pro 64GB Graphite',
        img: 'img/iPhone-graphite.png',
        price: '95990',
        memoryRom: '64',
      },
      {
        name: 'Смартфон Apple iPhone 12 Pro 128GB Silver',
        img: 'img/iPhone-silver.png',
        price: '97990',
        memoryRom: '128',
      },
      {
        name: 'Смартфон Apple iPhone 12 Pro 256GB Pacific Blue',
        img: 'img/iPhone-blue.png',
        price: '99990',
        memoryRom: '256',
      },
    ];

    const deactive = () => {
      cardDetailChangeElems.forEach(btn => btn.classList.remove('active'))
    }

    cardDetailChangeElems.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) {
          deactive();

          btn.classList.add('active');
          cardDetailsTitleElem.textContent = dataPhones[i].name;
          cardDetailsImageElem.src = dataPhones[i].img;
          cardDetailsPriceElem.textContent = dataPhones[i].price + '₽';
          descriptionMemory.textContent = `Встроенная память (ROM) ${dataPhones[i].memoryRom} ГБ`
        }
      })
    })


  }


  const accordeon = () => {

    const characteristicsListElem = document.querySelector('.characteristics__list');
    const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

    characteristicsItemElems.forEach((elem) => {
      if (elem.children[1].classList.contains('active')) {
        elem.children[1].style.height = elem.children[1].scrollHeight + 'px';
      }
    })

    const open = (button, dropDown) => {
      closeAllDrops(button, dropDown);
      dropDown.style.height = dropDown.scrollHeight + 'px';
      button.classList.add('active');
      dropDown.classList.add('active');
    };

    const close = (button, dropDown) => {
      button.classList.remove('active');
      dropDown.classList.remove('active');
      dropDown.style.height = '';
    };

    const closeAllDrops = (button, dropDown) => {
      characteristicsItemElems.forEach((elem) => {
        if (elem.children[0] !== button && elem.children[1] !== dropDown) {
          close(elem.children[0], elem.children[1])
        }
      })
    };

    characteristicsListElem.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('characteristics__title')) {
        const parent = target.closest('.characteristics__item');
        const description = parent.querySelector('.characteristics__description');
        description.classList.contains('active') ? close(target, description) : open(target, description);
      }
    });

  };


  modal = () => {
    const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy'),
      cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery'),
      modal = document.querySelector('.modal'),
      modalSubtitle = document.querySelector('.modal__subtitle');


    // console.log(cardDetailsTitle);

    const openModal = text => {
        let cardDetailsTitle = document.querySelector('.card-details__title').textContent;
        let modalTitle = document.querySelector('.modal__title');
        modalSubtitle.textContent = text;
        modalTitle.textContent = cardDetailsTitle;
        modal.classList.add('open');
      },
      closeModal = e => {
        const target = e.target;

        if (target === modal || target.classList.contains('modal__close') || e.code === 'Escape') {
          modal.classList.remove('open');
        }
      }

    cardDetailsButtonBuy.addEventListener('click', () => {
      openModal('Оплата')
    });

    cardDetailsButtonDelivery.addEventListener('click', () => {
      openModal('Доставка и оплата')
    });

    modal.addEventListener('click', closeModal);

    document.body.addEventListener('keydown', closeModal);
  };


  const renderCrossSell = () => {

    const COUNT_ROW_GOODS = 4;
    
    const crossSellList = document.querySelector('.cross-sell__list');
    const crossSellMoreBtn = document.querySelector('.cross_sell_more');
    let allGoods = [];

    let wrapRender = null;

    const shuffle = arr => arr.sort(() => Math.random() - 0.5);

    const createCrossSellItem = (good) => {
      const liItem = document.createElement('li');
      liItem.innerHTML = `
      <article class="cross-sell__item">
							<img class="cross-sell__image" src="${good.photo}" alt="${good.name}">
							<h3 class="cross-sell__title">${good.name}</h3>
							<p class="cross-sell__price">${good.price}₽</p>
							<button type="button" class="button button_buy cross-sell__button">Купить</button>
						</article>
      `;
      return liItem;
    }

    const render = arr => {
      arr.forEach(item => {
        crossSellList.append(createCrossSellItem(item))
      })
    };

    const wrapper = (fn, count) => {
      let counter = 0;
      return(...args) => {
        if (counter === count) return;
        counter++;
        return fn(...args)
      }
    };

    const createCrossSellList = (goods) => {
      wrapRender = wrapper(render, Math.ceil(goods.length/COUNT_ROW_GOODS))
      allGoods.push(...shuffle(goods))
      let fourItems = allGoods.splice(0, COUNT_ROW_GOODS);
      render(fourItems);
    };
  
    crossSellMoreBtn.addEventListener('click', () => {
      render(allGoods.splice(0, COUNT_ROW_GOODS));
      if (allGoods.length < 1) {
        crossSellMoreBtn.remove();
      }
    })

    getDataXml('cross-sell-dbase/dbase.json', createCrossSellList);

    // getDataFetch('cross-sell-dbase/dbase.json', createCrossSellList);
  }

  tabs();
  accordeon();
  modal();
  renderCrossSell();
  amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger');

});