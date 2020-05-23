public with sharing class transactionController {

    @AuraEnabled
    public static List<Transaction__c> getTransactions() {
        return [SELECT Id, Name, Category__c, Comment__c, Date__c, Value__c FROM Transaction__c];
    }
 
}
