using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace BitmapMapReaderToArray
{
    public partial class MainForm : Form
    {
        string MapFileDirectory = string.Empty;
        string MapFileName = string.Empty;

        public MainForm()
        {
            InitializeComponent();
        }

        private void GenerateButton_Click(object sender, EventArgs e)
        {
            CalculateArray();
        }

        private void CalculateArray()
        {
            //Setup IO
            var bigMap = new Bitmap(MapFileName);
            var outputPath = MapFileDirectory + @"\outputMapArray.txt";
            var fStream = new System.IO.FileStream(outputPath, System.IO.FileMode.Create, System.IO.FileAccess.ReadWrite);
            var sWriter = new System.IO.StreamWriter(fStream);

            //Get image sizes
            int canvasWidth = bigMap.Size.Width;
            int canvasHeight = bigMap.Size.Height;

            string outputLine = string.Empty;

            Color pixelColor;

            //Write array start
            sWriter.WriteLine("var blah = ");
            sWriter.WriteLine("\t\t\t\t[");

            //Loop through pixels and check color and generate list.
            for (int h = 0; h < canvasHeight; h++)
            {
                //Write start of inner array
                outputLine += "\t\t\t\t\t[";

                for (int w = 0; w < canvasWidth; w++)
                {
                    pixelColor = bigMap.GetPixel(w, h);

                    if (pixelColor == Color.FromArgb(255, 255, 255, 255))
                    {
                        //No wall
                        outputLine += "'n',";
                    }
                    else
                    {
                        //Wall here!
                        outputLine += "'w',";
                    }
                }

                //trim off trailing comma
                outputLine = outputLine.TrimEnd(new char[] { ',' });

                //write end of inner array
                outputLine += "]";

                //write output line
                sWriter.WriteLine(outputLine);

                //reset output line
                outputLine = string.Empty;
            }

            //write array end
            sWriter.WriteLine("\t\t\t\t];");

            //Close resources
            sWriter.Close();
            fStream.Close();
        }

        private void MapFileTextBox_Click(object sender, EventArgs e)
        {
            //Click on textbox to select a Map Image File
            GenerateButton.Enabled = false;

            openFileDialog1.ShowDialog();
        }

        private void openFileDialog1_FileOk(object sender, CancelEventArgs e)
        {
            //Clicked OK button in File Dialog box (Selected a File)
            MapFileName = openFileDialog1.FileName;
            MapFileDirectory = System.IO.Path.GetDirectoryName(MapFileName);

            if (MapFileName != string.Empty)
            {
                MapFileTextBox.Text = MapFileName;
                GenerateButton.Enabled = true;
            }
        }

    }
}
