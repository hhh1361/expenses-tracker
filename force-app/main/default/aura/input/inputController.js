({
    doInit: function(component, event, helper) {
        // get category-field picklist values
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
        // save/change transaction + update records table
        const transaction = component.get('v.transaction');
        helper.saveTransaction(component, transaction);

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
