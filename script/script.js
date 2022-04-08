const formAddElem = document.forms[0];
const nameDeal = formAddElem.name_deal;
const descrDeal = formAddElem.descr_deal;
const sheetElem = document.querySelector('#cards');
const elemOK = document.querySelector('.counter_done');
const elemNO = document.querySelector('.counter_cancel')
let sheetDeal = [];
let st = 0;
let stOK = 0;
let stNO = 0;

formAddElem.addEventListener('submit', event => {
  event.preventDefault();
  if (nameDeal.value !== '' && descrDeal.value !== '') {
  	st++;
  	sheetDeal.push({
  	nameDeal: nameDeal.value,
  	descrDeal: descrDeal.value,
  	result: '',
  	id: st  	
  });
  	render(sheetDeal);
  }else{
  	alert("Заполните все поля");
  }
  nameDeal.value = '';
  descrDeal.value = '';
});

function render (list_cards){
  sheetElem.innerText = '';
  for (let i = 0; i < list_cards.length; i++){
    const card = document.createElement('div');
    const nameCard = document.createElement('p');
    const descrCard = document.createElement('p');
    const btnOK = document.createElement('div');
    const btnNO = document.createElement('div');

    btnOK.addEventListener('click', () => {
      sheetDeal = sheetDeal.filter(elem => elem.id !== list_cards[i].id);
      stOK++
      elemOK.innerText = `Сделано ${stOK}`;
      render(sheetDeal);
    });

    btnNO.addEventListener('click', () => {
      sheetDeal = sheetDeal.filter(elem => elem.id !==list_cards[i].id);
      stNO++
      elemNO.innerText = `Отменено ${stNO}`;
      render(sheetDeal);
    });

    card.classList.add('card');
    btnOK.classList.add('ok');
    btnNO.classList.add('NoOk');

    card.append(nameCard, btnOK, descrCard, btnNO);
    sheetElem.append(card);

    nameCard.innerText = sheetDeal[i].nameDeal;
    descrCard.innerText = sheetDeal[i].descrDeal;
    btnOK.innerText = '🗸';
    btnNO.innerText = '✖';
    
  }
  
  save_data(sheetDeal, stOK, stNO, st);
};

function save_data (arg, st_ok, st_no, st_st) {
  if (arg.length === 0){
    localStorage.removeItem('sheet_Deal');
  }else{
  localStorage.setItem('sheet_Deal', JSON.stringify(arg));
  };
  localStorage.setItem('st_ok', st_ok);
  localStorage.setItem('st_no', st_no);
  localStorage.setItem('st_st', st_st);
}

function set_data (){
    stOK = localStorage.getItem('st_ok');
    stNO = localStorage.getItem('st_no');
    st = localStorage.getItem('st_st');
    
    let sh_Deal = JSON.parse(localStorage.getItem('sheet_Deal'))
    
    if (stOK === null){
      elemOK.innerText = `Сделано 0`;
    }else{
      elemOK.innerText = `Сделано ${stOK}`;
    };

    if (stNO === null){
      elemNO.innerText = `Отменено 0`;
    }else{
      elemNO.innerText = `Отменено ${stNO}`;
    };
    
    if (sh_Deal !== null){
      sheetDeal = sh_Deal;
  };
};

set_data();
render(sheetDeal);

