sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent) {
    "use strict";

    return UIComponent.extend("my.products.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            // Must run first — this is what actually reads manifest.json (models, routing, rootView).
            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();
        }
    });
});