({
    doInit: function(component, event, helper) {
        const getTransactionList = component.get('c.getTransactionList');
        getTransactionList.setCallback(this, function(response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.transactions', response.getReturnValue());
                component.set('v.isLoading', false);
            } else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(getTransactionList);
    },

    handleSectionToggle: function(cmp, event) {},

    handleUpdateTransactionList: function(component, event, helper) {
        component.set('v.loading', true);
        const action = component.get('c.getTransactionList');
        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.transactions', response.getReturnValue());
                component.set('v.loading', false);
            } else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
    }
});
