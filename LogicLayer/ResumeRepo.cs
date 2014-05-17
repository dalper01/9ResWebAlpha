using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataLayer;

namespace LogicLayer
{
    public class ResumetoDB
    {
        public ResumetoDB()
        {
            var ctx = new ResumeContext();

            var res = ctx.Resume.ToList();
        }

        //public 
    }
}
