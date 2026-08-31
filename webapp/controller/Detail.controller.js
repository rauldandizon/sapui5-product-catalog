sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  function (Controller) {
    "use strict";

    return Controller.extend("my.products.controller.Detail", {
      onInit: function () {
        this.getOwnerComponent()
          .getRouter()
          .getRoute("detail")
          .attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
        var sId = oEvent.getParameter("arguments").id;

        // var aProducts =
        //   this.getOwnerComponent().getModel().getProperty("/Products");
        // var iIndex = aProducts.findIndex(function (p) {
        //   return p.ProductId === sId; 
        // });

        // OData single-entity URL: EntitySet(Key) — "/Products/2" would be invalid.
        this.getView().bindElement("/Products(" + sId + ")");
      },

      onNavBack: function () {
        this.getOwnerComponent().getRouter().navTo("list");
      },

      onOpenDialog: function () {
        // Cache the promise, not just the dialog — loadFragment() again on every
        // click would create a duplicate control with the same static id and throw.
        if(!this._pDialog) {
          this._pDialog = this.loadFragment({
            name: "my.products.view.ProductDialog"
          });
        }
        this._pDialog.then(function (oDialog) {
          oDialog.open();
        })
      },

      onCloseDialog: function () {
        this.byId("productDialog").close();
      }
    });
  },
);
