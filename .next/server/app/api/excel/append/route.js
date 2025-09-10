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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_excelServer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/excelServer */ \"(rsc)/./lib/excelServer.ts\");\n/* harmony import */ var _lib_dataRx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/dataRx */ \"(rsc)/./lib/dataRx.ts\");\n// app/api/excel/append/route.ts\nconst runtime = \"nodejs\";\n\n\n\nconst SHEET_PATIENTS = \"Data_Rx\";\nconst SHEET_MEDS = \"Data_Meds\";\nasync function POST(req) {\n    try {\n        const json = await req.json(); // expects { patient: {...}, meds?: [...] }\n        const parsedPatient = _lib_dataRx__WEBPACK_IMPORTED_MODULE_2__.PatientSchema.parse(json.patient);\n        const normalized = (0,_lib_dataRx__WEBPACK_IMPORTED_MODULE_2__.normalizePatient)(parsedPatient);\n        const medsInput = Array.isArray(json.meds) ? json.meds : [];\n        const parsedMeds = medsInput.map((m)=>_lib_dataRx__WEBPACK_IMPORTED_MODULE_2__.MedicationSchema.parse(m));\n        const patientRowObj = (0,_lib_dataRx__WEBPACK_IMPORTED_MODULE_2__.toDataRxRow)(normalized);\n        const medRows = (0,_lib_dataRx__WEBPACK_IMPORTED_MODULE_2__.toMedsRows)(normalized.patientId, parsedMeds);\n        await (0,_lib_excelServer__WEBPACK_IMPORTED_MODULE_1__.ensureDataDir)();\n        const wb = await (0,_lib_excelServer__WEBPACK_IMPORTED_MODULE_1__.loadWorkbook)();\n        // --- Patients sheet ---\n        const wsP = wb.getWorksheet(SHEET_PATIENTS) ?? wb.addWorksheet(SHEET_PATIENTS);\n        if (wsP.rowCount === 0) wsP.addRow([\n            ..._lib_dataRx__WEBPACK_IMPORTED_MODULE_2__.dataRxHeaders\n        ]);\n        wsP.addRow(_lib_dataRx__WEBPACK_IMPORTED_MODULE_2__.dataRxHeaders.map((h)=>patientRowObj[h] ?? \"\"));\n        // --- Meds sheet ---\n        const wsM = wb.getWorksheet(SHEET_MEDS) ?? wb.addWorksheet(SHEET_MEDS);\n        if (wsM.rowCount === 0) wsM.addRow([\n            ..._lib_dataRx__WEBPACK_IMPORTED_MODULE_2__.medsHeaders\n        ]);\n        for (const r of medRows){\n            wsM.addRow(_lib_dataRx__WEBPACK_IMPORTED_MODULE_2__.medsHeaders.map((h)=>r[h] ?? \"\"));\n        }\n        await (0,_lib_excelServer__WEBPACK_IMPORTED_MODULE_1__.saveWorkbook)(wb);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: true,\n            patientId: normalized.patientId,\n            medsAdded: medRows.length\n        });\n    } catch (err) {\n        console.error(\"Append failed:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: false,\n            error: err?.message ?? \"Unknown error\"\n        }, {\n            status: 400\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2V4Y2VsL2FwcGVuZC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLGdDQUFnQztBQUN6QixNQUFNQSxVQUFVLFNBQVM7QUFFd0I7QUFDc0I7QUFXeEQ7QUFFdEIsTUFBTVksaUJBQWlCO0FBQ3ZCLE1BQU1DLGFBQWE7QUFFWixlQUFlQyxLQUFLQyxHQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxJQUFJQyxJQUFJLElBQUksMkNBQTJDO1FBQzFFLE1BQU1DLGdCQUFnQlYsc0RBQWFBLENBQUNXLEtBQUssQ0FBQ0YsS0FBS0csT0FBTztRQUN0RCxNQUFNQyxhQUFhWiw2REFBZ0JBLENBQUNTO1FBRXBDLE1BQU1JLFlBQVlDLE1BQU1DLE9BQU8sQ0FBQ1AsS0FBS1EsSUFBSSxJQUFJUixLQUFLUSxJQUFJLEdBQUcsRUFBRTtRQUUzRCxNQUFNQyxhQUFhLFVBQW9DQyxHQUFHLENBQUMsQ0FBQ0MsSUFDMURqQix5REFBZ0JBLENBQUNRLEtBQUssQ0FBQ1M7UUFHekIsTUFBTUMsZ0JBQWdCbkIsd0RBQVdBLENBQUNXO1FBQ2xDLE1BQU1TLFVBQVVsQix1REFBVUEsQ0FBQ1MsV0FBV1UsU0FBUyxFQUFFTDtRQUVqRCxNQUFNdkIsK0RBQWFBO1FBQ25CLE1BQU02QixLQUFLLE1BQU01Qiw4REFBWUE7UUFFN0IseUJBQXlCO1FBQ3pCLE1BQU02QixNQUFNRCxHQUFHRSxZQUFZLENBQUNyQixtQkFBbUJtQixHQUFHRyxZQUFZLENBQUN0QjtRQUMvRCxJQUFJb0IsSUFBSUcsUUFBUSxLQUFLLEdBQUdILElBQUlJLE1BQU0sQ0FBQztlQUFJL0Isc0RBQWFBO1NBQUM7UUFDckQyQixJQUFJSSxNQUFNLENBQUMvQixzREFBYUEsQ0FBQ3FCLEdBQUcsQ0FBQyxDQUFDVyxJQUFNVCxhQUFhLENBQUNTLEVBQUUsSUFBSTtRQUV4RCxxQkFBcUI7UUFDckIsTUFBTUMsTUFBTVAsR0FBR0UsWUFBWSxDQUFDcEIsZUFBZWtCLEdBQUdHLFlBQVksQ0FBQ3JCO1FBQzNELElBQUl5QixJQUFJSCxRQUFRLEtBQUssR0FBR0csSUFBSUYsTUFBTSxDQUFDO2VBQUk5QixvREFBV0E7U0FBQztRQUNuRCxLQUFLLE1BQU1pQyxLQUFLVixRQUFTO1lBQ3ZCUyxJQUFJRixNQUFNLENBQUM5QixvREFBV0EsQ0FBQ29CLEdBQUcsQ0FBQyxDQUFDVyxJQUFNRSxDQUFDLENBQUNGLEVBQUUsSUFBSTtRQUM1QztRQUVBLE1BQU1qQyw4REFBWUEsQ0FBQzJCO1FBQ25CLE9BQU85QixxREFBWUEsQ0FBQ2UsSUFBSSxDQUFDO1lBQUV3QixJQUFJO1lBQU1WLFdBQVdWLFdBQVdVLFNBQVM7WUFBRVcsV0FBV1osUUFBUWEsTUFBTTtRQUFDO0lBQ2xHLEVBQUUsT0FBT0MsS0FBVTtRQUNqQkMsUUFBUUMsS0FBSyxDQUFDLGtCQUFrQkY7UUFDaEMsT0FBTzFDLHFEQUFZQSxDQUFDZSxJQUFJLENBQUM7WUFBRXdCLElBQUk7WUFBT0ssT0FBT0YsS0FBS0csV0FBVztRQUFnQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNoRztBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvaWxlZTAwL0Rlc2t0b3AvSFJDLUFwcGxpY2F0aW9uL2FwcC9hcGkvZXhjZWwvYXBwZW5kL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC9hcGkvZXhjZWwvYXBwZW5kL3JvdXRlLnRzXG5leHBvcnQgY29uc3QgcnVudGltZSA9IFwibm9kZWpzXCI7XG5cbmltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IGVuc3VyZURhdGFEaXIsIGxvYWRXb3JrYm9vaywgc2F2ZVdvcmtib29rIH0gZnJvbSBcIkAvbGliL2V4Y2VsU2VydmVyXCI7XG5cbmltcG9ydCB7XG4gIGRhdGFSeEhlYWRlcnMsXG4gIG1lZHNIZWFkZXJzLFxuICBQYXRpZW50U2NoZW1hLFxuICBub3JtYWxpemVQYXRpZW50LFxuICB0b0RhdGFSeFJvdyxcbiAgTWVkaWNhdGlvblNjaGVtYSxcbiAgdHlwZSBNZWRpY2F0aW9uUm93SW5wdXQsXG4gIHRvTWVkc1Jvd3MsXG59IGZyb20gXCJAL2xpYi9kYXRhUnhcIjtcblxuY29uc3QgU0hFRVRfUEFUSUVOVFMgPSBcIkRhdGFfUnhcIjtcbmNvbnN0IFNIRUVUX01FRFMgPSBcIkRhdGFfTWVkc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IHJlcS5qc29uKCk7IC8vIGV4cGVjdHMgeyBwYXRpZW50OiB7Li4ufSwgbWVkcz86IFsuLi5dIH1cbiAgICBjb25zdCBwYXJzZWRQYXRpZW50ID0gUGF0aWVudFNjaGVtYS5wYXJzZShqc29uLnBhdGllbnQpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVQYXRpZW50KHBhcnNlZFBhdGllbnQpO1xuXG4gICAgY29uc3QgbWVkc0lucHV0ID0gQXJyYXkuaXNBcnJheShqc29uLm1lZHMpID8ganNvbi5tZWRzIDogW107XG4gICAgXG4gICAgY29uc3QgcGFyc2VkTWVkcyA9IChtZWRzSW5wdXQgYXMgTWVkaWNhdGlvblJvd0lucHV0W10pLm1hcCgobSkgPT5cbiAgICAgIE1lZGljYXRpb25TY2hlbWEucGFyc2UobSlcbiAgICApO1xuXG4gICAgY29uc3QgcGF0aWVudFJvd09iaiA9IHRvRGF0YVJ4Um93KG5vcm1hbGl6ZWQpO1xuICAgIGNvbnN0IG1lZFJvd3MgPSB0b01lZHNSb3dzKG5vcm1hbGl6ZWQucGF0aWVudElkLCBwYXJzZWRNZWRzKTtcblxuICAgIGF3YWl0IGVuc3VyZURhdGFEaXIoKTtcbiAgICBjb25zdCB3YiA9IGF3YWl0IGxvYWRXb3JrYm9vaygpO1xuXG4gICAgLy8gLS0tIFBhdGllbnRzIHNoZWV0IC0tLVxuICAgIGNvbnN0IHdzUCA9IHdiLmdldFdvcmtzaGVldChTSEVFVF9QQVRJRU5UUykgPz8gd2IuYWRkV29ya3NoZWV0KFNIRUVUX1BBVElFTlRTKTtcbiAgICBpZiAod3NQLnJvd0NvdW50ID09PSAwKSB3c1AuYWRkUm93KFsuLi5kYXRhUnhIZWFkZXJzXSk7XG4gICAgd3NQLmFkZFJvdyhkYXRhUnhIZWFkZXJzLm1hcCgoaCkgPT4gcGF0aWVudFJvd09ialtoXSA/PyBcIlwiKSk7XG5cbiAgICAvLyAtLS0gTWVkcyBzaGVldCAtLS1cbiAgICBjb25zdCB3c00gPSB3Yi5nZXRXb3Jrc2hlZXQoU0hFRVRfTUVEUykgPz8gd2IuYWRkV29ya3NoZWV0KFNIRUVUX01FRFMpO1xuICAgIGlmICh3c00ucm93Q291bnQgPT09IDApIHdzTS5hZGRSb3coWy4uLm1lZHNIZWFkZXJzXSk7XG4gICAgZm9yIChjb25zdCByIG9mIG1lZFJvd3MpIHtcbiAgICAgIHdzTS5hZGRSb3cobWVkc0hlYWRlcnMubWFwKChoKSA9PiByW2hdID8/IFwiXCIpKTtcbiAgICB9XG5cbiAgICBhd2FpdCBzYXZlV29ya2Jvb2sod2IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG9rOiB0cnVlLCBwYXRpZW50SWQ6IG5vcm1hbGl6ZWQucGF0aWVudElkLCBtZWRzQWRkZWQ6IG1lZFJvd3MubGVuZ3RoIH0pO1xuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJBcHBlbmQgZmFpbGVkOlwiLCBlcnIpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG9rOiBmYWxzZSwgZXJyb3I6IGVycj8ubWVzc2FnZSA/PyBcIlVua25vd24gZXJyb3JcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsicnVudGltZSIsIk5leHRSZXNwb25zZSIsImVuc3VyZURhdGFEaXIiLCJsb2FkV29ya2Jvb2siLCJzYXZlV29ya2Jvb2siLCJkYXRhUnhIZWFkZXJzIiwibWVkc0hlYWRlcnMiLCJQYXRpZW50U2NoZW1hIiwibm9ybWFsaXplUGF0aWVudCIsInRvRGF0YVJ4Um93IiwiTWVkaWNhdGlvblNjaGVtYSIsInRvTWVkc1Jvd3MiLCJTSEVFVF9QQVRJRU5UUyIsIlNIRUVUX01FRFMiLCJQT1NUIiwicmVxIiwianNvbiIsInBhcnNlZFBhdGllbnQiLCJwYXJzZSIsInBhdGllbnQiLCJub3JtYWxpemVkIiwibWVkc0lucHV0IiwiQXJyYXkiLCJpc0FycmF5IiwibWVkcyIsInBhcnNlZE1lZHMiLCJtYXAiLCJtIiwicGF0aWVudFJvd09iaiIsIm1lZFJvd3MiLCJwYXRpZW50SWQiLCJ3YiIsIndzUCIsImdldFdvcmtzaGVldCIsImFkZFdvcmtzaGVldCIsInJvd0NvdW50IiwiYWRkUm93IiwiaCIsIndzTSIsInIiLCJvayIsIm1lZHNBZGRlZCIsImxlbmd0aCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJzdGF0dXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/excel/append/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/dataRx.ts":
/*!***********************!*\
  !*** ./lib/dataRx.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MedicationSchema: () => (/* binding */ MedicationSchema),\n/* harmony export */   PatientSchema: () => (/* binding */ PatientSchema),\n/* harmony export */   dataRxHeaders: () => (/* binding */ dataRxHeaders),\n/* harmony export */   medsHeaders: () => (/* binding */ medsHeaders),\n/* harmony export */   normalizePatient: () => (/* binding */ normalizePatient),\n/* harmony export */   toDataRxRow: () => (/* binding */ toDataRxRow),\n/* harmony export */   toMedsRows: () => (/* binding */ toMedsRows)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/.pnpm/zod@3.25.67/node_modules/zod/dist/esm/index.js\");\n/* harmony import */ var ulid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ulid */ \"(rsc)/./node_modules/.pnpm/ulid@3.0.1/node_modules/ulid/dist/node/index.js\");\n// lib/dataRx.ts\n\n\nconst dataRxHeaders = [\n    \"Patient ID\",\n    \"Name\",\n    \"Age\",\n    \"Sex\",\n    \"Ethnicity\",\n    \"Date of Participation\",\n    \"Overall MRCI\",\n    \"Severity MRCI\"\n];\n// NEW: meds sheet headers (one row per medication)\nconst medsHeaders = [\n    \"Patient ID\",\n    \"Category\",\n    \"Medication Name\",\n    \"Dosage Form\",\n    \"Strength\",\n    \"Dose\",\n    \"Frequency\",\n    \"Directions\",\n    \"ATC\"\n];\nconst PatientSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({\n    patientId: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),\n    name: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(1),\n    age: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().int().nonnegative(),\n    sex: zod__WEBPACK_IMPORTED_MODULE_0__.z[\"enum\"]([\n        \"M\",\n        \"F\",\n        \"Other\"\n    ]),\n    ethnicity: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),\n    dateOfParticipation: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),\n    overallMRCI: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().optional(),\n    severityMRCI: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional()\n});\nfunction normalizePatient(input) {\n    const parsed = PatientSchema.parse(input);\n    const patientId = parsed.patientId ?? (0,ulid__WEBPACK_IMPORTED_MODULE_1__.ulid)();\n    return {\n        ...parsed,\n        patientId\n    };\n}\nfunction toDataRxRow(n) {\n    return {\n        \"Patient ID\": n.patientId,\n        \"Name\": n.name,\n        \"Age\": n.age,\n        \"Sex\": n.sex,\n        \"Ethnicity\": n.ethnicity ?? \"\",\n        \"Date of Participation\": n.dateOfParticipation ?? \"\",\n        \"Overall MRCI\": n.overallMRCI ?? \"\",\n        \"Severity MRCI\": n.severityMRCI ?? \"\"\n    };\n}\n// ---------- Medications mapping ----------\nconst MedicationSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({\n    // These fields should match your UI Medication shape\n    name: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(1),\n    dosageForm: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),\n    frequency: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),\n    instructions: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(zod__WEBPACK_IMPORTED_MODULE_0__.z.string()).optional(),\n    category: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),\n    strength: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),\n    dose: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),\n    atc: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional()\n});\n/** Turn a meds[] array into an array of \"Data_Meds\" rows */ function toMedsRows(patientId, meds) {\n    return meds.map((m)=>({\n            \"Patient ID\": patientId,\n            \"Category\": m.category ?? \"\",\n            \"Medication Name\": m.name ?? \"\",\n            \"Dosage Form\": m.dosageForm ?? \"\",\n            \"Strength\": m.strength ?? \"\",\n            \"Dose\": m.dose ?? \"\",\n            \"Frequency\": m.frequency ?? \"\",\n            \"Directions\": (m.instructions ?? []).join(\", \"),\n            \"ATC\": m.atc ?? \"\"\n        }));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGF0YVJ4LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGdCQUFnQjtBQUNRO0FBQ0k7QUFFckIsTUFBTUUsZ0JBQWdCO0lBQzNCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7Q0FDRCxDQUFVO0FBRVgsbURBQW1EO0FBQzVDLE1BQU1DLGNBQWM7SUFDekI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0NBQ0QsQ0FBVTtBQUVKLE1BQU1DLGdCQUFnQkoseUNBQVEsQ0FBQztJQUNwQ00sV0FBV04seUNBQVEsR0FBR1EsUUFBUTtJQUM5QkMsTUFBTVQseUNBQVEsR0FBR1UsR0FBRyxDQUFDO0lBQ3JCQyxLQUFLWCx5Q0FBUSxHQUFHYSxHQUFHLEdBQUdDLFdBQVc7SUFDakNDLEtBQUtmLDBDQUFNLENBQUM7UUFBQztRQUFLO1FBQUs7S0FBUTtJQUMvQmlCLFdBQVdqQix5Q0FBUSxHQUFHUSxRQUFRO0lBQzlCVSxxQkFBcUJsQix5Q0FBUSxHQUFHUSxRQUFRO0lBQ3hDVyxhQUFhbkIseUNBQVEsR0FBR1EsUUFBUTtJQUNoQ1ksY0FBY3BCLHlDQUFRLEdBQUdRLFFBQVE7QUFDbkMsR0FBRztBQUlJLFNBQVNhLGlCQUFpQkMsS0FBc0I7SUFDckQsTUFBTUMsU0FBU25CLGNBQWNvQixLQUFLLENBQUNGO0lBQ25DLE1BQU1oQixZQUFZaUIsT0FBT2pCLFNBQVMsSUFBSUwsMENBQUlBO0lBQzFDLE9BQU87UUFBRSxHQUFHc0IsTUFBTTtRQUFFakI7SUFBVTtBQUNoQztBQUVPLFNBQVNtQixZQUFZQyxDQUFzQztJQUNoRSxPQUFPO1FBQ0wsY0FBY0EsRUFBRXBCLFNBQVM7UUFDekIsUUFBUW9CLEVBQUVqQixJQUFJO1FBQ2QsT0FBT2lCLEVBQUVmLEdBQUc7UUFDWixPQUFPZSxFQUFFWCxHQUFHO1FBQ1osYUFBYVcsRUFBRVQsU0FBUyxJQUFJO1FBQzVCLHlCQUF5QlMsRUFBRVIsbUJBQW1CLElBQUk7UUFDbEQsZ0JBQWdCUSxFQUFFUCxXQUFXLElBQUk7UUFDakMsaUJBQWlCTyxFQUFFTixZQUFZLElBQUk7SUFDckM7QUFDRjtBQUVBLDRDQUE0QztBQUVyQyxNQUFNTyxtQkFBbUIzQix5Q0FBUSxDQUFDO0lBQ3ZDLHFEQUFxRDtJQUNyRFMsTUFBTVQseUNBQVEsR0FBR1UsR0FBRyxDQUFDO0lBQ3JCa0IsWUFBWTVCLHlDQUFRLEdBQUdRLFFBQVE7SUFDL0JxQixXQUFXN0IseUNBQVEsR0FBR1EsUUFBUTtJQUM5QnNCLGNBQWM5Qix3Q0FBTyxDQUFDQSx5Q0FBUSxJQUFJUSxRQUFRO0lBQzFDd0IsVUFBVWhDLHlDQUFRLEdBQUdRLFFBQVE7SUFDN0J5QixVQUFVakMseUNBQVEsR0FBR1EsUUFBUTtJQUM3QjBCLE1BQU1sQyx5Q0FBUSxHQUFHUSxRQUFRO0lBQ3pCMkIsS0FBS25DLHlDQUFRLEdBQUdRLFFBQVE7QUFDMUIsR0FBRTtBQUlGLDBEQUEwRCxHQUNuRCxTQUFTNEIsV0FBVzlCLFNBQWlCLEVBQUUrQixJQUEwQjtJQUN0RSxPQUFPQSxLQUFLQyxHQUFHLENBQUNDLENBQUFBLElBQU07WUFDcEIsY0FBY2pDO1lBQ2QsWUFBWWlDLEVBQUVQLFFBQVEsSUFBSTtZQUMxQixtQkFBbUJPLEVBQUU5QixJQUFJLElBQUk7WUFDN0IsZUFBZThCLEVBQUVYLFVBQVUsSUFBSTtZQUMvQixZQUFZVyxFQUFFTixRQUFRLElBQUk7WUFDMUIsUUFBUU0sRUFBRUwsSUFBSSxJQUFJO1lBQ2xCLGFBQWFLLEVBQUVWLFNBQVMsSUFBSTtZQUM1QixjQUFjLENBQUNVLEVBQUVULFlBQVksSUFBSSxFQUFFLEVBQUVVLElBQUksQ0FBQztZQUMxQyxPQUFPRCxFQUFFSixHQUFHLElBQUk7UUFDbEI7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2lsZWUwMC9EZXNrdG9wL0hSQy1BcHBsaWNhdGlvbi9saWIvZGF0YVJ4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGxpYi9kYXRhUngudHNcbmltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5pbXBvcnQgeyB1bGlkIH0gZnJvbSBcInVsaWRcIjtcblxuZXhwb3J0IGNvbnN0IGRhdGFSeEhlYWRlcnMgPSBbXG4gIFwiUGF0aWVudCBJRFwiLFxuICBcIk5hbWVcIixcbiAgXCJBZ2VcIixcbiAgXCJTZXhcIixcbiAgXCJFdGhuaWNpdHlcIixcbiAgXCJEYXRlIG9mIFBhcnRpY2lwYXRpb25cIixcbiAgXCJPdmVyYWxsIE1SQ0lcIixcbiAgXCJTZXZlcml0eSBNUkNJXCIsXG5dIGFzIGNvbnN0O1xuXG4vLyBORVc6IG1lZHMgc2hlZXQgaGVhZGVycyAob25lIHJvdyBwZXIgbWVkaWNhdGlvbilcbmV4cG9ydCBjb25zdCBtZWRzSGVhZGVycyA9IFtcbiAgXCJQYXRpZW50IElEXCIsXG4gIFwiQ2F0ZWdvcnlcIixcbiAgXCJNZWRpY2F0aW9uIE5hbWVcIixcbiAgXCJEb3NhZ2UgRm9ybVwiLFxuICBcIlN0cmVuZ3RoXCIsXG4gIFwiRG9zZVwiLFxuICBcIkZyZXF1ZW5jeVwiLFxuICBcIkRpcmVjdGlvbnNcIixcbiAgXCJBVENcIixcbl0gYXMgY29uc3Q7XG5cbmV4cG9ydCBjb25zdCBQYXRpZW50U2NoZW1hID0gei5vYmplY3Qoe1xuICBwYXRpZW50SWQ6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgbmFtZTogei5zdHJpbmcoKS5taW4oMSksXG4gIGFnZTogei5udW1iZXIoKS5pbnQoKS5ub25uZWdhdGl2ZSgpLFxuICBzZXg6IHouZW51bShbXCJNXCIsIFwiRlwiLCBcIk90aGVyXCJdKSxcbiAgZXRobmljaXR5OiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGRhdGVPZlBhcnRpY2lwYXRpb246IHouc3RyaW5nKCkub3B0aW9uYWwoKSwgLy8gXCJZWVlZLU1NLUREXCJcbiAgb3ZlcmFsbE1SQ0k6IHoubnVtYmVyKCkub3B0aW9uYWwoKSxcbiAgc2V2ZXJpdHlNUkNJOiB6LnN0cmluZygpLm9wdGlvbmFsKCksIC8vIFwiTG93XCIgfCBcIk1vZGVyYXRlXCIgfCBcIkhpZ2hcIlxufSk7XG5cbmV4cG9ydCB0eXBlIFBhdGllbnRSb3dJbnB1dCA9IHouaW5mZXI8dHlwZW9mIFBhdGllbnRTY2hlbWE+O1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUGF0aWVudChpbnB1dDogUGF0aWVudFJvd0lucHV0KSB7XG4gIGNvbnN0IHBhcnNlZCA9IFBhdGllbnRTY2hlbWEucGFyc2UoaW5wdXQpO1xuICBjb25zdCBwYXRpZW50SWQgPSBwYXJzZWQucGF0aWVudElkID8/IHVsaWQoKTtcbiAgcmV0dXJuIHsgLi4ucGFyc2VkLCBwYXRpZW50SWQgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0YVJ4Um93KG46IFJldHVyblR5cGU8dHlwZW9mIG5vcm1hbGl6ZVBhdGllbnQ+KTogUmVjb3JkPHN0cmluZywgYW55PiB7XG4gIHJldHVybiB7XG4gICAgXCJQYXRpZW50IElEXCI6IG4ucGF0aWVudElkLFxuICAgIFwiTmFtZVwiOiBuLm5hbWUsXG4gICAgXCJBZ2VcIjogbi5hZ2UsXG4gICAgXCJTZXhcIjogbi5zZXgsXG4gICAgXCJFdGhuaWNpdHlcIjogbi5ldGhuaWNpdHkgPz8gXCJcIixcbiAgICBcIkRhdGUgb2YgUGFydGljaXBhdGlvblwiOiBuLmRhdGVPZlBhcnRpY2lwYXRpb24gPz8gXCJcIixcbiAgICBcIk92ZXJhbGwgTVJDSVwiOiBuLm92ZXJhbGxNUkNJID8/IFwiXCIsXG4gICAgXCJTZXZlcml0eSBNUkNJXCI6IG4uc2V2ZXJpdHlNUkNJID8/IFwiXCIsXG4gIH07XG59XG5cbi8vIC0tLS0tLS0tLS0gTWVkaWNhdGlvbnMgbWFwcGluZyAtLS0tLS0tLS0tXG5cbmV4cG9ydCBjb25zdCBNZWRpY2F0aW9uU2NoZW1hID0gei5vYmplY3Qoe1xuICAvLyBUaGVzZSBmaWVsZHMgc2hvdWxkIG1hdGNoIHlvdXIgVUkgTWVkaWNhdGlvbiBzaGFwZVxuICBuYW1lOiB6LnN0cmluZygpLm1pbigxKSxcbiAgZG9zYWdlRm9ybTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBmcmVxdWVuY3k6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgaW5zdHJ1Y3Rpb25zOiB6LmFycmF5KHouc3RyaW5nKCkpLm9wdGlvbmFsKCksXG4gIGNhdGVnb3J5OiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHN0cmVuZ3RoOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGRvc2U6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgYXRjOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG59KVxuXG5leHBvcnQgdHlwZSBNZWRpY2F0aW9uUm93SW5wdXQgPSB6LmluZmVyPHR5cGVvZiBNZWRpY2F0aW9uU2NoZW1hPlxuXG4vKiogVHVybiBhIG1lZHNbXSBhcnJheSBpbnRvIGFuIGFycmF5IG9mIFwiRGF0YV9NZWRzXCIgcm93cyAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvTWVkc1Jvd3MocGF0aWVudElkOiBzdHJpbmcsIG1lZHM6IE1lZGljYXRpb25Sb3dJbnB1dFtdKSB7XG4gIHJldHVybiBtZWRzLm1hcChtID0+ICh7XG4gICAgXCJQYXRpZW50IElEXCI6IHBhdGllbnRJZCxcbiAgICBcIkNhdGVnb3J5XCI6IG0uY2F0ZWdvcnkgPz8gXCJcIixcbiAgICBcIk1lZGljYXRpb24gTmFtZVwiOiBtLm5hbWUgPz8gXCJcIixcbiAgICBcIkRvc2FnZSBGb3JtXCI6IG0uZG9zYWdlRm9ybSA/PyBcIlwiLFxuICAgIFwiU3RyZW5ndGhcIjogbS5zdHJlbmd0aCA/PyBcIlwiLFxuICAgIFwiRG9zZVwiOiBtLmRvc2UgPz8gXCJcIixcbiAgICBcIkZyZXF1ZW5jeVwiOiBtLmZyZXF1ZW5jeSA/PyBcIlwiLFxuICAgIFwiRGlyZWN0aW9uc1wiOiAobS5pbnN0cnVjdGlvbnMgPz8gW10pLmpvaW4oXCIsIFwiKSxcbiAgICBcIkFUQ1wiOiBtLmF0YyA/PyBcIlwiLFxuICB9KSlcbn1cbiJdLCJuYW1lcyI6WyJ6IiwidWxpZCIsImRhdGFSeEhlYWRlcnMiLCJtZWRzSGVhZGVycyIsIlBhdGllbnRTY2hlbWEiLCJvYmplY3QiLCJwYXRpZW50SWQiLCJzdHJpbmciLCJvcHRpb25hbCIsIm5hbWUiLCJtaW4iLCJhZ2UiLCJudW1iZXIiLCJpbnQiLCJub25uZWdhdGl2ZSIsInNleCIsImVudW0iLCJldGhuaWNpdHkiLCJkYXRlT2ZQYXJ0aWNpcGF0aW9uIiwib3ZlcmFsbE1SQ0kiLCJzZXZlcml0eU1SQ0kiLCJub3JtYWxpemVQYXRpZW50IiwiaW5wdXQiLCJwYXJzZWQiLCJwYXJzZSIsInRvRGF0YVJ4Um93IiwibiIsIk1lZGljYXRpb25TY2hlbWEiLCJkb3NhZ2VGb3JtIiwiZnJlcXVlbmN5IiwiaW5zdHJ1Y3Rpb25zIiwiYXJyYXkiLCJjYXRlZ29yeSIsInN0cmVuZ3RoIiwiZG9zZSIsImF0YyIsInRvTWVkc1Jvd3MiLCJtZWRzIiwibWFwIiwibSIsImpvaW4iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/dataRx.ts\n");

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