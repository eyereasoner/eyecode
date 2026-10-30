# eyelit conformance suite

These cases test an implementation against [SPEC.md](../SPEC.md). They are
black-box: each case creates some files, runs the implementation's command
line (SPEC Section 14) and compares what it prints and its exit code with what
the specification requires. Any implementation with that command line can be
tested, not only eyelit.

```sh
node conformance/run.js                                # eyelit from this checkout, in this process
node conformance/run.js --command "path/to/my-eyelit"  # against another implementation
node conformance/run.js -k skolem                      # cases whose name contains "skolem"
node conformance/run.js 11-checking.txt -v             # one file, listing every case
```

The suite also runs with eyelit's own tests (`npm test`). `manifest.json` lists
the case files in order, with the SPEC sections and the topic of each.

## Coverage

| File | SPEC | Cases | What it tests |
| --- | --- | --- | --- |
| [03-terms.txt](03-terms.txt) | 3 | 22 | Unification, the occurs check, integers and finite floats, lists, the standard order |
| [04-programs.txt](04-programs.txt) | 4 | 42 | Statements, clause numbering, names a program leaves undefined, rejected clauses, stratification |
| [05-controls-and-primitives.txt](05-controls-and-primitives.txt) | 5 | 47 | Every control and primitive, and the errors of their flow patterns |
| [06-arithmetic.txt](06-arithmetic.txt) | 6 | 28 | The meaning of every arithmetic term and function, exact integers, and each error |
| [07-reasoning.txt](07-reasoning.txt) | 7 | 29 | Search order, forward rounds, Skolem terms, conclusions, halting, bounds |
| [08-canonical-text.txt](08-canonical-text.txt) | 8 | 18 | The one spelling of atoms, numbers, variables, lists and compounds |
| [09-reading.txt](09-reading.txt) | 9 | 41 | What a document reader accepts, and what it must reject without running anything |
| [10-proofs.txt](10-proofs.txt) | 10 | 16 | Proof documents for every kind of justification, step order and sharing |
| [11-checking.txt](11-checking.txt) | 11, 12 | 46 | Valid proofs and proofs tampered with to break each of C1-C7, with their exact reports |
| [13-unused.txt](13-unused.txt) | 13 | 9 | Unused clauses, including those a negation or collection consults |
| [14-command-line.txt](14-command-line.txt) | 14 | 23 | Options, their combinations, standard input, errors and exit codes |

## Case format

A case file holds cases, each starting with a line `=== name`. Lines starting
with `#` before a case's blocks are comments. A case has settings, one per
line as `key: value`, followed by blocks, each starting with a line
`--- name` and running to the next `---` or `===` line:

```text
=== a fact with variables binds them
spec: 10.3
args: --proof --goal "same(1, 1)" program.js
--- program.js
fact(same(X, X))
--- stdout
same(1, 1)

clause(1, fact(same(X, X)))

step(same(1, 1), clause(1), {X: 1}, [])
```

| Setting | Meaning | Default |
| --- | --- | --- |
| `spec` | The SPEC sections the case tests. | |
| `args` | The command-line arguments, split as a POSIX shell would. | `program.js` |
| `exit` | The expected exit code. | `0` |
| `stderr` | `empty`, `nonempty`, `json` (standard error is JSON), or `prefix TEXT` (it starts with `TEXT`). | not checked |
| `stdout` | `nonempty`: standard output is not empty, whatever it says. | |
| `stdout-literal` | The exact standard output as a JSON string, for output a block cannot show. | |

| Block | Meaning |
| --- | --- |
| `--- stdin` | Standard input. Without it, standard input is empty. |
| `--- stdout` | The exact standard output. Without it, standard output is not checked. |
| `--- stdout json` | Standard output, compared as JSON data rather than as text. |
| `--- NAME` | Any other block is a file of that name, created in an empty directory where the command runs. |

Trailing empty lines of a block are not part of it; every block that is not
empty ends with one line break. In an expected output line, `…` matches any
text: the specification leaves some text to the implementation, such as the
wording of a failure's detail.

## Writing cases

Expected outputs come from the specification, not from running an
implementation. When a case and eyelit disagree, the specification decides
which one is wrong.
