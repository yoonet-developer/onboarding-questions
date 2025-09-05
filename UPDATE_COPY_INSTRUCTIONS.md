# How to Update Application Copy

## For the Copywriter

1. **Edit the file**: `UNIFIED_FORM_COPY.txt`
2. **Keep the structure**: Don't change section headers or IDs
3. **Edit the text**: Change any text after the colons
4. **Mark your changes**: Add [EDITED] after sections you modify
5. **Save the file**: Keep the same filename

## Example Edit:

**Before:**
```
PAGE_TITLE: "Find Your Perfect VA Team"
```

**After:**
```
PAGE_TITLE: "Discover Your Ideal Virtual Assistant Team" [EDITED]
```

## Text You Can Edit:
- ✅ Titles and headings
- ✅ Questions and labels
- ✅ Button text
- ✅ Option text
- ✅ Descriptions and explanations
- ✅ Error messages
- ✅ Success messages

## Text You Should NOT Change:
- ❌ Section headers (like "SECTION 1:")
- ❌ Field IDs (like "PAGE_TITLE:")
- ❌ Variables (like ${amount} or {value})
- ❌ Structure markers (like "================")

## Dynamic Variables Explained:
- `${savings}` - Displays calculated monthly savings amount
- `${estimatedSavings}` - Same as above
- `{adminHours}` - Shows selected admin hours range
- `{value}` - Shows progress percentage
- `{name}` - Shows user's entered name
- `{company}` - Shows user's company name

## After Editing:

1. Save the file as `UNIFIED_FORM_COPY.txt`
2. Send it back to the developer
3. The application will be automatically updated with your new copy

## Tips for Better Copy:

1. **Keep it concise**: Users prefer shorter, clearer text
2. **Use active voice**: "Get your team" vs "Your team will be provided"
3. **Focus on benefits**: "Save $2000/month" vs "Reduced costs"
4. **Be specific**: "Start in 7 days" vs "Quick start"
5. **Build trust**: Include specific numbers and guarantees

## Current Copy Style Guide:

- **Tone**: Professional but friendly
- **Perspective**: Second person ("you" and "your")
- **Urgency**: Moderate (not pushy)
- **Technical level**: Non-technical, business-focused

## Questions or Issues?

If you need clarification on any text or context, please ask before making changes.

---

# For the Developer

## How to Apply Copywriter's Changes:

After receiving the edited `UNIFIED_FORM_COPY.txt` file:

1. **Review changes**: Look for [EDITED] tags
2. **Run update script**: The application will be updated automatically
3. **Test thoroughly**: Check all sections for proper display
4. **Verify variables**: Ensure dynamic content still works

## File Mapping:

The text in `UNIFIED_FORM_COPY.txt` maps to these files:
- Sections 1-2: `/app/qualification/page.tsx`
- Sections 3-8: `/components/qualification/UnifiedForm.tsx`
- Section 4: `/components/qualification/CostCalculator.tsx`
- Section 9: `/components/qualification/UpsellSection.tsx`
- Section 10-11: Various components
- Section 12: `/app/api/qualification/submit/route.ts`

## Quick Test Checklist:

After applying copy changes:
- [ ] Form loads without errors
- [ ] All text displays correctly
- [ ] Dynamic variables work (savings, percentages)
- [ ] Error messages appear when needed
- [ ] Success page shows updated text
- [ ] Mobile view looks good

## Rollback:

If issues occur, the original copy is preserved in git history.