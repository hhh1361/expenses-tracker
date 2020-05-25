trigger TransactionTriggers on Transaction__c(after insert, after update, after delete) {
    Decimal grandTotal = 0;
    for (Transaction__c transactionItem : [SELECT Id, Value__c FROM Transaction__c]) {
        grandTotal += transactionItem.Value__c;
    }

    Id currentUserId = UserInfo.getUserId();
    for (User user : [SELECT Id, Name, TotalExpenses__c FROM User]) {
        if (user.Id == currentUserId) {
            user.TotalExpenses__c = grandTotal;
            Database.upsert(user);
        }
    }
}
