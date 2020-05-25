({
    saveTransaction: function(component, transaction) {
        const action = component.get('c.saveTransaction');
        action.setParams({
            transactionItem: transaction
        });

        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
                //send the request to update record table
                $A.get('e.c:updateTransactionList').fire();
                component.set('v.isModal', true);

                //clean input form
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

                //remove modal
                setTimeout(() => {
                    component.set('v.isModal', false);
                }, 1500);
            } else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
    }
});
