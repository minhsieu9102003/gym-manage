
const MemberDAO = require('../dao/memberDAO');

describe('MemberDAO (Jest port of JUnit tests)', () => {
  let memberDAO;
  const TEST_ID = 9999;

  // ───────────────────────────── SETUP ─────────────────────────────
  beforeAll(() => {
    memberDAO = new MemberDAO();
  });

  // ──────────────────────── HELPER FUNCTIONS ──────────────────────
  const createTestMember = () => ({
    id: TEST_ID,
    firstName: 'UnitTest',
    lastName: 'Member',
    gender: 'Male',
    phoneNum: '0900000000',
    email: '1231@example.com',
    address: '123 Test Street',
    amountPay: 100.0,
    memberType: 'Monthly',
    dateRegister: new Date('2023-01-01'),
    trainer: 'TrainerA',
    payDate: new Date('2023-01-01'),
  });

  const findMemberById = async (id) => {
    const list = await memberDAO.getAllMembers();
    return list.find((m) => m.id === id);
  };

  // ───────────────────────────── TESTS ─────────────────────────────
  test('createMember', async () => {
    const member = createTestMember();
    const created = await memberDAO.createMember(member);
    expect(created).toBeTruthy();

    const fetched = await findMemberById(TEST_ID);
    expect(fetched).not.toBeNull();
    expect(fetched.firstName).toBe('UnitTest');

    // clean-up so other tests start fresh
    await memberDAO.deleteMember(TEST_ID);
  });

  test('getAllMembers', async () => {
    const members = await memberDAO.getAllMembers();
    expect(members).not.toBeNull();
    expect(members.length).toBeGreaterThan(0);
  });

  test('updateMember', async () => {
    // ensure the test record exists
    await memberDAO.createMember(createTestMember());

    let member = await findMemberById(TEST_ID);
    expect(member).not.toBeNull();

    member.phoneNum = '0988888888';
    await memberDAO.updateMember(member);

    const updated = await findMemberById(TEST_ID);
    expect(updated.phoneNum).toBe('0988888888');

    await memberDAO.deleteMember(TEST_ID);
  });

  test('createPaymentFromMemberId', async () => {
    await memberDAO.createMember(createTestMember());
    const result = await memberDAO.createPaymentFromMemberId(String(TEST_ID));
    expect(result).toBe('200');
    await memberDAO.deleteMember(TEST_ID);
  });

  test('deleteMember', async () => {
    await memberDAO.createMember(createTestMember());
    await memberDAO.deleteMember(TEST_ID);
    const deleted = await findMemberById(TEST_ID);
    expect(deleted).toBeUndefined(); // findMemberById returns undefined if not found
  });
});
