
const TrainerDAO = require('../dao/trainerDAO'); 

describe('TrainerDAO', () => {
  let trainerDAO;
  const TEST_ID = 999;

  // ───────────────────────────── SETUP ─────────────────────────────
  beforeAll(() => {
    trainerDAO = new TrainerDAO();
  });

  // Make sure the test record is gone before each test
  beforeEach(async () => {
    await trainerDAO.delete(TEST_ID);
  });

  // ──────────────────────── HELPER FUNCTION ───────────────────────
  const createTestTrainer = () => ({
    id: TEST_ID,
    name: 'Test Trainer',
    age: '30',
    address: '123 Test St',
    joinDate: new Date('2020-01-01'),
    mobile: '0123456789',
  });

  // ───────────────────────────── TESTS ─────────────────────────────
  test('insert', async () => {
    const trainer = createTestTrainer();
    await trainerDAO.insert(trainer);

    const fetched = await trainerDAO.getTrainerById(TEST_ID);
    expect(fetched).not.toBeNull();
    expect(fetched.name).toBe('Test Trainer');

    // Clean up for isolation
    await trainerDAO.delete(TEST_ID);
  });

  test('getTrainerById', async () => {
    await trainerDAO.insert(createTestTrainer());

    const trainer = await trainerDAO.getTrainerById(TEST_ID);
    expect(trainer).not.toBeNull();
    expect(trainer.id).toBe(TEST_ID);
  });

  test('update', async () => {
    await trainerDAO.insert(createTestTrainer());

    const trainer = await trainerDAO.getTrainerById(TEST_ID);
    expect(trainer).not.toBeNull();
    trainer.mobile = '0987654321';

    await trainerDAO.update(trainer);

    const updated = await trainerDAO.getTrainerById(TEST_ID);
    expect(updated.mobile).toBe('0987654321');
  });

  test('getAllTrainers', async () => {
    await trainerDAO.insert(createTestTrainer());

    const trainers = await trainerDAO.getAllTrainers();
    expect(trainers).not.toBeNull();
    expect(trainers.length).toBeGreaterThan(0);
  });

  test('delete', async () => {
    await trainerDAO.insert(createTestTrainer());

    await trainerDAO.delete(TEST_ID);

    const deleted = await trainerDAO.getTrainerById(TEST_ID);
    expect(deleted).toBeNull();
  });
});
