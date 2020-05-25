({
    handleSectionToggle: function(cmp, event) {},
    handlePrepareTransactionForUpdate: function(component, event, helper) {
        const transaction = event.getParam('transaction');
        component.set('v.transaction', transaction);
        component.set('v.activeSections', ['B', 'C']);
    }
});
