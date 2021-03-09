document.addEventListener('DOMContentLoaded', () => {
  'use strict';
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
  tabs();

});