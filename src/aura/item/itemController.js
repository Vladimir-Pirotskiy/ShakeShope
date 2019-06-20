({
    changePriceForItem: function (component, event, helper) {
        var quantity = component.get("v.quantityOfItem");
        var item = component.get("v.product");
        var priceForOneItem = item.Price__c * quantity;
        alert(priceForOneItem);
    },
    changeQuantity: function (component, event, helper) {

    },
    deleteCurrentItem: function (component, event, helper) {
        var deleteFromCartEvent = component.getEvent("productForDelete");
        deleteFromCartEvent.setParams({"itemForDelete": component.get("v.product")});
        deleteFromCartEvent.fire();
    }
});