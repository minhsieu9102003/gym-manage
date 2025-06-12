
const PaymentDAO = require('../dao/paymentDAO'); // adjust import path

describe('PaymentDAO', () => {
  let paymentDAO;
  const TEST_ID = 'TEST123';

  // ───────────────────────────── SETUP ─────────────────────────────
  beforeAll(() => {
    paymentDAO = new PaymentDAO();
  });

  beforeEach(async () => {
    // Ensure a clean slate for every test
    await paymentDAO.deletePayment(TEST_ID);
  });

  // ───────────────────────────── HELPERS ───────────────────────────
  const createTestPayment = () => ({
    id: TEST_ID,
    memberName: 'Test User',
    memberType: 'VIP',
    payDate: '2025-01-01',
    expiryDate: '2025-02-01',
    amountPay: 1_000_000.0,
    paymentStatus: 'Chưa thanh toán',
    membershipDuration: '30',
  });

  // ───────────────────────────── TESTS ─────────────────────────────
  test('addPayment', async () => {
    const payment = createTestPayment();
    const result = await paymentDAO.addPayment(payment);
    expect(result).toBeTruthy();

    // Clean-up (mirrors JUnit pattern)
    await paymentDAO.deletePayment(TEST_ID);
  });

  test('getPaymentById', async () => {
    await paymentDAO.addPayment(createTestPayment());

    const payment = await paymentDAO.getPaymentById(TEST_ID);
    expect(payment).not.toBeNull();
    expect(payment.memberName).toBe('Test User');
  });

  test('updatePayment', async () => {
    await paymentDAO.addPayment(createTestPayment());

    const updatedPayment = {
      ...createTestPayment(),
      memberName: 'Updated User',
      amountPay: 999_999.0,
    };

    const result = await paymentDAO.updatePayment(updatedPayment);
    expect(result).toBeTruthy();

    const fromDb = await paymentDAO.getPaymentById(TEST_ID);
    expect(fromDb.memberName).toBe('Updated User');
    expect(fromDb.amountPay).toBeCloseTo(999_999.0, 2);
  });

  test('getAllPayments', async () => {
    await paymentDAO.addPayment(createTestPayment());

    const payments = await paymentDAO.getAllPayments();
    expect(payments).not.toBeNull();
    expect(payments.length).toBeGreaterThan(0);
  });

  test('deletePayment', async () => {
    await paymentDAO.addPayment(createTestPayment());

    const result = await paymentDAO.deletePayment(TEST_ID);
    expect(result).toBeTruthy();

    const payment = await paymentDAO.getPaymentById(TEST_ID);
    expect(payment).toBeNull();
  });
});
