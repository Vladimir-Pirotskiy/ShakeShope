public with sharing class ServerConnection {
    @AuraEnabled
    public static List<Shop_Product__c> getAllProducts() {
        List<Shop_Product__c> items = [
                SELECT Id,
                        Name,
                        Price__c,
                        quantity__c,
                        Description__c,
                        Categoria__r.Category_Name__c,
                        Image_Product__c,
                        Tech_Specs__c
                FROM Shop_Product__c
        ];
        return items;
    }
    @AuraEnabled
    public static List<Categoria__c> getAllCategorias() {
        List<Categoria__c> categoryList = [SELECT Id, Category_Name__c FROM Categoria__c];
        return categoryList;
    }
    @AuraEnabled
    public static List<Shop_Product__c> selectCategory(String category) {
        List<Shop_Product__c> oneCategory = [
                SELECT Id,
                        Name,
                        Price__c,
                        quantity__c,
                        Description__c,
                        Categoria__r.Category_Name__c,
                        Image_Product__c,
                        Tech_Specs__c
                FROM Shop_Product__c
                WHERE Categoria__r.Category_Name__c = :category
        ];
        return oneCategory;
    }
    @AuraEnabled
    public static List<Shop_Product__c> sortByPrice(Integer price){
        List<Shop_Product__c> listByPrice = [SELECT Id,
                Name,
                Price__c,
                quantity__c,
                Description__c,
                Categoria__r.Category_Name__c,
                Image_Product__c,
                Tech_Specs__c
        FROM Shop_Product__c
        WHERE Price__c < :price
                ];
        return listByPrice;

    }
    @AuraEnabled
    public static void saveInvoice(String jsonString, Decimal price) {
        List<Shop_Product__c> productList = (List<Shop_Product__c>) System.JSON.deserialize(jsonString, List<Shop_Product__c>.class);
        List<Product_In_Invoice__c> listForInsert = new List<Product_In_Invoice__c>();
        Invo__c newInvo = new Invo__c(Price__c = price, Status__c = 'Active', Quantity__c = productList.size());
        insert newInvo;
        for (Shop_Product__c product : productList) {
            Product_In_Invoice__c productInInvoice = new Product_In_Invoice__c(
                    Invoice__c = newInvo.Id,
                    Name = product.Name,
                    Price__c = product.Price__c,
                    Category__c = product.Categoria__c,
                    Description__c = product.Description__c,
                    Tech_Specs__c = product.Tech_Specs__c);
            listForInsert.add(productInInvoice);

        }
        insert listForInsert;


    }

}