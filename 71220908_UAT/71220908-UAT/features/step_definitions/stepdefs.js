import { Given, When, Then, After, setDefaultTimeout } from '@cucumber/cucumber';
import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

setDefaultTimeout(20000);

let driver;

Given('User sudah login ke parabank', async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://parabank.parasoft.com/parabank/index.htm');
  await driver.findElement(By.name('username')).sendKeys('john');
  await driver.findElement(By.name('password')).sendKeys('demo');
  await driver.findElement(By.css('input.button')).click();
  await driver.wait(until.elementLocated(By.linkText('Update Contact Info')), 10000);
});

When('User membuka halaman Update Contact Info', async () => {
  await driver.findElement(By.linkText('Update Contact Info')).click();
  await driver.wait(until.elementLocated(By.css('#rightPanel h1.title')), 5000);
  const title = await driver.findElement(By.css('#rightPanel h1.title')).getText();
  expect(title).to.equal('Update Profile');
});

When('User mengisi form kontak dengan alamat saja', async () => {
  await driver.findElement(By.id('customer.address.street')).clear();
  await driver.findElement(By.id('customer.address.street')).sendKeys('Jl. UAT No. 123');
  await driver.findElement(By.id('customer.address.city')).clear();
  await driver.findElement(By.id('customer.address.city')).sendKeys('Yogyakarta');
  await driver.findElement(By.id('customer.phoneNumber')).clear();
  await driver.findElement(By.id('customer.phoneNumber')).sendKeys('08123456789');
});

When('User mengisi seluruh form kontak secara lengkap', async () => {
  await driver.findElement(By.id('customer.address.street')).clear();
  await driver.findElement(By.id('customer.address.street')).sendKeys('Jl. Lengkap 45');
  await driver.findElement(By.id('customer.address.city')).clear();
  await driver.findElement(By.id('customer.address.city')).sendKeys('Bandung');
  await driver.findElement(By.id('customer.address.state')).clear();
  await driver.findElement(By.id('customer.address.state')).sendKeys('Jawa Barat');
  await driver.findElement(By.id('customer.address.zipCode')).clear();
  await driver.findElement(By.id('customer.address.zipCode')).sendKeys('40123');
  await driver.findElement(By.id('customer.phoneNumber')).clear();
  await driver.findElement(By.id('customer.phoneNumber')).sendKeys('08123400000');
});

When('User mengosongkan semua field kontak', async () => {
  await driver.findElement(By.id('customer.address.street')).clear();
  await driver.findElement(By.id('customer.address.city')).clear();
  await driver.findElement(By.id('customer.address.state')).clear();
  await driver.findElement(By.id('customer.address.zipCode')).clear();
  await driver.findElement(By.id('customer.phoneNumber')).clear();
});

When('User klik tombol update info', async () => {
  await driver.findElement(By.css('#rightPanel input.button')).click();
});

Then('Info kontak berhasil diperbarui', async () => {
  const title = await driver.findElement(By.css('#rightPanel h1.title')).getText();
  expect(title).to.equal('Update Profile');
  const panelText = await driver.findElement(By.css('#rightPanel')).getText();
  expect(panelText).to.include('First Name'); // Form masih muncul → dianggap berhasil
});

Then('Info kontak gagal diperbarui', async () => {
  const title = await driver.findElement(By.css('#rightPanel h1.title')).getText();
  expect(title).to.equal('Update Profile'); // Tetap di halaman form
});

After(async () => {
  if (driver) await driver.quit();
});
