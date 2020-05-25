({
    getRecords: function(component, event, helper) {
        const time = Date.now();
        console.log(`Loading records start.`);
        const action = component.get('c.getTransactionList');
        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
                const sortedArray = helper.sort(response.getReturnValue());
                component.set('v.transactions', sortedArray);
                component.set('v.isLoading', false);
                console.log(`Loading completed in  ${(Date.now() - time) / 1000} seconds.`);
            } else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },

    sort: function(array) {
        return array.sort((a, b) => {
            if (a.Date__c > b.Date__c) {
                return 1;
            } else if (a.Date__c < b.Date__c) {
                return -1;
            } else {
                return 0;
            }
        });
    }
});
