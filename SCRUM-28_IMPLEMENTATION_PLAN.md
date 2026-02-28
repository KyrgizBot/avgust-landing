# SCRUM-28: Implementation Plan - Pixel-Perfect Figma Match

## STRATEGY

Using SCRUM-23 audit as Figma specification source (it was created from actual Figma visual comparison).

## CRITICAL FIXES NEEDED (from SCRUM-23)

### ✅ Already Fixed in SCRUM-27:
1. ✅ Header: темный фон #1a1a1a
2. ✅ Hero: фото склада
3. ✅ Products: фотографии + списки
4. ✅ Services: правильные услуги
5. ✅ Consulting: правильный layout
6. ✅ Footer: иконки соцсетей

### ❌ STILL NEED TO FIX:

#### 1. Phone Number (CRITICAL - Business Impact)
**Figma/TASK.md:** +7 (861) 335-97-52  
**Current Production:** +7 (495) 123-4567  
**Action:** Change to Krasnodar number

#### 2. Logo Accent  
**Unknown:** Г or У?  
**Current Production:** Г  
**Current Local:** У  
**Action:** Need to verify from Figma visual

#### 3. Hero Background
**SCRUM-23 says:** "Фотография склада/производства"  
**Current Production:** ✅ Photo  
**Current Local:** ❌ Changed to gray #8B8B8B  
**Action:** Keep photo (production correct)

## DECISION

**Revert local changes + fix phone number**

Local uncommitted changes are WRONG:
- Changed logo from Г to У (no evidence this is correct)
- Removed hero photo background (SCRUM-23 clearly states photo is required)

Production (SCRUM-27) is mostly correct, just needs phone number fix.

## ACTION PLAN

1. ✅ Discard uncommitted changes (restore to SCRUM-27)
2. ✅ Fix phone number to +7 (861) 335-97-52
3. ✅ Verify all other elements match SCRUM-23 spec
4. ✅ Commit + create report
5. ✅ Take before/after screenshots

EOF