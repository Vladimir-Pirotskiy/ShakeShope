({
    addToCart: function (component, event, helper) {
        var params = event.getParam("arguments");
        var allItems = component.get("v.Items");
        var total = 0.00;
        if (allItems.length === 0) {
            allItems.push(params.ForCart);
            component.set("v.Items", allItems);
            component.set("v.totalPrice", (params.ForCart.Price__c * params.count));
            component.set("v.quantity", params.count);
        }
        var listNotContainProduct = true;
        for (var item of allItems) {
            if (params.ForCart.Name === item.Name) {
                listNotContainProduct = false;
                break;
            }
        }
        if (listNotContainProduct) {
            for (var product of allItems) {
                total += product.Price__c;
            }
            allItems.push(params.ForCart);
            var toPay = component.get("v.totalPrice");
            total = toPay + (params.ForCart.Price__c * params.count);
            component.set("v.Items", allItems);
            component.set("v.totalPrice", total);
        }

    },
    deleteFromCart: function (component, event, helper) {
        var itemForDelete = event.getParam("itemForDelete");
        var cartList = component.get("v.Items");
        for(var item of cartList){
            if(item.Name === itemForDelete.Name){
                var index = cartList.indexOf(item);
                cartList.splice(index, 1);
                var totalPrice = component.get("v.totalPrice") - itemForDelete.Price__c;
            }
        }
        component.set("v.Items", cartList);
        component.set("v.totalPrice", totalPrice);

    },
    clearCart: function (component, event, helper) {
        var itemsInCart = component.get("v.Items");
        itemsInCart.length = 0;
        component.set("v.Items", itemsInCart);
        component.set("v.totalPrice", 0);

    },

    makeOrder: function (component, event, helper) {
        alert("your order is successful");

    },
    saveNewInvoice: function (component, event, helper) {
        if (component.get("v.Items").length > 0) {
            var saveMethod = component.get("c.saveInvoice");
            saveMethod.setParams({
                "jsonString": JSON.stringify(component.get("v.Items")),
                "price": component.get("v.totalPrice")
            });
            saveMethod.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var showToast = $A.get("e.force:showToast");
                    showToast.setParams({
                        'type': 'success',
                        'title': 'Thank you!',
                        'message': 'Your order has been added.'
                    });
                    showToast.fire();
                }
            });
        } else {
            var showToast = $A.get("e.force:showToast");
            showToast.setParams({
                'type': 'warning',
                'message': 'Cart is empty!'
            });
            showToast.fire();

        }
        $A.enqueueAction(saveMethod);


        // var newEvent = component.getEvent("pushInvoice");
        // newEvent.setParam("listForInvoice", component.get("v.Items"));
        // newEvent.fire();


        var deleteItems = component.get("v.Items");
        deleteItems.length = 0;
        component.set("v.Items", deleteItems);
        component.set("v.totalPrice", 0);


    }
});