$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 5,
    dots: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        360: {
            items: 3,
            nav: true
        },
        380: {
            items: 3,
            nav: true
        },
        420: {
            items: 3,
            nav: true
        },
        567: {
            items: 4,
            nav: true
        },
        768: {
            items: 5,
            nav: true
        },
        867: {
            items: 5,
            nav: true,
            loop: false
        },
        1200: {
            items: 4,
            nav: true,
            loop: false
        }
    }
})
//Calculator---------------------------------------------------------------------------------------------------
const dataMaterials = document.querySelectorAll('.panel-container-materials__item');
const dataColors = document.querySelectorAll('.panel-container-colors__item');
const dataWidth = document.querySelectorAll('.panel-container-width__item');
const dataArea = document.querySelector('#area');
const dataPrice = document.querySelector('[data-finish-price]');
const dataImg = document.querySelector('[data-panel-img]');
let price;
class Calculator {
    constructor(defaultMaterial, defaultColor, defaultWidth, defaultArea, materialPrice, colorPrice, widthPrice, areaPrice) {
        this.material = defaultMaterial;
        this.color = defaultColor;
        this.width = defaultWidth;
        this.area = defaultArea;
        this.materialPrice = materialPrice;
        this.colorPrice = colorPrice;
        this.widthPrice = widthPrice;
        this.areaPrice = areaPrice;
    }
    setDefaultData() {
        dataMaterials.forEach(item => {
            if (item.getAttribute('data-material') == this.material) {
                item.classList.add('current');
            }
        })
        dataColors.forEach(item => {
            if (item.getAttribute('data-color') == this.color) {
                item.classList.add('current');
            }
        })
        dataWidth.forEach(item => {
            if (item.getAttribute('data-width') == this.width) {
                item.classList.add('current');
            }
        })
        this.updateImg(dataImg);
    }
    setCurrent(e, button, arr) {
        arr.forEach(item => {
            item.classList.remove('current');
        })
        arr == dataMaterials ? e.target.parentElement.classList.add('current') : e.target.classList.add('current');
    }
    getMaterial(arr) {
        arr.forEach(item => {
            if (item.classList.contains('current')) {
                this.material = item.getAttribute('data-material');
                this.materialPrice = item.getAttribute('data-price');
            }
        })
       this.getWidth(dataWidth)
    }
    getColor(arr) {
        arr.forEach(item => {
            if (item.classList.contains('current')) {
                this.color = item.getAttribute('data-color');
                this.colorPrice = item.getAttribute('data-price');
            }
        })
    }
    getWidth(arr) {
        arr.forEach(item => {
            if (item.classList.contains('current')) {
                this.width = item.getAttribute('data-width');
                switch (this.material) {
                    case 'min':
                        this.widthPrice = item.getAttribute('data-price-min');
                        break;
                    case 'pol':
                        this.widthPrice = item.getAttribute('data-price-pol');
                        break;
                    case 'pir':
                        this.widthPrice = item.getAttribute('data-price-pir');
                        break;
                    case 'ext':
                        this.widthPrice = item.getAttribute('data-price-ext');
                        break;
                    default:
                        alert('Ошибка в типе материала');
                        break;
                }
            }
        })
    }
    getArea() {
        this.area = dataArea.value;
        this.areaPrice = dataArea.getAttribute('data-price');
    }
    updateImg(img) {
        img.setAttribute('src', `img/panel/material/color/${this.material}-${this.color}.jpg`);
    }
    compute() {
        price = (+this.materialPrice * +this.widthPrice) * +this.area + (+this.areaPrice * +this.colorPrice);
        dataPrice.innerHTML = price.toLocaleString('ru');
    }
}
let calculator = new Calculator('min', 1015, 50, 100, 1, 30, 1265, 10);
calculator.setDefaultData();
//calculator.updateImg(dataImg);

dataMaterials.forEach((button, index, arr) => {
    button.addEventListener('click', (e) => {
        calculator.setCurrent(e, button, arr);
        calculator.getMaterial(arr);
        calculator.updateImg(dataImg);
        calculator.compute();
    })
})

dataColors.forEach((button, index, arr) => {
    button.addEventListener('click', (e) => {
        calculator.setCurrent(e, button, arr);
        calculator.getColor(arr);
        calculator.updateImg(dataImg);
        calculator.compute();
    })
})

dataWidth.forEach((button, index, arr) => {
    button.addEventListener('click', (e) => {
        calculator.setCurrent(e, button, arr);
        calculator.getWidth(arr);
        calculator.compute();
    })
})

dataArea.addEventListener('input', () => {
    if (dataArea.value < 0) {
        alert('Площадь не должна быть отрицательной');
        dataArea.value = 0;
    } else {
        calculator.getArea();
        calculator.compute();
    }
})