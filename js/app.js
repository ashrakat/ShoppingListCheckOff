(function () {
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);    
    
/////////////////////////////////////////////////////////////////////////////////////////    
// for Buy List    
ToBuyController.$inject = ['ShoppingListCheckOffService'];    
function ToBuyController(ShoppingListCheckOffService) {    
  var list = this;
    
  list.items = ShoppingListCheckOffService.getBuyItems();   
  list.All_Bought = function(){
    if (list.items.length == 0)
       return "Everything has been bought!";
    else
       return "";     
   };
   
  list.addItem = function () {
    try{  
    ShoppingListCheckOffService.addBuyItem(list.name, list.quantity);
    list.errorMessage = "";    
    }
    catch(error){
      list.errorMessage = error.message;
    }
  };
  
  list.AddBoughtItem = function (itemIndex) {
    ShoppingListCheckOffService.addBoughtItem(list.items[itemIndex].name, list.items[itemIndex].quantity);  
    ShoppingListCheckOffService.removeItem(itemIndex); 
  };
    
}
 
 
    
///////////////////////////////////////////////////////////////////////////////////////////    
// for AlreadyBoughtController 
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {    
    var itemBought = this;
    itemBought.Nan_Bought = "";
    itemBought.items = ShoppingListCheckOffService.getAleadyBoughtItems();
    itemBought.Nan_Bought = function(){    
       if(itemBought.items.length == 0)
          return "Nothing has been bought yet!";
       else
          return "";
      };
}    


///////////////////////////////////////////////////////////////////////////////////////////////////////////////    
// the service itself
function ShoppingListCheckOffService(){
  var service = this;
    
    
  var toBuyitems = [
      {
          name : "egg",
          quantity : "10"
      }
  ];
    
  var alreadyBoughtItems =[];
      
    
// add new to buy item    
  service.addBuyItem = function (itemName, Quantity) {
  if(itemName != undefined || Quantity != undefined){      
    var item = {
      name: itemName,
      quantity: Quantity
    };
    toBuyitems.push(item);
  }
   else {
      throw new Error("You must fill the data!");
    }      
  };

    
// get new to buy item    
  service.getBuyItems = function () {
    return toBuyitems;
  };  
    

//remove tobuy item
service.removeItem = function (itemIndex) {
    toBuyitems.splice(itemIndex, 1);
  };
    
// Add new bought items    
service.addBoughtItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    alreadyBoughtItems.push(item);
  };

  // get BoughtItems
  service.getAleadyBoughtItems = function () {
    return alreadyBoughtItems;
  };       

}
    
})();