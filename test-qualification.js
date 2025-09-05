// Test script to verify qualification flow
const puppeteer = require('puppeteer');

async function testQualification() {
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  console.log('Testing qualification flow...');
  
  try {
    // Go to qualification page
    await page.goto('http://localhost:3000/qualification');
    await page.waitForTimeout(2000);
    
    // Stage 1 - Decision maker
    console.log('Stage 1: Clicking owner/founder...');
    await page.click('button:has-text("I\'m the owner/founder")');
    await page.waitForTimeout(1000);
    
    // Previous experience
    console.log('Selecting first time outsourcing...');
    await page.click('button:has-text("No, this would be our first time")');
    await page.waitForTimeout(1000);
    
    // Business type
    console.log('Selecting e-commerce...');
    await page.click('button:has-text("E-commerce")');
    await page.waitForTimeout(1000);
    
    // Team size
    console.log('Selecting team size...');
    await page.click('button:has-text("Small team")');
    await page.waitForTimeout(1000);
    
    // Pain point
    console.log('Selecting pain point...');
    const painPoints = await page.$$('button');
    if (painPoints.length > 0) {
      await painPoints[0].click();
    }
    await page.waitForTimeout(1000);
    
    // Timeline
    console.log('Selecting timeline...');
    await page.click('button:has-text("As soon as possible")');
    await page.waitForTimeout(1000);
    
    // Stage 2 - Platform
    console.log('Stage 2: Selecting platform...');
    await page.click('button:has-text("Shopify")');
    await page.waitForTimeout(1000);
    
    // Order volume
    console.log('Selecting order volume...');
    const orderButtons = await page.$$('button');
    if (orderButtons.length > 0) {
      await orderButtons[0].click();
    }
    await page.waitForTimeout(1000);
    
    // Bottleneck
    console.log('Selecting bottleneck...');
    const bottleneckButtons = await page.$$('button');
    if (bottleneckButtons.length > 0) {
      await bottleneckButtons[0].click();
    }
    await page.waitForTimeout(1000);
    
    // Integration
    console.log('Selecting integration approach...');
    await page.click('button:has-text("extension of our team")');
    await page.waitForTimeout(1000);
    
    // Stage 3 - Full time
    console.log('Stage 3: Selecting full-time...');
    await page.click('button:has-text("Yes, we need full-time support")');
    await page.waitForTimeout(1000);
    
    // Stage 4 - Working hours
    console.log('Stage 4: Selecting working hours...');
    const workingHoursButtons = await page.$$('button');
    if (workingHoursButtons.length > 0) {
      await workingHoursButtons[0].click();
    }
    await page.waitForTimeout(1000);
    
    // Team size
    console.log('Selecting team size needed...');
    const teamSizeButtons = await page.$$('button');
    if (teamSizeButtons.length > 0) {
      await teamSizeButtons[0].click();
    }
    await page.waitForTimeout(1000);
    
    // Skills - THIS IS WHERE THE ISSUE IS
    console.log('Testing skill selection...');
    
    // Try to click on skills
    const skillButtons = await page.$$('button');
    console.log(`Found ${skillButtons.length} buttons on skills page`);
    
    // Click first three skills
    for (let i = 0; i < Math.min(3, skillButtons.length); i++) {
      console.log(`Clicking skill ${i + 1}`);
      await skillButtons[i].click();
      await page.waitForTimeout(500);
    }
    
    // Check if selections are visible
    const selectedText = await page.$eval('p.text-sm.text-gray-600', el => el.textContent);
    console.log('Selected counter says:', selectedText);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
  
  await page.waitForTimeout(5000);
  await browser.close();
}

testQualification();