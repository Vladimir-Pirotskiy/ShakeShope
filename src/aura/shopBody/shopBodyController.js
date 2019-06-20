({
    doInit: function (component, event, helper) {
        var recordList = component.get("c.getAllProducts");
        recordList.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.ProductList", response.getReturnValue());
            } else {

            }
        });
        $A.enqueueAction(recordList);
    },
    setProductForItem: function (component, event, helper) {
        var updateAttribute = event.getParam("itemForCart");
        var itemCount = event.getParam("countOfItems");
        component.set("v.quantityOfItems", itemCount);
        component.set("v.productForItem", updateAttribute);


    },
    changeCartAttribute: function (component, event, helper) {
        var productForItem = component.get("v.productForItem");
        var countOfItems = component.get("v.quantityOfItems");
        var cartComponent = component.find("cartComponent");
        cartComponent.addToCartMethod(productForItem, countOfItems);
    },
    setCategory: function (component, event, helper) {
        var type = event.getParam("CategoryName");
        var action = component.get("c.selectCategory");
        action.setParams({
            "category": type
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var List = component.get("v.ProductList");
                List = response.getReturnValue();
                component.set("v.ProductList", List);
                if (response.getReturnValue() === 0) {
                    var showToast = $A.get("e.force:showToast");
                    showToast.setParams({
                        'title': 'Category is empty',
                        'message': 'There are no products with this category.'
                    });
                    showToast.fire();
                }
            }
        });
        $A.enqueueAction(action);

    },
    sortPrice: function (component, event, helper) {
        var price = event.getParam("sortPrice");
        var sortByPriceMethod = component.get("c.sortByPrice");
        sortByPriceMethod.setParams({"price": price});
        sortByPriceMethod.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var productList = component.get("v.ProductList");
                productList = response.getReturnValue();
                component.set("v.ProductList", productList);
                if (response.getReturnValue() === 0) {
                    var showToast = $A.get("e.force:showToast");
                    showToast.setParams({
                        'title': 'Category is emdspty',
                        'message': 'There are no products with this category.'
                    });
                    showToast.fire();
                }
            }

        });
        $A.enqueueAction(sortByPriceMethod);
    }

});