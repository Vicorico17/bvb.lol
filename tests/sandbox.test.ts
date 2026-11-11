import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyAccount, executeTrade, restoreAccount, instruments, priceHistory, sandboxPrice } from '../lib/sandbox.ts';

test('partial close keeps the original cost basis, including an equal-size reduction', () => {
  const bought = executeTrade(emptyAccount(), 'sH2O', 20, 100);
  const reduced = executeTrade(bought, 'sH2O', -10, 110);
  assert.deepEqual(reduced.portfolio.sH2O, { quantity: 10, average: 100 });
  assert.equal(reduced.cash, 9100);
  assert.equal(reduced.cash + 10 * 110 - 10000, 200);
});
test('shorts, covers, and crossing zero preserve accounting', () => {
  const short = executeTrade(emptyAccount(), 'sTLV', -10, 100);
  const covered = executeTrade(short, 'sTLV', 5, 90);
  assert.deepEqual(covered.portfolio.sTLV, { quantity: -5, average: 100 });
  const flipped = executeTrade(covered, 'sTLV', 10, 80);
  assert.deepEqual(flipped.portfolio.sTLV, { quantity: 5, average: 80 });
  assert.equal(flipped.cash, 9750);
});
test('closing deletes the position and keeps realized gains', () => {
  const account = executeTrade(executeTrade(emptyAccount(), 'sH2O', 10, 100), 'sH2O', -10, 105);
  assert.deepEqual(account.portfolio, {});
  assert.equal(account.cash, 10050);
});
test('storage accepts zero cash and rejects malformed or unknown positions', () => {
  assert.equal(restoreAccount('{"cash":0,"portfolio":{}}').cash, 0);
  for (const raw of ['invalid', '{"cash":"10000","portfolio":{}}', '{"cash":100,"portfolio":{"unknown":{"quantity":1,"average":5}}}', '{"cash":100,"portfolio":{"sH2O":null}}', '{"version":2,"cash":100,"portfolio":{}}']) {
    assert.deepEqual(restoreAccount(raw), emptyAccount());
  }
});
test('invalid orders and unaffordable buys leave the original account intact', () => {
  const account = emptyAccount();
  assert.throws(() => executeTrade(account, 'sH2O', 101, 100), /cash/);
  assert.throws(() => executeTrade(account, 'sH2O', NaN, 100), /Invalid/);
  assert.throws(() => executeTrade(account, 'unknown', 1, 100), /Invalid/);
  assert.deepEqual(account, emptyAccount());
});
test('chart history ends at the displayed price and varies by instrument', () => {
  const now = 1700000000000;
  const history = priceHistory(instruments[0], now);
  assert.equal(history.length, 61);
  assert.equal(history.at(-1), sandboxPrice(instruments[0], now));
  assert.notDeepEqual(history, priceHistory(instruments[1], now));
});
