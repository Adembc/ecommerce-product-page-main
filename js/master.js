// open close menu 
let nav  = document.querySelector("header .links") ; 
let menu = document.querySelector("header .menu") ; 
menu.onclick = ()=>{
    window.setTimeout(()=>{
        overlay = document.createElement("div") ; 
        overlay.className="overlay"
        nav.prepend(overlay);
    },200)
    nav.classList.add("show");
    let close  = document.querySelector(" header .links.show .close") ; 
    close.onclick = ()=>{
        nav.classList.remove("show") ; 
        overlay.remove()
    }
}


let showenProduct = document.querySelector(".current-product img") ; 
let otherProducts = document.querySelector(".other-products") ; 
let bigOverlay = document.querySelector(".big-overlay") ;
currentActiveIndex = 0 ; 
slide(); 
changeImage();
showenProduct.onclick = ()=>{
    if(window.innerWidth > 767){
        bigOverlay.classList.remove("hide") ; 
        clonedShowenProduct = showenProduct.parentElement.cloneNode(true) ; 
        clonedOtherProducts = otherProducts.cloneNode(true) ; 
        bigOverlay.appendChild(clonedShowenProduct)
        bigOverlay.appendChild(clonedOtherProducts) ;
        currentActiveIndex += 4; 
        slide() ; 
        changeImage()
        let close = document.querySelector(".big-overlay .close") ; 
        close.onclick = ()=>{
            currentActiveIndex -= 4
           allImages[currentActiveIndex].parentElement.classList.add("active") ; 
           close.parentElement.nextElementSibling.remove() ; 
           close.parentElement.remove(); 
           bigOverlay.classList.add("hide")
        }
    }
}

function slide(){
     allImages = document.querySelectorAll(".product");
     afficheur = document.querySelectorAll(".current-product img") ; 
     allImages.forEach((image, j)=>{
        image.onclick = ()=>{
            for(let i = 0 ; i< allImages.length ; i++){
                allImages[i].parentElement.classList.remove("active") ; 
            }
            image.parentElement.classList.add("active") ; 
            afficheur.forEach((aff)=>{
                aff.src = image.src; 
            })
            currentActiveIndex = j ;
            
            check()
        }
    })
}

function changeImage(){
    nextBtn = document.querySelectorAll(".next"); 
    prevBtn = document.querySelectorAll(".prev");
    check();
    nextBtn.forEach((btn)=>{
        btn.onclick = ()=>{
            if(currentActiveIndex < allImages.length-1){
                currentActiveIndex++
                for(let i = 0 ; i< allImages.length ; i++){
                    allImages[i].parentElement.classList.remove("active") ; 
                }
                allImages[currentActiveIndex].parentElement.classList.add("active")
                afficheur.forEach((aff)=>{
                    aff.src = allImages[currentActiveIndex].src
                })
            }
            check();
        }
    }) 
    prevBtn.forEach((btn)=>{
        btn.onclick = ()=>{
            // console.log("start prev") ; 
            if(currentActiveIndex > allImages.length-4){ // aka 0
                currentActiveIndex--
                for(let i = 0 ; i< allImages.length ; i++){
                    allImages[i].parentElement.classList.remove("active") ; 
                }
                allImages[currentActiveIndex].parentElement.classList.add("active") ; 
                afficheur.forEach((aff)=>{
                    aff.src = allImages[currentActiveIndex].src
                })
            }  
            check();
        }
    }) 
}
    
    function check(){
        nextBtn = document.querySelectorAll(".next"); 
        prevBtn = document.querySelectorAll(".prev");
        if(currentActiveIndex == allImages.length -4){
            prevBtn.forEach((btn)=>{
                btn.style.cursor = "no-drop" ; 
            })
        }else{
            prevBtn.forEach((btn)=>{
                btn.style.cursor = "pointer"
            })
        }
        if(currentActiveIndex == allImages.length-1){
            nextBtn.forEach((btn)=>{
                btn.style.cursor = "no-drop"
            })
        }else{
            nextBtn.forEach((btn)=>{
                btn.style.cursor = "pointer" ; 
            })
        }
    }
let numberItems = document.querySelector(".number-items") ;
let plus  = document.querySelector("#plus")
let minus  = document.querySelector("#minus") ; 
plus.onclick = ()=>{
    numberItems.innerHTML++;
}
minus.onclick = ()=>{
    if(numberItems.innerHTML>0)
    numberItems.innerHTML-- ;
}
let shop = document.querySelector(".shop") ; 
let card = document.querySelector(".cart-info") ; 
let details = document.querySelector(".details") ; 
let del = document.querySelector(".details .content > img:last-child") ; 
let addToCart = document.querySelector("#btn-add") ;
let toBuy = document.querySelector("header .shoping  span") ;  
let totalToBuy = 0 ;
let noProduct = document.querySelector(".no-product");  
// let numberItems = document.querySelector(".number-items") ;
shop.onclick = ()=>{
    card.classList.toggle("hide") ;
    del.onclick = ()=>{
        toBuy.classList.remove("show") ;
        noProduct.classList.remove("empty") ; 
        numberItems.innerHTML = 0;
        totalToBuy = 0;
    }
}
addToCart.onclick = ()=>{
   totalToBuy += +numberItems.textContent;
   toBuy.textContent = totalToBuy ;
   if(toBuy.innerHTML != 0){
       toBuy.classList.add("show") ; 
    let quantity = document.querySelector(".quantity") ;
    let total = document.querySelector(".total") 
    quantity.textContent = totalToBuy;
    total.textContent = `$${(125*totalToBuy).toFixed(2)}`;
    noProduct.classList.add("empty")
}
}