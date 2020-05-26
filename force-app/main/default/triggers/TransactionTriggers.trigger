trigger TransactionTriggers on Transaction__c(after insert, after update, after delete) {
    Decimal grandTotal = 0;
    Id currentUserId = UserInfo.getUserId();

    for (Transaction__c transactionItem : [
        SELECT Id, Value__c, CreatedById
        FROM Transaction__c
        WHERE CreatedById = :currentUserId
    ]) {
        grandTotal += transactionItem.Value__c;
    }

    for (User user : [SELECT Id, Name, Balance__c FROM User]) {
        if (user.Id == currentUserId) {
            user.Balance__c = grandTotal;
            Database.upsert(user);
        }
    }
}
