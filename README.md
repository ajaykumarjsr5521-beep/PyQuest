# PyQuest — learn Python free

A free, hands-on Python course that runs entirely in the browser. No sign-up, no install, no server.

- **41 lessons in 8 modules**: printing and variables, strings, conditions, loops, lists and dictionaries, functions, intermediate Python (comprehensions, errors, classes, modules, files), and 5 challenges
- **Real Python** in the browser via [Pyodide](https://pyodide.org) (CPython compiled to WebAssembly), running in a Web Worker so runaway loops are stopped after 8 seconds
- **Runnable examples** in every lesson, a code editor with syntax highlighting, and **instant answer checking** with specific feedback, hints and solutions
- **XP, levels and a daily streak**, plus a free-form **playground** with input support
- Progress is saved in the learner's own browser (localStorage)
- Light and dark themes, works on phones

## Run it locally

Python needs the page to be served over HTTP (browsers block WebAssembly from `file://`):

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy free on GitHub Pages

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. After a minute the site is live at `https://<username>.github.io/<repo>/`.

## Project layout

| File | What it holds |
|---|---|
| `index.html` | Page shell (top bar, sidebar, main area) |
| `style.css` | All styles, with light and dark theme tokens |
| `app.js` | Python runner, editor, routing, progress and views |
| `lessons.js` | Course content: lesson text, tasks, starter code, solutions and checks |

## Adding or editing a lesson

Each lesson in `lessons.js` has a `title`, `body` and `task` (mini-markdown), `starter` and `solution` code, a `hint`, and `tests`: Python that runs after the learner's code. Tests use `assert` with a friendly message and can read:

- `_out`: everything the program printed
- `_src`: the learner's source code
- `_run_with(x=1)` / `_ns_with(x=1)`: re-run the code with a top-level `x = ...` line replaced, returning the output or the variables

Mark a lesson `kind: 'challenge'` to award 25 XP instead of 10.

## License

Code: MIT. Course content: CC BY 4.0.
