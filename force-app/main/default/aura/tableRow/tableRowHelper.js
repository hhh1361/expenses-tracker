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
        $A.enqueueAction(action);

        component.getEvent('updateTransactionList').fire();
    },

    doDelete: function(component, transaction) {
        const action = component.get('c.deleteTransaction');
        action.setParams({
            transactionItem: transaction
        });
        $A.enqueueAction(action);

        component.getEvent('updateTransactionList').fire();
    }
});
