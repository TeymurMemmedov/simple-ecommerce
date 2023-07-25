let technologyData = [
    {
      id: 1,
      name: "Phone",
      price: 500,
      info: "A mobile device for communication",
      imageLink: "https://kontakt.az/wp-content/uploads/2023/06/New-Project-2023-06-14T142446.916.jpg"
    },
    {
      id: 2,
      name: "Laptop",
      price: 1000,
      info: "A portable computer for various tasks and activities",
      imageLink: "https://kontakt.az/wp-content/uploads/2022/09/Kontakt-home-2022-09-28T092333.268_png.webp"
    },
    {
      id: 3,
      name: "Tablet",
      price: 700,
      info: "A handheld device with a touchscreen interface",
      imageLink: "https://kontakt.az/wp-content/uploads/2021/11/New-Project-97_png_png.webp"
    },
    {
      id: 4,
      name: "Smartwatch",
      price: 300,
      info: "A wearable device with various smart functionalities",
      imageLink: "https://kontakt.az/wp-content/uploads/2022/09/Apple-Watch-8-41-mm_png.webp"
    },
    {
      id: 5,
      name: "Headphones",
      price: 150,
      info: "Audio devices worn over the ears for listening to sound",
      imageLink: "https://kontakt.az/wp-content/uploads/2023/06/New-Project-2023-06-05T095635.034_png.webp"
    },
    {
      id: 6,
      name: "Camera",
      price: 800,
      info: "A device for capturing photographs and videos",
      imageLink: "https://kontakt.az/wp-content/uploads/2022/12/New-Project-2022-12-19T170445.386_png.webp"
    },
    {
      id: 7,
      name: "Gaming Console",
      price: 400,
      info: "A device for playing video games",
      imageLink: "https://kontakt.az/wp-content/uploads/2021/08/612bjwBuobS._SL1500__png.webp"
    },
    {
      id: 8,
      name: "Wireless Earbuds",
      price: 200,
      info: "Earphones without cables for wireless audio playback",
      imageLink: "https://kontakt.az/wp-content/uploads/2022/07/59120211129133801_png.webp"
    },
    {
      id: 9,
      name: "Smart Speaker",
      price: 250,
      info: "A voice-activated speaker with smart assistant features",
      imageLink: "https://kontakt.az/wp-content/uploads/2023/01/Kontakt-home-2023-01-13T153108.484_png.webp"
    },
  
  ];
  
// Burdan 160-cı sətrə qədər slider-la bağlı kodlardır. Əsas hissə ondan sonra başlayır
let productsShownCards = []
let slidesContainer = document.querySelector(".slides-container")
let sliderDots  = document.querySelector(".slider-dots")
let root  = document.documentElement
root.style.setProperty("--slide-count",`${technologyData.length/3}`);
function generateSlide(sliderData){
    slidesContainer.innerHTML=``;
    for(slide of sliderData){  
        productsShownCards.push(slide)
        slideHtml = `
        <div class="card">
        <img src="${slide.imageLink}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${slide.name}</h5>
        <p class="card-text">${slide.info}.</p>
        <p class="card-text">${slide.price} AZN</p>
        <a onclick = addProductToShopping(${slide.id}) class="btn btn-primary">Add to Card</a>
      </div>
    </div>
        `;
        slidesContainer.innerHTML+=slideHtml
    }
}
generateSlide(technologyData)

function generateSliderDots(sliderData){
    for (let i = 0; i < sliderData.length/3; i++) {
        
        sliderDots.innerHTML+=`<span id="${i}" onclick="slideWithDot(event,${i});isSliderOnLeftLimit();isSliderOnRightLimit(technologyData)"></span>`
    }
    sliderDots.children.item(0).classList.add("active-ball")
}
generateSliderDots(technologyData)


let slideAmount = document.querySelector("#slider").clientWidth;
let slidePosition=0
slideStep=1
const leftLink = document.querySelector(".slider-controls a:nth-child(1)");
const rightLink = document.querySelector(".slider-controls a:nth-child(2)");

function isSliderOnLeftLimit(){
    if(slidePosition==0){
        document.querySelector(".slider-controls a:nth-child(1)").style.pointerEvents = "none";
        document.querySelector(".slider-controls a:nth-child(1) i").style.color = "#abb8c3";
    }
    else{
        document.querySelector(".slider-controls a:nth-child(1)").style.pointerEvents = "auto";
        document.querySelector(".slider-controls a:nth-child(1) i").style.color = "#373a36";
    }
}

function isSliderOnRightLimit(sliderData){
    if(slidePosition==-((sliderData.length/3-(slideStep))*slideAmount)){
        document.querySelector(".slider-controls a:nth-child(2)").style.pointerEvents = "none";
        document.querySelector(".slider-controls a:nth-child(2) i").style.color = "#abb8c3";
    }
    else{
        document.querySelector(".slider-controls a:nth-child(2)").style.pointerEvents = "auto";
        document.querySelector(".slider-controls a:nth-child(2) i").style.color = "#373a36";
    }
}

function slideLeft(e){
    e.preventDefault();
    slidePosition=slidePosition+(slideAmount*slideStep);
    slidesContainer.style.transform=`translateX(${slidePosition}px)`

    sliderDots.children.item(activeDotPosition).classList.remove("active-ball")
    activeDotPosition--;
    sliderDots.children.item(activeDotPosition).classList.add("active-ball")
}

function slideRight(e){
    e.preventDefault();
    slidePosition=slidePosition-(slideAmount*slideStep)
    slidesContainer.style.transform=`translateX(${slidePosition}px)`

    sliderDots.children.item(activeDotPosition).classList.remove("active-ball")
    activeDotPosition++;
    sliderDots.children.item(activeDotPosition).classList.add("active-ball")
}

activeDotPosition=0
function slideWithDot(e,newDotPosition){
    e.preventDefault();
    slidePosition=slidePosition+(slideAmount*(activeDotPosition-newDotPosition));
    slidesContainer.style.transform=`translateX(${slidePosition}px)`
    sliderDots.children.item(activeDotPosition).classList.remove("active-ball")
    sliderDots.children.item(newDotPosition).classList.add("active-ball")
    activeDotPosition=newDotPosition
}


// Buradan etibarən əsas hissədir.

let shoppingCardElements = []
let shoppingTableBody = document.querySelector("#shoppingCard tbody");
let shoppingTotalSum = document.getElementById("shoppingTotalSum");

function getTheProduct(id,searchingArray){
  let product = searchingArray.find((item)=>item.id==id);
  return product;
}

function getTotalSum(shoppingCardArray){
  let totalSum = 0;
  for (const product of shoppingCardArray) {
    totalSum += product.price*product.quantity;
  }
  return totalSum;
}

function writeTheTotalSum(){
  shoppingTotalSum.innerHTML = "";
  shoppingTotalSum.innerHTML=getTotalSum(shoppingCardElements);
}

function addProductToShopping(productId){
  let theProduct = getTheProduct(productId,productsShownCards);
  let index  = shoppingCardElements.indexOf(theProduct)
  
  if(index==-1){
    theProduct.quantity = 1;
    shoppingCardElements.push(theProduct);

  }
  else{
    shoppingCardElements[index].quantity++;

  }
  fillTheShoppingCard(shoppingCardElements)
  writeTheTotalSum()

  
}


shoppingTableBody.addEventListener("change", function(event) {
  
  if (event.target.tagName === "INPUT" && event.target.type === "number") {
    let inputElement  = event.target
    let theProduct = getTheProduct(inputElement.parentElement.parentElement.getAttribute("productid"),productsShownCards);
    let index  = shoppingCardElements.indexOf(theProduct)
    shoppingCardElements[index].quantity=inputElement.value;
    fillTheShoppingCard(shoppingCardElements)
    writeTheTotalSum()
  }
});

shoppingTableBody.addEventListener("click", function(event) {
  

    if(event.target.tagName==="I"||event.target.tagName==="BUTTON"){
    let button  = event.target
    let theProduct = getTheProduct(button.parentElement.parentElement.getAttribute("productid"),productsShownCards);
    let index  = shoppingCardElements.indexOf(theProduct)
    shoppingCardElements.splice(index,1)
    button.parentElement.parentElement.remove();
    fillTheShoppingCard(shoppingCardElements)
    writeTheTotalSum()
    }
  
});

function fillTheShoppingCard(shoppingCardArray){
  shoppingTableBody.innerHTML="";
  for (const product of shoppingCardArray) 

  {
    shoppingTableBody.innerHTML += 
  `
  <tr productid="${product.id}">
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td><input type="number" value=${product.quantity} )></td>
    <td>${product.price*product.quantity}</td>
    <td style=" width: 10px;"><button class="btn"><i class="fa-solid fa-trash"></i></button></td>
  </tr>
  `
  }
}

//Pdf hazırlamaqla bağlı olan hissə

function generatePdf(){
  var shoppingBill = JSON.parse(localStorage.getItem("shoppingData"));
  var tableBody = [];
  var totalAmount = localStorage.getItem("totalSum")
  for (var i = 0; i < shoppingBill.length; i++) {
    var product = shoppingBill[i];
    var totalPrice = product.price * product.quantity;
  
    tableBody.push([product.name, product.price,product.quantity, totalPrice]);
  }
var docDefinition = {
  
  content: [
    { text: 'Shopping Bill', style: 'header' },
    '\n',
    {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*','*'],
        body: [
          ['Product Name', 'Price', 'Quantity', 'Total'],
          ...tableBody
        ]
      },
      layout: 'lightHorizontalLines'
    },
    '\n',
    {
      table: {
        widths: ['*', 'auto'],
        body: [
          ['Final Amount:', totalAmount]
        ]
      },
      layout: 'noBorders'
    }
    ,
    '\n',
    {text:"Bizdən alış veriş etdiyiniz üçün təşəkkürlər!",style:'header'}
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10],
      alignment:'center'
    }
  }
}
pdfMake.createPdf(docDefinition).open();
}





let confirmOrder = document.getElementById('confirm-order');
confirmOrder.addEventListener('click',function(){
  localStorage.clear();
   let jsonShoppingData = JSON.stringify(shoppingCardElements);
   localStorage.setItem("shoppingData",jsonShoppingData)
   localStorage.setItem('totalSum',getTotalSum(shoppingCardElements))
  generatePdf();

});






