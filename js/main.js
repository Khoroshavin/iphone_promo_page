document.addEventListener('DOMContentLoaded', () => {
  
  const tabs = () => {
   
    const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
    const cardDetailsTitleElem  = document.querySelector('.card-details__title');
    const cardDetailsImageElem  = document.querySelector('.card__image_item');
    const cardDetailsPriceElem  = document.querySelector('.card-details__price');
    const descriptionMemory     = document.querySelector('.description__memory');

    const dataPhones = [
      {
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

    cardDetailChangeElems.forEach( (btn, i) => {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) {
          deactive();
          
          btn.classList.add('active');
          cardDetailsTitleElem.textContent = dataPhones[i].name;
          cardDetailsImageElem.src = dataPhones[i].img;
          cardDetailsPriceElem.textContent = dataPhones[i].price+'₽';
          descriptionMemory.textContent = `Встроенная память (ROM) ${dataPhones[i].memoryRom} ГБ`
        }
      } )
    } )
    

  }
  

  const accordeon = () => {
    
    const characteristicsListElem = document.querySelector('.characteristics__list');
    const characteristicsItemElems  = document.querySelectorAll('.characteristics__item');

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



  tabs();
  accordeon();
  modal();
});