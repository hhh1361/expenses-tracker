@isTest
public with sharing class TransactionControllerTestSuite {
    private static void setupData() {
        Transaction__c transactionItem = new Transaction__c(
            Date__c = Date.today(),
            Category__c = 'Food',
            Value__c = -20
        );
        insert transactionItem;
    }

    @isTest
    public static void saveTransaction() {
        setupData();
        System.assertEquals(
            1,
            TransactionController.getTransactionList().size(),
            'after setupData the value must be equal to one'
        );

        Transaction__c transactionItem = new Transaction__c(
            Date__c = Date.today(),
            Category__c = 'Food',
            Value__c = -20
        );
        TransactionController.saveTransaction(transactionItem);
        System.assertEquals(2, TransactionController.getTransactionList().size(), 'one record should be created');
    }

    @isTest
    public static void deleteTransaction() {
        setupData();
        List<Transaction__c> transactionList = TransactionController.getTransactionList();
        System.assertEquals(1, transactionList.size(), 'after setupData the value must be equal to one');

        TransactionController.deleteTransaction(transactionList.get(0));
        System.assertEquals(0, TransactionController.getTransactionList().size(), 'the only record should be deleted');
    }

    @isTest
    public static void cloneTransaction() {
        setupData();
        List<Transaction__c> transactionList = TransactionController.getTransactionList();
        System.assertEquals(1, transactionList.size(), 'after setupData the value must be equal to one');

        TransactionController.cloneTransaction(transactionList.get(0));
        System.assertEquals(2, TransactionController.getTransactionList().size(), 'one record should be cloned');
    }

    @isTest
    public static void getPicklistValues() {
        List<String> values = new List<String>{
            'Income',
            'Food',
            'Payments',
            'Rent',
            'Purchases',
            'Car expenses',
            'Recreation',
            'Health'
        };
        System.assertEquals(values, TransactionController.getPicklistValues(), 'Picklist values should be as follows');
    }
}
