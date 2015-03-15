using _9ResWeb.Models;
using AutoMapper;
using LogicLayer;
using LogicLayer.DTOs.Resume;
using Spire.Doc;
using Spire.Doc.Documents;
using Spire.Doc.Fields;
using Spire.Pdf;
using Spire.Pdf.Graphics;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace _9ResWeb.Controllers
{
    public class ResumeApiController : ApiController
    {

        private ResumeManager _resumeManager;

        public ResumeApiController()
        {
            _resumeManager = new ResumeManager();
        }


        public HttpResponseMessage Post( [FromBody]ResumeViewModel newResume)
        {

            ResumeDTO resumeDTO = Mapper.Map<ResumeDTO>(newResume.contactInfo);

            resumeDTO.collegeList = Mapper.Map<List<CollegeDTO>>(newResume.education.colleges);
            resumeDTO.highschoolList = Mapper.Map<List<HighschoolDTO>>(newResume.education.highschools);
            resumeDTO.certificationList = Mapper.Map<List<CertificationDTO>>(newResume.education.certificates);

            resumeDTO.jobList = Mapper.Map<List<JobDTO>>(newResume.jobs);

            var a = _resumeManager.AddResume(resumeDTO);



            return Request.CreateResponse(HttpStatusCode.Created, a);
        }


        [Route("api/getResumePDF")]
        [AcceptVerbs("POST", "GET")]
        public HttpResponse getResumePDF([FromBody]ResumeViewModel newResume)
        {

            PdfDocument doc = new PdfDocument();
            PdfPageBase page = doc.Pages.Add();
            page.Canvas.DrawString(String.Format("{0} {1} {2} sssssssssssssssssssssssssssssss", newResume.contactInfo.firstName, newResume.contactInfo.middleName, newResume.contactInfo.lastName),
                        new PdfFont(PdfFontFamily.Helvetica, 30f),
                        new PdfSolidBrush(Color.Navy),
                        10, 10);

            doc.SaveToHttpResponse("resume.pdf", HttpContext.Current.Response, HttpReadType.Open);
            //response = HttpContext.Current.Response;

            //FileStream to_stream = new FileStream("To_stream.pdf", FileMode.Open);
            //doc.SaveToStream(to_stream);




            //string path = HttpContext.Current.Server.MapPath(@"~\Content\9res-nie.css");
            //HttpResponseMessage response = null; // = new HttpResponseMessage();

            //response.Content = new StreamContent(new FileStream(filePath, FileMode.Open));
            //response.Content = new StreamContent(to_stream);
            //response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            //response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            //response.Content.Headers.ContentDisposition.FileName = "To_stream.pdf";

            return HttpContext.Current.Response;
        }


        [Route("api/getResumeDOC")]
        [AcceptVerbs("POST", "GET")]
        public HttpResponseMessage getResumeDOC([FromBody]ResumeViewModel newResume)
        {

            //new System.IO.Stream() stream;
            var ms = new MemoryStream();
            //HttpResponse response = HttpContext.Current.Response;
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            TextRange txtRange;

            Table table;
            TableRow CurrentRow;

            Document doc = new Document();
            Section section; // = doc.AddSection();
            Paragraph Para; // = section.AddParagraph();

            section = doc.AddSection();

            Para = section.AddParagraph();
            Para.Format.HorizontalAlignment = HorizontalAlignment.Center;
            txtRange = Para.AppendText(String.Format("{0} {1} {2}", newResume.contactInfo.firstName, newResume.contactInfo.middleName, newResume.contactInfo.lastName));
            txtRange.CharacterFormat.FontName = "Arial, sans-serif";
            txtRange.CharacterFormat.FontSize = 20;
            txtRange.CharacterFormat.Bold = true;
            txtRange.CharacterFormat.TextColor = Color.Navy;


            table = section.AddTable(true);
            table.ResetCells(3, 2);
            table.ApplyHorizontalMerge(0, 0, 1);


            //table.TableFormat.Borders.Right.LineWidth = 0F;
            table.TableFormat.Borders.LineWidth = 0F;
            //table.TableFormat.Borders.Left.LineWidth = 0F;
            //table.TableFormat.Borders.Bottom.LineWidth = 1F;
            //table.TableFormat.Borders.Bottom.Color = Color.LightGray;

            CurrentRow = table.Rows[0];
            CurrentRow.RowFormat.Borders.Vertical.LineWidth = 0F;
            CurrentRow.RowFormat.Borders.Horizontal.LineWidth = 0F;
            CurrentRow.RowFormat.Borders.Top.Color = Color.LightGray;
            //CurrentRow.RowFormat.Borders.Color = Color.LightGray;
            CurrentRow.RowFormat.Borders.Top.LineWidth = 1F;
            Para = CurrentRow.Cells[0].AddParagraph();

            //Para = section.AddParagraph();
            Para.Format.HorizontalAlignment = HorizontalAlignment.Center;
            txtRange = Para.AppendText(String.Format("{0} {1} {2} {3}", newResume.contactInfo.addrStreet, newResume.contactInfo.addrTown, newResume.contactInfo.addrState, newResume.contactInfo.addrZip));
            txtRange.CharacterFormat.FontName = "Arial, sans-serif";
            txtRange.CharacterFormat.FontSize = 12;
            txtRange.CharacterFormat.Bold = true;
            txtRange.CharacterFormat.TextColor = Color.Black;


            CurrentRow = table.Rows[1];
            CurrentRow.RowFormat.Borders.Horizontal.Color = Color.LightGray;
            CurrentRow.RowFormat.Borders.Color = Color.LightGray;
            CurrentRow.RowFormat.Borders.Vertical.LineWidth = 0F;
            CurrentRow.RowFormat.Borders.Horizontal.LineWidth = 0F;
            CurrentRow.RowFormat.Borders.Top.Color = Color.LightGray;
            //FRow.IsHeader = true;
            //FRow.Cells[0].GridSpan.
            Para = CurrentRow.Cells[0].AddParagraph();
            Para.Format.HorizontalAlignment = HorizontalAlignment.Left;

            txtRange = Para.AppendText(String.Format("{0} ", newResume.contactInfo.number1));
            txtRange = Para.AppendText(String.Format("{0} ", newResume.contactInfo.number2));
            txtRange.CharacterFormat.FontName = "Arial, sans-serif";
            txtRange.CharacterFormat.FontSize = 12;
            //txtRange.CharacterFormat.Bold = true;
            txtRange.CharacterFormat.TextColor = Color.Black;
            //txtRange.ApplyCharacterFormat()


            Para = CurrentRow.Cells[1].AddParagraph();
            //Para = section.AddParagraph();
            txtRange = Para.AppendText(String.Format("{0} ", newResume.contactInfo.number1));
            txtRange = Para.AppendText(String.Format("{0} ", newResume.contactInfo.number2));
            txtRange.CharacterFormat.FontName = "Arial, sans-serif";
            txtRange.CharacterFormat.FontSize = 12;
            txtRange.CharacterFormat.Bold = false;
            txtRange.CharacterFormat.TextColor = Color.Black;
            Para.Format.HorizontalAlignment = HorizontalAlignment.Right;

            CurrentRow = table.Rows[1];
            CurrentRow.Height = 10;

            foreach (var objective in newResume.objectives)
            {
                Para = section.AddParagraph();
                txtRange = Para.AppendText(String.Format("{0}", objective.description));
                txtRange.CharacterFormat.FontName = "Arial, sans-serif";
                txtRange.CharacterFormat.FontSize = 10;
                //txtRange.CharacterFormat.Bold = true;
                //txtRange.CharacterFormat.TextColor = Color.Navy;


            }

            //ListStyle listStyle = new ListStyle(doc, ListType.Numbered);
            //listStyle.Name = "levelstyle";
            //listStyle.Levels[0].PatternType = ListPatternType.Arabic;
            //listStyle.Levels[1].NumberPrefix = "\x0000.";
            //listStyle.Levels[1].PatternType = ListPatternType.Arabic;
            //listStyle.Levels[2].NumberPrefix = "\x0000.\x0001.";
            //listStyle.Levels[2].PatternType = ListPatternType.Arabic;
            //doc.ListStyles.Add(listStyle);


            //table = section.AddTable(false);

            TableRow TR;
            //table.ResetCells((newResume.jobs.Count() + 1) * 2, 3);

            //foreach (var job in newResume.jobs)
            //{
            //    TR = new TableRow(doc);
            //    //CurrentRow = table.Rows[0];
            //    table.AddRow(TR);

            //    Para = CurrentRow.Cells[0].AddParagraph();
            //    txtRange = Para.AppendText(String.Format("{0}", job.firmLong));
            //    txtRange.CharacterFormat.FontName = "Arial, sans-serif";
            //    txtRange.CharacterFormat.FontSize = 10;
            //    txtRange.CharacterFormat.Bold = false;
            //    txtRange.CharacterFormat.TextColor = Color.Navy;


            //    foreach (var jobDetail in job.details)
            //    {
            //        Para = section.AddParagraph();
            //        Para.AppendText("One");
            //        Para.ListFormat.ApplyStyle("levelstyle");

            //        //Para = section.AddParagraph();
            //        //txtRange = Para.AppendText(String.Format("{0}", objective.description));
            //        //txtRange.CharacterFormat.FontName = "Arial, sans-serif";
            //        //txtRange.CharacterFormat.FontSize = 10;
            //        //txtRange.CharacterFormat.Bold = true;
            //        //txtRange.CharacterFormat.TextColor = Color.Navy;

            //    }


            //}




            doc.SaveToStream(ms, Spire.Doc.FileFormat.Docx);


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
