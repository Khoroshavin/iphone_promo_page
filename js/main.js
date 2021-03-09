document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const tabs = () => {
   
    const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
    const cardDetailsTitle      = document.querySelectorAll('.card-details__title');
    const cardImage = document.querySelectorAll('.card__image');

    const hideAll = () => {
      for (let i = 0; i < cardDetailChangeElems.length; i++) {
        cardDetailChangeElems[i].classList.remove('active');
        cardDetailsTitle[i].classList.remove('active');
        cardImage[i].classList.remove('active');
      }
    }

    for (let i = 0; i < cardDetailChangeElems.length; i++) {
      cardDetailChangeElems[i].addEventListener('click', () => {
        hideAll();
        cardDetailChangeElems[i].classList.add('active');
        cardDetailsTitle[i].classList.add('active');
        cardImage[i].classList.add('active');
      })

    }

  }
  tabs();

});