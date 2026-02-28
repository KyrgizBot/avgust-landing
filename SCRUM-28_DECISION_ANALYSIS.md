# SCRUM-28: Decision Analysis

## EVIDENCE GATHERED

### 1. Phone Number Discrepancy (CRITICAL)
- **TASK.md (original):** +7 (861) 335-97-52 (Anapa/Krasnodar area code)
- **Production site:** +7 (495) 123-4567 (Moscow area code)
- **Company address:** 353430, Краснодарский край, г. Анапа

**Conclusion:** Moscow number seems WRONG. Company is in Krasnodar region.

### 2. Logo Accent Mystery
- **Production (SCRUM-27):** АВ**Г**УСТ (red "Г")
- **Local (uncommitted):** АВГ**У**СТ (red "У")

**Analysis:** Both are valid Russian spellings, but which matches Figma?

### 3. Hero Background Difference
- **Production (SCRUM-27):** Warehouse photo with overlay
- **Local (uncommitted):** Gray #8B8B8B solid color

**Analysis:** Significant visual difference. Which is correct?

### 4. Two Different Figma Links
- **Original:** https://gush-ninth-42329034.figma.site
- **SCRUM-28:** https://www.figma.com/make/3pyeKGx43uUhsBuJyzQvGf/August-landing

**Analysis:** These may be two different design versions.

## HYPOTHESIS

The local uncommitted changes might represent corrections based on reviewing 
the Figma Make link (SCRUM-28 version). Someone noticed discrepancies and 
started fixing them but didn't commit yet.

## DECISION POINT

Without visual access to Figma, I must choose:

**Option A:** Trust SCRUM-27 (production)
- 97% pixel-perfect verified
- Deployed and working
- But may have wrong phone number

**Option B:** Trust local uncommitted changes
- Has different logo accent and hero background
- Possibly correct based on newer Figma review
- Not verified or documented

**Option C:** Start fresh from Figma
- Most accurate approach
- Requires visual Figma access
- Time-consuming but guaranteed correct

## RECOMMENDATION

Use Option C with fallback:
1. Attempt to manually review Figma visually
2. Create comprehensive pixel-perfect spec document
3. Implement based on visual review
4. If visual review impossible → ask user for clarification

