({
    doInit: function(component, event, helper) {
        const action = component.get("c.getTransactions");
        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.transactions", response.getReturnValue());
                console.log(response.getReturnValue())
            } else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    handleSectionToggle: function (cmp, event) {

    },
})
