using Res.DTOs.ResumeDTOs;
using _9ResWeb.Models;
using _9Res.DocGenerator.WordDocBuilder;
using AutoMapper;
using LogicLayer;
using Spire.Doc;
using Spire.Doc.Documents;
using Spire.Doc.Fields;
using Spire.Pdf;
using Spire.Pdf.Graphics;
using Spire.Pdf.Grid;
using Spire.Pdf.Lists;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Http;

namespace _9ResWeb.Controllers
{
    public class ResumeApiController : ApiController
    {

        private ResumeManager _resumeManager;

        PdfDocument doc;
        private float y;
        private PdfPageBase page;

        public ResumeApiController()
        {
            _resumeManager = new ResumeManager();
        }


        public HttpResponseMessage Post( [FromBody]ResumeViewModel newResume)
        {
            //get User Id
            //var CurrentUserId = User.Identity.;
            ////get UserName
            //var CurrentUserName = User.Identity.GetUserName();

            //return Request.CreateResponse(HttpStatusCode.Created, newResume);
            var identity = (System.Security.Claims.ClaimsIdentity)User.Identity;
            var userId = identity.Claims.FirstOrDefault(i => i.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value;


            ResumeDTO resumeDTO = Mapper.Map<ResumeDTO>(newResume.contactInfo);

            resumeDTO.collegeList = Mapper.Map<List<CollegeDTO>>(newResume.education.colleges);
            resumeDTO.highschoolList = Mapper.Map<List<HighschoolDTO>>(newResume.education.highSchools);
            resumeDTO.certificationList = Mapper.Map<List<CertificationDTO>>(newResume.education.certificates);

            resumeDTO.jobList = Mapper.Map<List<JobDTO>>(newResume.jobs);
            resumeDTO.skillSetList = Mapper.Map<List<SkillSetDTO>>(newResume.skills);
            resumeDTO.objectivesList = Mapper.Map<List<ObjectiveDTO>>(newResume.objectives);
 
            var updatedResume = _resumeManager.SaveResume(userId, resumeDTO);
            //var updatedResume = newResume;

            ResumeViewModel returnval = new ResumeViewModel() { education = new EducationViewModel() };
            returnval.contactInfo = Mapper.Map<ContactInfoViewModel>(updatedResume);
            returnval.education.highSchools = Mapper.Map<List<HighschoolViewModel>>(updatedResume.highschoolList);
            returnval.education.colleges = Mapper.Map<List<CollegeViewModel>>(updatedResume.collegeList);
            returnval.education.certificates = Mapper.Map<List<CertificationViewModel>>(updatedResume.certificationList);
            returnval.jobs = Mapper.Map<List<JobViewModel>>(updatedResume.jobList);
            returnval.skills = Mapper.Map<List<SkillSetViewModel>>(updatedResume.skillSetList);
            returnval.objectives = Mapper.Map<List<ObjectiveViewModel>>(updatedResume.objectivesList);

            return Request.CreateResponse(HttpStatusCode.Created, returnval);
        }


        [Route("api/getResumePDF")]
        [AcceptVerbs("POST", "GET")]
        public HttpResponse getResumePDF([FromBody]ResumeViewModel newResume)
        {
            MemoryStream ms = new MemoryStream();
            doc = new PdfDocument();
            PdfSection section = doc.Sections.Add();

            PdfUnitConvertor unitCvtr = new PdfUnitConvertor();
            PdfMargins margin = new PdfMargins();
            margin.Top = unitCvtr.ConvertUnits(2.54f, PdfGraphicsUnit.Centimeter, PdfGraphicsUnit.Point);
            //margin.Bottom = margin.Top;
            margin.Left = unitCvtr.ConvertUnits(3.17f, PdfGraphicsUnit.Centimeter, PdfGraphicsUnit.Point);
            margin.Right = margin.Left;
            margin.Left = unitCvtr.ConvertUnits(1.5f, PdfGraphicsUnit.Centimeter, PdfGraphicsUnit.Point);
            margin.Right = margin.Left;

            PdfPageSettings pageSettings = new PdfPageSettings(PdfPageSize.A4, PdfPageOrientation.Portrait);
            pageSettings.Margins = margin;
            section.PageSettings = pageSettings;

            section.PageAdded += PDFSetNewPage;
            
            page = section.Pages.Add();
            PdfTextLayout textLayout = new PdfTextLayout();
            textLayout.Break = PdfLayoutBreakType.FitPage;
            textLayout.Layout = PdfLayoutType.Paginate;



            PdfStringFormat formatCenter = new PdfStringFormat(PdfTextAlignment.Center);
            PdfStringFormat formatRight = new PdfStringFormat(PdfTextAlignment.Right);

            string text;
            SizeF size;
            float pageWidth = page.Canvas.ClientSize.Width;

            y = 10;
            float x = 10;

            PdfPen pen1 = new PdfPen(Color.LightGray, .3f);

            System.Drawing.Font nameFont = new System.Drawing.Font("Arial", 20f, FontStyle.Bold);
            PdfTrueTypeFont nameTrueTypeFont = new PdfTrueTypeFont(nameFont);

            PdfPen standardPen = new PdfPen(new PdfSolidBrush(Color.Black));
            PdfBrush blueBrush = new PdfSolidBrush(Color.FromArgb(40, 94, 166));
            //PdfBrush grayBrush = new PdfSolidBrush(Color.FromArgb(40, 94, 166));
            PdfBrush grayBrush = new PdfSolidBrush(Color.Gray);
            PdfBrush blackBrush = new PdfSolidBrush(Color.Black);
            PdfBrush titleBrush = new PdfSolidBrush(Color.FromArgb(125, 125, 125));



            // Header
            #region Header
            text = String.Format("{0} {1} {2}", newResume.contactInfo.firstName, newResume.contactInfo.middleName, newResume.contactInfo.lastName);
            page.Canvas.DrawString(text, nameTrueTypeFont, blueBrush,
                        pageWidth / 2, y, formatCenter);
            
            //page.Canvas.DrawString(text, nameTrueTypeFont, blueBrush,
            //            pageWidth / 2, y, formatCenter);

            size = nameTrueTypeFont.MeasureString(text, formatCenter);
            y += size.Height;


            page.Canvas.DrawLine(pen1, 20, y, pageWidth - 40, y);

            System.Drawing.Font addrFont = new System.Drawing.Font("Arial", 8f, FontStyle.Regular, GraphicsUnit.Point);
            PdfTrueTypeFont addrTrueTypeFont = new PdfTrueTypeFont(addrFont);

            text = String.Format("{0} {1} {2} {3}", newResume.contactInfo.addrStreet, newResume.contactInfo.addrTown, newResume.contactInfo.addrState, newResume.contactInfo.addrZip);
            page.Canvas.DrawString(text, addrTrueTypeFont, blueBrush,
                pageWidth / 2, y, formatCenter);

            size = addrTrueTypeFont.MeasureString(text, formatCenter);
            y += size.Height;

            text = String.Format("{0} {1}", newResume.contactInfo.number1, newResume.contactInfo.number2);
            page.Canvas.DrawString(text, addrTrueTypeFont, blueBrush,
                20, y);

            text = String.Format("{0} {1}", newResume.contactInfo.eMail, newResume.contactInfo.socialMedia);
            page.Canvas.DrawString(text, addrTrueTypeFont, blueBrush, pageWidth - 40, y, formatRight);

            size = addrTrueTypeFont.MeasureString(text, formatCenter);
            y += size.Height + 20f;

            #endregion


            //  --------------------  Objectives  -----------------------
            #region Objectives

            PdfGrid grid = new PdfGrid();
            grid.Style.CellPadding = new PdfPaddings(0f, 0f, 0f, 2f);
            grid.Style.CellSpacing = 0;
            PdfGridRow row;
            PdfLayoutResult result;
            grid.Columns.Add(1);
            grid.Columns[0].Width = pageWidth - 60f;

            PdfBorders noBorder = new PdfBorders();
            noBorder.All = new PdfPen(Color.White);
            PdfBorders grayBorder = new PdfBorders();
            grayBorder.All = new PdfPen(Color.FromArgb(240, 240, 240));



            foreach (var objective in newResume.objectives)
            {
                row = grid.Rows.Add();
                row.Cells[0].Style.Borders = grayBorder;
                text = String.Format("{0} ", objective.description);
                row.Cells[0].Value = text;
            }


            //grid.Style.BorderOverlapStyle = PdfBorderOverlapStyle.Inside;
            grid.Style.BackgroundBrush = new PdfSolidBrush(Color.FromArgb(240, 240, 240)); //Color.FromArgb(220, 220, 220);
            grid.Style.CellPadding.All = 20f;
            result = grid.Draw(page, new PointF(30, y));


            y += result.Bounds.Height + 40f;

            #endregion


            // Skills
            #region Skills
            // ----------------         Skills     --------------------

            StringBuilder skillsString = new StringBuilder();
            string commaInsert;

            grid = new PdfGrid();
            grid.Columns.Add(2);
            grid.Style.CellPadding = new PdfPaddings(0f, 0f, 0f, 2f);
            grid.Style.CellSpacing = 0;
            grid.Columns[0].Width = (page.Canvas.ClientSize.Width - 70f) * .2f;
            grid.Columns[1].Width = (page.Canvas.ClientSize.Width - 70f) * .8f;
            //grid.Columns[2].Width = (page.Canvas.ClientSize.Width - 70f) * .2f;

            System.Drawing.Font skillTitleFont = new System.Drawing.Font("Arial", 9f, FontStyle.Bold, GraphicsUnit.Point);
            PdfTrueTypeFont skillTitleTrueTypeFont = new PdfTrueTypeFont(skillTitleFont);

            System.Drawing.Font skillDetailFont = new System.Drawing.Font("Arial", 8f, FontStyle.Bold, GraphicsUnit.Point);
            PdfTrueTypeFont skillDetailTrueTypeFont = new PdfTrueTypeFont(skillDetailFont);
            //PdfGridCellTextAndStyle skillTitleGridStyle = new PdfGridCellTextAndStyle();
            //skillTitleGridStyle.Font = skillTitleTrueTypeFont;
            //skillTitleGridStyle.Brush = grayBrush;

            foreach (var skillSet in newResume.skills)
            {

                row = grid.Rows.Add();
                grid.Columns[0].Format.WordWrap = PdfWordWrapType.None;
                row.Style.Font = addrTrueTypeFont;
                //row.Cells[0].Style.StringFormat.WordWrap = PdfWordWrapType.None;
                row.Cells[0].Style.Borders = noBorder;
                row.Cells[1].Style.Borders = noBorder;
                text = String.Format("{0}: ", skillSet.Title);
                row.Cells[0].Value = text;
                row.Cells[0].Style.TextBrush = grayBrush;
                row.Cells[0].StringFormat.Alignment = PdfTextAlignment.Left;
                row.Cells[0].Style.Font = skillTitleTrueTypeFont;
                row.Cells[0].Style.TextBrush = titleBrush;

                //row.Cells[1].ColumnSpan = 3;
                row.Cells[1].Style.Font = skillDetailTrueTypeFont;

                //txtRange.CharacterFormat.FontName = "Times New Roman";
                //txtRange.CharacterFormat.FontSize = 12;
                //txtRange.CharacterFormat.Bold = true;
                //txtRange.CharacterFormat.TextColor = Color.FromArgb(125, 125, 125);
                //skillSet.Skills.
                skillsString.Clear();
                commaInsert = " ";

                foreach (var skill in skillSet.Skills)
                {
                    skillsString.AppendFormat("{0}{1}", commaInsert, skill.Title);
                    commaInsert = ", ";
                }
                row.Cells[1].Value = skillsString.ToString();


            }
            //grid.Style.BorderOverlapStyle = PdfBorderOverlapStyle.Inside;
            //grid.Style.BackgroundBrush = new PdfSolidBrush(Color.White); //Color.FromArgb(220, 220, 220);
            //grid.Style.CellPadding.All = 20f;
            result = grid.Draw(page, new PointF(10, y));
            y += result.Bounds.Height + 35f;

            #endregion


            // ----------------         Jobs     --------------------
            #region Jobs
            PdfList jobDetailsList;
            //PdfOrderedMarker smallBullet = new PdfOrderedMarker
            PdfMarker smallBullet = new PdfMarker(PdfUnorderedMarkerStyle.Disk);
            smallBullet.Font = new PdfFont(PdfFontFamily.Symbol, 2f, PdfFontStyle.Regular);
            smallBullet.Brush = blackBrush;
            smallBullet.Pen = new PdfPen(blackBrush);
            PdfTemplate newBullet = new PdfTemplate(2f, 2f);

            System.Drawing.Font jobHeaderFont = new System.Drawing.Font("Arial", 10f, FontStyle.Bold, GraphicsUnit.Point);
            PdfTrueTypeFont jobHeaderTrueTypeFont = new PdfTrueTypeFont(jobHeaderFont);

            //PdfGridStyle jobHeaderGridStyle = new PdfGridStyle();

            System.Drawing.Font jobDetailFont = new System.Drawing.Font("Arial", 8f, FontStyle.Bold, GraphicsUnit.Point);
            PdfTrueTypeFont jobDetailTrueTypeFont = new PdfTrueTypeFont(jobDetailFont);


            StringBuilder jobDetailsString = new StringBuilder();
            string NL = "\n";

            
            foreach (var job in newResume.jobs)
            {
                y += 6;

                grid = new PdfGrid();
                grid.Columns.Add(3);
                grid.Style.CellPadding = new PdfPaddings(0f, 0f, 0f, 2f);
                grid.Style.CellSpacing = 0;
                grid.Columns[0].Width = (page.Canvas.ClientSize.Width - 70f) * .4f;
                grid.Columns[1].Width = (page.Canvas.ClientSize.Width - 70f) * .4f;
                grid.Columns[2].Width = (page.Canvas.ClientSize.Width - 70f) * .2f;

                row = grid.Rows.Add();
                row.Style.TextBrush = blueBrush;
                row.Style.Font = skillTitleTrueTypeFont;
                //grid.Columns[0].Format.WordWrap = PdfWordWrapType.None;
                //row.Cells[0].Style.StringFormat.WordWrap = PdfWordWrapType.None;
                row.Cells[0].Style.Borders = noBorder;
                row.Cells[1].Style.Borders = noBorder;
                row.Cells[2].Style.Borders = noBorder;
                row.Cells[0].Value = job.firmLong;
                row.Cells[0].StringFormat.Alignment = PdfTextAlignment.Left;
                //row.Cells[0].Style.TextBrush = titleBrush;

                //row.Cells[0].Value = String.Format("({0}, {1})", job.city, job.state);
                //row.Cells[0].StringFormat.Alignment = PdfTextAlignment.Left;
                //row.Cells[0].Style.TextBrush = titleBrush;

                row.Cells[1].Value = job.titleLong;
                row.Cells[1].StringFormat.Alignment = PdfTextAlignment.Left;
                //row.Cells[0].Style.TextBrush = titleBrush;

                row.Cells[2].Value = String.Format("{0}/{1}-{2}/{3}", job.startMonth, job.startYear, job.endMonth, job.endYear);
                row.Cells[2].StringFormat.Alignment = PdfTextAlignment.Left;
                //row.Cells[2].Style.Font.Size = 8f;
                //row.Cells[0].Style.TextBrush = titleBrush;

                //txtRange = Para.AppendText(String.Format("{2}({0}, {1})", job.city, job.state, NL));
                //txtRange.CharacterFormat.TextColor = Color.Black;
                //txtRange.CharacterFormat.Bold = false;
                //txtRange.CharacterFormat.FontSize = 8;

                result = grid.Draw(page, new PointF(10, y));
                y += result.Bounds.Height + 0f;



                jobDetailsString.Clear();

                //PdfGridCellTextAndStyleList lst;
                //lst = new PdfGridCellTextAndStyleList();
                //PdfGridCellTextAndStyle textAndStyle;

                NL = "";

                foreach (var jobDetail in job.details)
                {

                    //row = grid.Rows.Add();
                    //row.Cells[0].ColumnSpan = 3;

                    //textAndStyle = new PdfGridCellTextAndStyle();

                    //textAndStyle.Text = string.Format("{0}{1}", jobDetail.description, NL);
                    //textAndStyle.Font = jobDetailTrueTypeFont;
                    //textAndStyle.Brush = PdfBrushes.Black;


                    //lst.List.Add(textAndStyle);
                    //row.Cells[0].Value = jobDetail.description; //lst;
                    //row.Cells[0].StringFormat.WordWrap = PdfWordWrapType.Word;
                    //row.Cells[0].StringFormat.ParagraphIndent = 6f;
                    //row.Cells[0].Style.Borders = noBorder;

                    jobDetailsString.AppendFormat("{0}{1}", NL, jobDetail.description);
                    NL = "\n";
                    //commaInsert = ", ";


                }
                //row.Height = 190f;
                jobDetailsList = new PdfList(jobDetailsString.ToString());
                jobDetailsList.Font = jobDetailTrueTypeFont;
                //jobDetailsList.
                //jobDetailsList.Indent = 8;
                //jobDetailsList.TextIndent = 5;
                jobDetailsList.Brush = blackBrush;
                jobDetailsList.Marker = smallBullet;

                result = jobDetailsList.Draw(page, 20, y);
                y += result.Bounds.Height;
            }

            y += 40f;

            #endregion


            // Education
            #region Education

            PdfImage imageGradCap = PdfImage.FromFile(HttpContext.Current.Server.MapPath(@"~\Content\icons\icongradcap.png"));
            PdfImage imageCert = PdfImage.FromFile(HttpContext.Current.Server.MapPath(@"~\Content\icons\iconcert.png"));

            System.Drawing.Font educationHeaderFont = new System.Drawing.Font("Arial", 8f, FontStyle.Bold, GraphicsUnit.Point);
            PdfTrueTypeFont educationHeaderTrueTypeFont = new PdfTrueTypeFont(educationHeaderFont);

            System.Drawing.Font educationDetailFont = new System.Drawing.Font("Arial", 7f, FontStyle.Regular, GraphicsUnit.Point);
            PdfTrueTypeFont educationDetailTrueTypeFont = new PdfTrueTypeFont(educationDetailFont);


            foreach (var highschool in newResume.education.highSchools.Where(h => h.name !=""))
            {
                checkPageBreak();

                x = 10;

                page.Canvas.DrawImage(imageGradCap, new PointF(x, y + 1), new SizeF(12, 8));
                x += 13;

                text = String.Format("{0}", highschool.name);
                page.Canvas.DrawString(text, educationHeaderTrueTypeFont, blackBrush, x, y);

                size = educationHeaderTrueTypeFont.MeasureString(text);
                x += size.Width + 2;

                text = String.Format("{0}, {1} {2}-{3}", highschool.city, highschool.state, highschool.gradMonth, highschool.gradYear);
                page.Canvas.DrawString(text, educationDetailTrueTypeFont, blackBrush, x, y);

                y += size.Height;
            }


            //checkPageBreak(ref y, page, doc);
            foreach (var college in newResume.education.colleges.Where(c => c.name != ""))
            {
                checkPageBreak();

                x = 10;

                page.Canvas.DrawImage(imageGradCap, new PointF(x, y + 1), new SizeF(12, 8));
                x += 13;
                
                text = String.Format("{0}", college.name);
                page.Canvas.DrawString(text, educationHeaderTrueTypeFont, blackBrush, x, y);

                size = educationHeaderTrueTypeFont.MeasureString(text);
                x += size.Width + 2;

                text = String.Format("{0}, {1}", college.city, college.state);
                page.Canvas.DrawString(text, educationDetailTrueTypeFont, blackBrush, x, y);

                size = educationDetailTrueTypeFont.MeasureString(text);
                x += size.Width + 2;

                text = String.Format("{0}", college.degreeProgram);
                page.Canvas.DrawString(text, educationHeaderTrueTypeFont, blackBrush, x, y);

                size = educationHeaderTrueTypeFont.MeasureString(text);
                x += size.Width + 2;

                text = String.Format("{0}-{1}", college.gradMonth, college.gradYear);
                page.Canvas.DrawString(text, educationDetailTrueTypeFont, blackBrush, x, y);

                size = educationHeaderTrueTypeFont.MeasureString(text);
                y += size.Height;
            }


            foreach (var certificate in newResume.education.certificates.Where(c => c.type != ""))
            {
                checkPageBreak();

                x = 10;

                page.Canvas.DrawImage(imageCert, new PointF(x+2, y + 1), new SizeF(8, 8));
                x += 13;

                text = String.Format("{0}", certificate.type);
                page.Canvas.DrawString(text, educationHeaderTrueTypeFont, blackBrush, x, y);

                size = educationHeaderTrueTypeFont.MeasureString(text);
                x += size.Width + 2;

                text = String.Format("{0} {1}-{2}", certificate.Provider, certificate.compMonth, certificate.compYear);
                page.Canvas.DrawString(text, educationDetailTrueTypeFont, blackBrush, x, y);

                y += size.Height;
            }


            #endregion


            doc.SaveToHttpResponse("resume.pdf", HttpContext.Current.Response, HttpReadType.Open);

            //string path = HttpContext.Current.Server.MapPath(@"~\Content\9res-nie.css");
            //HttpResponseMessage response = null; // = new HttpResponseMessage();
            //response.Content = new StreamContent(new FileStream(filePath, FileMode.Open));

            return HttpContext.Current.Response;
        }

        void PDFSetNewPage(Object sender, PageAddedEventArgs args)
        {
            page = args.Page;
            y = 10;
        }

        void checkPageBreak()
        {
            //return;
            float endPage = page.Size.Height - 230f;
            //page.ActualSize.Height
            if (y  > endPage)
            {
                //page = doc.AppendPage(PdfPageSize.A4, margin, PdfPageRotateAngle.RotateAngle0, PdfPageOrientation.Portrait);
                page = doc.AppendPage();
                y = 10;
            }

        }


        [Route("api/getResumeDOC")]
        [AcceptVerbs("POST", "GET")]
        public HttpResponseMessage getResumeDOC([FromBody]ResumeViewModel newResume)
        {

            WordDocBuilder docBuilder = new WordDocBuilder();
            var ms = new MemoryStream();
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            ResumeDTO resumeDTO = Mapper.Map<ResumeDTO>(newResume.contactInfo);

            resumeDTO.collegeList = Mapper.Map<List<CollegeDTO>>(newResume.education.colleges);
            resumeDTO.highschoolList = Mapper.Map<List<HighschoolDTO>>(newResume.education.highSchools);
            resumeDTO.certificationList = Mapper.Map<List<CertificationDTO>>(newResume.education.certificates);

            resumeDTO.jobList = Mapper.Map<List<JobDTO>>(newResume.jobs);
            resumeDTO.skillSetList = Mapper.Map<List<SkillSetDTO>>(newResume.skills);
            resumeDTO.objectivesList = Mapper.Map<List<ObjectiveDTO>>(newResume.objectives);

            ms = docBuilder.BuildWordDoc(resumeDTO);


            response.Content = new ByteArrayContent(ms.ToArray());
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/msword");
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = "Resume.docx"
            };


            return response;
        }
    }
}
