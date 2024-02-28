import { init } from 'z3-solver';

async function main() {
  const { Context, em } = await init();
  const Z3 = Context('main');
  
  const a = Z3.Int.const('a');
  const f = Z3.Function.declare('f', Z3.Int.sort(), Z3.Bool.sort(), Z3.Int.sort());
  const solver = new Z3.Solver();
  solver.add(a.le(10));
  solver.add(f.call(a, true).le(100));
  let check = await solver.check();
  console.log(`check ${check}`);
  if (check === 'sat') {
    const model = solver.model();
    const aVal = model.eval(a);
    console.log(`a = ${aVal}`)
  }
  em.PThread.terminateAllThreads();
}

main().catch(console.log);