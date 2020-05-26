({
    handlePrepareTransactionForUpdate: function(component, event, helper) {
        const transaction = event.getParam('transaction');
        component.set('v.activeSection', 'change');
        component.set('v.transaction', transaction);
    }
});
