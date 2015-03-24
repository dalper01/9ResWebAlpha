using _9ResWeb.Models;
using AutoMapper;
using LogicLayer;
using LogicLayer.DTOs.Resume;
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

            ResumeDTO resumeDTO = Mapper.Map<ResumeDTO>(newResume.contactInfo);

            resumeDTO.collegeList = Mapper.Map<List<CollegeDTO>>(newResume.education.colleges);
            resumeDTO.highschoolList = Mapper.Map<List<HighschoolDTO>>(newResume.education.highschools);
            resumeDTO.certificationList = Mapper.Map<List<CertificationDTO>>(newResume.education.certificates);

            resumeDTO.jobList = Mapper.Map<List<JobDTO>>(newResume.jobs);

            var updatedResume = _resumeManager.SaveResume(resumeDTO);



            return Request.CreateResponse(HttpStatusCode.Created, updatedResume);
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


            foreach (var highschool in newResume.education.highschools.Where(h => h.name !=""))
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

            var ms = new MemoryStream();
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);


            int unicode = 13;
            char character = (char)unicode;
            string NL = character.ToString();
            
            TextRange txtRange;

            Table table;
            TableRow CurrentRow;


            // Doc Setup
            //#region DocSetup

            Document doc = new Document();

            Section section; // = doc.AddSection();

            section = doc.AddSection();
            section.BreakCode = SectionBreakType.NewPage;
            section.PageSetup.PageSize = PageSize.A4;
            section.PageSetup.Margins.Top = 72f;
            section.PageSetup.Margins.Bottom = 72f;
            section.PageSetup.Margins.Left = 89.85f;
            section.PageSetup.Margins.Right = 89.85f;  

            Paragraph Para; // = section.AddParagraph();

            // ------------- Header -----------------
            #region Header
            ParagraphStyle style = new ParagraphStyle(doc);
            style.Name = "9resHeader";
            style.CharacterFormat.FontName = "Arial";
            style.CharacterFormat.Bold = true;
            style.CharacterFormat.TextColor = Color.FromArgb(40, 94, 166);
            doc.Styles.Add(style);




            Para = section.AddParagraph();
            Para.ApplyStyle("9resHeader");
            Para.Format.HorizontalAlignment = HorizontalAlignment.Center;
            txtRange = Para.AppendText(String.Format("{0} {1} {2}", newResume.contactInfo.firstName, newResume.contactInfo.middleName, newResume.contactInfo.lastName));
            txtRange.CharacterFormat.FontSize = 20;


            table = section.AddTable(true);
            table.ResetCells(3, 2);
            table.ApplyHorizontalMerge(0, 0, 1);


            table.TableFormat.Borders.LineWidth = 0F;

            CurrentRow = table.Rows[0];
            CurrentRow.RowFormat.Borders.Vertical.LineWidth = 0F;
            CurrentRow.RowFormat.Borders.Horizontal.LineWidth = 0F;
            CurrentRow.RowFormat.Borders.Top.Color = Color.LightGray;
            CurrentRow.RowFormat.Borders.Top.LineWidth = 1F;
            Para = CurrentRow.Cells[0].AddParagraph();


            Para.Format.HorizontalAlignment = HorizontalAlignment.Center;
            txtRange = Para.AppendText(String.Format("{0} {1} {2} {3}", newResume.contactInfo.addrStreet, newResume.contactInfo.addrTown, newResume.contactInfo.addrState, newResume.contactInfo.addrZip));
            txtRange.CharacterFormat.FontName = "Arial";
            txtRange.CharacterFormat.FontSize = 11;
            txtRange.CharacterFormat.TextColor = Color.FromArgb(40, 94, 166);


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
            txtRange.CharacterFormat.FontName = "Arial";
            txtRange.CharacterFormat.FontSize = 10;
            txtRange.CharacterFormat.TextColor = Color.FromArgb(40, 94, 166);

            txtRange = Para.AppendText(String.Format("{0} ", newResume.contactInfo.number2));
            txtRange.CharacterFormat.FontName = "Arial";
            txtRange.CharacterFormat.FontSize = 10;
            //txtRange.CharacterFormat.Bold = true;
            txtRange.CharacterFormat.TextColor = Color.FromArgb(40, 94, 166);
            //txtRange.ApplyCharacterFormat()


            Para = CurrentRow.Cells[1].AddParagraph();
            Para.Format.HorizontalAlignment = HorizontalAlignment.Right;
            txtRange = Para.AppendText(String.Format("{0} ", newResume.contactInfo.number1));
            txtRange.CharacterFormat.FontName = "Arial";
            txtRange.CharacterFormat.TextColor = Color.FromArgb(40, 94, 166); 
            txtRange.CharacterFormat.FontSize = 10;
            txtRange = Para.AppendText(String.Format("{0} ", newResume.contactInfo.number2));
            txtRange.CharacterFormat.FontName = "Arial";
            txtRange.CharacterFormat.FontSize = 10;
            txtRange.CharacterFormat.TextColor = Color.FromArgb(40, 94, 166);
            #endregion


            // Objectives
            #region Objectives
            // Table for Objectives
            Para = section.AddParagraph();
            table = section.AddTable(true);
            table.PreferredWidth = new PreferredWidth(WidthType.Percentage, 100); // {Type = WidthType.Twip}
            table.TableFormat.Paddings.Left = 15;
            table.TableFormat.Paddings.Right = 15;
            table.TableFormat.Paddings.Top = 20;
            table.TableFormat.Paddings.Bottom = 20;
            table.TableFormat.Borders.Color = Color.FromArgb(125, 125, 125);
            //table.TableFormat.BackColor = Color.FromArgb(0, 200, 200);


            CurrentRow = table.AddRow(false, 1);
            CurrentRow.RowFormat.Borders.Vertical.LineWidth = 0F;
            //CurrentRow.RowFormat.Paddings.Top = 1000;
            //CurrentRow.RowFormat.Paddings.Bottom = 1000;
            //CurrentRow.RowFormat.Paddings.Right = 10;
            //CurrentRow.RowFormat.Paddings.Left = 10;
            //CurrentRow.Cells[0].CellFormat.Paddings.All = 10;
            CurrentRow.Cells[0].SetCellWidth(80, CellWidthType.Percentage);
            CurrentRow.Cells[0].CellFormat.BackColor = Color.FromArgb(245, 245, 245);


            foreach (var objective in newResume.objectives)
            {
                Para = CurrentRow.Cells[0].AddParagraph();
                txtRange = Para.AppendText(String.Format("{0}", objective.description));
                txtRange.CharacterFormat.FontName = "Times New Roman";
                txtRange.CharacterFormat.FontSize = 11;
            }


            Para = section.AddParagraph();
            txtRange = Para.AppendText(String.Format("{0}", NL));

            #endregion


            // SkillSets
            #region SkillSets
            foreach (var skillSet in newResume.skills)
            {

                //Para = section.AddParagraph();
                //txtRange = Para.AppendText(String.Format("{0}{1} ", NL, NL));

                txtRange = Para.AppendText(String.Format("{0}{1}: ", NL, skillSet.Title));

                txtRange.CharacterFormat.FontName = "Times New Roman";
                txtRange.CharacterFormat.FontSize = 12;
                txtRange.CharacterFormat.Bold = true;
                txtRange.CharacterFormat.TextColor = Color.FromArgb(125, 125, 125);

                foreach (var skill in skillSet.Skills)
                {
                    txtRange = Para.AppendText(String.Format("{0} ",skill.Title));
                    txtRange.CharacterFormat.FontName = "Times New Roman";
                    txtRange.CharacterFormat.FontSize = 10;
                    txtRange.CharacterFormat.Bold = true;
                    txtRange.CharacterFormat.TextColor = Color.Black;

                }


            }

            //ListStyle listStyle = new ListStyle(doc, ListType.Numbered);
            //listStyle.Name = "levelstyle";
            //listStyle.Levels[0].PatternType = ListPatternType.Arabic;
            //listStyle.Levels[1].NumberPrefix = "\x0000.";
            //listStyle.Levels[1].PatternType = ListPatternType.Arabic;
            //listStyle.Levels[2].NumberPrefix = "\x0000.\x0001.";
            //listStyle.Levels[2].PatternType = ListPatternType.Arabic;
            //doc.ListStyles.Add(listStyle);

            #endregion



            // Career Experience
            #region Jobs
            table = section.AddTable(false);
            table.TableFormat.Paddings.Top = 10;

            TableRow TR; //NL

            CurrentRow = table.AddRow(1);
            Para = CurrentRow.Cells[0].AddParagraph();
            txtRange = Para.AppendText(NL); 
            txtRange = Para.AppendText("Experience:");
            txtRange.CharacterFormat.FontSize = 13;
            txtRange.CharacterFormat.Bold = true;
            txtRange.CharacterFormat.FontName = "Arial";
            txtRange.CharacterFormat.TextColor = Color.FromArgb(125, 125, 125);

            foreach (var job in newResume.jobs)
            {
                CurrentRow = table.AddRow(false, 3);

                Para = CurrentRow.Cells[0].AddParagraph();
                CurrentRow.Cells[0].SetCellWidth(40, CellWidthType.Percentage);
                txtRange = Para.AppendText(String.Format("{0}", job.firmLong));
                Para.ApplyStyle("9resHeader");
                txtRange.CharacterFormat.FontSize = 10;


                txtRange = Para.AppendText(String.Format("{2}({0}, {1})", job.city, job.state, NL));
                txtRange.CharacterFormat.TextColor = Color.Black;
                txtRange.CharacterFormat.Bold = false;
                txtRange.CharacterFormat.FontSize = 8;



                Para = CurrentRow.Cells[1].AddParagraph();
                CurrentRow.Cells[1].SetCellWidth(40, CellWidthType.Percentage);
                Para.ApplyStyle("9resHeader");
                txtRange = Para.AppendText(String.Format("{0}", job.titleLong));
                txtRange.CharacterFormat.FontSize = 10;


                //CurrentRow.Cells[2].CellFormat.FitText = true;
                Para = CurrentRow.Cells[2].AddParagraph();
                CurrentRow.Cells[2].SetCellWidth(20, CellWidthType.Percentage);
                Para.ApplyStyle("9resHeader");
                txtRange = Para.AppendText(String.Format("{0}/{1}-{2}/{3}", job.startMonth, job.startYear, job.endMonth, job.endYear));
                txtRange.CharacterFormat.FontSize = 9;
                //txtRange.CharacterFormat.


                CurrentRow = table.AddRow(false, 3);
                table.ApplyHorizontalMerge(CurrentRow.GetRowIndex(), 0, 2);


                foreach (var jobDetail in job.details)
                {
                    Para = CurrentRow.Cells[0].AddParagraph();
                    Para.ListFormat.ApplyBulletStyle();
                    Para.ListFormat.CurrentListLevel.NumberPosition = -10;
                    Para.ListFormat.CurrentListLevel.TextPosition = 20;

                    txtRange = Para.AppendText(jobDetail.description);
                    txtRange.CharacterFormat.FontSize = 9;
                    txtRange.CharacterFormat.Bold = true;

                    //Para.AppendText(String.Format("{0}{1}", jobDetail.description, NL));
                }


            }

            #endregion

            // Education
            #region Education
            Para = section.AddParagraph();
            txtRange = Para.AppendText(String.Format("{0} {1}Education: {2}", NL, NL, NL, NL, NL));
            txtRange.CharacterFormat.FontSize = 13;
            txtRange.CharacterFormat.Bold = true;
            txtRange.CharacterFormat.FontName = "Times New Roman";
            txtRange.CharacterFormat.TextColor = Color.FromArgb(125, 125, 125);


            foreach (var highschool in newResume.education.highschools)
            {
                Para = section.AddParagraph();
                txtRange = Para.AppendText(String.Format("{0} ", highschool.name));
                txtRange.CharacterFormat.FontName = "Arial";
                txtRange.CharacterFormat.FontSize = 11;
                txtRange.CharacterFormat.Bold = true;

                txtRange = Para.AppendText(String.Format("{0} {1} {2} {3}", highschool.city, highschool.state, highschool.gradMonth, highschool.gradYear));
                txtRange.CharacterFormat.Bold = false;
                txtRange.CharacterFormat.FontSize = 10;
            }


            foreach (var college in newResume.education.colleges)
            {
                Para = section.AddParagraph();
                txtRange = Para.AppendText(String.Format("{0} ", college.name));
                txtRange.CharacterFormat.FontName = "Arial";
                txtRange.CharacterFormat.FontSize = 11;
                txtRange.CharacterFormat.Bold = true;

                txtRange = Para.AppendText(String.Format("{0} {1} ", college.city, college.state));
                txtRange.CharacterFormat.Bold = false;
                txtRange.CharacterFormat.FontSize = 10;
                txtRange = Para.AppendText(String.Format("{0},{1} ", college.degreeType, college.degreeProgram));
                txtRange.CharacterFormat.Bold = true;
                txtRange.CharacterFormat.FontSize = 10;
                txtRange = Para.AppendText(String.Format("{0}-{1}", college.gradMonth, college.gradYear));
                txtRange.CharacterFormat.Bold = false;
                txtRange.CharacterFormat.FontSize = 10;
            }

            DocPicture Pic;

            foreach (var certificate in newResume.education.certificates)
            {
                Para = section.AddParagraph();

                string PPath = HttpContext.Current.Server.MapPath(@"~\Content\icons\icongradcap.jpg");
                Image image = Image.FromFile(PPath);
                string loadHTML = string.Format("<img src='{0}'>", PPath);
                loadHTML = "<i class='fa fa-linkedin-square'></i>";
                //Pic = Para.AppendPicture(image);
                Para.AppendHTML(loadHTML);

                txtRange = Para.AppendText(String.Format("{0} ", certificate.type));
                txtRange.CharacterFormat.FontName = "Arial";
                txtRange.CharacterFormat.FontSize = 11;
                txtRange.CharacterFormat.Bold = true;

                txtRange = Para.AppendText(String.Format("{0} {1}-{2} ", certificate.Provider, certificate.compMonth, certificate.compYear));
                txtRange.CharacterFormat.Bold = false;
                txtRange.CharacterFormat.FontSize = 10;
            }
            #endregion

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
