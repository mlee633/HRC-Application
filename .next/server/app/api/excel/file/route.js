/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/excel/file/route";
exports.ids = ["app/api/excel/file/route"];
exports.modules = {

/***/ "(rsc)/./app/api/excel/file/route.ts":
/*!*************************************!*\
  !*** ./app/api/excel/file/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/api/server.js\");\n/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! exceljs */ \"(rsc)/./node_modules/.pnpm/exceljs@4.4.0/node_modules/exceljs/excel.js\");\n/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nodemailer */ \"(rsc)/./node_modules/.pnpm/nodemailer@7.0.6/node_modules/nodemailer/lib/nodemailer.js\");\n// // app/api/excel/file/route.ts\n// THIS VERSION IS WHEN YOU ARE USING IT LOCALLY - NOT ON VERCEL (checking to see if pre-deployment works with dummy commit)\n// export const runtime = \"nodejs\";\n// import { NextRequest, NextResponse } from \"next/server\";\n// import { ensureDataDir } from \"@/lib/excelServer\";\n// import fs from \"node:fs/promises\";\n// import path from \"node:path\";\n// const DATA_PATH = path.join(process.cwd(), \"data\", \"Data_MCI.xlsx\");\n// export async function GET(_req: NextRequest) {\n//   await ensureDataDir();\n//   try {\n//     const stat = await fs.stat(DATA_PATH);\n//     const buffer = await fs.readFile(DATA_PATH);\n//     return new NextResponse(new Uint8Array(buffer), {\n//       headers: {\n//         \"Content-Type\": \"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\",\n//         \"Content-Length\": String(stat.size),\n//         \"Content-Disposition\": `attachment; filename=\"Data_MCI.xlsx\"`,\n//         \"Cache-Control\": \"no-store\",\n//       },\n//     });\n//   } catch {\n//     return new NextResponse(\"Workbook not found. Append a row first.\", { status: 404 });\n//   }\n// }\n// ------------------------------------------------------------------------------ //\n// Trying to make it work for Vercelexport const runtime = \"nodejs\";\nconst runtime = \"nodejs\";\n\n\n\nconst transporter = nodemailer__WEBPACK_IMPORTED_MODULE_2__.createTransport({\n    service: \"gmail\",\n    auth: {\n        user: process.env.GMAIL_USER,\n        pass: process.env.GMAIL_PASS\n    }\n});\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { patient, meds } = body;\n        if (!patient?.patientId || !patient?.name) {\n            return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(\"Patient ID and name are required\", {\n                status: 400\n            });\n        }\n        const wb = new (exceljs__WEBPACK_IMPORTED_MODULE_1___default().Workbook)();\n        const sheet = wb.addWorksheet(\"Patient Data\");\n        // ----------------------------\n        // Patient info block\n        // ----------------------------\n        const patientInfo = [\n            [\n                \"Patient Name\",\n                patient.name\n            ],\n            [\n                \"Age\",\n                patient.age?.toString() || \"\"\n            ],\n            [\n                \"Sex\",\n                patient.sex || \"\"\n            ],\n            [\n                \"Ethnicity\",\n                patient.ethnicity || \"\"\n            ],\n            [\n                \"Date of Participation\",\n                patient.dateOfParticipation || \"\"\n            ],\n            [\n                \"Overall MRCI\",\n                patient.overallMRCI?.toString() || \"\"\n            ],\n            [\n                \"Severity (MRCI)\",\n                patient.severityMRCI || \"\"\n            ]\n        ];\n        patientInfo.forEach((row)=>sheet.addRow(row));\n        sheet.addRow([]);\n        for(let i = 1; i <= patientInfo.length; i++){\n            const labelCell = sheet.getRow(i).getCell(1);\n            labelCell.font = {\n                bold: true\n            };\n            labelCell.fill = {\n                type: \"pattern\",\n                pattern: \"solid\",\n                fgColor: {\n                    argb: \"FFD9D9D9\"\n                }\n            };\n            labelCell.alignment = {\n                vertical: \"middle\",\n                horizontal: \"left\"\n            };\n        }\n        // ----------------------------\n        // Medication table\n        // ----------------------------\n        const headerRowIndex = patientInfo.length + 2;\n        const headers = [\n            \"Medication Name\",\n            \"Dosage Form\",\n            \"Frequency\",\n            \"Special Instructions\"\n        ];\n        sheet.addRow(headers);\n        sheet.getColumn(1).width = 25;\n        sheet.getColumn(2).width = 25;\n        sheet.getColumn(3).width = 20;\n        sheet.getColumn(4).width = 50;\n        const headerRow = sheet.getRow(headerRowIndex);\n        headerRow.eachCell((cell)=>{\n            cell.font = {\n                bold: true,\n                color: {\n                    argb: \"FFFFFFFF\"\n                }\n            };\n            cell.fill = {\n                type: \"pattern\",\n                pattern: \"solid\",\n                fgColor: {\n                    argb: \"FF1F497D\"\n                }\n            };\n            cell.alignment = {\n                vertical: \"middle\",\n                horizontal: \"center\",\n                wrapText: true\n            };\n            cell.border = {\n                top: {\n                    style: \"thin\"\n                },\n                left: {\n                    style: \"thin\"\n                },\n                bottom: {\n                    style: \"thin\"\n                },\n                right: {\n                    style: \"thin\"\n                }\n            };\n        });\n        meds.forEach((med)=>{\n            sheet.addRow([\n                med.name || \"\",\n                med.dosageForm || \"\",\n                med.frequency || \"\",\n                (med.instructions || []).join(\", \")\n            ]);\n        });\n        sheet.eachRow((row, rowNumber)=>{\n            if (rowNumber > headerRowIndex) {\n                row.eachCell((cell)=>{\n                    cell.alignment = {\n                        vertical: \"top\",\n                        horizontal: \"left\",\n                        wrapText: true\n                    };\n                    cell.border = {\n                        top: {\n                            style: \"thin\"\n                        },\n                        left: {\n                            style: \"thin\"\n                        },\n                        bottom: {\n                            style: \"thin\"\n                        },\n                        right: {\n                            style: \"thin\"\n                        }\n                    };\n                });\n                row.height = 30;\n            }\n        });\n        // ----------------------------\n        // Notification with Nodemailer\n        // ----------------------------\n        const mrci = Number(patient.overallMRCI);\n        const consent = Boolean(patient.consentToNotify);\n        const recipients = [\n            patient.caregiverEmail,\n            patient.gpEmail\n        ].filter(Boolean);\n        if (mrci >= 15 && consent && recipients.length > 0) {\n            const medSummary = meds && meds.length > 0 ? meds.map((m, i)=>{\n                const instr = m.instructions?.length ? `Instructions: ${m.instructions.join(\", \")}` : \"\";\n                return `${i + 1}. ${m.name || \"Unnamed\"} — ${m.dosageForm || \"N/A\"} — ${m.frequency || \"N/A\"}\\n   ${instr}`;\n            }).join(\"\\n\\n\") : \"No medications recorded.\";\n            try {\n                await transporter.sendMail({\n                    from: process.env.GMAIL_USER,\n                    to: recipients,\n                    subject: `High MRCI Alert: ${patient.name}`,\n                    text: `Patient ${patient.name} (${patient.patientId}) has an MRCI score of ${mrci}, indicating high regimen complexity.\\n\\nMedications:\\n${medSummary}`\n                });\n            } catch (err) {\n                console.error(\"Email send FAILED:\", err);\n            }\n        }\n        // ----------------------------\n        // Send Excel file\n        // ----------------------------\n        const buffer = await wb.xlsx.writeBuffer();\n        const safeName = patient.name.trim().toLowerCase().replace(/\\s+/g, \"_\").replace(/[^a-z0-9_]/g, \"\");\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(new Uint8Array(buffer), {\n            headers: {\n                \"Content-Type\": \"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\",\n                \"Content-Disposition\": `attachment; filename=\"${patient.patientId}_${safeName}_excel.xlsx\"`,\n                \"Cache-Control\": \"no-store\"\n            }\n        });\n    } catch (err) {\n        console.error(\"Excel generation error:\", err);\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(\"Error generating workbook\", {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxRQUFRRyxJQUFJLEVBQUU7b0JBQzNDd0UsTUFBTSxDQUFDLFFBQVEsRUFBRTNFLFFBQVFHLElBQUksQ0FBQyxFQUFFLEVBQUVILFFBQVFFLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRXdELEtBQUssdURBQXVELEVBQUVTLFlBQVk7Z0JBQ3pKO1lBQ0YsRUFBRSxPQUFPUyxLQUFLO2dCQUNaQyxRQUFRQyxLQUFLLENBQUMsc0JBQXNCRjtZQUN0QztRQUNGO1FBRUEsK0JBQStCO1FBQy9CLGtCQUFrQjtRQUNsQiwrQkFBK0I7UUFDL0IsTUFBTUcsU0FBUyxNQUFNMUUsR0FBRzJFLElBQUksQ0FBQ0MsV0FBVztRQUV4QyxNQUFNQyxXQUFXbEYsUUFBUUcsSUFBSSxDQUMxQmdGLElBQUksR0FDSkMsV0FBVyxHQUNYQyxPQUFPLENBQUMsUUFBUSxLQUNoQkEsT0FBTyxDQUFDLGVBQWU7UUFFMUIsT0FBTyxJQUFJdEcscURBQVlBLENBQUMsSUFBSXVHLFdBQVdQLFNBQVM7WUFDOUMzQyxTQUFTO2dCQUNQLGdCQUNFO2dCQUNGLHVCQUF1QixDQUFDLHNCQUFzQixFQUFFcEMsUUFBUUUsU0FBUyxDQUFDLENBQUMsRUFBRWdGLFNBQVMsWUFBWSxDQUFDO2dCQUMzRixpQkFBaUI7WUFDbkI7UUFDRjtJQUNGLEVBQUUsT0FBT04sS0FBSztRQUNaQyxRQUFRQyxLQUFLLENBQUMsMkJBQTJCRjtRQUN6QyxPQUFPLElBQUk3RixxREFBWUEsQ0FBQyw2QkFBNkI7WUFBRXFCLFFBQVE7UUFBSTtJQUNyRTtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvaWxlZTAwL0Rlc2t0b3AvSFJDLUFwcGxpY2F0aW9uL2FwcC9hcGkvZXhjZWwvZmlsZS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAvLyBhcHAvYXBpL2V4Y2VsL2ZpbGUvcm91dGUudHNcbi8vIFRISVMgVkVSU0lPTiBJUyBXSEVOIFlPVSBBUkUgVVNJTkcgSVQgTE9DQUxMWSAtIE5PVCBPTiBWRVJDRUwgKGNoZWNraW5nIHRvIHNlZSBpZiBwcmUtZGVwbG95bWVudCB3b3JrcyB3aXRoIGR1bW15IGNvbW1pdClcblxuLy8gZXhwb3J0IGNvbnN0IHJ1bnRpbWUgPSBcIm5vZGVqc1wiO1xuXG4vLyBpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG4vLyBpbXBvcnQgeyBlbnN1cmVEYXRhRGlyIH0gZnJvbSBcIkAvbGliL2V4Y2VsU2VydmVyXCI7XG4vLyBpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnMvcHJvbWlzZXNcIjtcbi8vIGltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuLy8gY29uc3QgREFUQV9QQVRIID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiZGF0YVwiLCBcIkRhdGFfTUNJLnhsc3hcIik7XG5cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoX3JlcTogTmV4dFJlcXVlc3QpIHtcbi8vICAgYXdhaXQgZW5zdXJlRGF0YURpcigpO1xuLy8gICB0cnkge1xuLy8gICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBmcy5zdGF0KERBVEFfUEFUSCk7XG4vLyAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgZnMucmVhZEZpbGUoREFUQV9QQVRIKTtcbi8vICAgICByZXR1cm4gbmV3IE5leHRSZXNwb25zZShuZXcgVWludDhBcnJheShidWZmZXIpLCB7XG4vLyAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXRcIixcbi8vICAgICAgICAgXCJDb250ZW50LUxlbmd0aFwiOiBTdHJpbmcoc3RhdC5zaXplKSxcbi8vICAgICAgICAgXCJDb250ZW50LURpc3Bvc2l0aW9uXCI6IGBhdHRhY2htZW50OyBmaWxlbmFtZT1cIkRhdGFfTUNJLnhsc3hcImAsXG4vLyAgICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcIm5vLXN0b3JlXCIsXG4vLyAgICAgICB9LFxuLy8gICAgIH0pO1xuLy8gICB9IGNhdGNoIHtcbi8vICAgICByZXR1cm4gbmV3IE5leHRSZXNwb25zZShcIldvcmtib29rIG5vdCBmb3VuZC4gQXBwZW5kIGEgcm93IGZpcnN0LlwiLCB7IHN0YXR1czogNDA0IH0pO1xuLy8gICB9XG4vLyB9XG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG4vLyBUcnlpbmcgdG8gbWFrZSBpdCB3b3JrIGZvciBWZXJjZWxleHBvcnQgY29uc3QgcnVudGltZSA9IFwibm9kZWpzXCI7XG5leHBvcnQgY29uc3QgcnVudGltZSA9IFwibm9kZWpzXCI7XG5cbmltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCBFeGNlbEpTIGZyb20gXCJleGNlbGpzXCI7XG5pbXBvcnQgbm9kZW1haWxlciBmcm9tIFwibm9kZW1haWxlclwiO1xuXG5jb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgc2VydmljZTogXCJnbWFpbFwiLFxuICBhdXRoOiB7XG4gICAgdXNlcjogcHJvY2Vzcy5lbnYuR01BSUxfVVNFUixcbiAgICBwYXNzOiBwcm9jZXNzLmVudi5HTUFJTF9QQVNTLFxuICB9LFxufSk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICBjb25zdCB7IHBhdGllbnQsIG1lZHMgfSA9IGJvZHk7XG5cbiAgICBpZiAoIXBhdGllbnQ/LnBhdGllbnRJZCB8fCAhcGF0aWVudD8ubmFtZSkge1xuICAgICAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UoXCJQYXRpZW50IElEIGFuZCBuYW1lIGFyZSByZXF1aXJlZFwiLCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHdiID0gbmV3IEV4Y2VsSlMuV29ya2Jvb2soKTtcbiAgICBjb25zdCBzaGVldCA9IHdiLmFkZFdvcmtzaGVldChcIlBhdGllbnQgRGF0YVwiKTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQYXRpZW50IGluZm8gYmxvY2tcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgY29uc3QgcGF0aWVudEluZm8gPSBbXG4gICAgICBbXCJQYXRpZW50IE5hbWVcIiwgcGF0aWVudC5uYW1lXSxcbiAgICAgIFtcIkFnZVwiLCBwYXRpZW50LmFnZT8udG9TdHJpbmcoKSB8fCBcIlwiXSxcbiAgICAgIFtcIlNleFwiLCBwYXRpZW50LnNleCB8fCBcIlwiXSxcbiAgICAgIFtcIkV0aG5pY2l0eVwiLCBwYXRpZW50LmV0aG5pY2l0eSB8fCBcIlwiXSxcbiAgICAgIFtcIkRhdGUgb2YgUGFydGljaXBhdGlvblwiLCBwYXRpZW50LmRhdGVPZlBhcnRpY2lwYXRpb24gfHwgXCJcIl0sXG4gICAgICBbXCJPdmVyYWxsIE1SQ0lcIiwgcGF0aWVudC5vdmVyYWxsTVJDST8udG9TdHJpbmcoKSB8fCBcIlwiXSxcbiAgICAgIFtcIlNldmVyaXR5IChNUkNJKVwiLCBwYXRpZW50LnNldmVyaXR5TVJDSSB8fCBcIlwiXSxcbiAgICBdO1xuXG4gICAgcGF0aWVudEluZm8uZm9yRWFjaCgocm93KSA9PiBzaGVldC5hZGRSb3cocm93KSk7XG4gICAgc2hlZXQuYWRkUm93KFtdKTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHBhdGllbnRJbmZvLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBsYWJlbENlbGwgPSBzaGVldC5nZXRSb3coaSkuZ2V0Q2VsbCgxKTtcbiAgICAgIGxhYmVsQ2VsbC5mb250ID0geyBib2xkOiB0cnVlIH07XG4gICAgICBsYWJlbENlbGwuZmlsbCA9IHtcbiAgICAgICAgdHlwZTogXCJwYXR0ZXJuXCIsXG4gICAgICAgIHBhdHRlcm46IFwic29saWRcIixcbiAgICAgICAgZmdDb2xvcjogeyBhcmdiOiBcIkZGRDlEOUQ5XCIgfSxcbiAgICAgIH07XG4gICAgICBsYWJlbENlbGwuYWxpZ25tZW50ID0geyB2ZXJ0aWNhbDogXCJtaWRkbGVcIiwgaG9yaXpvbnRhbDogXCJsZWZ0XCIgfTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gTWVkaWNhdGlvbiB0YWJsZVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBjb25zdCBoZWFkZXJSb3dJbmRleCA9IHBhdGllbnRJbmZvLmxlbmd0aCArIDI7XG4gICAgY29uc3QgaGVhZGVycyA9IFtcIk1lZGljYXRpb24gTmFtZVwiLCBcIkRvc2FnZSBGb3JtXCIsIFwiRnJlcXVlbmN5XCIsIFwiU3BlY2lhbCBJbnN0cnVjdGlvbnNcIl07XG4gICAgc2hlZXQuYWRkUm93KGhlYWRlcnMpO1xuXG4gICAgc2hlZXQuZ2V0Q29sdW1uKDEpLndpZHRoID0gMjU7XG4gICAgc2hlZXQuZ2V0Q29sdW1uKDIpLndpZHRoID0gMjU7XG4gICAgc2hlZXQuZ2V0Q29sdW1uKDMpLndpZHRoID0gMjA7XG4gICAgc2hlZXQuZ2V0Q29sdW1uKDQpLndpZHRoID0gNTA7XG5cbiAgICBjb25zdCBoZWFkZXJSb3cgPSBzaGVldC5nZXRSb3coaGVhZGVyUm93SW5kZXgpO1xuICAgIGhlYWRlclJvdy5lYWNoQ2VsbCgoY2VsbCkgPT4ge1xuICAgICAgY2VsbC5mb250ID0geyBib2xkOiB0cnVlLCBjb2xvcjogeyBhcmdiOiBcIkZGRkZGRkZGXCIgfSB9O1xuICAgICAgY2VsbC5maWxsID0ge1xuICAgICAgICB0eXBlOiBcInBhdHRlcm5cIixcbiAgICAgICAgcGF0dGVybjogXCJzb2xpZFwiLFxuICAgICAgICBmZ0NvbG9yOiB7IGFyZ2I6IFwiRkYxRjQ5N0RcIiB9LFxuICAgICAgfTtcbiAgICAgIGNlbGwuYWxpZ25tZW50ID0geyB2ZXJ0aWNhbDogXCJtaWRkbGVcIiwgaG9yaXpvbnRhbDogXCJjZW50ZXJcIiwgd3JhcFRleHQ6IHRydWUgfTtcbiAgICAgIGNlbGwuYm9yZGVyID0ge1xuICAgICAgICB0b3A6IHsgc3R5bGU6IFwidGhpblwiIH0sXG4gICAgICAgIGxlZnQ6IHsgc3R5bGU6IFwidGhpblwiIH0sXG4gICAgICAgIGJvdHRvbTogeyBzdHlsZTogXCJ0aGluXCIgfSxcbiAgICAgICAgcmlnaHQ6IHsgc3R5bGU6IFwidGhpblwiIH0sXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgbWVkcy5mb3JFYWNoKChtZWQ6IGFueSkgPT4ge1xuICAgICAgc2hlZXQuYWRkUm93KFtcbiAgICAgICAgbWVkLm5hbWUgfHwgXCJcIixcbiAgICAgICAgbWVkLmRvc2FnZUZvcm0gfHwgXCJcIixcbiAgICAgICAgbWVkLmZyZXF1ZW5jeSB8fCBcIlwiLFxuICAgICAgICAobWVkLmluc3RydWN0aW9ucyB8fCBbXSkuam9pbihcIiwgXCIpLFxuICAgICAgXSk7XG4gICAgfSk7XG5cbiAgICBzaGVldC5lYWNoUm93KChyb3csIHJvd051bWJlcikgPT4ge1xuICAgICAgaWYgKHJvd051bWJlciA+IGhlYWRlclJvd0luZGV4KSB7XG4gICAgICAgIHJvdy5lYWNoQ2VsbCgoY2VsbCkgPT4ge1xuICAgICAgICAgIGNlbGwuYWxpZ25tZW50ID0geyB2ZXJ0aWNhbDogXCJ0b3BcIiwgaG9yaXpvbnRhbDogXCJsZWZ0XCIsIHdyYXBUZXh0OiB0cnVlIH07XG4gICAgICAgICAgY2VsbC5ib3JkZXIgPSB7XG4gICAgICAgICAgICB0b3A6IHsgc3R5bGU6IFwidGhpblwiIH0sXG4gICAgICAgICAgICBsZWZ0OiB7IHN0eWxlOiBcInRoaW5cIiB9LFxuICAgICAgICAgICAgYm90dG9tOiB7IHN0eWxlOiBcInRoaW5cIiB9LFxuICAgICAgICAgICAgcmlnaHQ6IHsgc3R5bGU6IFwidGhpblwiIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJvdy5oZWlnaHQgPSAzMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBOb3RpZmljYXRpb24gd2l0aCBOb2RlbWFpbGVyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGNvbnN0IG1yY2kgPSBOdW1iZXIocGF0aWVudC5vdmVyYWxsTVJDSSk7XG4gICAgY29uc3QgY29uc2VudCA9IEJvb2xlYW4ocGF0aWVudC5jb25zZW50VG9Ob3RpZnkpO1xuICAgIGNvbnN0IHJlY2lwaWVudHMgPSBbcGF0aWVudC5jYXJlZ2l2ZXJFbWFpbCwgcGF0aWVudC5ncEVtYWlsXS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICBpZiAobXJjaSA+PSAxNSAmJiBjb25zZW50ICYmIHJlY2lwaWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbWVkU3VtbWFyeSA9XG4gICAgICAgIG1lZHMgJiYgbWVkcy5sZW5ndGggPiAwXG4gICAgICAgICAgPyBtZWRzXG4gICAgICAgICAgICAgIC5tYXAoKG06IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5zdHIgPSBtLmluc3RydWN0aW9ucz8ubGVuZ3RoXG4gICAgICAgICAgICAgICAgICA/IGBJbnN0cnVjdGlvbnM6ICR7bS5pbnN0cnVjdGlvbnMuam9pbihcIiwgXCIpfWBcbiAgICAgICAgICAgICAgICAgIDogXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7aSArIDF9LiAke20ubmFtZSB8fCBcIlVubmFtZWRcIn0g4oCUICR7bS5kb3NhZ2VGb3JtIHx8IFwiTi9BXCJ9IOKAlCAke1xuICAgICAgICAgICAgICAgICAgbS5mcmVxdWVuY3kgfHwgXCJOL0FcIlxuICAgICAgICAgICAgICAgIH1cXG4gICAke2luc3RyfWA7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5qb2luKFwiXFxuXFxuXCIpXG4gICAgICAgICAgOiBcIk5vIG1lZGljYXRpb25zIHJlY29yZGVkLlwiO1xuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbCh7XG4gICAgICAgICAgZnJvbTogcHJvY2Vzcy5lbnYuR01BSUxfVVNFUixcbiAgICAgICAgICB0bzogcmVjaXBpZW50cyxcbiAgICAgICAgICBzdWJqZWN0OiBgSGlnaCBNUkNJIEFsZXJ0OiAke3BhdGllbnQubmFtZX1gLFxuICAgICAgICAgIHRleHQ6IGBQYXRpZW50ICR7cGF0aWVudC5uYW1lfSAoJHtwYXRpZW50LnBhdGllbnRJZH0pIGhhcyBhbiBNUkNJIHNjb3JlIG9mICR7bXJjaX0sIGluZGljYXRpbmcgaGlnaCByZWdpbWVuIGNvbXBsZXhpdHkuXFxuXFxuTWVkaWNhdGlvbnM6XFxuJHttZWRTdW1tYXJ5fWAsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFbWFpbCBzZW5kIEZBSUxFRDpcIiwgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gU2VuZCBFeGNlbCBmaWxlXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IHdiLnhsc3gud3JpdGVCdWZmZXIoKTtcblxuICAgIGNvbnN0IHNhZmVOYW1lID0gcGF0aWVudC5uYW1lXG4gICAgICAudHJpbSgpXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgLnJlcGxhY2UoL1xccysvZywgXCJfXCIpXG4gICAgICAucmVwbGFjZSgvW15hLXowLTlfXS9nLCBcIlwiKTtcblxuICAgIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKG5ldyBVaW50OEFycmF5KGJ1ZmZlciksIHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjpcbiAgICAgICAgICBcImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0XCIsXG4gICAgICAgIFwiQ29udGVudC1EaXNwb3NpdGlvblwiOiBgYXR0YWNobWVudDsgZmlsZW5hbWU9XCIke3BhdGllbnQucGF0aWVudElkfV8ke3NhZmVOYW1lfV9leGNlbC54bHN4XCJgLFxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJuby1zdG9yZVwiLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkV4Y2VsIGdlbmVyYXRpb24gZXJyb3I6XCIsIGVycik7XG4gICAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UoXCJFcnJvciBnZW5lcmF0aW5nIHdvcmtib29rXCIsIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJydW50aW1lIiwiTmV4dFJlc3BvbnNlIiwiRXhjZWxKUyIsIm5vZGVtYWlsZXIiLCJ0cmFuc3BvcnRlciIsImNyZWF0ZVRyYW5zcG9ydCIsInNlcnZpY2UiLCJhdXRoIiwidXNlciIsInByb2Nlc3MiLCJlbnYiLCJHTUFJTF9VU0VSIiwicGFzcyIsIkdNQUlMX1BBU1MiLCJQT1NUIiwicmVxIiwiYm9keSIsImpzb24iLCJwYXRpZW50IiwibWVkcyIsInBhdGllbnRJZCIsIm5hbWUiLCJzdGF0dXMiLCJ3YiIsIldvcmtib29rIiwic2hlZXQiLCJhZGRXb3Jrc2hlZXQiLCJwYXRpZW50SW5mbyIsImFnZSIsInRvU3RyaW5nIiwic2V4IiwiZXRobmljaXR5IiwiZGF0ZU9mUGFydGljaXBhdGlvbiIsIm92ZXJhbGxNUkNJIiwic2V2ZXJpdHlNUkNJIiwiZm9yRWFjaCIsInJvdyIsImFkZFJvdyIsImkiLCJsZW5ndGgiLCJsYWJlbENlbGwiLCJnZXRSb3ciLCJnZXRDZWxsIiwiZm9udCIsImJvbGQiLCJmaWxsIiwidHlwZSIsInBhdHRlcm4iLCJmZ0NvbG9yIiwiYXJnYiIsImFsaWdubWVudCIsInZlcnRpY2FsIiwiaG9yaXpvbnRhbCIsImhlYWRlclJvd0luZGV4IiwiaGVhZGVycyIsImdldENvbHVtbiIsIndpZHRoIiwiaGVhZGVyUm93IiwiZWFjaENlbGwiLCJjZWxsIiwiY29sb3IiLCJ3cmFwVGV4dCIsImJvcmRlciIsInRvcCIsInN0eWxlIiwibGVmdCIsImJvdHRvbSIsInJpZ2h0IiwibWVkIiwiZG9zYWdlRm9ybSIsImZyZXF1ZW5jeSIsImluc3RydWN0aW9ucyIsImpvaW4iLCJlYWNoUm93Iiwicm93TnVtYmVyIiwiaGVpZ2h0IiwibXJjaSIsIk51bWJlciIsImNvbnNlbnQiLCJCb29sZWFuIiwiY29uc2VudFRvTm90aWZ5IiwicmVjaXBpZW50cyIsImNhcmVnaXZlckVtYWlsIiwiZ3BFbWFpbCIsImZpbHRlciIsIm1lZFN1bW1hcnkiLCJtYXAiLCJtIiwiaW5zdHIiLCJzZW5kTWFpbCIsImZyb20iLCJ0byIsInN1YmplY3QiLCJ0ZXh0IiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwiYnVmZmVyIiwieGxzeCIsIndyaXRlQnVmZmVyIiwic2FmZU5hbWUiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiVWludDhBcnJheSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/excel/file/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fexcel%2Ffile%2Froute&page=%2Fapi%2Fexcel%2Ffile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fexcel%2Ffile%2Froute.ts&appDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fexcel%2Ffile%2Froute&page=%2Fapi%2Fexcel%2Ffile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fexcel%2Ffile%2Froute.ts&appDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_ilee00_Desktop_HRC_Application_app_api_excel_file_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/excel/file/route.ts */ \"(rsc)/./app/api/excel/file/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/excel/file/route\",\n        pathname: \"/api/excel/file\",\n        filename: \"route\",\n        bundlePath: \"app/api/excel/file/route\"\n    },\n    resolvedPagePath: \"/Users/ilee00/Desktop/HRC-Application/app/api/excel/file/route.ts\",\n    nextConfigOutput,\n    userland: _Users_ilee00_Desktop_HRC_Application_app_api_excel_file_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjRfcmVhY3QtZG9tQDE5LjEuMV9yZWFjdEAxOS4xLjFfX3JlYWN0QDE5LjEuMS9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZleGNlbCUyRmZpbGUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmV4Y2VsJTJGZmlsZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmV4Y2VsJTJGZmlsZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmlsZWUwMCUyRkRlc2t0b3AlMkZIUkMtQXBwbGljYXRpb24lMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGaWxlZTAwJTJGRGVza3RvcCUyRkhSQy1BcHBsaWNhdGlvbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDaUI7QUFDOUY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9pbGVlMDAvRGVza3RvcC9IUkMtQXBwbGljYXRpb24vYXBwL2FwaS9leGNlbC9maWxlL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9leGNlbC9maWxlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZXhjZWwvZmlsZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZXhjZWwvZmlsZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9pbGVlMDAvRGVza3RvcC9IUkMtQXBwbGljYXRpb24vYXBwL2FwaS9leGNlbC9maWxlL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fexcel%2Ffile%2Froute&page=%2Fapi%2Fexcel%2Ffile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fexcel%2Ffile%2Froute.ts&appDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "constants":
/*!****************************!*\
  !*** external "constants" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("constants");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1","vendor-chunks/exceljs@4.4.0","vendor-chunks/bluebird@3.4.7","vendor-chunks/nodemailer@7.0.6","vendor-chunks/jszip@3.10.1","vendor-chunks/@fast-csv+parse@4.3.6","vendor-chunks/pako@1.0.11","vendor-chunks/uuid@8.3.2","vendor-chunks/readable-stream@3.6.2","vendor-chunks/fstream@1.0.12","vendor-chunks/unzipper@0.10.14","vendor-chunks/readable-stream@2.3.8","vendor-chunks/compress-commons@4.1.2","vendor-chunks/@fast-csv+format@4.3.5","vendor-chunks/archiver@5.3.2","vendor-chunks/tar-stream@2.2.0","vendor-chunks/graceful-fs@4.2.11","vendor-chunks/xmlchars@2.2.0","vendor-chunks/glob@7.2.3","vendor-chunks/dayjs@1.11.13","vendor-chunks/crc32-stream@4.0.3","vendor-chunks/minimatch@5.1.6","vendor-chunks/inherits@2.0.4","vendor-chunks/fs.realpath@1.0.0","vendor-chunks/buffer-indexof-polyfill@1.0.2","vendor-chunks/bl@4.1.0","vendor-chunks/binary@0.3.0","vendor-chunks/archiver-utils@3.0.4","vendor-chunks/archiver-utils@2.1.0","vendor-chunks/async@3.2.6","vendor-chunks/rimraf@2.7.1","vendor-chunks/zip-stream@4.1.1","vendor-chunks/wrappy@1.0.2","vendor-chunks/util-deprecate@1.0.2","vendor-chunks/traverse@0.3.9","vendor-chunks/tmp@0.2.5","vendor-chunks/string_decoder@1.3.0","vendor-chunks/string_decoder@1.1.1","vendor-chunks/saxes@5.0.1","vendor-chunks/safe-buffer@5.2.1","vendor-chunks/safe-buffer@5.1.2","vendor-chunks/readdir-glob@1.1.3","vendor-chunks/process-nextick-args@2.0.1","vendor-chunks/path-is-absolute@1.0.1","vendor-chunks/once@1.4.0","vendor-chunks/normalize-path@3.0.0","vendor-chunks/mkdirp@0.5.6","vendor-chunks/minimatch@3.1.2","vendor-chunks/lodash.uniq@4.5.0","vendor-chunks/lodash.union@4.6.0","vendor-chunks/lodash.isundefined@3.0.1","vendor-chunks/lodash.isplainobject@4.0.6","vendor-chunks/lodash.isnil@4.0.0","vendor-chunks/lodash.isfunction@3.0.9","vendor-chunks/lodash.isequal@4.5.0","vendor-chunks/lodash.isboolean@3.0.3","vendor-chunks/lodash.groupby@4.6.0","vendor-chunks/lodash.flatten@4.4.0","vendor-chunks/lodash.escaperegexp@4.1.2","vendor-chunks/lodash.difference@4.5.0","vendor-chunks/lodash.defaults@4.2.0","vendor-chunks/listenercount@1.0.1","vendor-chunks/lie@3.3.0","vendor-chunks/lazystream@1.0.1","vendor-chunks/isarray@1.0.0","vendor-chunks/inflight@1.0.6","vendor-chunks/immediate@3.0.6","vendor-chunks/fs-constants@1.0.0","vendor-chunks/fast-csv@4.3.6","vendor-chunks/end-of-stream@1.4.5","vendor-chunks/duplexer2@0.1.4","vendor-chunks/crc-32@1.2.2","vendor-chunks/core-util-is@1.0.3","vendor-chunks/concat-map@0.0.1","vendor-chunks/chainsaw@0.1.0","vendor-chunks/buffers@0.1.1","vendor-chunks/buffer-crc32@0.2.13","vendor-chunks/brace-expansion@2.0.2","vendor-chunks/brace-expansion@1.1.12","vendor-chunks/big-integer@1.6.52","vendor-chunks/balanced-match@1.0.2"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fexcel%2Ffile%2Froute&page=%2Fapi%2Fexcel%2Ffile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fexcel%2Ffile%2Froute.ts&appDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();