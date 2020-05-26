({
    doInit: function(component, event, helper) {
        component.set('v.headers', ['Date', 'Category', 'Comment', 'Value', 'Operation']);
        component.set('v.sortOptions', {
            field: 'Date',
            reverse: false
        });
        helper.getRecords(component, event, helper);
    },

    handleUpdateTransactionList: function(component, event, helper) {
        component.set('v.isLoading', true);
        helper.getRecords(component, event, helper);
    },

    handleHeaderClick: function(component, event, helper) {
        //get current data
        const currentField = event.getSource().get('v.label');
        const options = component.get('v.sortOptions');
        const currentArray = component.get('v.transactions');
        const { field, reverse } = options;

        // create new options
        if (currentField === field) {
            options.reverse = !reverse;
        } else {
            options.field = currentField;
            options.reverse = false;
        }

        //sort array with new options
        const array = helper.sort(currentArray, options);

        component.set('v.transactions', array);
        component.set('v.backup', array);
        component.set('v.sortOptions', result);
    },
    handleSearch: function(component, event) {
        const backup = component.get('v.backup');
        const searchValue = component.find('search').get('v.value');

        // filter array
        const result = backup.filter(i => i.Date__c.includes(searchValue));

        if (searchValue.length) {
            component.set('v.transactions', result);
        } else {
            // restore full array
            component.set('v.transactions', backup);
        }
    }
});
