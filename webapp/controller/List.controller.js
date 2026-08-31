sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("my.products.controller.List", {

      onSearch: function (oEvent) {
        var sQuery = oEvent.getParameter("query");
        var aFilters = [];

        if (sQuery) {
          aFilters.push(new Filter({
            filters: [
              new Filter("ProductName", FilterOperator.Contains, sQuery),
              // "Category" is a navigation property, not a plain field — must filter on the
              // actual string field through it, or OData rejects the request.
              new Filter("Category/CategoryName", FilterOperator.Contains, sQuery)
            ],
            and: false
          }));
        }

        this.byId(("productList")).getBinding("items").filter(aFilters);
      },

      onItemPress: function (oEvent) {
        var sId = oEvent.getSource().getBindingContext().getProperty("ProductID");
        this.getOwnerComponent().getRouter().navTo("detail", { id: sId });
      },
    });
  },
);
