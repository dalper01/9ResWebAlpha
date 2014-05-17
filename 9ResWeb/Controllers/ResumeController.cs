using _9ResWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _9ResWeb.Controllers
{
    public class ResumeController : ApiController
    {
        public HttpResponseMessage Post( [FromBody]Resume newResume)
        {

            return Request.CreateResponse(HttpStatusCode.Created);

            return Request.CreateResponse(HttpStatusCode.BadRequest);

        }
    }
}
