({
    saveTransaction: function(component, transaction) {
        console.log('transaction in helper: ', JSON.parse(JSON.stringify(transaction)));
        const action = component.get('c.saveTransaction');
        action.setParams({
            transactionItem: transaction
        });

        $A.enqueueAction(action);

        const operation = component.get('v.operation');

        if (operation === 'Create') {
            component.set('v.transaction', {
                sobjectType: 'Transaction__c',
                Date__c: '',
                Category__c: 'Food',
                Comment__c: '',
                Value__c: Math.ceil(Math.random() * -10)
            });
        }
    }
});
