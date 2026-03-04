# Survey Website

## Current State
- SurveyPage shows a placeholder card ("Surveys are currently unavailable") but still renders an active "Submit Survey" button that, when clicked, immediately saves a fake record to Local Storage and shows a success state — with no real survey loaded.
- SurveyHistoryPage reads from Local Storage and renders completed records. Record count shown only when history exists. Empty state shows "No Survey History Found".
- HomePage has static survey count copy but no live counter tied to Local Storage.
- No CPX Research iframe or survey state detection logic exists.

## Requested Changes (Diff)

### Add
- `surveyLoaded` boolean state in SurveyPage, defaulting to `false` when no real survey is present.
- A CPX Research integration hook / readiness flag: a `cpxReady` state that becomes `true` only when a real CPX iframe or survey script fires a completion signal (postMessage or URL callback). Designed as a clearly marked integration point for future CPX code.
- `onSurveyComplete()` handler that triggers only when `cpxReady` is `true` (real survey completion signal received), then writes the record to Local Storage.
- Completed survey count on HomePage dynamically read from Local Storage (`surveyHistory` key), showing real completed count.

### Modify
- SurveyPage: "Submit Survey" button must be **hidden** (not just disabled) when `surveyLoaded === false`. It should only appear — and be functional — when a real survey is loaded and ready.
- SurveyPage: Remove the current click-to-submit fake flow. Submission must only happen after a real CPX completion event, not a button click alone.
- SurveyPage: The success state and "View Survey History" button still appear after a real completion, not before.
- SurveyPage: Add a clearly marked `// CPX INTEGRATION POINT` comment block where the iframe/script will be injected in the future, with a `window.addEventListener('message', ...)` listener stub for CPX postMessage callbacks.
- SurveyHistoryPage: Re-read history from Local Storage on each render (already does this but confirm it stays reactive if needed).

### Remove
- The current unconditional "Submit Survey" button that triggers submission without any real survey being loaded.
- Any logic that creates fake/demo history entries on button click without real survey completion.

## Implementation Plan
1. **SurveyPage.tsx** — Refactor completely:
   - Add `surveyLoaded` state (default `false`) and `cpxReady` state (default `false`).
   - Add `useEffect` that sets up a `window.message` listener stub (CPX integration point) — when CPX fires its completion postMessage, set `cpxReady = true` and trigger `onSurveyComplete()`.
   - `onSurveyComplete()`: saves `{ name, date, time, status: "Completed" }` to Local Storage `surveyHistory` array, then sets `submitted = true`.
   - Hide the "Submit Survey" button entirely when `surveyLoaded === false`.
   - When `surveyLoaded === true` (future: CPX iframe injected), show a "Submit Survey" button that is only active once `cpxReady === true`.
   - Add a clear `// CPX INTEGRATION POINT` comment block in the JSX where the iframe will go.
   - Show the placeholder card ("Surveys are currently unavailable") when `surveyLoaded === false`.
2. **SurveyHistoryPage.tsx** — Use `useState` + `useEffect` to read from Local Storage on mount so count is always fresh; no other structural changes needed.
3. **HomePage.tsx** — Read `surveyHistory` from Local Storage on mount and show dynamic completed survey count in the hero or stats section (e.g. "X surveys completed").
4. Apply all required `data-ocid` markers to new/changed interactive elements.
