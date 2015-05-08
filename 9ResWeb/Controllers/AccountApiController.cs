using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.Results;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Host.SystemWeb;
using _9ResWeb.Models;
using System.Web.Http.Description;

namespace _9ResWeb.Controllers
{
    public class AccountApiController : ApiController
    {

        public UserManager<ApplicationUser> UserManager { get; private set; }
        ApplicationDbContext AuthContext = new ApplicationDbContext();

        public AccountApiController()
        {
            UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            UserManager.UserValidator = new UserValidator<ApplicationUser>(UserManager) { AllowOnlyAlphanumericUserNames = false };
        }

        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(RegisterViewModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser() { 
                UserName = model.UserName,
                UserInfo = new UserInfo()
                {
                    DisplayName = "",
                    FirstName = "",
                    LastName = ""
                }
            };
            var result = await UserManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            await SignInAsync(user, isPersistent: model.RememberMe);


            return Ok();
        }

        [AllowAnonymous]
        [Route("Login")]
        public async Task<IHttpActionResult> Login(LoginViewModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await UserManager.FindAsync(model.UserName, model.Password);

            //UserManager.Update<ApplicationUser>(user);

            if (user == null)
            {
                return BadRequest("Bad Username / Password");
            }

            await SignInAsync(user, model.RememberMe);

            var userInfo = AuthContext.UserInfo.FirstOrDefault(u => u.Id == user.UserInfo_Id);

            return Ok(new ExternalLoginViewResult()
            {
                UserInfo = new UserInformation()
                {
                    UserId = user.Id,
                    Email = userInfo.Email,
                    FirstName = userInfo.FirstName,
                    LastName = userInfo.LastName,
                    DisplayName = userInfo.DisplayName,
                    Picture = userInfo.ProfilePicture,
                }
            });

        }


        [AllowAnonymous]
        [Route("Logout")]
        public IHttpActionResult Logout()
        {

            AuthenticationManager.SignOut();

            return Ok();

        }


        [AllowAnonymous]
        [Route("GetUserInfo")]
        [ResponseType(typeof(ExternalLoginViewResult))]
        public async Task<IHttpActionResult> GetUserInfo()
        {
            ApplicationUser user;
            // ExternalLoginViewResult response = new ExternalLoginViewResult();

            if (User.Identity.IsAuthenticated)
            {
                var UserId = User.Identity.GetUserId();

                try
                {
                    user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                }
                catch (Exception e)
                {
                    return BadRequest(e.Message);
                }

                var userInfo = AuthContext.UserInfo.FirstOrDefault(u => u.Id == user.UserInfo_Id);

                return Ok(new ExternalLoginViewResult()
                    {
                        UserInfo = new UserInformation()
                        {
                            UserId = user.Id,
                            Email = userInfo.Email,
                            FirstName = userInfo.FirstName,
                            LastName = userInfo.LastName,
                            DisplayName = userInfo.DisplayName,
                            Picture = userInfo.ProfilePicture,
                        }
                    });

            }

            //AuthContext.Entry<UserInfo>().

            return null;
        }


        [AllowAnonymous]
        [Route("ExternalLogin")]
        [ResponseType(typeof(ExternalLoginViewResult))]
        public async Task<IHttpActionResult> ExternalLogin(ExternalLoginViewModel model)
        {

            ApplicationUser user;
            IdentityResult identityResult;
            ExternalLoginViewResult result = new ExternalLoginViewResult()
            {
                Issuer = model.Issuer,
                Id = model.Id,
                AccessToken = model.AccessToken,
                Success = true,
                NewAccount = false,
                UserInfo = new UserInformation()
                {
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    DisplayName = model.FullName,
                    Gender = model.Gender,
                    Link = model.Link,
                    Picture = model.Picture,

                }

            };


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Look for record of Login Provider
            var login = new UserLoginInfo(model.Issuer, model.Id);
            user = await UserManager.FindAsync(login);



            // If user not loggedin (IsAuthenticated true)
            if (!User.Identity.IsAuthenticated)
            {

                // Sign in the user with this external login provider if the user already has a login
                if (user != null)
                {
                    await SignInAsync(user, isPersistent: false);
                    return Ok(result);
                }

                // checked that Email exists
                //var userInfo = AuthContext.UserInfo.FirstOrDefault(u => u.Email == model.Email);
                var userByEmail = AuthContext.Users.FirstOrDefault(u => u.UserName == model.Email);

                if (userByEmail != null)
                {
                    user = await UserManager.FindByIdAsync(userByEmail.Id);
                    await SignInAsync(user, isPersistent: false);
                    //userInfo.
                    //UserManager.
                }

                else 
                {
                    // User NOT logged in and Login Provider NOT recorded so assume new account
                    // And create new Application User
                    result.NewAccount = true;
                    user = new ApplicationUser()
                    {
                        UserName = model.Email,
                        UserInfo = new UserInfo()
                        {
                            Email = model.Email,
                            FirstName = model.FirstName,
                            LastName = model.LastName,
                            DisplayName = model.FullName,
                            ProfilePicture = model.Picture
                        }
                    };

                    identityResult = await UserManager.CreateAsync(user, "NewPassword");

                    // If Error creating user Return Error
                    if (!identityResult.Succeeded)
                    {
                        return InternalServerError();
                    }

                    // Login new Application User
                    await SignInAsync(user, isPersistent: false);
                }
            }
            // Else user Authenticated, Get handle to logged in User
            else
            {
                user = UserManager.FindById(User.Identity.GetUserId());
            }


            identityResult = await UserManager.AddLoginAsync(user.Id, login);

            if (!identityResult.Succeeded)
            {
                result.Success = false;
                return BadRequest("UserName Already Exists");
            }

            return Ok(result);

        }


        #region Helpers


        private IAuthenticationManager AuthenticationManager
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        private async Task SignInAsync(ApplicationUser user, bool isPersistent)
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            var identity = await UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, identity);

        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }



        #endregion
    }
}
