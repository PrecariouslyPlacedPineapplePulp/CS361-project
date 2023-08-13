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
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"child-panel\" id=\"results-box-container\">\r\n    <div id="
    + alias4(((helper = (helper = lookupProperty(helpers,"chart_id") || (depth0 != null ? lookupProperty(depth0,"chart_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"chart_id","hash":{},"data":data,"loc":{"start":{"line":2,"column":12},"end":{"line":2,"column":24}}}) : helper)))
    + "></div>\r\n    <div id="
    + alias4(((helper = (helper = lookupProperty(helpers,"graph_id") || (depth0 != null ? lookupProperty(depth0,"graph_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"graph_id","hash":{},"data":data,"loc":{"start":{"line":3,"column":12},"end":{"line":3,"column":24}}}) : helper)))
    + "></div>\r\n    <div class=\"result-stats-container\">\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"stat") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":11,"column":17}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n</div> <!-- results box -->";
},"useData":true});
})();