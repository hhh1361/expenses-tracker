({
    getRecords: function(component, event, helper) {
        const time = Date.now();
        console.log(`Loading records start.`);
        const action = component.get('c.getTransactionList');
        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
                const options = component.get('v.sortOptions');
                const sortedArray = helper.sort(response.getReturnValue(), options);
                component.set('v.transactions', sortedArray);
                component.set('v.backup', sortedArray);
                component.set('v.balance', `Current balance: ${sortedArray.reduce((acc, i) => acc + i.Value__c, 0)}`);
                component.set('v.isLoading', false);
                console.log(`Loading completed in  ${(Date.now() - time) / 1000} seconds.`);
            } else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },

    sort: function(array, options) {
        const { field, reverse } = options;
        const label = field + '__c';

        return array.sort((a, b) => {
            if (a[label] === undefined && b[label] === undefined) {
                return 0;
            }

            if (a[label] !== undefined && b[label] === undefined) {
                return -1;
            }

            if (a[label] === undefined && b[label] !== undefined) {
                return 1;
            }

            if (a[label] !== undefined && b[label] !== undefined) {
                if (a[label] < b[label]) {
                    return reverse ? -1 : 1;
                } else if (a[label] > b[label]) {
                    return reverse ? 1 : -1;
                } else {
                    return 0;
                }
            }
            return 0;
        });
    }
});
