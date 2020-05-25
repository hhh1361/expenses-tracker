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
        if (transaction.Date__c && transaction.Category__c && transaction.Value__c) {
            helper.saveTransaction(component, transaction);
        } else {
            component.set('v.isWarning', true);
            component.set('v.isModal', true);
        }
    },

    closeModal: function(component, event, helper) {
        component.set('v.isModal', false);
        component.set('v.isWarning', false);
    }
});
