//Storage Controller
const StorageCtrl = (function(){
  //Public Methods
  return{
    storeItem:{
      storePurchase: function(pitem){
        let pitems;
        //Check if any item is in ls
        if(localStorage.getItem('pitems') === null){
          pitems = [];
          //Push new Item
          pitems.push(pitem);
          //Set ls
        localStorage.setItem('pitems', JSON.stringify(pitems));
        }else{
          //Get what is already in ls
          pitems = JSON.parse(localStorage.getItem('pitems'));

          //Push new item
          pitems.push(pitem);
          
          //Re set ls
          localStorage.setItem('pitems',JSON.stringify(pitems));
        }
      },
      storeSales: function(sitem){
        let sitems;
        //Check if any item is in ls
        if(localStorage.getItem('sitems') === null){
          sitems = [];
          //Push new Item
          sitems.push(sitem);
          //Set ls
        localStorage.setItem('sitems', JSON.stringify(sitems));
        }else{
          //Get what is already in ls
          sitems = JSON.parse(localStorage.getItem('sitems'));

          //Push new item
          sitems.push(sitem);
          
          //Re set ls
          localStorage.setItem('sitems',JSON.stringify(sitems));
        }
    }
  },
  getItemsFromStorage:{
    getPurchaseFromStorage: function(){
      let pitems;
      if(localStorage.getItem('pitems') === null){
        pitems = [];
      }else{
        pitems = JSON.parse(localStorage.getItem('pitems'));
      }
      return pitems;
    },
    getSalesFromStorage: function(){
      let sitems;
      if(localStorage.getItem('sitems') === null){
        sitems = [];
      }else{
        sitems = JSON.parse(localStorage.getItem('sitems'));
      }
      return sitems;
    }
  },
  updateItemStorage:{
    updatePurchaseStorage: function(pupdatedItem){
      let pitems = JSON.parse(localStorage.getItem('pitems'));

      pitems.forEach(function(item,index){
        if(pupdatedItem.id === item.id){
            pitems.splice(index, 1, pupdatedItem);
        }
      });
      localStorage.setItem('pitems',JSON.stringify(pitems));
    },

    updateSalesStorage: function(supdatedItem){
      let sitems = JSON.parse(localStorage.getItem('sitems'));

      sitems.forEach(function(sitem,sindex){
        if(supdatedItem.id === sitem.id){
            sitems.splice(sindex, 1, supdatedItem);
        }
      });
      localStorage.setItem('sitems',JSON.stringify(sitems));
    }
  }, 
  deleteItemFromStorage:{
    deletePurchaseFromStorage: function(pid){
      let pitems = JSON.parse(localStorage.getItem('pitems'));

      pitems.forEach(function(item,index){
        if(pid === item.id){
            pitems.splice(index, 1);
        }
      });
      localStorage.setItem('pitems',JSON.stringify(pitems));
    },
    deleteSalesFromStorage: function(sid){
      let sitems = JSON.parse(localStorage.getItem('sitems'));

      sitems.forEach(function(sitem,sindex){
        if(sid === sitem.id){
            sitems.splice(sindex, 1);
        }
      });
      localStorage.setItem('sitems',JSON.stringify(sitems));
    }
  },
  clearItemsFromStorage: function(){
    localStorage.removeItem('pitems');
    localStorage.removeItem('sitems');
  }
 }
})();
//Item Controller
 const ItemCtrl = (function(){
  //Item Constructor
    const Item = function(id,date,companyname,sharenumber,shareprice){
      this.id = id;
      this.date = date;
      this.companyname = companyname;
      this.sharenumber = sharenumber;
      this.shareprice = shareprice;
    }
    //Data Structure / State
    const data ={
      //purchaseitems: [
        // {id: 0, date:'6/7/2020',companyname:'NBL', sharenumber: 20, shareprice: 10 },
        // {id: 1, date:'6/9/2020',companyname:'NIB', sharenumber: 20, shareprice: 40 },
        // {id: 2, date:'7/7/2020',companyname:'Kist', sharenumber: 20, shareprice: 40 },
     // ], 
      //salesitems: [
        // {id: 0, date:'6/7/2020',companyname:'NBL', sharenumber: 203, shareprice: 5 },
        // {id: 1, date:'6/9/2020',companyname:'SBI', sharenumber: 44, shareprice: 20 },
        // {id: 2, date:'7/7/2020',companyname:'Kist', sharenumber: 18, shareprice: 16 },
      //], 
      purchaseitems: StorageCtrl.getItemsFromStorage.getPurchaseFromStorage(),
      salesitems: StorageCtrl.getItemsFromStorage.getSalesFromStorage(),
      currentItem: null,
      purchasetotal:0,
      salestotal:0,
      purchaseamount:0,
      salesamount:0
    }

    //Public method
    return{
      getItems: function(){
        return {
          purchaseitems: data.purchaseitems, 
          salesitems: data.salesitems
        };
      },
      addItems:{
        purchaseItems: function(date,companyname,sharenumber,shareprice){
          let ID;
          //Create ID
          if(data.purchaseitems.length > 0){
            ID = data.purchaseitems[data.purchaseitems.length - 1].id + 1;
          }else{
            ID = 0;
          }

          //ShareNumber to number
          sharenumber = parseInt(sharenumber);

          //Create new Purchase
          newPurchase = new Item(ID,date,companyname,sharenumber,shareprice);

          //Add purchase into Array
          data.purchaseitems.push(newPurchase);
          return newPurchase;
        },
        salesItems: function(date,companyname,sharenumber,shareprice){
          let ID;
          if(data.salesitems.length > 0){
            ID = data.salesitems[data.salesitems.length - 1].id +1;
          }else{
            ID = 0;
          }
          //Sharenumber to number
          sharenumber = parseInt(sharenumber);
          
          //Create new Purchase
          newSales = new Item(ID,date,companyname,sharenumber,shareprice);

          //push sales to the array
          data.salesitems.push(newSales);
          return newSales;
        }
      },
      getItemById:{
        getPurchaseItem: function(pid){
          let pfound = null;
          //Loop through items
          data.purchaseitems.forEach(function(pitem){
            if(pitem.id === pid){
              pfound = pitem;
            }
          });
          return pfound;
        },
        getSalesItem: function(sid){
          let sfound = null;
          //loop through items
          data.salesitems.forEach(function(sitem){
              if(sitem.id === sid){
                  sfound = sitem;
              }
          });
          return sfound;
        }
      },
      updateItem:{
        updatePurchase : function(pdate,pcompanyname,psharenumber,pshareprice){
          //share number to number
          psharenumber = parseInt(psharenumber);

          let pfound = null;

          data.purchaseitems.forEach(function(item){          
            if(item.id === data.currentItem.id){
                item.date = pdate;
                item.companyname = pcompanyname;
                item.sharenumber = psharenumber;
                item.shareprice = pshareprice;
                pfound = item;
          }
        });
            return pfound;
        },
        updateSales : function(sdate,scompanyname,ssharenumber,sshareprice){
          //share number to number
          ssharenumber = parseInt(ssharenumber);

          let sfound = null;

          data.salesitems.forEach(function(item){
            if(item.id === data.currentItem.id){
              item.date = sdate;
              item.companyname = scompanyname;
              item.sharenumber = ssharenumber;
              item.shareprice = sshareprice;
              sfound = item;
            }
          });
            return sfound;
        }
      },
      deleteItem:{
        deletePurchase: function(id){
          //Get ids
          const ids = data.purchaseitems.map(function(item){
            return item.id;
          });

          //Get index
          const index = ids.indexOf(id);

          //Remove item
          data.purchaseitems.splice(index, 1);

        },
        deleteSales: function(id){
          //Get ids 
          const ids = data.salesitems.map(function(item){
            return item.id;
          });

          //Get index
          const index = ids.indexOf(id);

          //Remove Item
          data.salesitems.splice(index,1);
        }
      },
      clearAllItems: function(){
        data.purchaseitems = [];
        data.salesitems = [];
      },
      setCurrentItem:{
        setPurchaseItem: function(pitem){
          data.currentItem = pitem;
        },
        setSalesItem: function(sitem){
          data.currentItem = sitem;
        }
      },
      getCurrentItem: {
        getPurchase: function(){
          return data.currentItem;
        },
        getSales: function(){
          return data.currentItem;
        }
      },
      getTotalShare: {
        totalPurchase: function(){
            let Totalpurchase = 0;
            data.purchaseitems.forEach(function(item){
              Totalpurchase += item.sharenumber;
            });
            //Set total purchase in data structure
            data.purchasetotal = Totalpurchase;
            //Return total purchase
            return data.purchasetotal;
          },
        totalSales: function(){
          let Totalsales = 0;
          data.salesitems.forEach(function(item){
            Totalsales += item.sharenumber;
          });       
          //Set total Sales to data structure
          data.salestotal = Totalsales;
          //Return total sales 
          return data.salestotal;
         }  
      },
      getTotalAmount:{
        totalPurchaseAmount: function(){
          let purchaseamount = 0;
          let purchasemul;
          data.purchaseitems.forEach(function(item){          
            purchasemul = item.sharenumber * item.shareprice;
            purchaseamount += purchasemul;
          });
          //Set Total Purchase Amount to Data Structure
          data.purchaseamount = purchaseamount;
          //Return total Purchase Amount
          return data.purchaseamount;
        },
        totalSalesAmount: function(){
          let salesamount = 0;
          let salesmul;
          data.salesitems.forEach(function(item){
            salesmul = item.sharenumber * item.shareprice;
            salesamount += salesmul;
          });
          //Set Total Sales Amount to data Structure
          data.salesamount = salesamount;
          //Return total Sales Amount
          return data.salesamount;
        }
      },
      logData: function(){
        return data;
      }
    }
 })();
//UI Controller
const UICtrl = (function(){
  const UISelectors ={
    purchaseList: '#purchase-list',
    listPurchase:'#purchase-list li',
    salesList: '#sales-list',
    listSales:'#sales-list li',
    purchaseAdd: '.purchase-btn',
    salesAdd: '.sales-btn',
    purchaseUpdate: '.pupdate-btn',
    purchaseDelete:'.pdelete-btn',
    purchaseBack:'.pback-btn',
    salesUpdate:'.supdate-btn',
    salesDelete:'.sdelete-btn',
    salesBack:'.sback-btn',
    clearBtn: '.clear-btn',
    purchaseDate: '#pdate',
    salesDate: '#sdate',
    purchaseCompanyName: '#pcompany-name',
    salesCompanyName: '#scompany-name',
    purchaseShareNumber: '#pnumber-share',
    salesShareNumber: '#snumber-share',
    purchaseSharePrice: '#pper-share',
    salesSharePrice: '#sper-share',
    totalPurchase: '.total-purchase',
    totalSales: '.total-sales',
    purchaseAmount:'.total-pamount',
    salesAmount: '.total-samount',
    balanceTotal:'.balance'
  }
  //Public methods

  //Populate Purchase List
    return{
      populatePurchaseList: function(purchaseitems){
        let html = '';
      //For multiplying number of share times price per share
        let mul;
         purchaseitems.forEach(function(item){
          mul= item.sharenumber * item.shareprice;
          html += `<li class="list-group-item" id="item-${item.id}">
          <strong class="pr-2">${item.date}:</strong><b>${item.companyname} </b> <em>${item.sharenumber}</em> @ <em>${item.shareprice}</em> : <em>${mul}</em>
          <a href="#" class="pl-5 "><i class="edit-item fas fa-pencil-alt"></i></a>
          </li>`;
        });
    // Insert list items
      document.querySelector(UISelectors.purchaseList).innerHTML = html;
      },
      populateSalesList: function(salesitems){
        let html = '';
      //For multiplying number of share times price per share
        let mul;
         salesitems.forEach(function(item){
          mul= item.sharenumber * item.shareprice;
          html += `<li class="list-group-item" id="item-${item.id}">
          <strong class="pr-2">${item.date}:</strong><b>${item.companyname} </b> <em>${item.sharenumber}</em> @ <em>${item.shareprice}</em> : <em>${mul}</em>
          <a href="#" class="pl-5 "><i class="edit-item fas fa-pencil-alt"></i></a>
          </li>`;
        });
    // Insert list items
      document.querySelector(UISelectors.salesList).innerHTML = html;
      },
      //For this i am using object inside a object that is nesting object
      getItemsInput: function(){
        return {
          getPurchaseInput: {
            date: document.querySelector(UISelectors.purchaseDate).value,
            companyName: document.querySelector(UISelectors.purchaseCompanyName).value,
            shareNumber: document.querySelector(UISelectors.purchaseShareNumber).value,
            sharePrice:document.querySelector(UISelectors.purchaseSharePrice).value
          },
          getSalesInput: {
            date: document.querySelector(UISelectors.salesDate).value,
            companyName: document.querySelector(UISelectors.salesCompanyName).value,
            shareNumber: document.querySelector(UISelectors.salesShareNumber).value,
            sharePrice:document.querySelector(UISelectors.salesSharePrice).value
          }
        };       
      },
      addListItem:{
        addPurchaseItem: function(item){
        //Create li element
        const li = document.createElement('li');
        //Add Class
        li.className = 'list-group-item';
        //Add ID
        li.id = `item-${item.id}`;
        //Add HTML
        let mul;//For mutiplying sharenumber and shareprice
        mul= item.sharenumber*item.shareprice;
        li.innerHTML = `
        <strong class="pr-2">${item.date}:</strong><b>${item.companyname} </b> <em>${item.sharenumber}</em> @ <em>${item.shareprice}</em> : <em>${mul}</em>
        <a href="#" class="pl-5 "><i class="edit-item fas fa-pencil-alt"></i></a>`;
        //Insert item
        document.querySelector(UISelectors.purchaseList).insertAdjacentElement('beforeend',li)
      }, 
    addSalesItem: function(item){
      //Create li Element
      const li = document.createElement('li');
      //Add Class
      li.className = 'list-group-item';
      //Add id
      li.id = `item-${item.id}`;
      //Add HTML
      let mul;
      mul= item.sharenumber*item.shareprice;

      li.innerHTML = `
      <strong class="pr-2">${item.date}:</strong><b>${item.companyname} </b> <em>${item.sharenumber}</em> @ <em>${item.shareprice}</em> : <em>${mul}</em>
      <a href="#" class="pl-5 "><i class="edit-item fas fa-pencil-alt"></i></a>`;
      //Insert li into ul
      document.querySelector(UISelectors.salesList).insertAdjacentElement('beforeend',li)
    }
  },
    updateListItem:{
      updatePurchaseListItem: function(item){
        let purchaseListItems = document.querySelectorAll(UISelectors.listPurchase);

        //Turn Node List into array
        purchaseListItems = Array.from(purchaseListItems);

        purchaseListItems.forEach(function(purchaseListItems){
          const itemID = purchaseListItems.getAttribute('id');

          if(itemID === `item-${item.id}`){
            let mul;
            mul= item.sharenumber*item.shareprice;
            document.querySelector(`#${itemID}`).innerHTML = `<strong class="pr-2">${item.date}:</strong><b>${item.companyname} </b> <em>${item.sharenumber}</em> @ <em>${item.shareprice}</em> : <em>${mul}</em>
            <a href="#" class="pl-5 "><i class="edit-item fas fa-pencil-alt"></i></a>`;
          }
        });
      },
      updateSalesListItem: function(item){
        let salesListItems = document.querySelectorAll(UISelectors.listSales);
        //Turn Node List into Array
        salesListItems = Array.from(salesListItems);

        salesListItems.forEach(function(salesListItems){
          const itemID = salesListItems.getAttribute('id');

          if(itemID === `item-${item.id}`){
            let mul;
            mul= item.sharenumber*item.shareprice;
            document.querySelector(`#${itemID}`).innerHTML = `<strong class="pr-2">${item.date}:</strong><b>${item.companyname} </b> <em>${item.sharenumber}</em> @ <em>${item.shareprice}</em> : <em>${mul}</em>
            <a href="#" class="pl-5 "><i class="edit-item fas fa-pencil-alt"></i></a>`;;
          }
        });
      }
    },
    deleteListItem:{
      deletePurchase: function(id){
        const itemID = `#item-${id}`;
        const item = document.querySelector(itemID);
        item.remove();
      },
      deleteSales: function(id){
        const itemID = `#item-${id}`;
        const item = document.querySelector(itemID);
        item.remove();
      }
    },
    clearInputs:{
      clearPurchase: function(){      
      document.querySelector(UISelectors.purchaseDate).value = '';
      document.querySelector(UISelectors.purchaseCompanyName).value = '';
      document.querySelector(UISelectors.purchaseShareNumber).value = '';
      document.querySelector(UISelectors.purchaseSharePrice).value = '';
     },
      clearSales: function(){
        document.querySelector(UISelectors.salesDate).value = '';
        document.querySelector(UISelectors.salesCompanyName).value = '';
        document.querySelector(UISelectors.salesShareNumber).value = '';
        document.querySelector(UISelectors.salesSharePrice).value = '';
      }
   },   
   addItemToForm:{
     addPurchaseItem: function(){
      document.querySelector(UISelectors.purchaseDate).value = ItemCtrl.getCurrentItem.getPurchase().date;
      document.querySelector(UISelectors.purchaseCompanyName).value = ItemCtrl.getCurrentItem.getPurchase().companyname;
      document.querySelector(UISelectors.purchaseShareNumber).value = ItemCtrl.getCurrentItem.getPurchase().sharenumber;
      document.querySelector(UISelectors.purchaseSharePrice).value = ItemCtrl.getCurrentItem.getPurchase().shareprice;
      UICtrl.showEditState.purchaseState();
     },
     addSalesItem: function(){     
      document.querySelector(UISelectors.salesDate).value = ItemCtrl.getCurrentItem.getSales().date;
      document.querySelector(UISelectors.salesCompanyName).value = ItemCtrl.getCurrentItem.getSales().companyname;
      document.querySelector(UISelectors.salesShareNumber).value = ItemCtrl.getCurrentItem.getSales().sharenumber;
      document.querySelector(UISelectors.salesSharePrice).value = ItemCtrl.getCurrentItem.getSales().shareprice;
      UICtrl.showEditState.salesState();
     }
   },
   removeItems: function(){
     let purchaselistItems = document.querySelectorAll(UISelectors.listPurchase);
     let salesListItems = document.querySelectorAll(UISelectors.listSales);

     //Turn Node List Into Array
     purchaselistItems = Array.from(purchaselistItems);
     salesListItems = Array.from(salesListItems);

     purchaselistItems.forEach(function(pitem){
       pitem.remove();
     });

     salesListItems.forEach(function(sitem){
       sitem.remove();
     });
   },
   showTotal:{
     showTotalPurchase: function(ptotal){
        document.querySelector(UISelectors.totalPurchase).textContent = ptotal;
     },
     showTotalSales: function(stotal){
      document.querySelector(UISelectors.totalSales).textContent = stotal;
     }
   }, 
   showTotalAmount: {
     showPurchaseAmount: function(pamount){
        document.querySelector(UISelectors.purchaseAmount).textContent = pamount;
     },
     showSalesAmount: function(samount){
      document.querySelector(UISelectors.salesAmount).textContent = samount;
   }
   },
   clearEditState:{
    clearPurchaseEditState: function(){
      UICtrl.clearInputs.clearPurchase();
      document.querySelector(UISelectors.purchaseUpdate).style.display = 'none';
      document.querySelector(UISelectors.purchaseDelete).style.display = 'none';
      document.querySelector(UISelectors.purchaseBack).style.display = 'none';
      document.querySelector(UISelectors.purchaseAdd).style.display = 'inline';
    },
    clearSalesEditState: function(){
      UICtrl.clearInputs.clearSales();
      document.querySelector(UISelectors.salesUpdate).style.display = 'none';
      document.querySelector(UISelectors.salesDelete).style.display = 'none';
      document.querySelector(UISelectors.salesBack).style.display = 'none';
      document.querySelector(UISelectors.salesAdd).style.display = 'inline';
    }
   },

  showEditState:{
    purchaseState: function(){

      document.querySelector(UISelectors.purchaseUpdate).style.display = 'inline';
      document.querySelector(UISelectors.purchaseDelete).style.display = 'inline';
      document.querySelector(UISelectors.purchaseBack).style.display = 'inline';
      document.querySelector(UISelectors.purchaseAdd).style.display = 'none';
    },
     salesState: function(){

      document.querySelector(UISelectors.salesUpdate).style.display = 'inline';
      document.querySelector(UISelectors.salesDelete).style.display = 'inline';
      document.querySelector(UISelectors.salesBack).style.display = 'inline';
      document.querySelector(UISelectors.salesAdd).style.display = 'none';
    }
   },
   getSelectors: function(){
     return UISelectors;
      }
    }
})();
//App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  //Load events Listeners
  const loadEventListeners = function(){
    //Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    //Add item Event
    //For Purchase
    document.querySelector(UISelectors.purchaseAdd).addEventListener('click',purchaseAddSubmit);
    //For Sales
    document.querySelector(UISelectors.salesAdd).addEventListener('click',salesAddSubmit);

    //Disabling the Enter key on submit
    document.addEventListener('keypress',function(e){
      if(e.keyCode === 13 || e.which === 13){
          e.preventDefault();
          return false;
      }
    });

    //Edit icon click event
    document.querySelector(UISelectors.purchaseList).addEventListener('click',itemEditPurchaseClick);
    document.querySelector(UISelectors.salesList).addEventListener('click',itemEditSalesClick);
    
    //Update item event for purchase and sales
    document.querySelector(UISelectors.purchaseUpdate).addEventListener('click', itemPurchaseUpdateSubmit);
    document.querySelector(UISelectors.salesUpdate).addEventListener('click', itemSalesUpdateSubmit);

    //Delete Button Event
    document.querySelector(UISelectors.purchaseDelete).addEventListener('click', itemPurchaseDeleteSubmit);
    document.querySelector(UISelectors.salesDelete).addEventListener('click', itemSalesDeleteSubmit);

    //Back Button Event
    //For purchase back button
    document.querySelector(UISelectors.purchaseBack).addEventListener('click', function(e){
      UICtrl.clearEditState.clearPurchaseEditState();
      e.preventDefault();
    });
    //For Sales Back Button
    document.querySelector(UISelectors.salesBack).addEventListener('click', function(e){
      UICtrl.clearEditState.clearSalesEditState();
      e.preventDefault();
    });
    //Clear Item Event 
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }
  //Purchase Add Button
  const purchaseAddSubmit = function(e){
    //Getting Values from purchase input
    const input = UICtrl.getItemsInput().getPurchaseInput;
    if(input.date !== '' && input.companyName!==''&& input.shareNumber!==''&& input.sharePrice!==''){
      const newItem = ItemCtrl.addItems.purchaseItems(input.date, input.companyName,input.shareNumber,input.sharePrice);
      //Add purchase item to UI
      UICtrl.addListItem.addPurchaseItem(newItem);
      //Get Total Purchase
      const totalpurchase = ItemCtrl.getTotalShare.totalPurchase();
     //Add Total Purchase to UI
      UICtrl.showTotal.showTotalPurchase(totalpurchase);    
      //Get total Amount of Purchase
      const totalPurchaseAmount = ItemCtrl.getTotalAmount.totalPurchaseAmount();
      //Add Total purchase amount to UI
      UICtrl.showTotalAmount.showPurchaseAmount(totalPurchaseAmount);
      //Storage in Local Storage
      StorageCtrl.storeItem.storePurchase(newItem);
      //Clear input fields
      UICtrl.clearInputs.clearPurchase();
    }
    e.preventDefault();
  }
  //Sales Add Button
  const salesAddSubmit = function(e){
    //Getting Values from sales input
    const input = UICtrl.getItemsInput().getSalesInput;
    if(input.date !== '' && input.companyName!==''&& input.shareNumber!==''&& input.sharePrice!==''){
      const newItem = ItemCtrl.addItems.salesItems(input.date, input.companyName,input.shareNumber,input.sharePrice);   
      //Add sales item to UI
      UICtrl.addListItem.addSalesItem(newItem);      
      //Get Total sales
      const totalsales = ItemCtrl.getTotalShare.totalSales();
      //Add Total sales to UI
      UICtrl.showTotal.showTotalSales(totalsales);
       //Get total Amount of Sales
       const totalSalesAmount = ItemCtrl.getTotalAmount.totalSalesAmount();  
       //Add Total Sales Amount to UI
       UICtrl.showTotalAmount.showSalesAmount(totalSalesAmount);
       //Storage in Local Storage
      StorageCtrl.storeItem.storeSales(newItem);
      //Clear input fields
       UICtrl.clearInputs.clearSales();
    }
    e.preventDefault();
  }
  //Click Purchase Edit Item
  const itemEditPurchaseClick = function(e){
   if(e.target.classList.contains('edit-item')){
      //Get the list item id(item-0, item-1)
    const purchaseListId = e.target.parentNode.parentNode.id;

    //Break into an array
    const purchaseListArr = purchaseListId.split('-');
    //Get the actual id
    const purchaseId = parseInt(purchaseListArr[1]);
    //Get item
    const purchaseItemToEdit = ItemCtrl.getItemById.getPurchaseItem(purchaseId);
    //Set current item
    ItemCtrl.setCurrentItem.setPurchaseItem(purchaseItemToEdit);
    
    //Add Purchase Item to form
    UICtrl.addItemToForm.addPurchaseItem();
   }
    e.preventDefault();
  }
  //Click Sales Edit Item
  const itemEditSalesClick = function (e){
    if(e.target.classList.contains('edit-item')){
      //Get item Id(item-0,item-1)
      const salesListId = e.target.parentNode.parentNode.id;
      //Break into an Array
      const salesListArr = salesListId.split('-');
      //Get the actual id is
      const salesId = parseInt(salesListArr[1]); 
      //Get item
     const salesItemToEdit = ItemCtrl.getItemById.getSalesItem(salesId);
     //Set Current Item
      ItemCtrl.setCurrentItem.setSalesItem(salesItemToEdit);
     //Add Sales Item to form
     UICtrl.addItemToForm.addSalesItem();
    }
    e.preventDefault();
  }
  //Update item event for purchase 
  const itemPurchaseUpdateSubmit = function(e){
    //Get Purchse Items Input
    const input = UICtrl.getItemsInput().getPurchaseInput; 
    //Update Item in Datastructure
    const UpdatedPurchaseItem = ItemCtrl.updateItem.updatePurchase(input.date, input.companyName, input.shareNumber, input.sharePrice);
    //Update Item in UI
    UICtrl.updateListItem.updatePurchaseListItem(UpdatedPurchaseItem);
    //Get Total Purchase
     const totalpurchase = ItemCtrl.getTotalShare.totalPurchase();
    //Add Total Purchase to UI
     UICtrl.showTotal.showTotalPurchase(totalpurchase);
     //Get total Amount of Purchase
     const totalPurchaseAmount = ItemCtrl.getTotalAmount.totalPurchaseAmount();
     //Add Total purchase amount to UI
     UICtrl.showTotalAmount.showPurchaseAmount(totalPurchaseAmount);
     //Update Local Storage
     StorageCtrl.updateItemStorage.updatePurchaseStorage(UpdatedPurchaseItem);
    //For clearing inputs fields
     UICtrl.clearEditState.clearPurchaseEditState();
    e.preventDefault();
  }

  //Update item event for sales 
  const itemSalesUpdateSubmit = function(e){
    const input = UICtrl.getItemsInput().getSalesInput;
     //Get Sales Items Input
    const UpdatedSalesItem = ItemCtrl.updateItem.updateSales(input.date,input.companyName, input.shareNumber, input.sharePrice);
     //Update Item in UI
     UICtrl.updateListItem.updateSalesListItem(UpdatedSalesItem);
    //Get Total sales
     const totalsales = ItemCtrl.getTotalShare.totalSales();
    //Add Total sales to UI
     UICtrl.showTotal.showTotalSales(totalsales);
     //Get total Amount of Sales
     const totalSalesAmount = ItemCtrl.getTotalAmount.totalSalesAmount();  
     //Add Total Sales Amount to UI
     UICtrl.showTotalAmount.showSalesAmount(totalSalesAmount);
     //Update in Storage
     StorageCtrl.updateItemStorage.updateSalesStorage(UpdatedSalesItem);

    //For clearing inputs fields
     UICtrl.clearEditState.clearSalesEditState();

     e.preventDefault();
     
     e.location.reload();
  }

  //Delete Purchase Button Event
  const itemPurchaseDeleteSubmit = function(e){
    //Get Current Item
    const currentItem = ItemCtrl.getCurrentItem.getPurchase();

    //Delete item from data structure
    ItemCtrl.deleteItem.deletePurchase(currentItem.id);

    //Delete From UI
    UICtrl.deleteListItem.deletePurchase(currentItem.id);
    
    //Get Total Purchase
    const totalpurchase = ItemCtrl.getTotalShare.totalPurchase();
    //Add Total Purchase to UI
     UICtrl.showTotal.showTotalPurchase(totalpurchase);
     //Get total Amount of Purchase
     const totalPurchaseAmount = ItemCtrl.getTotalAmount.totalPurchaseAmount();
     //Add Total purchase amount to UI
     UICtrl.showTotalAmount.showPurchaseAmount(totalPurchaseAmount);
     //Delete from local storage
     StorageCtrl.deleteItemFromStorage.deletePurchaseFromStorage(currentItem.id);
     //For clearing inputs fields
     UICtrl.clearEditState.clearPurchaseEditState(); 
    e.preventDefault();
  }
  //Delete Sales Button event
  const itemSalesDeleteSubmit = function(e){
    //Get Current Item
    const currentItem = ItemCtrl.getCurrentItem.getSales();

    //Delete Item from data structure
    ItemCtrl.deleteItem.deleteSales(currentItem.id);

    //DeleteItem from UI
    UICtrl.deleteListItem.deleteSales(currentItem.id);
    //Get Total sales
    const totalsales = ItemCtrl.getTotalShare.totalSales();
    //Add Total sales to UI
     UICtrl.showTotal.showTotalSales(totalsales);
    //Get total Amount of Sales
    const totalSalesAmount = ItemCtrl.getTotalAmount.totalSalesAmount();  
    //Add Total Sales Amount to UI
    UICtrl.showTotalAmount.showSalesAmount(totalSalesAmount);
    //Delete from local storage
     StorageCtrl.deleteItemFromStorage.deleteSalesFromStorage(currentItem.id);
    //For clearing inputs fields
     UICtrl.clearEditState.clearSalesEditState();

    e.preventDefault();
  }
  const clearAllItemsClick = function(){
    //Delete all Items From Data Structure
    ItemCtrl.clearAllItems();
    //Get Total Purchase
    const totalpurchase = ItemCtrl.getTotalShare.totalPurchase();
    //Add Total Purchase to UI
     UICtrl.showTotal.showTotalPurchase(totalpurchase);
    //Get Total sales
    const totalsales = ItemCtrl.getTotalShare.totalSales();
    //Add Total sales to UI
     UICtrl.showTotal.showTotalSales(totalsales);
    //Get total Amount of Purchase
     const totalPurchaseAmount = ItemCtrl.getTotalAmount.totalPurchaseAmount();
    //Add Total purchase amount to UI
     UICtrl.showTotalAmount.showPurchaseAmount(totalPurchaseAmount);
    //Get total Amount of Sales
    const totalSalesAmount = ItemCtrl.getTotalAmount.totalSalesAmount();  
    //Add Total Sales Amount to UI
    UICtrl.showTotalAmount.showSalesAmount(totalSalesAmount); 
    //Remove from UI
    UICtrl.removeItems();
    //Clear Items From Storage
    StorageCtrl.clearItemsFromStorage();

  }
  //Public Methods
return{
  init : function(){

    //Initial State or set edit state
    UICtrl.clearEditState.clearPurchaseEditState();
    UICtrl.clearEditState.clearSalesEditState();

    //Fetch items from data structure
      const items = ItemCtrl.getItems();
   
    //Populate purchase list and sales list
    UICtrl.populatePurchaseList(items.purchaseitems);
    
    UICtrl.populateSalesList(items.salesitems);

    //Get Total Purchase and Sales Share Number
     const totalpurchase = ItemCtrl.getTotalShare.totalPurchase();
     const totalsales = ItemCtrl.getTotalShare.totalSales();
     
   
    //Add purchase and sales to the UI
     UICtrl.showTotal.showTotalPurchase(totalpurchase);

     UICtrl.showTotal.showTotalSales(totalsales);
     
     //Get total Amount of Purchase and Sales
     const totalPurchaseAmount = ItemCtrl.getTotalAmount.totalPurchaseAmount();
     const totalSalesAmount = ItemCtrl.getTotalAmount.totalSalesAmount(); 
    //Add Total purchase amount to UI
     UICtrl.showTotalAmount.showPurchaseAmount(totalPurchaseAmount);
    UICtrl.showTotalAmount.showSalesAmount(totalSalesAmount);

    //Load Event Listeners
    loadEventListeners();
  }
}  
})(ItemCtrl, StorageCtrl, UICtrl);

//Initialze App
App.init();