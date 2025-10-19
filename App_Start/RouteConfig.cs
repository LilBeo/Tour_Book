using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Tour_Book
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Tour", action = "Home", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Author",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Auth", action = "Login", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Information",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Infomation", action = "Detail", id = UrlParameter.Optional }
            );
        }
    }
}
