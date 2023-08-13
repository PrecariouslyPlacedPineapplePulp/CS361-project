(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['resultPanel'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"result-entry-container\">\r\n            <p>"
    + alias1(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data,"loc":{"start":{"line":8,"column":15},"end":{"line":8,"column":23}}}) : helper)))
    + "</p>\r\n            <p>"
    + alias1(container.lambda(depth0, depth0))
    + "</p>\r\n        </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"child-panel results-panel\" id=\"results-box-container\" file="
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"fname") || (depth0 != null ? lookupProperty(depth0,"fname") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"fname","hash":{},"data":data,"loc":{"start":{"line":1,"column":71},"end":{"line":1,"column":80}}}) : helper)))
    + ">\r\n    <div id=\"chart-div\"></div>\r\n    <div id=\"graph\"></div>\r\n    <div class=\"result-stats-container\">\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"stat") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":11,"column":17}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n</div>";
},"useData":true});
})();