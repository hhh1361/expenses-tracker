({
    doInit: function(component, event, helper) {
        const action = component.get('c.getPicklistValues');
        const selected = component.get('v.transaction.Category__c');
        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
                const result = response
                    .getReturnValue()
                    .map(i => (i === selected ? { label: i, selected: true } : { label: i, selected: false }));
                component.set('v.options', result);
            } else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },
    handleSubmit: function(component, event, helper) {
        const transaction = component.get('v.transaction');
        console.log('transaction in controller: ', JSON.parse(JSON.stringify(transaction)));
        helper.saveTransaction(component, transaction);

        const createEvent = component.getEvent('updateTransactionList');
        createEvent.fire();
    }
});
