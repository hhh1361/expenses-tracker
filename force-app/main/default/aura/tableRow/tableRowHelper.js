({
    doEdit: function(component, transaction) {
        const createEvent = component.getEvent('prepareTransactionForUpdate');
        createEvent.setParams({
            transaction: transaction
        });
        createEvent.fire();
    },

    doCopy: function(component, transaction) {
        const action = component.get('c.cloneTransaction');
        action.setParams({
            transactionItem: transaction
        });
        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
                //send the request to update record table
                $A.get('e.c:updateTransactionList').fire();
            } else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },

    doDelete: function(component, transaction) {
        const action = component.get('c.deleteTransaction');
        action.setParams({
            transactionItem: transaction
        });
        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
                //send the request to update record table
                $A.get('e.c:updateTransactionList').fire();
            } else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
    }
});
