#!/usr/bin/env node

/**
 * Script to apply copywriter's changes from UNIFIED_FORM_COPY.txt
 * back to the React application
 * 
 * Usage: node apply-copy-changes.js
 */

const fs = require('fs');
const path = require('path');

// Read the edited copy file
const copyFile = path.join(__dirname, 'UNIFIED_FORM_COPY.txt');
const copyContent = fs.readFileSync(copyFile, 'utf8');

// Parse the copy file into a structured object
function parseCopyFile(content) {
  const copy = {};
  const lines = content.split('\n');
  let currentSection = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines and separators
    if (!line || line.startsWith('===')) continue;
    
    // Identify sections
    if (line.startsWith('SECTION')) {
      currentSection = line.replace('SECTION ', '').replace(':', '');
      copy[currentSection] = {};
      continue;
    }
    
    // Parse key-value pairs
    if (line.includes(':') && !line.startsWith('[') && !line.startsWith('-')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      
      if (currentSection) {
        copy[currentSection][key.trim()] = value;
      }
    }
  }
  
  return copy;
}

// Apply changes to UnifiedForm.tsx
function updateUnifiedForm(copy) {
  const filePath = path.join(__dirname, 'components/qualification/UnifiedForm.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update page title
  if (copy['3']?.SECTION_TITLE) {
    content = content.replace(
      /"About Your Business"/g,
      `"${copy['3'].SECTION_TITLE}"`
    );
  }
  
  if (copy['3']?.SECTION_SUBTITLE) {
    content = content.replace(
      /"Let's understand your needs better"/g,
      `"${copy['3'].SECTION_SUBTITLE}"`
    );
  }
  
  // Update business type question
  if (copy['3']?.BUSINESS_TYPE_QUESTION) {
    content = content.replace(
      /"What type of business do you run\? \*"/g,
      `"${copy['3'].BUSINESS_TYPE_QUESTION}"`
    );
  }
  
  // Update timeline section
  if (copy['6']?.SECTION_TITLE) {
    content = content.replace(
      /"Ready to Get Started\?"/g,
      `"${copy['6'].SECTION_TITLE}"`
    );
  }
  
  // Update contact section
  if (copy['7']?.SECTION_TITLE) {
    content = content.replace(
      /"Let's Connect!"/g,
      `"${copy['7'].SECTION_TITLE}"`
    );
  }
  
  if (copy['7']?.SUBMIT_BUTTON_TEXT) {
    content = content.replace(
      /"Get Your Custom Proposal"/g,
      `"${copy['7'].SUBMIT_BUTTON_TEXT}"`
    );
  }
  
  // Update success section
  if (copy['8']?.SUCCESS_TITLE) {
    content = content.replace(
      /"Perfect Match Found!"/g,
      `"${copy['8'].SUCCESS_TITLE}"`
    );
  }
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Updated UnifiedForm.tsx');
}

// Apply changes to qualification page
function updateQualificationPage(copy) {
  const filePath = path.join(__dirname, 'app/qualification/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (copy['1']?.PAGE_TITLE) {
    content = content.replace(
      /"Find Your Perfect VA Team"/g,
      `"${copy['1'].PAGE_TITLE}"`
    );
  }
  
  if (copy['1']?.PAGE_TAGLINE) {
    content = content.replace(
      /"Takes just 2 minutes • Get instant cost savings estimate"/g,
      `"${copy['1'].PAGE_TAGLINE}"`
    );
  }
  
  if (copy['1']?.BACK_BUTTON_TEXT) {
    content = content.replace(
      /"Back to Yoonet"/g,
      `"${copy['1'].BACK_BUTTON_TEXT}"`
    );
  }
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Updated qualification page');
}

// Apply changes to CostCalculator
function updateCostCalculator(copy) {
  const filePath = path.join(__dirname, 'components/qualification/CostCalculator.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (copy['4']?.CALCULATOR_TITLE) {
    content = content.replace(
      /"Your Potential Savings"/g,
      `"${copy['4'].CALCULATOR_TITLE}"`
    );
  }
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Updated CostCalculator.tsx');
}

// Apply changes to UpsellSection
function updateUpsellSection(copy) {
  const filePath = path.join(__dirname, 'components/qualification/UpsellSection.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (copy['9']?.SECTION_TITLE) {
    content = content.replace(
      /"🚀 But That's Not All We Do\.\.\."/g,
      `"${copy['9'].SECTION_TITLE}"`
    );
  }
  
  if (copy['9']?.SECTION_SUBTITLE) {
    content = content.replace(
      /"Beyond VAs, we're your complete business transformation partner"/g,
      `"${copy['9'].SECTION_SUBTITLE}"`
    );
  }
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Updated UpsellSection.tsx');
}

// Main execution
function main() {
  console.log('📝 Applying copy changes...\n');
  
  try {
    // Parse the copy file
    const copy = parseCopyFile(copyContent);
    
    // Check for [EDITED] tags
    const editedSections = copyContent.match(/\[EDITED\]/g);
    if (editedSections) {
      console.log(`Found ${editedSections.length} edited sections\n`);
    }
    
    // Apply changes to each component
    updateUnifiedForm(copy);
    updateQualificationPage(copy);
    updateCostCalculator(copy);
    updateUpsellSection(copy);
    
    console.log('\n✅ All copy changes applied successfully!');
    console.log('📌 Remember to:');
    console.log('   1. Test the application thoroughly');
    console.log('   2. Check all dynamic variables still work');
    console.log('   3. Commit changes to git');
    
  } catch (error) {
    console.error('❌ Error applying changes:', error);
    console.log('\n💡 Tip: Make sure UNIFIED_FORM_COPY.txt exists and is properly formatted');
  }
}

// Run the script
main();