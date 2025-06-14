
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

public static class WebApiConfig
{
    public static void Register(HttpConfiguration config)
    {
        config.EnableCors(new EnableCorsAttribute("http://localhost:4200", "*", "*"));

        config.Formatters.JsonFormatter.SupportedMediaTypes
              .Add(new MediaTypeHeaderValue("text/html"));

        config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

        config.MapHttpAttributeRoutes();

        config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional }
        );
    }
}
