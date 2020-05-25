({
    handlePrepareTransactionForUpdate: function(component, event, helper) {
        console.log(JSON.parse(JSON.stringify(component.get('v.activeSection'))));
        const transaction = event.getParam('transaction');
        component.set('v.activeSection', 'change');
        component.set('v.transaction', transaction);
        console.log(JSON.parse(JSON.stringify(component.get('v.activeSection'))));
    }
});
