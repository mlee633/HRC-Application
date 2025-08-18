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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var _lib_dataRx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/dataRx */ \"(rsc)/./lib/dataRx.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_excelServer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/excelServer */ \"(rsc)/./lib/excelServer.ts\");\n// app/api/excel/append/route.ts\nconst runtime = \"nodejs\";\n\n\n\n\nconst SHEET_PATIENTS = \"Data_Rx\";\nconst SHEET_MEDS = \"Data_Meds\";\nasync function POST(req) {\n    try {\n        const json = await req.json(); // expects { patient: {...}, meds?: [...] }\n        const parsedPatient = _lib_dataRx__WEBPACK_IMPORTED_MODULE_0__.PatientSchema.parse(json.patient);\n        const normalized = (0,_lib_dataRx__WEBPACK_IMPORTED_MODULE_0__.normalizePatient)(parsedPatient);\n        const medsInput = Array.isArray(json.meds) ? json.meds : [];\n        const parsedMeds = medsInput.map((m)=>_lib_dataRx__WEBPACK_IMPORTED_MODULE_0__.MedicationSchema.parse(m));\n        const patientRowObj = (0,_lib_dataRx__WEBPACK_IMPORTED_MODULE_0__.toDataRxRow)(normalized);\n        const medRows = (0,_lib_dataRx__WEBPACK_IMPORTED_MODULE_0__.toMedsRows)(normalized.patientId, parsedMeds);\n        await (0,_lib_excelServer__WEBPACK_IMPORTED_MODULE_2__.ensureDataDir)();\n        const wb = await (0,_lib_excelServer__WEBPACK_IMPORTED_MODULE_2__.loadWorkbook)();\n        // --- Patients sheet ---\n        const wsP = wb.getWorksheet(SHEET_PATIENTS) ?? wb.addWorksheet(SHEET_PATIENTS);\n        if (wsP.rowCount === 0) wsP.addRow([\n            ..._lib_dataRx__WEBPACK_IMPORTED_MODULE_0__.dataRxHeaders\n        ]);\n        wsP.addRow(_lib_dataRx__WEBPACK_IMPORTED_MODULE_0__.dataRxHeaders.map((h)=>patientRowObj[h] ?? \"\"));\n        // --- Meds sheet ---\n        const wsM = wb.getWorksheet(SHEET_MEDS) ?? wb.addWorksheet(SHEET_MEDS);\n        if (wsM.rowCount === 0) wsM.addRow([\n            ..._lib_dataRx__WEBPACK_IMPORTED_MODULE_0__.medsHeaders\n        ]);\n        for (const r of medRows){\n            wsM.addRow(_lib_dataRx__WEBPACK_IMPORTED_MODULE_0__.medsHeaders.map((h)=>r[h] ?? \"\"));\n        }\n        await (0,_lib_excelServer__WEBPACK_IMPORTED_MODULE_2__.saveWorkbook)(wb);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            ok: true,\n            patientId: normalized.patientId,\n            medsAdded: medRows.length\n        });\n    } catch (err) {\n        console.error(\"Append failed:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            ok: false,\n            error: err?.message ?? \"Unknown error\"\n        }, {\n            status: 400\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2V4Y2VsL2FwcGVuZC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLGdDQUFnQztBQUN6QixNQUFNQSxVQUFVLFNBQVM7QUFFeUM7QUFFakI7QUFRbEM7QUFDd0Q7QUFFOUUsTUFBTVksaUJBQWlCO0FBQ3ZCLE1BQU1DLGFBQWE7QUFFWixlQUFlQyxLQUFLQyxHQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxJQUFJQyxJQUFJLElBQUksMkNBQTJDO1FBQzFFLE1BQU1DLGdCQUFnQlYsc0RBQWFBLENBQUNXLEtBQUssQ0FBQ0YsS0FBS0csT0FBTztRQUN0RCxNQUFNQyxhQUFhZiw2REFBZ0JBLENBQUNZO1FBRXBDLE1BQU1JLFlBQVlDLE1BQU1DLE9BQU8sQ0FBQ1AsS0FBS1EsSUFBSSxJQUFJUixLQUFLUSxJQUFJLEdBQUcsRUFBRTtRQUUzRCxNQUFNQyxhQUFhLFVBQW9DQyxHQUFHLENBQUMsQ0FBQ0MsSUFDMUQxQix5REFBZ0JBLENBQUNpQixLQUFLLENBQUNTO1FBR3pCLE1BQU1DLGdCQUFnQnRCLHdEQUFXQSxDQUFDYztRQUNsQyxNQUFNUyxVQUFVckIsdURBQVVBLENBQUNZLFdBQVdVLFNBQVMsRUFBRUw7UUFFakQsTUFBTWhCLCtEQUFhQTtRQUNuQixNQUFNc0IsS0FBSyxNQUFNckIsOERBQVlBO1FBRTdCLHlCQUF5QjtRQUN6QixNQUFNc0IsTUFBTUQsR0FBR0UsWUFBWSxDQUFDckIsbUJBQW1CbUIsR0FBR0csWUFBWSxDQUFDdEI7UUFDL0QsSUFBSW9CLElBQUlHLFFBQVEsS0FBSyxHQUFHSCxJQUFJSSxNQUFNLENBQUM7ZUFBSWpDLHNEQUFhQTtTQUFDO1FBQ3JENkIsSUFBSUksTUFBTSxDQUFDakMsc0RBQWFBLENBQUN1QixHQUFHLENBQUMsQ0FBQ1csSUFBTVQsYUFBYSxDQUFDUyxFQUFFLElBQUk7UUFFeEQscUJBQXFCO1FBQ3JCLE1BQU1DLE1BQU1QLEdBQUdFLFlBQVksQ0FBQ3BCLGVBQWVrQixHQUFHRyxZQUFZLENBQUNyQjtRQUMzRCxJQUFJeUIsSUFBSUgsUUFBUSxLQUFLLEdBQUdHLElBQUlGLE1BQU0sQ0FBQztlQUFJaEMsb0RBQVdBO1NBQUM7UUFDbkQsS0FBSyxNQUFNbUMsS0FBS1YsUUFBUztZQUN2QlMsSUFBSUYsTUFBTSxDQUFDaEMsb0RBQVdBLENBQUNzQixHQUFHLENBQUMsQ0FBQ1csSUFBTUUsQ0FBQyxDQUFDRixFQUFFLElBQUk7UUFDNUM7UUFFQSxNQUFNMUIsOERBQVlBLENBQUNvQjtRQUNuQixPQUFPN0IscURBQVlBLENBQUNjLElBQUksQ0FBQztZQUFFd0IsSUFBSTtZQUFNVixXQUFXVixXQUFXVSxTQUFTO1lBQUVXLFdBQVdaLFFBQVFhLE1BQU07UUFBQztJQUNsRyxFQUFFLE9BQU9DLEtBQVU7UUFDakJDLFFBQVFDLEtBQUssQ0FBQyxrQkFBa0JGO1FBQ2hDLE9BQU96QyxxREFBWUEsQ0FBQ2MsSUFBSSxDQUFDO1lBQUV3QixJQUFJO1lBQU9LLE9BQU9GLEtBQUtHLFdBQVc7UUFBZ0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDaEc7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2lsZWUwMC9EZXNrdG9wL0hSQy1BcHBsaWNhdGlvbi9hcHAvYXBpL2V4Y2VsL2FwcGVuZC9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvYXBpL2V4Y2VsL2FwcGVuZC9yb3V0ZS50c1xuZXhwb3J0IGNvbnN0IHJ1bnRpbWUgPSBcIm5vZGVqc1wiO1xuXG5pbXBvcnQgeyBNZWRpY2F0aW9uU2NoZW1hLCB0eXBlIE1lZGljYXRpb25Sb3dJbnB1dCB9IGZyb20gXCJAL2xpYi9kYXRhUnhcIjtcblxuaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHtcbiAgZGF0YVJ4SGVhZGVycyxcbiAgbWVkc0hlYWRlcnMsXG4gIG5vcm1hbGl6ZVBhdGllbnQsXG4gIHRvRGF0YVJ4Um93LFxuICBQYXRpZW50U2NoZW1hLFxuICB0b01lZHNSb3dzLFxufSBmcm9tIFwiQC9saWIvZGF0YVJ4XCI7XG5pbXBvcnQgeyBlbnN1cmVEYXRhRGlyLCBsb2FkV29ya2Jvb2ssIHNhdmVXb3JrYm9vayB9IGZyb20gXCJAL2xpYi9leGNlbFNlcnZlclwiO1xuXG5jb25zdCBTSEVFVF9QQVRJRU5UUyA9IFwiRGF0YV9SeFwiO1xuY29uc3QgU0hFRVRfTUVEUyA9IFwiRGF0YV9NZWRzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgcmVxLmpzb24oKTsgLy8gZXhwZWN0cyB7IHBhdGllbnQ6IHsuLi59LCBtZWRzPzogWy4uLl0gfVxuICAgIGNvbnN0IHBhcnNlZFBhdGllbnQgPSBQYXRpZW50U2NoZW1hLnBhcnNlKGpzb24ucGF0aWVudCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVBhdGllbnQocGFyc2VkUGF0aWVudCk7XG5cbiAgICBjb25zdCBtZWRzSW5wdXQgPSBBcnJheS5pc0FycmF5KGpzb24ubWVkcykgPyBqc29uLm1lZHMgOiBbXTtcbiAgICBcbiAgICBjb25zdCBwYXJzZWRNZWRzID0gKG1lZHNJbnB1dCBhcyBNZWRpY2F0aW9uUm93SW5wdXRbXSkubWFwKChtKSA9PlxuICAgICAgTWVkaWNhdGlvblNjaGVtYS5wYXJzZShtKVxuICAgICk7XG5cbiAgICBjb25zdCBwYXRpZW50Um93T2JqID0gdG9EYXRhUnhSb3cobm9ybWFsaXplZCk7XG4gICAgY29uc3QgbWVkUm93cyA9IHRvTWVkc1Jvd3Mobm9ybWFsaXplZC5wYXRpZW50SWQsIHBhcnNlZE1lZHMpO1xuXG4gICAgYXdhaXQgZW5zdXJlRGF0YURpcigpO1xuICAgIGNvbnN0IHdiID0gYXdhaXQgbG9hZFdvcmtib29rKCk7XG5cbiAgICAvLyAtLS0gUGF0aWVudHMgc2hlZXQgLS0tXG4gICAgY29uc3Qgd3NQID0gd2IuZ2V0V29ya3NoZWV0KFNIRUVUX1BBVElFTlRTKSA/PyB3Yi5hZGRXb3Jrc2hlZXQoU0hFRVRfUEFUSUVOVFMpO1xuICAgIGlmICh3c1Aucm93Q291bnQgPT09IDApIHdzUC5hZGRSb3coWy4uLmRhdGFSeEhlYWRlcnNdKTtcbiAgICB3c1AuYWRkUm93KGRhdGFSeEhlYWRlcnMubWFwKChoKSA9PiBwYXRpZW50Um93T2JqW2hdID8/IFwiXCIpKTtcblxuICAgIC8vIC0tLSBNZWRzIHNoZWV0IC0tLVxuICAgIGNvbnN0IHdzTSA9IHdiLmdldFdvcmtzaGVldChTSEVFVF9NRURTKSA/PyB3Yi5hZGRXb3Jrc2hlZXQoU0hFRVRfTUVEUyk7XG4gICAgaWYgKHdzTS5yb3dDb3VudCA9PT0gMCkgd3NNLmFkZFJvdyhbLi4ubWVkc0hlYWRlcnNdKTtcbiAgICBmb3IgKGNvbnN0IHIgb2YgbWVkUm93cykge1xuICAgICAgd3NNLmFkZFJvdyhtZWRzSGVhZGVycy5tYXAoKGgpID0+IHJbaF0gPz8gXCJcIikpO1xuICAgIH1cblxuICAgIGF3YWl0IHNhdmVXb3JrYm9vayh3Yik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgb2s6IHRydWUsIHBhdGllbnRJZDogbm9ybWFsaXplZC5wYXRpZW50SWQsIG1lZHNBZGRlZDogbWVkUm93cy5sZW5ndGggfSk7XG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihcIkFwcGVuZCBmYWlsZWQ6XCIsIGVycik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgb2s6IGZhbHNlLCBlcnJvcjogZXJyPy5tZXNzYWdlID8/IFwiVW5rbm93biBlcnJvclwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJydW50aW1lIiwiTWVkaWNhdGlvblNjaGVtYSIsIk5leHRSZXNwb25zZSIsImRhdGFSeEhlYWRlcnMiLCJtZWRzSGVhZGVycyIsIm5vcm1hbGl6ZVBhdGllbnQiLCJ0b0RhdGFSeFJvdyIsIlBhdGllbnRTY2hlbWEiLCJ0b01lZHNSb3dzIiwiZW5zdXJlRGF0YURpciIsImxvYWRXb3JrYm9vayIsInNhdmVXb3JrYm9vayIsIlNIRUVUX1BBVElFTlRTIiwiU0hFRVRfTUVEUyIsIlBPU1QiLCJyZXEiLCJqc29uIiwicGFyc2VkUGF0aWVudCIsInBhcnNlIiwicGF0aWVudCIsIm5vcm1hbGl6ZWQiLCJtZWRzSW5wdXQiLCJBcnJheSIsImlzQXJyYXkiLCJtZWRzIiwicGFyc2VkTWVkcyIsIm1hcCIsIm0iLCJwYXRpZW50Um93T2JqIiwibWVkUm93cyIsInBhdGllbnRJZCIsIndiIiwid3NQIiwiZ2V0V29ya3NoZWV0IiwiYWRkV29ya3NoZWV0Iiwicm93Q291bnQiLCJhZGRSb3ciLCJoIiwid3NNIiwiciIsIm9rIiwibWVkc0FkZGVkIiwibGVuZ3RoIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsInN0YXR1cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/excel/append/route.ts\n");

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