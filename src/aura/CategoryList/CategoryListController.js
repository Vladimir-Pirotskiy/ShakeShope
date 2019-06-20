({
    doInit: function (component, event, helper) {
        var categoryArr = component.get("c.getAllCategorias");
        categoryArr.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.typeList", response.getReturnValue());
            } else {

            }
        });
        $A.enqueueAction(categoryArr);
    },
    selectCategory: function (component, event, helper) {
        var newEvent = component.getEvent("category");
        var category = event.getSource().get("v.label");

        newEvent.setParams({
            "CategoryName": category
        });
        newEvent.fire();
    },
    searchForPrice: function(component, event, helper){
        var newEvent = component.getEvent("sortByPrice");
        var price = component.find("priceSort").get("v.value");
        newEvent.setParam("sortPrice", price);
        newEvent.fire();
    }


});