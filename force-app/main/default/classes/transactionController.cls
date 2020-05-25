public with sharing class transactionController {
    @AuraEnabled
    public static List<Transaction__c> getTransactionList() {
        return [SELECT Id, Name, Category__c, Comment__c, Date__c, Value__c FROM Transaction__c];
    }

    @AuraEnabled
    public static List<String> getPicklistValues() {
        List<String> pickListValuesList = new List<String>();
        Schema.DescribeFieldResult fieldResult = Transaction__c.Category__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry pickListVal : ple) {
            pickListValuesList.add(pickListVal.getLabel());
        }
        return pickListValuesList;
    }

    @AuraEnabled
    // "transaction" parameter-name is reserved
    public static Transaction__c saveTransaction(Transaction__c transactionItem) {
        System.debug(transactionItem);
        upsert transactionItem;
        return transactionItem;
    }
}
