# Specification

## Summary
**Goal:** Remove the CPX Research survey embed from the Survey page and replace it with a static placeholder message.

**Planned changes:**
- Remove the CPX Research iframe (app_id=30743) from SurveyPage.tsx
- Remove any survey-related scripts, API calls, or widget loading logic from SurveyPage.tsx
- Replace the survey content area with the static text: "Surveys are currently unavailable. Please check back later."
- Preserve the existing Survey page layout, header section, card container styling, and overall design

**User-visible outcome:** Visiting the Survey page shows a clean placeholder message instead of the survey embed, with no background scripts or API calls running.
