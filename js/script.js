// Перемещение по вертикали

let TRANSLATE = 0;
const dataSection = document.querySelector('[data-section]');
const elementStop = dataSection.querySelector('.stop');
const topPositionStop = elementStop.getBoundingClientRect().top;
const STEP = topPositionStop / 30;

const isTransBefore = () => {
  if (elementStop.getBoundingClientRect().top >= 0) {
    return true;
  }
};

const isTransAfter = () => {
 if (progresTotal === 1) {
  return true;
 }
};

const isRotate = () => {
  if (TRANSLATE === topPositionStop) {
    return true;
  }
}

const translateElementBefore = (direction) => {
  if (direction > 0) {
    if (TRANSLATE < topPositionStop) {
      TRANSLATE = TRANSLATE + STEP
      dataSection.setAttribute('style', `transform: translateY(-${Math.round(TRANSLATE)}px)`);
    }
    if (topPositionStop - TRANSLATE < 0) {
      TRANSLATE = topPositionStop;
      dataSection.setAttribute('style', `transform: translateY(-${Math.round(TRANSLATE)}px)`);
    }
  }
  if (direction < 0 && progresTotal === 0) {
    TRANSLATE = TRANSLATE - STEP
    dataSection.setAttribute('style', `transform: translateY(-${Math.round(TRANSLATE)}px)`);
  }
};

const translateElementUpAfter = (direction) => {
  if (direction > 0) {
    TRANSLATE = TRANSLATE + STEP;
    dataSection.setAttribute('style', `transform: translateY(-${Math.round(TRANSLATE)}px)`);
  }
  if (direction < 0 ) {
    TRANSLATE = TRANSLATE - STEP;
    dataSection.setAttribute('style', `transform: translateY(-${Math.round(TRANSLATE)}px)`);

    if (TRANSLATE < topPositionStop) {
      TRANSLATE = topPositionStop;
      dataSection.setAttribute('style', `transform: translateY(-${Math.round(TRANSLATE)}px)`);
    }
  }
};

//Вращение
const rotateAngle = 90;
const step = 0.05;
let progress_1 = 0;
let progress_2 = 0;
let progress_3 = 0;
let progresTotal = 0;

const els = document.querySelector('.els');
const el1 = els.querySelector('.el_1');
const el2 = els.querySelector('.el_2');
const el3 = els.querySelector('.el_3');
const elsArr = document.querySelectorAll('.el');


const rotateElement = (direction) => {
  const stopElement = document.querySelector('.stop');

  if (direction > 0 && stopElement.getBoundingClientRect().top <= 0) {
    if (progress_1 < 1) {
      progress_1 = +((progress_1 + step).toFixed(2));
      el1.setAttribute('style', `transform: rotate(${progress_1 * rotateAngle}deg)`);
      progresTotal = null;
    } else if (progress_2 < 1) {
      progress_2 = +((progress_2 + step).toFixed(2));
      el2.setAttribute('style', `transform: rotate(${progress_2 * rotateAngle}deg)`);
    } else if (progress_3 < 1) {
      progress_3 = +((progress_3 + step).toFixed(2));
      el3.setAttribute('style', `transform: rotate(${progress_3 * rotateAngle}deg)`);
      progresTotal = progress_3
    }
  }

  if (direction < 0) {
    if (progress_3 > 0) {
      progress_3 = +((progress_3 - step).toFixed(2));
      el3.setAttribute('style', `transform: rotate(${progress_3 * rotateAngle}deg)`);
    } else if (progress_2 > 0) {
      progress_2 = +((progress_2 - step).toFixed(2));
      el2.setAttribute('style', `transform: rotate(${progress_2 * rotateAngle}deg)`);
    } else if (progress_1 > 0) {
      progress_1 = +((progress_1 - step).toFixed(2));
      el1.setAttribute('style', `transform: rotate(${progress_1 * rotateAngle}deg)`);
      progresTotal = progress_1;
    }

    if (progresTotal === 0) {
      elsArr.forEach((item) => {
        item.removeAttribute('style');
      })
    }
  }
}

// Относительное перемещение

const clientHeight = document.documentElement.clientHeight;
let positionEl = 0.1;
const delta = 0.1
els.setAttribute('style', `--items-progress: ${positionEl}`);
const translateElements = (direction) => {

  if (direction > 0) {
    const topPositionEls = el1.getBoundingClientRect().top;
    if (topPositionEls < clientHeight) {
      positionEl = positionEl + delta;
      if (positionEl <= 0.95) {
        els.setAttribute('style', `--items-progress: ${positionEl}`);
      } else {
        positionEl = 1;
        els.setAttribute('style', `--items-progress: ${positionEl}`);
        console.log(positionEl);
      }
    }
  }
  if (direction < 0 && progresTotal === 0 ) {
    positionEl = positionEl - delta;
    if (positionEl >= delta) {
      els.setAttribute('style', `--items-progress: ${positionEl}`);
    } else {
        positionEl = delta;
    }
  }
};

// обработчик события

const wheelMauseHendler = (evt) => {
  const direction = evt.deltaY;

  if (isTransBefore()) {
    // движение по вертикали до вращения
    translateElementBefore(direction);
  }

  if (isTransAfter()) {
    // Движение по аертикали после вращения
    translateElementUpAfter(direction);
  }

  if (isRotate()) {
    //вращение
    rotateElement(direction)
  }

  // относительное пермещение елементов
   translateElements(direction);
};

window.addEventListener('wheel', wheelMauseHendler);



