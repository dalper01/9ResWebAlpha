﻿using System.Web;
using System.Web.Optimization;

namespace _9ResWeb
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/angularjs").Include(
                        "~/Scripts/angular.js",
                        "~/Scripts/angular-route.js",
                        "~/Scripts/angular-animate.js"));

            bundles.Add(new ScriptBundle("~/bundles/authentication").Include(
                        "~/Scripts/angular-google-plus.js",
                        "~/Scripts/angular-facebook.js",
                        "~/Javascript/NGApps/AuthenticationApp.js",
                        "~/Javascript/NGControllers/AuthenticationController.js",
                        "~/Javascript/NGDirectives/Authentication/loginDirective.js"
                        ));


            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      //"~/Scripts/bootstrap.js",
                      "~/Scripts/JSPlugins/ui-bootstrap-tpls-0.12.1.min.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Scripts/JSPlugins/angular-strap.js",
                      "~/Content/bootstrap.css",
                      "~/Content/LoginPopUp.css",
                      "~/Content/bootstrap-social.css",
                      "~/Content/font-awesome.css",
                      "~/Content/site.css"));
        }
    }
}
