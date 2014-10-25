using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using System.Configuration;
using System.Web.Configuration;
using Owin.Security.Providers;
using Owin.Security.Providers.GooglePlus;

namespace _9ResWeb
{
    public partial class Startup
    {
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Get Environment from Web.Config
            string _environment = WebConfigurationManager.AppSettings["Environment"];


            // Enable the application to use a cookie to store information for the signed in user
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login"),
            });
            // Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            if (_environment == "Production")
            {
                app.UseGooglePlusAuthentication(
                    clientId: "228666439060-r3o1v00h533j1q21ir06sprthjj9k3oi.apps.googleusercontent.com",
                    clientSecret: "Q-tB6728jThVPE7duf_HAKC9");
                
                app.UseFacebookAuthentication(
                   appId: "286786211517047",
                   appSecret: "e4e39ab82e072c787bb221b67e6ddebd");

            }
            else
            {
                app.UseGooglePlusAuthentication(
                    clientId: "771894512430-87bjckbtnd5k14gj08ira8im6j60fdcn.apps.googleusercontent.com",
                    clientSecret: "1GsMYrISqDThdy0qyhoeK1oA");
                
                app.UseFacebookAuthentication(
                   appId: "1484397018497780",
                   appSecret: "aafdbf1aa9e8236966bfce1a95b93a86");

            }


            app.UseTwitterAuthentication(
               consumerKey: "Mtohd501N7RG5sWYiB6VAHyl7",
               consumerSecret: "dnHpKe5gdXn4yEU3OIUeQj4qmULwimSiuUdPi1cZWWWJGIi97a");



        }
    }
}