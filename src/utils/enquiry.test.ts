import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateQuoteReference,
  generateContactReference,
  generateTrackingNumber,
  isValidEmail,
  isValidPhone,
  validateQuoteData,
  isValidStatusTransition
} from './enquiry';

test('generateQuoteReference returns correct format RGF-Q-YYYY-XXXXX', () => {
  const ref = generateQuoteReference(2026);
  assert.match(ref, /^RGF-Q-2026-[A-Z0-9]{5}$/);
});

test('generateContactReference returns correct format RGF-C-YYYY-XXXXX', () => {
  const ref = generateContactReference(2026);
  assert.match(ref, /^RGF-C-2026-[A-Z0-9]{5}$/);
});

test('generateTrackingNumber returns correct format RGF-TRK-XXXXXX', () => {
  const trk = generateTrackingNumber();
  assert.match(trk, /^RGF-TRK-[A-Z0-9]{6}$/);
});

test('email validation passes for valid corporate email and rejects invalid', () => {
  assert.equal(isValidEmail('logistics@royalglobalfreight.com'), true);
  assert.equal(isValidEmail('john.doe@company.co.uk'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail('no-domain@'), false);
  assert.equal(isValidEmail(''), false);
});

test('phone validation accepts standard international numbers', () => {
  assert.equal(isValidPhone('+1 (555) 019-2834'), true);
  assert.equal(isValidPhone('+44 20 7946 0991'), true);
  assert.equal(isValidPhone('12345'), false); // Too short
  assert.equal(isValidPhone(''), false);
});

test('validateQuoteData returns errors for incomplete fields and passes for valid input', () => {
  const invalidResult = validateQuoteData({});
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.shipmentMode);

  const validResult = validateQuoteData({
    fullName: 'Alexander Sterling',
    companyName: 'Sterling Global Imports Ltd',
    email: 'alex@sterlingimports.com',
    phoneNumber: '+1 415 555 2671',
    country: 'United States',
    originCountry: 'China',
    originCity: 'Shanghai',
    destinationCountry: 'United States',
    destinationCity: 'Los Angeles',
    shipmentMode: 'ocean',
    cargoType: 'Commercial Machinery Parts',
    cargoDescription: '2x 40ft High Cube containers of precision milling equipment',
    numberOfPackages: 24,
    grossWeightKg: 18500,
    incoterms: 'FOB',
    expectedShippingDate: '2026-12-01'
  });

  assert.equal(validResult.isValid, true);
  assert.deepEqual(validResult.errors, {});
});

test('isValidStatusTransition enforces logical enquiry status workflow', () => {
  assert.equal(isValidStatusTransition('New', 'Under Review'), true);
  assert.equal(isValidStatusTransition('New', 'Cancelled'), true);
  assert.equal(isValidStatusTransition('Under Review', 'Quotation Sent'), true);
  assert.equal(isValidStatusTransition('Under Review', 'Completed'), false);
});
