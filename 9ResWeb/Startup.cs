using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(_9ResWeb.Startup))]
namespace _9ResWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
