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
exports.id = "app/api/excel/append/route";
exports.ids = ["app/api/excel/append/route"];
exports.modules = {

/***/ "(rsc)/./app/api/excel/append/route.ts":
/*!***************************************!*\
  !*** ./app/api/excel/append/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_dataRx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/dataRx */ \"(rsc)/./lib/dataRx.ts\");\n/* harmony import */ var _lib_excelServer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/excelServer */ \"(rsc)/./lib/excelServer.ts\");\n// app/api/excel/append/route.ts\nconst runtime = \"nodejs\";\n\n\n\nconst SHEET_NAME = \"Data_Rx\";\nasync function POST(req) {\n    try {\n        const json = await req.json(); // expects { patient: {...} }\n        const parsed = _lib_dataRx__WEBPACK_IMPORTED_MODULE_1__.PatientSchema.parse(json.patient);\n        const normalized = (0,_lib_dataRx__WEBPACK_IMPORTED_MODULE_1__.normalizePatient)(parsed);\n        const rowObj = (0,_lib_dataRx__WEBPACK_IMPORTED_MODULE_1__.toDataRxRow)(normalized);\n        await (0,_lib_excelServer__WEBPACK_IMPORTED_MODULE_2__.ensureDataDir)();\n        const wb = await (0,_lib_excelServer__WEBPACK_IMPORTED_MODULE_2__.loadWorkbook)();\n        // get or create sheet (DO NOT set ws.columns here)\n        const ws = wb.getWorksheet(SHEET_NAME) ?? wb.addWorksheet(SHEET_NAME);\n        // If sheet is brand new (no rows), write a header row ONCE.\n        if (ws.rowCount === 0) {\n            ws.addRow([\n                ..._lib_dataRx__WEBPACK_IMPORTED_MODULE_1__.dataRxHeaders\n            ]);\n        }\n        // Build an array of values in the exact header order and append.\n        const values = _lib_dataRx__WEBPACK_IMPORTED_MODULE_1__.dataRxHeaders.map((h)=>rowObj[h] ?? \"\");\n        ws.addRow(values);\n        await (0,_lib_excelServer__WEBPACK_IMPORTED_MODULE_2__.saveWorkbook)(wb);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: true,\n            patientId: normalized.patientId\n        });\n    } catch (err) {\n        console.error(\"Append failed:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: false,\n            error: err?.message ?? \"Unknown error\"\n        }, {\n            status: 400\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2V4Y2VsL2FwcGVuZC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLGdDQUFnQztBQUN6QixNQUFNQSxVQUFVLFNBQVM7QUFFd0I7QUFDbUM7QUFDYjtBQUU5RSxNQUFNUyxhQUFhO0FBRVosZUFBZUMsS0FBS0MsR0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsSUFBSUMsSUFBSSxJQUFJLDZCQUE2QjtRQUM1RCxNQUFNQyxTQUFTUixzREFBYUEsQ0FBQ1MsS0FBSyxDQUFDRixLQUFLRyxPQUFPO1FBQy9DLE1BQU1DLGFBQWFiLDZEQUFnQkEsQ0FBQ1U7UUFDcEMsTUFBTUksU0FBU2Isd0RBQVdBLENBQUNZO1FBRTNCLE1BQU1WLCtEQUFhQTtRQUNuQixNQUFNWSxLQUFLLE1BQU1YLDhEQUFZQTtRQUU3QixtREFBbUQ7UUFDbkQsTUFBTVksS0FBS0QsR0FBR0UsWUFBWSxDQUFDWCxlQUFlUyxHQUFHRyxZQUFZLENBQUNaO1FBRTFELDREQUE0RDtRQUM1RCxJQUFJVSxHQUFHRyxRQUFRLEtBQUssR0FBRztZQUNyQkgsR0FBR0ksTUFBTSxDQUFDO21CQUFJckIsc0RBQWFBO2FBQUM7UUFDOUI7UUFFQSxpRUFBaUU7UUFDakUsTUFBTXNCLFNBQVN0QixzREFBYUEsQ0FBQ3VCLEdBQUcsQ0FBQyxDQUFDQyxJQUFNVCxNQUFNLENBQUNTLEVBQUUsSUFBSTtRQUNyRFAsR0FBR0ksTUFBTSxDQUFDQztRQUVWLE1BQU1oQiw4REFBWUEsQ0FBQ1U7UUFDbkIsT0FBT2pCLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFBRWUsSUFBSTtZQUFNQyxXQUFXWixXQUFXWSxTQUFTO1FBQUM7SUFDdkUsRUFBRSxPQUFPQyxLQUFVO1FBQ2pCQyxRQUFRQyxLQUFLLENBQUMsa0JBQWtCRjtRQUNoQyxPQUFPNUIscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFZSxJQUFJO1lBQU9JLE9BQU9GLEtBQUtHLFdBQVc7UUFBZ0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDaEc7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2lsZWUwMC9EZXNrdG9wL0hSQy1BcHBsaWNhdGlvbi9hcHAvYXBpL2V4Y2VsL2FwcGVuZC9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvYXBpL2V4Y2VsL2FwcGVuZC9yb3V0ZS50c1xuZXhwb3J0IGNvbnN0IHJ1bnRpbWUgPSBcIm5vZGVqc1wiO1xuXG5pbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBkYXRhUnhIZWFkZXJzLCBub3JtYWxpemVQYXRpZW50LCB0b0RhdGFSeFJvdywgUGF0aWVudFNjaGVtYSB9IGZyb20gXCJAL2xpYi9kYXRhUnhcIjtcbmltcG9ydCB7IGVuc3VyZURhdGFEaXIsIGxvYWRXb3JrYm9vaywgc2F2ZVdvcmtib29rIH0gZnJvbSBcIkAvbGliL2V4Y2VsU2VydmVyXCI7XG5cbmNvbnN0IFNIRUVUX05BTUUgPSBcIkRhdGFfUnhcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXEuanNvbigpOyAvLyBleHBlY3RzIHsgcGF0aWVudDogey4uLn0gfVxuICAgIGNvbnN0IHBhcnNlZCA9IFBhdGllbnRTY2hlbWEucGFyc2UoanNvbi5wYXRpZW50KTtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUGF0aWVudChwYXJzZWQpO1xuICAgIGNvbnN0IHJvd09iaiA9IHRvRGF0YVJ4Um93KG5vcm1hbGl6ZWQpO1xuXG4gICAgYXdhaXQgZW5zdXJlRGF0YURpcigpO1xuICAgIGNvbnN0IHdiID0gYXdhaXQgbG9hZFdvcmtib29rKCk7XG5cbiAgICAvLyBnZXQgb3IgY3JlYXRlIHNoZWV0IChETyBOT1Qgc2V0IHdzLmNvbHVtbnMgaGVyZSlcbiAgICBjb25zdCB3cyA9IHdiLmdldFdvcmtzaGVldChTSEVFVF9OQU1FKSA/PyB3Yi5hZGRXb3Jrc2hlZXQoU0hFRVRfTkFNRSk7XG5cbiAgICAvLyBJZiBzaGVldCBpcyBicmFuZCBuZXcgKG5vIHJvd3MpLCB3cml0ZSBhIGhlYWRlciByb3cgT05DRS5cbiAgICBpZiAod3Mucm93Q291bnQgPT09IDApIHtcbiAgICAgIHdzLmFkZFJvdyhbLi4uZGF0YVJ4SGVhZGVyc10pO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIGFuIGFycmF5IG9mIHZhbHVlcyBpbiB0aGUgZXhhY3QgaGVhZGVyIG9yZGVyIGFuZCBhcHBlbmQuXG4gICAgY29uc3QgdmFsdWVzID0gZGF0YVJ4SGVhZGVycy5tYXAoKGgpID0+IHJvd09ialtoXSA/PyBcIlwiKTtcbiAgICB3cy5hZGRSb3codmFsdWVzKTtcblxuICAgIGF3YWl0IHNhdmVXb3JrYm9vayh3Yik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgb2s6IHRydWUsIHBhdGllbnRJZDogbm9ybWFsaXplZC5wYXRpZW50SWQgfSk7XG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihcIkFwcGVuZCBmYWlsZWQ6XCIsIGVycik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgb2s6IGZhbHNlLCBlcnJvcjogZXJyPy5tZXNzYWdlID8/IFwiVW5rbm93biBlcnJvclwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJydW50aW1lIiwiTmV4dFJlc3BvbnNlIiwiZGF0YVJ4SGVhZGVycyIsIm5vcm1hbGl6ZVBhdGllbnQiLCJ0b0RhdGFSeFJvdyIsIlBhdGllbnRTY2hlbWEiLCJlbnN1cmVEYXRhRGlyIiwibG9hZFdvcmtib29rIiwic2F2ZVdvcmtib29rIiwiU0hFRVRfTkFNRSIsIlBPU1QiLCJyZXEiLCJqc29uIiwicGFyc2VkIiwicGFyc2UiLCJwYXRpZW50Iiwibm9ybWFsaXplZCIsInJvd09iaiIsIndiIiwid3MiLCJnZXRXb3Jrc2hlZXQiLCJhZGRXb3Jrc2hlZXQiLCJyb3dDb3VudCIsImFkZFJvdyIsInZhbHVlcyIsIm1hcCIsImgiLCJvayIsInBhdGllbnRJZCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJzdGF0dXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/excel/append/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/dataRx.ts":
/*!***********************!*\
  !*** ./lib/dataRx.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PatientSchema: () => (/* binding */ PatientSchema),\n/* harmony export */   dataRxHeaders: () => (/* binding */ dataRxHeaders),\n/* harmony export */   normalizePatient: () => (/* binding */ normalizePatient),\n/* harmony export */   toDataRxRow: () => (/* binding */ toDataRxRow)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/.pnpm/zod@3.25.67/node_modules/zod/dist/esm/index.js\");\n/* harmony import */ var ulid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ulid */ \"(rsc)/./node_modules/.pnpm/ulid@3.0.1/node_modules/ulid/dist/node/index.js\");\n// lib/dataRx.ts\n\n\nconst dataRxHeaders = [\n    \"Patient ID\",\n    \"Name\",\n    \"Age\",\n    \"Sex\",\n    \"Ethnicity\",\n    \"Date of Participation\",\n    \"Overall MRCI\",\n    \"Severity MRCI\"\n];\nfunction toDataRxRow(n) {\n    return {\n        \"Patient ID\": n.patientId,\n        \"Name\": n.name,\n        \"Age\": n.age,\n        \"Sex\": n.sex,\n        \"Ethnicity\": n.ethnicity ?? \"\",\n        \"Date of Participation\": n.dateOfParticipation ?? \"\",\n        \"Overall MRCI\": n.overallMRCI ?? \"\",\n        \"Severity MRCI\": n.severityMRCI ?? \"\"\n    };\n}\nconst PatientSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({\n    patientId: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),\n    name: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(1),\n    age: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().int().nonnegative(),\n    sex: zod__WEBPACK_IMPORTED_MODULE_0__.z[\"enum\"]([\n        \"M\",\n        \"F\",\n        \"Other\"\n    ]),\n    ethnicity: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),\n    dateOfParticipation: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),\n    overallMRCI: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().optional(),\n    severityMRCI: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional()\n});\nfunction normalizePatient(input) {\n    const parsed = PatientSchema.parse(input);\n    const patientId = parsed.patientId ?? (0,ulid__WEBPACK_IMPORTED_MODULE_1__.ulid)();\n    return {\n        ...parsed,\n        patientId\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGF0YVJ4LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGdCQUFnQjtBQUNRO0FBQ0k7QUFFckIsTUFBTUUsZ0JBQWdCO0lBQzNCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7Q0FDRCxDQUFVO0FBRUosU0FBU0MsWUFBWUMsQ0FBc0M7SUFDaEUsT0FBTztRQUNMLGNBQWNBLEVBQUVDLFNBQVM7UUFDekIsUUFBUUQsRUFBRUUsSUFBSTtRQUNkLE9BQU9GLEVBQUVHLEdBQUc7UUFDWixPQUFPSCxFQUFFSSxHQUFHO1FBQ1osYUFBYUosRUFBRUssU0FBUyxJQUFJO1FBQzVCLHlCQUF5QkwsRUFBRU0sbUJBQW1CLElBQUk7UUFDbEQsZ0JBQWdCTixFQUFFTyxXQUFXLElBQUk7UUFDakMsaUJBQWlCUCxFQUFFUSxZQUFZLElBQUk7SUFDckM7QUFDRjtBQUVPLE1BQU1DLGdCQUFnQmIseUNBQVEsQ0FBQztJQUNwQ0ssV0FBV0wseUNBQVEsR0FBR2dCLFFBQVE7SUFDOUJWLE1BQU1OLHlDQUFRLEdBQUdpQixHQUFHLENBQUM7SUFDckJWLEtBQUtQLHlDQUFRLEdBQUdtQixHQUFHLEdBQUdDLFdBQVc7SUFDakNaLEtBQUtSLDBDQUFNLENBQUM7UUFBQztRQUFLO1FBQUs7S0FBUTtJQUMvQlMsV0FBV1QseUNBQVEsR0FBR2dCLFFBQVE7SUFDOUJOLHFCQUFxQlYseUNBQVEsR0FBR2dCLFFBQVE7SUFDeENMLGFBQWFYLHlDQUFRLEdBQUdnQixRQUFRO0lBQ2hDSixjQUFjWix5Q0FBUSxHQUFHZ0IsUUFBUTtBQUNuQyxHQUFHO0FBSUksU0FBU00saUJBQWlCQyxLQUFzQjtJQUNyRCxNQUFNQyxTQUFTWCxjQUFjWSxLQUFLLENBQUNGO0lBQ25DLE1BQU1sQixZQUFZbUIsT0FBT25CLFNBQVMsSUFBSUosMENBQUlBO0lBQzFDLE9BQU87UUFBRSxHQUFHdUIsTUFBTTtRQUFFbkI7SUFBVTtBQUNoQyIsInNvdXJjZXMiOlsiL1VzZXJzL2lsZWUwMC9EZXNrdG9wL0hSQy1BcHBsaWNhdGlvbi9saWIvZGF0YVJ4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGxpYi9kYXRhUngudHNcbmltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5pbXBvcnQgeyB1bGlkIH0gZnJvbSBcInVsaWRcIjtcblxuZXhwb3J0IGNvbnN0IGRhdGFSeEhlYWRlcnMgPSBbXG4gIFwiUGF0aWVudCBJRFwiLFxuICBcIk5hbWVcIixcbiAgXCJBZ2VcIixcbiAgXCJTZXhcIixcbiAgXCJFdGhuaWNpdHlcIixcbiAgXCJEYXRlIG9mIFBhcnRpY2lwYXRpb25cIixcbiAgXCJPdmVyYWxsIE1SQ0lcIixcbiAgXCJTZXZlcml0eSBNUkNJXCIsXG5dIGFzIGNvbnN0O1xuXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRhUnhSb3cobjogUmV0dXJuVHlwZTx0eXBlb2Ygbm9ybWFsaXplUGF0aWVudD4pOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcbiAgcmV0dXJuIHtcbiAgICBcIlBhdGllbnQgSURcIjogbi5wYXRpZW50SWQsXG4gICAgXCJOYW1lXCI6IG4ubmFtZSxcbiAgICBcIkFnZVwiOiBuLmFnZSxcbiAgICBcIlNleFwiOiBuLnNleCxcbiAgICBcIkV0aG5pY2l0eVwiOiBuLmV0aG5pY2l0eSA/PyBcIlwiLFxuICAgIFwiRGF0ZSBvZiBQYXJ0aWNpcGF0aW9uXCI6IG4uZGF0ZU9mUGFydGljaXBhdGlvbiA/PyBcIlwiLFxuICAgIFwiT3ZlcmFsbCBNUkNJXCI6IG4ub3ZlcmFsbE1SQ0kgPz8gXCJcIixcbiAgICBcIlNldmVyaXR5IE1SQ0lcIjogbi5zZXZlcml0eU1SQ0kgPz8gXCJcIixcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IFBhdGllbnRTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIHBhdGllbnRJZDogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBuYW1lOiB6LnN0cmluZygpLm1pbigxKSxcbiAgYWdlOiB6Lm51bWJlcigpLmludCgpLm5vbm5lZ2F0aXZlKCksXG4gIHNleDogei5lbnVtKFtcIk1cIiwgXCJGXCIsIFwiT3RoZXJcIl0pLFxuICBldGhuaWNpdHk6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgZGF0ZU9mUGFydGljaXBhdGlvbjogei5zdHJpbmcoKS5vcHRpb25hbCgpLCAvLyBcIllZWVktTU0tRERcIlxuICBvdmVyYWxsTVJDSTogei5udW1iZXIoKS5vcHRpb25hbCgpLFxuICBzZXZlcml0eU1SQ0k6IHouc3RyaW5nKCkub3B0aW9uYWwoKSwgLy8gXCJMb3dcIiB8IFwiTW9kZXJhdGVcIiB8IFwiSGlnaFwiXG59KTtcblxuZXhwb3J0IHR5cGUgUGF0aWVudFJvd0lucHV0ID0gei5pbmZlcjx0eXBlb2YgUGF0aWVudFNjaGVtYT47XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVQYXRpZW50KGlucHV0OiBQYXRpZW50Um93SW5wdXQpIHtcbiAgY29uc3QgcGFyc2VkID0gUGF0aWVudFNjaGVtYS5wYXJzZShpbnB1dCk7XG4gIGNvbnN0IHBhdGllbnRJZCA9IHBhcnNlZC5wYXRpZW50SWQgPz8gdWxpZCgpO1xuICByZXR1cm4geyAuLi5wYXJzZWQsIHBhdGllbnRJZCB9O1xufVxuIl0sIm5hbWVzIjpbInoiLCJ1bGlkIiwiZGF0YVJ4SGVhZGVycyIsInRvRGF0YVJ4Um93IiwibiIsInBhdGllbnRJZCIsIm5hbWUiLCJhZ2UiLCJzZXgiLCJldGhuaWNpdHkiLCJkYXRlT2ZQYXJ0aWNpcGF0aW9uIiwib3ZlcmFsbE1SQ0kiLCJzZXZlcml0eU1SQ0kiLCJQYXRpZW50U2NoZW1hIiwib2JqZWN0Iiwic3RyaW5nIiwib3B0aW9uYWwiLCJtaW4iLCJudW1iZXIiLCJpbnQiLCJub25uZWdhdGl2ZSIsImVudW0iLCJub3JtYWxpemVQYXRpZW50IiwiaW5wdXQiLCJwYXJzZWQiLCJwYXJzZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/dataRx.ts\n");

/***/ }),

/***/ "(rsc)/./lib/excelServer.ts":
/*!****************************!*\
  !*** ./lib/excelServer.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DATA_DIR: () => (/* binding */ DATA_DIR),\n/* harmony export */   DATA_PATH: () => (/* binding */ DATA_PATH),\n/* harmony export */   ensureDataDir: () => (/* binding */ ensureDataDir),\n/* harmony export */   loadWorkbook: () => (/* binding */ loadWorkbook),\n/* harmony export */   saveWorkbook: () => (/* binding */ saveWorkbook)\n/* harmony export */ });\n/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! exceljs */ \"(rsc)/./node_modules/.pnpm/exceljs@4.4.0/node_modules/exceljs/excel.js\");\n/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:fs/promises */ \"node:fs/promises\");\n/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:path */ \"node:path\");\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);\n// lib/excelServer.ts\n\n\n\nconst DATA_DIR = node_path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), \"data\");\nconst DATA_PATH = node_path__WEBPACK_IMPORTED_MODULE_2___default().join(DATA_DIR, \"Data_MCI.xlsx\");\nasync function ensureDataDir() {\n    await node_fs_promises__WEBPACK_IMPORTED_MODULE_1___default().mkdir(DATA_DIR, {\n        recursive: true\n    });\n}\nasync function loadWorkbook() {\n    const wb = new (exceljs__WEBPACK_IMPORTED_MODULE_0___default().Workbook)();\n    try {\n        await wb.xlsx.readFile(DATA_PATH); // simpler & reliable on Node\n        return wb;\n    } catch  {\n        return wb; // fresh workbook on first run\n    }\n}\nasync function saveWorkbook(wb) {\n    await wb.xlsx.writeFile(DATA_PATH); // atomic overwrite of the file with all rows\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZXhjZWxTZXJ2ZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBcUI7QUFDUztBQUNJO0FBQ0w7QUFFdEIsTUFBTUcsV0FBV0QscURBQVMsQ0FBQ0csUUFBUUMsR0FBRyxJQUFJLFFBQVE7QUFDbEQsTUFBTUMsWUFBWUwscURBQVMsQ0FBQ0MsVUFBVSxpQkFBaUI7QUFFdkQsZUFBZUs7SUFDcEIsTUFBTVAsNkRBQVEsQ0FBQ0UsVUFBVTtRQUFFTyxXQUFXO0lBQUs7QUFDN0M7QUFFTyxlQUFlQztJQUNwQixNQUFNQyxLQUFLLElBQUlaLHlEQUFnQjtJQUMvQixJQUFJO1FBQ0YsTUFBTVksR0FBR0UsSUFBSSxDQUFDQyxRQUFRLENBQUNSLFlBQVksNkJBQTZCO1FBQ2hFLE9BQU9LO0lBQ1QsRUFBRSxPQUFNO1FBQ04sT0FBT0EsSUFBSSw4QkFBOEI7SUFDM0M7QUFDRjtBQUVPLGVBQWVJLGFBQWFKLEVBQW9CO0lBQ3JELE1BQU1BLEdBQUdFLElBQUksQ0FBQ0csU0FBUyxDQUFDVixZQUFZLDZDQUE2QztBQUNuRiIsInNvdXJjZXMiOlsiL1VzZXJzL2lsZWUwMC9EZXNrdG9wL0hSQy1BcHBsaWNhdGlvbi9saWIvZXhjZWxTZXJ2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL2V4Y2VsU2VydmVyLnRzXG5pbXBvcnQgRXhjZWxKUyBmcm9tIFwiZXhjZWxqc1wiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzL3Byb21pc2VzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBjb25zdCBEQVRBX0RJUiA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBcImRhdGFcIik7XG5leHBvcnQgY29uc3QgREFUQV9QQVRIID0gcGF0aC5qb2luKERBVEFfRElSLCBcIkRhdGFfTUNJLnhsc3hcIik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbnN1cmVEYXRhRGlyKCkge1xuICBhd2FpdCBmcy5ta2RpcihEQVRBX0RJUiwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkV29ya2Jvb2soKTogUHJvbWlzZTxFeGNlbEpTLldvcmtib29rPiB7XG4gIGNvbnN0IHdiID0gbmV3IEV4Y2VsSlMuV29ya2Jvb2soKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCB3Yi54bHN4LnJlYWRGaWxlKERBVEFfUEFUSCk7IC8vIHNpbXBsZXIgJiByZWxpYWJsZSBvbiBOb2RlXG4gICAgcmV0dXJuIHdiO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gd2I7IC8vIGZyZXNoIHdvcmtib29rIG9uIGZpcnN0IHJ1blxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlV29ya2Jvb2sod2I6IEV4Y2VsSlMuV29ya2Jvb2spIHtcbiAgYXdhaXQgd2IueGxzeC53cml0ZUZpbGUoREFUQV9QQVRIKTsgLy8gYXRvbWljIG92ZXJ3cml0ZSBvZiB0aGUgZmlsZSB3aXRoIGFsbCByb3dzXG59Il0sIm5hbWVzIjpbIkV4Y2VsSlMiLCJmcyIsInBhdGgiLCJEQVRBX0RJUiIsImpvaW4iLCJwcm9jZXNzIiwiY3dkIiwiREFUQV9QQVRIIiwiZW5zdXJlRGF0YURpciIsIm1rZGlyIiwicmVjdXJzaXZlIiwibG9hZFdvcmtib29rIiwid2IiLCJXb3JrYm9vayIsInhsc3giLCJyZWFkRmlsZSIsInNhdmVXb3JrYm9vayIsIndyaXRlRmlsZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/excelServer.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fexcel%2Fappend%2Froute&page=%2Fapi%2Fexcel%2Fappend%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fexcel%2Fappend%2Froute.ts&appDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fexcel%2Fappend%2Froute&page=%2Fapi%2Fexcel%2Fappend%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fexcel%2Fappend%2Froute.ts&appDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_ilee00_Desktop_HRC_Application_app_api_excel_append_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/excel/append/route.ts */ \"(rsc)/./app/api/excel/append/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/excel/append/route\",\n        pathname: \"/api/excel/append\",\n        filename: \"route\",\n        bundlePath: \"app/api/excel/append/route\"\n    },\n    resolvedPagePath: \"/Users/ilee00/Desktop/HRC-Application/app/api/excel/append/route.ts\",\n    nextConfigOutput,\n    userland: _Users_ilee00_Desktop_HRC_Application_app_api_excel_append_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjRfcmVhY3QtZG9tQDE5LjEuMV9yZWFjdEAxOS4xLjFfX3JlYWN0QDE5LjEuMS9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZleGNlbCUyRmFwcGVuZCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGZXhjZWwlMkZhcHBlbmQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZleGNlbCUyRmFwcGVuZCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmlsZWUwMCUyRkRlc2t0b3AlMkZIUkMtQXBwbGljYXRpb24lMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGaWxlZTAwJTJGRGVza3RvcCUyRkhSQy1BcHBsaWNhdGlvbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDbUI7QUFDaEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9pbGVlMDAvRGVza3RvcC9IUkMtQXBwbGljYXRpb24vYXBwL2FwaS9leGNlbC9hcHBlbmQvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2V4Y2VsL2FwcGVuZC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2V4Y2VsL2FwcGVuZFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZXhjZWwvYXBwZW5kL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2lsZWUwMC9EZXNrdG9wL0hSQy1BcHBsaWNhdGlvbi9hcHAvYXBpL2V4Y2VsL2FwcGVuZC9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fexcel%2Fappend%2Froute&page=%2Fapi%2Fexcel%2Fappend%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fexcel%2Fappend%2Froute.ts&appDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:fs/promises":
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs/promises");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1","vendor-chunks/exceljs@4.4.0","vendor-chunks/bluebird@3.4.7","vendor-chunks/jszip@3.10.1","vendor-chunks/@fast-csv+parse@4.3.6","vendor-chunks/pako@1.0.11","vendor-chunks/uuid@8.3.2","vendor-chunks/readable-stream@3.6.2","vendor-chunks/fstream@1.0.12","vendor-chunks/unzipper@0.10.14","vendor-chunks/zod@3.25.67","vendor-chunks/readable-stream@2.3.8","vendor-chunks/compress-commons@4.1.2","vendor-chunks/@fast-csv+format@4.3.5","vendor-chunks/archiver@5.3.2","vendor-chunks/tar-stream@2.2.0","vendor-chunks/graceful-fs@4.2.11","vendor-chunks/xmlchars@2.2.0","vendor-chunks/glob@7.2.3","vendor-chunks/dayjs@1.11.13","vendor-chunks/crc32-stream@4.0.3","vendor-chunks/minimatch@5.1.6","vendor-chunks/inherits@2.0.4","vendor-chunks/fs.realpath@1.0.0","vendor-chunks/buffer-indexof-polyfill@1.0.2","vendor-chunks/bl@4.1.0","vendor-chunks/binary@0.3.0","vendor-chunks/archiver-utils@3.0.4","vendor-chunks/archiver-utils@2.1.0","vendor-chunks/ulid@3.0.1","vendor-chunks/async@3.2.6","vendor-chunks/rimraf@2.7.1","vendor-chunks/zip-stream@4.1.1","vendor-chunks/wrappy@1.0.2","vendor-chunks/util-deprecate@1.0.2","vendor-chunks/traverse@0.3.9","vendor-chunks/tmp@0.2.5","vendor-chunks/string_decoder@1.3.0","vendor-chunks/string_decoder@1.1.1","vendor-chunks/saxes@5.0.1","vendor-chunks/safe-buffer@5.2.1","vendor-chunks/safe-buffer@5.1.2","vendor-chunks/readdir-glob@1.1.3","vendor-chunks/process-nextick-args@2.0.1","vendor-chunks/path-is-absolute@1.0.1","vendor-chunks/once@1.4.0","vendor-chunks/normalize-path@3.0.0","vendor-chunks/mkdirp@0.5.6","vendor-chunks/minimatch@3.1.2","vendor-chunks/lodash.uniq@4.5.0","vendor-chunks/lodash.union@4.6.0","vendor-chunks/lodash.isundefined@3.0.1","vendor-chunks/lodash.isplainobject@4.0.6","vendor-chunks/lodash.isnil@4.0.0","vendor-chunks/lodash.isfunction@3.0.9","vendor-chunks/lodash.isequal@4.5.0","vendor-chunks/lodash.isboolean@3.0.3","vendor-chunks/lodash.groupby@4.6.0","vendor-chunks/lodash.flatten@4.4.0","vendor-chunks/lodash.escaperegexp@4.1.2","vendor-chunks/lodash.difference@4.5.0","vendor-chunks/lodash.defaults@4.2.0","vendor-chunks/listenercount@1.0.1","vendor-chunks/lie@3.3.0","vendor-chunks/lazystream@1.0.1","vendor-chunks/isarray@1.0.0","vendor-chunks/inflight@1.0.6","vendor-chunks/immediate@3.0.6","vendor-chunks/fs-constants@1.0.0","vendor-chunks/fast-csv@4.3.6","vendor-chunks/end-of-stream@1.4.5","vendor-chunks/duplexer2@0.1.4","vendor-chunks/crc-32@1.2.2","vendor-chunks/core-util-is@1.0.3","vendor-chunks/concat-map@0.0.1","vendor-chunks/chainsaw@0.1.0","vendor-chunks/buffers@0.1.1","vendor-chunks/buffer-crc32@0.2.13","vendor-chunks/brace-expansion@2.0.2","vendor-chunks/brace-expansion@1.1.12","vendor-chunks/big-integer@1.6.52","vendor-chunks/balanced-match@1.0.2"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fexcel%2Fappend%2Froute&page=%2Fapi%2Fexcel%2Fappend%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fexcel%2Fappend%2Froute.ts&appDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Filee00%2FDesktop%2FHRC-Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();