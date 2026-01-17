const axios = require('axios');

const API_BASE_URL = 'https://api.dev-moyoclub.one/api';
const API_USER = {
  email: 'api@moyoclub.com',
  password: 'QGmPZmqjyatOrJaF',
};

async function testAddons() {
  try {
    // Login first
    const loginRes = await axios.post(`${API_BASE_URL}/login`, API_USER);
    const token = loginRes.data.access_token;

    // Fetch products
    const productsRes = await axios.get(`${API_BASE_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const products = productsRes.data.data;
    console.log('Total products:', products.length);
    console.log('');

    // Find products with addons
    const withAddons = products.filter(p => p.addons && p.addons.length > 0);
    console.log('Products with addons:', withAddons.length);
    console.log('');

    // Show details
    withAddons.forEach(p => {
      console.log('Product: "' + p.product_name + '" (ID: ' + p.id + ')');
      console.log('  Addons (' + p.addons.length + '):');
      p.addons.forEach(a => {
        console.log('    - "' + a.product_name + '" (ID: ' + a.id + ', Price: ' + a.price + ')');
      });
      console.log('');
    });

    // Check for "Product" and "Current"
    console.log('');
    console.log('--- Searching for "Product" and "Current" ---');
    console.log('');

    const searchTerms = ['Product', 'Current'];
    searchTerms.forEach(term => {
      const found = products.filter(p => p.product_name.toLowerCase().includes(term.toLowerCase()));
      found.forEach(p => {
        console.log('"' + p.product_name + '" (ID: ' + p.id + ')');
        const hasAddons = p.addons && p.addons.length > 0;
        console.log('  has addons:', hasAddons);
        if (hasAddons) {
          const addonNames = p.addons.map(a => a.product_name).join(', ');
          console.log('  addons:', addonNames);
        }
        console.log('');
      });
    });

  } catch (err) {
    console.error('Error:', err.message);
  }
}

testAddons();
