import React from "react";
import { Download, FileText } from "lucide-react";
import { useAnalysis } from "../../context/AnalysisContext";

const DownloadReport: React.FC = () => {
  const { analysisData } = useAnalysis();

  if (!analysisData) {
    return null;
  }

  const {
    location,
    coordinates,
    environment,
    predictedCrop,
    topCrops,
    finalRecommendations,
    createdAt,
  } = analysisData;

  const recommendedCrop =
    finalRecommendations?.[0]?.crop ||
    finalRecommendations?.[0]?.name ||
    predictedCrop ||
    "Not available";

  const crops = Array.isArray(topCrops) ? topCrops : [];

  const formatScore = (crop: any) => {
    if (typeof crop?.score === "number") {
      return crop.score.toFixed(2);
    }

    if (typeof crop?.probability === "number") {
      return (crop.probability * 100).toFixed(2);
    }

    return "N/A";
  };

  const downloadReport = () => {
    const reportDate = createdAt
      ? new Date(createdAt).toLocaleString()
      : new Date().toLocaleString();

    const district = location?.district || "Not available";
    const state = location?.state || "Not available";
    const country = location?.country || "Not available";

    const temperature =
      environment?.temperature !== undefined
        ? `${environment.temperature} °C`
        : "Not available";

    const humidity =
      environment?.humidity !== undefined
        ? `${environment.humidity} %`
        : "Not available";

    const rainfall =
      environment?.rainfall !== undefined
        ? `${environment.rainfall} mm`
        : "Not available";

    const ph =
      environment?.ph !== undefined
        ? environment.ph
        : "Not available";

    const soilType =
      environment?.soil_type ||
      environment?.soilType ||
      "Not available";

    const nitrogen =
      environment?.N !== undefined
        ? environment.N
        : "Not available";

    const phosphorus =
      environment?.P !== undefined
        ? environment.P
        : "Not available";

    const potassium =
      environment?.K !== undefined
        ? environment.K
        : "Not available";

    const cropRows = crops
      .slice(0, 10)
      .map(
        (crop: any, index: number) => `
          <tr>
            <td>${index + 1}</td>
            <td>${crop?.crop || crop?.name || "Unknown"}</td>
            <td>${formatScore(crop)}</td>
          </tr>
        `
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>AgriNutrigen Analysis Report</title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 40px;
              font-family: Arial, Helvetica, sans-serif;
              color: #1f2937;
              background: #ffffff;
            }

            .header {
              border-bottom: 3px solid #16a34a;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }

            .title {
              margin: 0;
              color: #166534;
              font-size: 28px;
            }

            .subtitle {
              margin-top: 8px;
              color: #6b7280;
              font-size: 14px;
            }

            .section {
              margin-bottom: 28px;
            }

            .section-title {
              margin-bottom: 12px;
              color: #166534;
              font-size: 19px;
              border-bottom: 1px solid #dcfce7;
              padding-bottom: 8px;
            }

            .recommended {
              padding: 20px;
              border-radius: 12px;
              background: #f0fdf4;
              border: 1px solid #bbf7d0;
              margin-bottom: 20px;
            }

            .recommended-label {
              color: #15803d;
              font-size: 13px;
              font-weight: bold;
              text-transform: uppercase;
            }

            .recommended-crop {
              margin: 8px 0 0;
              font-size: 25px;
              color: #14532d;
            }

            .grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 12px;
            }

            .card {
              border: 1px solid #e5e7eb;
              border-radius: 10px;
              padding: 14px;
            }

            .label {
              display: block;
              color: #6b7280;
              font-size: 12px;
              margin-bottom: 5px;
            }

            .value {
              font-size: 16px;
              font-weight: bold;
              color: #111827;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }

            th,
            td {
              text-align: left;
              padding: 11px;
              border-bottom: 1px solid #e5e7eb;
            }

            th {
              background: #f0fdf4;
              color: #166534;
            }

            .footer {
              margin-top: 40px;
              padding-top: 15px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 11px;
              line-height: 1.6;
            }

            @media print {
              body {
                padding: 20px;
              }
            }
          </style>
        </head>

        <body>
          <div class="header">
            <h1 class="title">AgriNutrigen Analysis Report</h1>
            <p class="subtitle">
              Regional agricultural analysis and crop recommendation
            </p>
            <p class="subtitle">
              Generated: ${reportDate}
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">Recommended Crop</h2>

            <div class="recommended">
              <div class="recommended-label">
                Best Environmental Match
              </div>

              <div class="recommended-crop">
                ${recommendedCrop}
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Selected Region</h2>

            <div class="grid">
              <div class="card">
                <span class="label">District</span>
                <span class="value">${district}</span>
              </div>

              <div class="card">
                <span class="label">State</span>
                <span class="value">${state}</span>
              </div>

              <div class="card">
                <span class="label">Country</span>
                <span class="value">${country}</span>
              </div>

              <div class="card">
                <span class="label">Coordinates</span>
                <span class="value">
                  ${
                    coordinates?.lat !== null &&
                    coordinates?.lat !== undefined
                      ? `${coordinates.lat}, ${coordinates.lng}`
                      : "Not available"
                  }
                </span>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Environmental Conditions</h2>

            <div class="grid">
              <div class="card">
                <span class="label">Temperature</span>
                <span class="value">${temperature}</span>
              </div>

              <div class="card">
                <span class="label">Humidity</span>
                <span class="value">${humidity}</span>
              </div>

              <div class="card">
                <span class="label">Rainfall</span>
                <span class="value">${rainfall}</span>
              </div>

              <div class="card">
                <span class="label">Soil pH</span>
                <span class="value">${ph}</span>
              </div>

              <div class="card">
                <span class="label">Soil Type</span>
                <span class="value">${soilType}</span>
              </div>

              <div class="card">
                <span class="label">Nitrogen (N)</span>
                <span class="value">${nitrogen}</span>
              </div>

              <div class="card">
                <span class="label">Phosphorus (P)</span>
                <span class="value">${phosphorus}</span>
              </div>

              <div class="card">
                <span class="label">Potassium (K)</span>
                <span class="value">${potassium}</span>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Top Crop Recommendations</h2>

            ${
              cropRows
                ? `
                  <table>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Crop</th>
                        <th>Suitability Score</th>
                      </tr>
                    </thead>

                    <tbody>
                      ${cropRows}
                    </tbody>
                  </table>
                `
                : `
                  <p>No crop recommendation data is available.</p>
                `
            }
          </div>

          <div class="footer">
            <strong>AgriNutrigen</strong><br />
            This report summarizes the data available from the generated
            regional analysis. Environmental values and crop scores are based
            on the analysis data available at the time of generation.
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([html], {
      type: "text/html;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `AgriNutrigen-Analysis-${district}.html`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <section className="mt-8">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
              <FileText className="h-5 w-5 text-green-600" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Analysis Report
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Download the current regional analysis and crop
                recommendations.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={downloadReport}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Download Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default DownloadReport;