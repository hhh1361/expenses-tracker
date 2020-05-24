({
  onHandleSelect: function(component, event, helper) {
    const transaction = component.get("v.transaction");
    switch (event.getParam("value")) {
      case "Change":
        // helper.doEdit(component, transaction);
        break;
      case "Copy":
        // helper.doCopy(component, transaction);
        break;
      case "Delete":
        // helper.doDelete(component, transaction);
        break;
    }
  }
});
