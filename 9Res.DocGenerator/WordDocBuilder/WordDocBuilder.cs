using Res.DTOs.ResumeDTOs;
using Spire.Doc;
using Spire.Doc.Documents;
using Spire.Doc.Fields;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _9Res.DocGenerator.WordDocBuilder
{
    public class WordDocBuilder
    {

        Document doc;
        Section section;
        Paragraph Para;

        MemoryStream ms;

        public WordDocBuilder()
        {
            doc = new Document();
            ms = new MemoryStream();
        }

        public MemoryStream BuildWordDoc(ResumeDTO resumeData)
        {
            int unicode = 13;
            char character = (char)unicode;
            string NL = character.ToString();

            TextRange txtRange;

            Table table;
            TableRow CurrentRow;


            // Doc Setup
            //#region DocSetup

            doc = new Document();
            section = doc.AddSection();

            section.BreakCode = SectionBreakType.NewPage;
            section.PageSetup.PageSize = PageSize.A4;
            section.PageSetup.Margins.Top = 72f;
            section.PageSetup.Margins.Bottom = 72f;
            section.PageSetup.Margins.Left = 89.85f;
            section.PageSetup.Margins.Right = 89.85f;

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
            txtRange = Para.AppendText(String.Format("{0} {1} {2}", resumeData.firstName, resumeData.middleName, resumeData.lastName));
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
            txtRange = Para.AppendText(String.Format("{0} {1} {2} {3}", resumeData.addrStreet, resumeData.addrTown, resumeData.addrState, resumeData.addrZip));
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

            txtRange = Para.AppendText(String.Format("{0} ", resumeData.number1));
            txtRange.CharacterFormat.FontName = "Arial";
            txtRange.CharacterFormat.FontSize = 10;
            txtRange.CharacterFormat.TextColor = Color.FromArgb(40, 94, 166);

            txtRange = Para.AppendText(String.Format("{0} ", resumeData.number2));
            txtRange.CharacterFormat.FontName = "Arial";
            txtRange.CharacterFormat.FontSize = 10;
            //txtRange.CharacterFormat.Bold = true;
            txtRange.CharacterFormat.TextColor = Color.FromArgb(40, 94, 166);
            //txtRange.ApplyCharacterFormat()


            Para = CurrentRow.Cells[1].AddParagraph();
            Para.Format.HorizontalAlignment = HorizontalAlignment.Right;
            txtRange = Para.AppendText(String.Format("{0} ", resumeData.number1));
            txtRange.CharacterFormat.FontName = "Arial";
            txtRange.CharacterFormat.TextColor = Color.FromArgb(40, 94, 166);
            txtRange.CharacterFormat.FontSize = 10;
            txtRange = Para.AppendText(String.Format("{0} ", resumeData.number2));
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


            CurrentRow = table.AddRow(false, 1);
            CurrentRow.RowFormat.Borders.Vertical.LineWidth = 0F;
            //CurrentRow.RowFormat.Paddings.Top = 1000;
            //CurrentRow.RowFormat.Paddings.Bottom = 1000;
            //CurrentRow.RowFormat.Paddings.Right = 10;
            //CurrentRow.RowFormat.Paddings.Left = 10;
            //CurrentRow.Cells[0].CellFormat.Paddings.All = 10;
            CurrentRow.Cells[0].SetCellWidth(80, CellWidthType.Percentage);
            //CurrentRow.Cells[0].CellFormat.BackColor = Color.FromArgb(245, 245, 245);


            foreach (var objective in resumeData.objectivesList)
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
            foreach (var skillSet in resumeData.skillSetList)
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
                    txtRange = Para.AppendText(String.Format("{0} ", skill.Title));
                    txtRange.CharacterFormat.FontName = "Arial";
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

            foreach (var job in resumeData.jobList)
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
            txtRange.CharacterFormat.FontName = "Arial";
            txtRange.CharacterFormat.TextColor = Color.FromArgb(125, 125, 125);


            foreach (var highschool in resumeData.highschoolList)
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


            foreach (var college in resumeData.collegeList)
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

            foreach (var certificate in resumeData.certificationList)
            {
                Para = section.AddParagraph();

                string PPath = System.Web.HttpContext.Current.Server.MapPath(@"~\Content\icons\icongradcap.jpg");
                Image image = Image.FromFile(PPath);
                string loadHTML = string.Format("<img src='{0}'>", PPath);
                //loadHTML = "<i class='fa fa-linkedin-square'></i>";
                //Pic = Para.AppendPicture(image);
                //Para.AppendHTML(loadHTML);

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

            return ms;
        }

    }
}
