({
    handleShowMoreButton: function (component, event, helper) {
        var product = component.get("v.ShopProduct");
        var modalBody;
        $A.createComponent("c:showMore",{"product" : product},
            function (content, status) {
                if (status === "SUCCESS") {
                    modalBody = content;
                    component.find('showDetails').showCustomModal({
                        header: product.Name + " info",
                        body: modalBody,
                        showCloseButton: true,
                        closeCallback: function() {
                            console.log('You closed the alert!');
                        }
                    });
                }
                
            });

    },
    updateCart: function (component, event, helper) {
        var userQuantity = component.find("userQuantity").get("v.value");
        var newProductForCart = component.get("v.ShopProduct");
        var newEvent = component.getEvent("cartUpdate");
        newEvent.setParams({
            "itemForCart": newProductForCart,
            "countOfItems": userQuantity
        });
        newEvent.fire();


    }
});