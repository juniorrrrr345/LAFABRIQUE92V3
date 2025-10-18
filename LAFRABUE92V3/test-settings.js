// Test script pour vérifier les paramètres
import { getById } from './src/utils/api.js';

async function testSettings() {
  try {
    console.log('Testing settings...');
    const data = await getById('settings', 'general');
    console.log('Settings data:', JSON.stringify(data, null, 2));
    
    if (data && data.backgroundImage) {
      console.log('Background image found:', data.backgroundImage);
    } else {
      console.log('No background image found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testSettings();