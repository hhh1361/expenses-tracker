({
    doInit: function(component, event, helper) {
        helper.getRecords(component, event, helper);
    },

    handleUpdateTransactionList: function(component, event, helper) {
        component.set('v.isLoading', true);
        helper.getRecords(component, event, helper);
    }
});
