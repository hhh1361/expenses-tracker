public with sharing class TransactionController {
    @AuraEnabled
    public static List<Transaction__c> getTransactionList() {
        Id currentUserId = UserInfo.getUserId();
        return [
            SELECT Id, Name, Category__c, Comment__c, Date__c, Value__c
            FROM Transaction__c
            WHERE CreatedById = :currentUserId
        ];
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
        upsert transactionItem;
        return transactionItem;
    }

    @AuraEnabled
    public static Transaction__c deleteTransaction(Transaction__c transactionItem) {
        delete transactionItem;
        return transactionItem;
    }

    @AuraEnabled
    public static Transaction__c cloneTransaction(Transaction__c transactionItem) {
        Transaction__c transactionCopy = transactionItem.clone(false, false, false, false);
        upsert transactionCopy;
        return transactionCopy;
    }
}
