/*
  PyQuest course content.

  Each lesson:
    id, title, body (mini-markdown), task (mini-markdown),
    starter, solution, tests (Python), hint, optional stdin, optional kind: 'challenge'

  Mini-markdown: blank line = new paragraph, "- " = bullet, "### " = heading,
  ~code~ = inline code, **bold**, and code blocks fenced with ~~~ lines.
  A fence line "~~~ input: Ada|7" gives that example input lines.
  Add "norun" after ~~~ for a block without a Run button.

  Tests run after the learner's code, in the same namespace. Available helpers:
    _out          everything the program printed
    _src          the learner's source code
    _run_with(x=1)  re-run the code with a top-level "x = ..." line replaced, return printed output
    _ns_with(x=1)   same, but return the resulting variables (a dict)
  Use assert with a friendly message.
*/
(function () {
const md = String.raw, py = String.raw;

window.COURSE = [
{
  id: 'm1', title: 'Getting Started', blurb: 'Print things, store values in variables, do math and read input.',
  lessons: [
  {
    id: 'hello', title: 'Printing output',
    body: md`
A Python program is a list of instructions that run from top to bottom. The simplest instruction is ~print()~, which shows something on the screen.

~~~
print("Hello, Python!")
print(2 + 3)
~~~

Put text in quotes. Single ~'...'~ and double ~"..."~ quotes both work. Numbers don't need quotes.

Press **Run** on any example to see what it does. You can't break anything, so experiment as much as you like.
`,
    task: md`Print exactly ~Hello, World!~ (capital H, capital W, a comma and an exclamation mark).`,
    starter: py`# Write your code below
`,
    solution: py`print("Hello, World!")
`,
    hint: 'Put the text inside quotes, inside the brackets of print( ).',
    tests: py`
got = _out.strip()
assert got != "", "Nothing was printed yet. Use print(...)."
assert got == "Hello, World!", f"Expected Hello, World! but your program printed {got!r}. Check capitals, comma and punctuation."
`
  },
  {
    id: 'comments', title: 'Comments & multiple lines',
    body: md`
Each ~print()~ call starts on a new line. Everything after a ~#~ is a **comment**. Python ignores comments, so you can use them to leave notes for people reading your code.

~~~
# This whole line is a comment
print("Line one")
print("Line two")   # a comment can go at the end of a line
print()             # an empty print() gives a blank line
print("Line four")
~~~

~print()~ can show several values at once. Separate them with commas and Python puts a space between each one:

~~~
print("I am", 25, "years old")
print("a", "b", "c", sep="-")
~~~
`,
    task: md`Print three lines: ~Ready~, then ~Set~, then ~Go!~, each on its own line.`,
    starter: py`# Three lines, three prints
`,
    solution: py`print("Ready")
print("Set")
print("Go!")
`,
    hint: 'Use three separate print( ) calls, one per line.',
    tests: py`
lines = [l.strip() for l in _out.strip().splitlines()]
assert lines == ["Ready", "Set", "Go!"], f"Expected the lines Ready / Set / Go! but got {lines!r}."
`
  },
  {
    id: 'variables', title: 'Variables',
    body: md`
A **variable** is a name that points to a value. You create one with ~=~:

~~~
name = "Ada"
age = 36
print(name, "is", age)

age = age + 1          # take the old value, add 1, store it again
print("Next year:", age)
~~~

Rules for names:
- Use letters, digits and underscores, like ~total_score~ or ~player2~
- A name can't start with a digit
- Case matters: ~Age~ and ~age~ are different variables

Python programmers write names in ~snake_case~: all lowercase, with underscores between words.
`,
    task: md`Create a variable ~city~ that holds the name of a city (text), and a variable ~year~ that holds a whole number, such as ~2025~. Then print both.`,
    starter: py`# city = ...
# year = ...
`,
    solution: py`city = "Lisbon"
year = 2025
print(city, year)
`,
    hint: 'Text needs quotes: city = "Paris". Numbers do not: year = 2025. Then print(city, year).',
    tests: py`
g = globals()
assert "city" in g, "Create a variable called city."
assert isinstance(city, str) and city.strip(), "city should be some text in quotes, e.g. \"Paris\"."
assert "year" in g, "Create a variable called year."
assert isinstance(year, int) and not isinstance(year, bool), "year should be a whole number without quotes, like 2025."
assert city in _out and str(year) in _out, "Now print both variables."
`
  },
  {
    id: 'types', title: 'Data types & conversion',
    body: md`
Every value has a **type**. These are the four you'll use most:
- ~str~ is text: ~"hello"~
- ~int~ is a whole number: ~42~
- ~float~ is a decimal number: ~3.14~
- ~bool~ is ~True~ or ~False~

~~~
print(type("hi"))
print(type(42))
print(type(3.14))
print(type(True))
~~~

The type changes what an operation does. Adding two strings joins them together, while adding two numbers does math:

~~~
print("5" + "5")
print(5 + 5)
print(int("5") + int("5"))
print("Score: " + str(99))
~~~

Use ~int()~, ~float()~ and ~str()~ to convert between types. Values that come from users or files usually arrive as text, so you'll need to convert them often.
`,
    task: md`~a~ and ~b~ hold numbers stored as **text**. Convert them to numbers, add them, and store the result in ~total~ (it should be ~42~). Print ~total~.`,
    starter: py`a = "12"
b = "30"

# total = ...
`,
    solution: py`a = "12"
b = "30"

total = int(a) + int(b)
print(total)
`,
    hint: 'a + b gives "1230" because both are strings. Wrap each one in int( ) first.',
    tests: py`
assert "total" in globals(), "Create a variable called total."
assert not isinstance(total, str), f"total is the text {total!r}. Convert a and b with int() before adding."
assert total == 42, f"total is {total!r}, expected 42."
assert "42" in _out, "Print total at the end."
`
  },
  {
    id: 'math', title: 'Math operators',
    body: md`
Python works well as a calculator:
- ~+~ adds, ~-~ subtracts, ~*~ multiplies
- ~/~ divides and always gives a decimal: ~7 / 2~ is ~3.5~
- ~//~ divides and keeps only the whole number: ~7 // 2~ is ~3~
- ~%~ gives the remainder: ~7 % 2~ is ~1~
- ~**~ raises to a power: ~2 ** 3~ is ~8~

~~~
print(7 / 2)
print(7 // 2)
print(7 % 2)
print(2 ** 10)
print((1 + 2) * 3)
print(round(3.14159, 2))
~~~

Python follows the usual order of operations. Powers come first, then ~*~ and ~/~, then ~+~ and ~-~. Add parentheses when you want to be explicit.
`,
    task: md`Work out how many seconds there are in a week. Calculate it in Python from ~60~, ~60~, ~24~ and ~7~ rather than typing the answer. Store it in ~seconds_per_week~ and print it.`,
    starter: py`# seconds_per_week = ...
`,
    solution: py`seconds_per_week = 60 * 60 * 24 * 7
print(seconds_per_week)
`,
    hint: 'A minute has 60 seconds, an hour 60 minutes, a day 24 hours, a week 7 days. Multiply them.',
    tests: py`
assert "seconds_per_week" in globals(), "Create a variable called seconds_per_week."
assert seconds_per_week == 604800, f"seconds_per_week is {seconds_per_week!r}. Expected 60 * 60 * 24 * 7."
assert "*" in _src, "Let Python do the multiplication with *."
assert "604800" in _out, "Print the result."
`
  },
  {
    id: 'input', title: 'User input',
    body: md`
~input()~ pauses the program until the user types something. Whatever they type comes back as a **string**.

~~~ input: Ada
name = input("What's your name? ")
print("Hi,", name)
~~~

To use the input as a number, convert it first:

~~~ input: 7
n = int(input("Pick a number: "))
print("Double it:", n * 2)
~~~

In PyQuest, typed input comes from the **Input** box under the editor, one line for each ~input()~ call.
`,
    task: md`Ask for the user's name with ~input()~, then print ~Nice to meet you, NAME!~ with their name in place of NAME. The checker types ~Grace~ as the name.`,
    stdin: 'Grace',
    starter: py`# name = input(...)
`,
    solution: py`name = input("What is your name? ")
print(f"Nice to meet you, {name}!")
`,
    hint: 'Store input( ) in a variable, then print "Nice to meet you, " + name + "!".',
    tests: py`
assert "input(" in _src, "Use input() to ask for the name."
assert "Nice to meet you, Grace!" in _out, "When the name is Grace, your program should print: Nice to meet you, Grace!"
`
  },
  ]
},
{
  id: 'm2', title: 'Strings', blurb: 'Index, slice, format and transform strings.',
  lessons: [
  {
    id: 'strings', title: 'Indexing & length',
    body: md`
A string is a sequence of characters. Each character has a position called an **index**. Counting starts at ~0~.

~~~
word = "python"
print(len(word))      # how many characters
print(word[0])        # first character
print(word[1])        # second character
print(word[-1])       # negative indexes count back from the end
print(word + "!" * 3) # join strings with +, repeat them with *
~~~

Use ~in~ to check whether one piece of text appears inside another:

~~~
print("th" in "python")
print("z" in "python")
~~~
`,
    task: md`~word~ is given. Using indexing and ~len()~, create ~first~ (its first letter), ~last~ (its last letter) and ~length~ (how many characters it has).`,
    starter: py`word = "programming"

# first = ...
# last = ...
# length = ...
`,
    solution: py`word = "programming"

first = word[0]
last = word[-1]
length = len(word)
`,
    hint: 'word[0] is the first character, word[-1] is the last, and len(word) counts them.',
    tests: py`
g = globals()
for name in ("first", "last", "length"):
    assert name in g, f"Create a variable called {name}."
assert first == "p", f"first is {first!r}, expected 'p'."
assert last == "g", f"last is {last!r}, expected 'g'."
assert length == 11, f"length is {length!r}, expected 11."
assert "word[" in _src.replace(" ", ""), "Use indexing like word[0] rather than typing the letters."
`
  },
  {
    id: 'fstrings', title: 'f-strings',
    body: md`
An **f-string** is the easiest way to put values inside text. Put an ~f~ before the opening quote, then write any variable or expression inside ~{ }~:

~~~
name = "Lina"
apples = 3
price = 0.4
print(f"{name} bought {apples} apples")
print(f"That costs {apples * price} euros")
print(f"Rounded: {apples * price:.2f} euros")
~~~

The ~:.2f~ after a value is a format spec. It means "show 2 decimal places". You can do this with ~+~ and ~str()~ too, but f-strings are shorter and easier to read.
`,
    task: md`Using ~name~ and ~score~, print exactly ~Sam scored 42 points~ with an f-string.`,
    starter: py`name = "Sam"
score = 42

`,
    solution: py`name = "Sam"
score = 42

print(f"{name} scored {score} points")
`,
    hint: 'print(f"{name} scored ... points") with score in curly braces too.',
    tests: py`
got = _out.strip()
assert got == "Sam scored 42 points", f"Expected 'Sam scored 42 points' but got {got!r}."
assert ('f"' in _src or "f'" in _src), "Try writing it as an f-string: f\"...{name}...\""
assert "{name}" in _src.replace(" ", ""), "Put {name} inside the f-string instead of typing Sam."
`
  },
  {
    id: 'methods', title: 'String methods',
    body: md`
Strings come with built-in tools called **methods**. You call a method with a dot after the string:

~~~
s = "  Hello, World  "
print(s.upper())
print(s.lower())
print(s.strip())                 # remove spaces from both ends
print(s.replace("World", "Py"))
print("a,b,c".split(","))        # split text into a list
print("-".join(["x", "y", "z"])) # join a list back into text
~~~

Strings can't be changed in place. Every method gives you back a **new** string, so to keep the result you need to store it, for example ~s = s.strip()~.

You can also chain methods: ~s.strip().lower()~.
`,
    task: md`Clean up ~messy~. Remove the spaces around it and make it all lowercase. Store the result in ~clean~ (it should be ~"python is fun"~) and print it.`,
    starter: py`messy = "   PyThOn Is FuN   "

# clean = ...
`,
    solution: py`messy = "   PyThOn Is FuN   "

clean = messy.strip().lower()
print(clean)
`,
    hint: 'Chain two methods: messy.strip().lower()',
    tests: py`
assert "clean" in globals(), "Create a variable called clean."
assert clean == "python is fun", f"clean is {clean!r}, expected 'python is fun'."
assert "python is fun" in _out, "Print clean."
`
  },
  {
    id: 'slicing', title: 'Slicing',
    body: md`
A **slice** takes part of a string with ~[start:stop]~. It includes ~start~ and stops just before ~stop~.

~~~
s = "watermelon"
print(s[0:5])    # characters 0, 1, 2, 3, 4
print(s[5:])     # from 5 to the end
print(s[:3])     # from the start up to 3
print(s[-5:])    # the last 5 characters
print(s[::2])    # every second character
print(s[::-1])   # step backwards: reversed!
~~~

Slices work exactly the same way on lists, which you'll meet soon.
`,
    task: md`~s~ is given. Store the reversed string in ~backwards~ and the first three letters in ~start~.`,
    starter: py`s = "stressed"

# backwards = ...
# start = ...
`,
    solution: py`s = "stressed"

backwards = s[::-1]
start = s[:3]
`,
    hint: 's[::-1] reverses a string. s[:3] takes the first three characters.',
    tests: py`
assert "backwards" in globals(), "Create a variable called backwards."
assert backwards == "desserts", f"backwards is {backwards!r}, expected 'desserts'."
assert "start" in globals(), "Create a variable called start."
assert start == "str", f"start is {start!r}, expected 'str'."
assert "s[" in _src.replace(" ", ""), "Use slicing on s."
`
  },
  ]
},
{
  id: 'm3', title: 'Conditions', blurb: 'Booleans, comparisons and if / elif / else.',
  lessons: [
  {
    id: 'booleans', title: 'Booleans & comparisons',
    body: md`
A comparison always gives you a **boolean**, either ~True~ or ~False~:
- ~==~ equal to, ~!=~ not equal to
- ~<~ less than, ~>~ greater than
- ~<=~ less than or equal to, ~>=~ greater than or equal to

~~~
age = 20
print(age > 18)
print(age == 21)
print(age != 21)
print("cat" == "Cat")   # case matters
~~~

Watch out: a single ~=~ **stores** a value, while a double ~==~ **compares** two values.
`,
    task: md`~age~ is given. Create ~is_adult~ so that it is ~True~ when ~age~ is 18 or more and ~False~ otherwise. Use a comparison, not the words True or False.`,
    starter: py`age = 20

# is_adult = ...
`,
    solution: py`age = 20

is_adult = age >= 18
`,
    hint: 'is_adult = age >= 18 stores the result of the comparison.',
    tests: py`
assert "is_adult" in globals(), "Create a variable called is_adult."
for a, want in [(20, True), (18, True), (17, False), (5, False)]:
    got = _ns_with(age=a).get("is_adult")
    assert got is want, f"With age = {a}, is_adult should be {want} but it was {got!r}."
`
  },
  {
    id: 'if', title: 'if / else',
    body: md`
~if~ runs a block of code only when its condition is ~True~. ~else~ runs when the condition is ~False~.

~~~
temperature = 30
if temperature > 25:
    print("Hot day!")
    print("Drink water.")
else:
    print("Not that hot.")
print("This line always runs.")
~~~

The colon ~:~ and the **indentation** (4 spaces) matter. They tell Python which lines belong inside the ~if~. Python uses indentation where many other languages use braces.
`,
    task: md`Print ~pass~ if ~score~ is 50 or more, otherwise print ~fail~. The checker also tries other values of ~score~, so don't change the first line's shape.`,
    starter: py`score = 73

# Write your if / else below
`,
    solution: py`score = 73

if score >= 50:
    print("pass")
else:
    print("fail")
`,
    hint: 'if score >= 50:  then an indented print("pass"), then else:  and an indented print("fail").',
    tests: py`
for v, want in [(73, "pass"), (50, "pass"), (49, "fail"), (0, "fail")]:
    got = _run_with(score=v).strip()
    assert got == want, f"With score = {v} your code printed {got!r}, expected {want!r}."
`
  },
  {
    id: 'elif', title: 'elif chains',
    body: md`
~elif~ is short for "else if". It lets you check several conditions in order. Python runs the **first** block whose condition is ~True~ and skips all the rest.

~~~
hour = 14
if hour < 12:
    print("Good morning")
elif hour < 18:
    print("Good afternoon")
else:
    print("Good evening")
~~~

The order matters. If you checked ~hour < 18~ first, the morning case would never run.
`,
    task: md`~temp~ is given. Print ~hot~ if it is above 25, ~mild~ if it is 15 to 25 (inclusive), and ~cold~ otherwise.`,
    starter: py`temp = 30

`,
    solution: py`temp = 30

if temp > 25:
    print("hot")
elif temp >= 15:
    print("mild")
else:
    print("cold")
`,
    hint: 'Check temp > 25 first, then elif temp >= 15, then else.',
    tests: py`
for v, want in [(30, "hot"), (26, "hot"), (25, "mild"), (15, "mild"), (14, "cold"), (-5, "cold")]:
    got = _run_with(temp=v).strip()
    assert got == want, f"With temp = {v} your code printed {got!r}, expected {want!r}."
`
  },
  {
    id: 'logic', title: 'Logical operators',
    body: md`
Use these words to combine conditions:
- ~and~ is True only if **both** sides are True
- ~or~ is True if **at least one** side is True
- ~not~ flips True and False

~~~
sunny = True
warm = False
print(sunny and warm)
print(sunny or warm)
print(not warm)

age = 30
print(age >= 18 and age < 65)
print(18 <= age < 65)   # Python lets you chain comparisons
~~~
`,
    task: md`A person can enter if they have a ticket **and** they are at least 12 years old. Set ~can_enter~ to the right boolean using ~has_ticket~ and ~age~.`,
    starter: py`age = 15
has_ticket = True

# can_enter = ...
`,
    solution: py`age = 15
has_ticket = True

can_enter = has_ticket and age >= 12
`,
    hint: 'can_enter = has_ticket and age >= 12',
    tests: py`
assert "can_enter" in globals(), "Create a variable called can_enter."
cases = [(15, True, True), (12, True, True), (11, True, False), (30, False, False), (5, False, False)]
for a, t, want in cases:
    got = _ns_with(age=a, has_ticket=t).get("can_enter")
    assert got == want, f"With age = {a} and has_ticket = {t}, can_enter should be {want} but was {got!r}."
`
  },
  ]
},
{
  id: 'm4', title: 'Loops', blurb: 'Repeat work with for and while, and control loops with break and continue.',
  lessons: [
  {
    id: 'for', title: 'for loops & range()',
    body: md`
A ~for~ loop repeats a block once for each item in a sequence. ~range()~ gives you a sequence of numbers:
- ~range(5)~ gives 0, 1, 2, 3, 4
- ~range(2, 6)~ gives 2, 3, 4, 5
- ~range(0, 10, 3)~ gives 0, 3, 6, 9

~~~
for i in range(3):
    print("Round", i)

for letter in "hey":
    print(letter.upper())
~~~

The loop variable (~i~ or ~letter~ above) takes the next value each time the loop runs.
`,
    task: md`Use a loop to print the numbers ~1~ to ~5~, each on its own line.`,
    starter: py`# for ... in range(...):
`,
    solution: py`for i in range(1, 6):
    print(i)
`,
    hint: 'range(1, 6) gives 1, 2, 3, 4, 5. The stop value is not included.',
    tests: py`
lines = _out.split()
assert lines == ["1", "2", "3", "4", "5"], f"Expected 1 2 3 4 5 on separate lines, got {lines!r}."
assert "for" in _src or "while" in _src, "Use a loop rather than five print calls."
`
  },
  {
    id: 'accumulate', title: 'Running totals',
    body: md`
A common pattern is to start with an empty total and add to it on every pass through a loop:

~~~
total = 0
for n in range(1, 5):
    total = total + n     # or: total += n
    print("added", n, "-> total is", total)
print("Final:", total)
~~~

The same idea works for counting things, building up text, finding the biggest value and much more.
`,
    task: md`Use a loop to add up every number from 1 to 100 (inclusive) into ~total~, then print it. Don't use ~sum()~ this time.`,
    starter: py`total = 0

# loop here
`,
    solution: py`total = 0

for n in range(1, 101):
    total += n
print(total)
`,
    hint: 'for n in range(1, 101): total += n',
    tests: py`
assert "total" in globals(), "Keep the variable total."
assert total == 5050, f"total is {total!r}, expected 5050. Is 100 included?"
assert "for" in _src or "while" in _src, "Use a loop."
assert "sum(" not in _src, "Try it without sum() this time."
assert "5050" in _out, "Print total."
`
  },
  {
    id: 'while', title: 'while loops',
    body: md`
A ~while~ loop keeps repeating as long as its condition is ~True~:

~~~
lives = 3
while lives > 0:
    print("Lives left:", lives)
    lives -= 1
print("Game over")
~~~

Make sure something inside the loop eventually makes the condition ~False~. If nothing does, the loop runs forever. PyQuest stops runaway code after a few seconds.
`,
    task: md`Use a ~while~ loop to count down ~5~, ~4~, ~3~, ~2~, ~1~ (one number per line), then print ~Liftoff!~`,
    starter: py`n = 5

`,
    solution: py`n = 5

while n > 0:
    print(n)
    n -= 1
print("Liftoff!")
`,
    hint: 'while n > 0: print(n) then n -= 1. Print "Liftoff!" after the loop (not indented).',
    tests: py`
lines = [l.strip() for l in _out.strip().splitlines()]
assert lines == ["5", "4", "3", "2", "1", "Liftoff!"], f"Expected 5 4 3 2 1 Liftoff! on separate lines, got {lines!r}."
assert "while" in _src, "Use a while loop for this one."
`
  },
  {
    id: 'break', title: 'break & continue',
    body: md`
- ~break~ leaves the loop immediately
- ~continue~ skips the rest of the current pass and moves on to the next one

~~~
for n in range(1, 10):
    if n == 6:
        break          # stop the whole loop
    if n % 2 == 0:
        continue       # skip even numbers
    print(n)
~~~

~n % 3 == 0~ is a handy test for "is n divisible by 3?".
`,
    task: md`Print the numbers from 1 to 10, but **skip** every multiple of 3. The output should be 1 2 4 5 7 8 10.`,
    starter: py`for n in range(1, 11):
    # your code here
    print(n)
`,
    solution: py`for n in range(1, 11):
    if n % 3 == 0:
        continue
    print(n)
`,
    hint: 'Inside the loop: if n % 3 == 0: continue, before the print.',
    tests: py`
lines = _out.split()
assert lines == ["1", "2", "4", "5", "7", "8", "10"], f"Expected 1 2 4 5 7 8 10, got {' '.join(lines)!r}."
`
  },
  {
    id: 'fizzbuzz', title: 'FizzBuzz', kind: 'challenge',
    body: md`
FizzBuzz is a classic beginner puzzle. It uses everything you've learned so far: loops, ~if~/~elif~/~else~ and the remainder operator ~%~.

For each number:
- if it's divisible by **both** 3 and 5, say ~FizzBuzz~
- else if it's divisible by 3, say ~Fizz~
- else if it's divisible by 5, say ~Buzz~
- otherwise, say the number itself
`,
    task: md`Print FizzBuzz for the numbers 1 to 15, one result per line.`,
    starter: py`for n in range(1, 16):
    pass  # replace with your logic
`,
    solution: py`for n in range(1, 16):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)
`,
    hint: 'Check the "both" case first: n % 3 == 0 and n % 5 == 0 (or n % 15 == 0).',
    tests: py`
want = []
for n in range(1, 16):
    want.append("FizzBuzz" if n % 15 == 0 else "Fizz" if n % 3 == 0 else "Buzz" if n % 5 == 0 else str(n))
got = [l.strip() for l in _out.strip().splitlines()]
assert len(got) == 15, f"Expected 15 lines, got {len(got)}."
for i, (g, w) in enumerate(zip(got, want), start=1):
    assert g == w, f"For {i} you printed {g!r}, expected {w!r}."
`
  },
  ]
},
{
  id: 'm5', title: 'Lists & Dictionaries', blurb: 'Store collections of values and look them up quickly.',
  lessons: [
  {
    id: 'lists', title: 'Lists',
    body: md`
A **list** holds several values in order, inside square brackets:

~~~
fruits = ["apple", "banana"]
print(fruits[0])        # indexing works like strings
fruits.append("kiwi")   # add to the end
fruits[1] = "mango"     # unlike strings, lists CAN be changed
print(fruits)
print(len(fruits))
print("kiwi" in fruits)
~~~

Other useful list methods include ~insert(i, x)~, ~remove(x)~, ~pop()~ and ~reverse()~.
`,
    task: md`Add ~"cherry"~ to the end of ~fruits~, then print how many items the list has.`,
    starter: py`fruits = ["apple", "banana"]

`,
    solution: py`fruits = ["apple", "banana"]

fruits.append("cherry")
print(len(fruits))
`,
    hint: 'fruits.append("cherry"), then print(len(fruits)).',
    tests: py`
assert fruits == ["apple", "banana", "cherry"], f"fruits is {fruits!r}, expected ['apple', 'banana', 'cherry']."
assert _out.strip() == "3", f"Expected the program to print 3, got {_out.strip()!r}."
`
  },
  {
    id: 'listtools', title: 'sum, min, max & sorted',
    body: md`
Python has built-in functions for common list jobs:

~~~
nums = [5, 3, 9, 1]
print(sum(nums), min(nums), max(nums))
print(sorted(nums))     # a new sorted list
print(nums)             # the original is unchanged
nums.sort()             # sort in place
print(nums)
print(nums.count(9), nums.index(9))
~~~

To get an average, divide the sum by the length: ~sum(nums) / len(nums)~.
`,
    task: md`For ~nums~, create ~biggest~, ~smallest~ and ~average~ using built-in functions.`,
    starter: py`nums = [4, 8, 15, 16, 23, 42]

`,
    solution: py`nums = [4, 8, 15, 16, 23, 42]

biggest = max(nums)
smallest = min(nums)
average = sum(nums) / len(nums)
`,
    hint: 'max(...), min(...), and sum(nums) / len(nums).',
    tests: py`
g = globals()
for n in ("biggest", "smallest", "average"):
    assert n in g, f"Create a variable called {n}."
assert biggest == 42, f"biggest is {biggest!r}, expected 42."
assert smallest == 4, f"smallest is {smallest!r}, expected 4."
assert average == 18, f"average is {average!r}, expected 18.0."
`
  },
  {
    id: 'listloops', title: 'Building lists in loops',
    body: md`
Loops and lists work well together. Start with an empty list ~[]~ and ~append~ to it as you go:

~~~
words = ["sun", "moon", "star"]
lengths = []
for w in words:
    lengths.append(len(w))
print(lengths)

for i, w in enumerate(words):   # enumerate gives the index too
    print(i, w)
~~~
`,
    task: md`Use a loop and ~append~ to build ~squares~, a list of the squares of 1 to 10: ~[1, 4, 9, ..., 100]~.`,
    starter: py`squares = []

`,
    solution: py`squares = []

for n in range(1, 11):
    squares.append(n * n)
`,
    hint: 'for n in range(1, 11): squares.append(n * n)',
    tests: py`
assert squares == [n * n for n in range(1, 11)], f"squares is {squares!r}, expected [1, 4, 9, ..., 100]."
assert "append" in _src, "Use .append() inside a loop."
`
  },
  {
    id: 'tuplesets', title: 'Tuples & sets',
    body: md`
A **tuple** is like a list, but it can't be changed after you create it. Tuples are good for small fixed groups of values:

~~~
point = (3, 4)
x, y = point          # "unpacking"
print(x, y)
~~~

A **set** holds only unique values and has no order. It's perfect for removing duplicates or checking membership quickly:

~~~
colors = {"red", "green", "red", "blue"}
print(colors)
print(len(colors))
print(set([1, 1, 2, 3, 3]))
print({1, 2, 3} & {2, 3, 4})   # items in both
~~~
`,
    task: md`~names~ contains duplicates. Make ~unique~ a **set** of the names and ~count~ the number of different names.`,
    starter: py`names = ["ana", "ben", "ana", "cara", "ben", "ana"]

`,
    solution: py`names = ["ana", "ben", "ana", "cara", "ben", "ana"]

unique = set(names)
count = len(unique)
`,
    hint: 'unique = set(names), then count = len(unique).',
    tests: py`
assert isinstance(unique, set), f"unique should be a set, but it is a {type(unique).__name__}."
assert unique == {"ana", "ben", "cara"}, f"unique is {unique!r}."
assert count == 3, f"count is {count!r}, expected 3."
`
  },
  {
    id: 'dicts', title: 'Dictionaries',
    body: md`
A **dictionary** maps **keys** to **values**, like words to their definitions in a real dictionary:

~~~
ages = {"ana": 31, "ben": 27}
print(ages["ana"])         # look up by key
ages["cara"] = 40          # add or update
print(ages)
print("ben" in ages)       # is this key present?
print(ages.get("zoe", 0))  # .get gives a default if missing
~~~

Keys must be unique. They're usually strings or numbers.
`,
    task: md`Create a dict ~prices~ with ~"apple"~ costing ~0.5~ and ~"bread"~ costing ~2.25~. Then, on a separate line, add ~"milk"~ costing ~1.2~. Finally, print the price of bread.`,
    starter: py`# prices = {...}
`,
    solution: py`prices = {"apple": 0.5, "bread": 2.25}
prices["milk"] = 1.2
print(prices["bread"])
`,
    hint: 'prices = {"apple": 0.5, "bread": 2.25}, then prices["milk"] = 1.2',
    tests: py`
assert "prices" in globals(), "Create a variable called prices."
assert isinstance(prices, dict), "prices should be a dictionary: {key: value, ...}"
assert prices == {"apple": 0.5, "bread": 2.25, "milk": 1.2}, f"prices is {prices!r}."
assert "2.25" in _out, "Print the price of bread with prices[\"bread\"]."
`
  },
  {
    id: 'counting', title: 'Counting with dicts',
    body: md`
Looping over a dictionary gives you its keys. Use ~.items()~ to get each key together with its value:

~~~
stock = {"pens": 12, "books": 3}
for item, qty in stock.items():
    print(f"{item}: {qty}")
~~~

A common pattern is counting how often things appear:

~~~
counts = {}
for ch in "banana":
    counts[ch] = counts.get(ch, 0) + 1
print(counts)
~~~
`,
    task: md`Build ~counts~, a dictionary that maps each word in ~text~ to the number of times it appears.`,
    starter: py`text = "the cat and the hat and the bat"

counts = {}
`,
    solution: py`text = "the cat and the hat and the bat"

counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
`,
    hint: 'Loop over text.split() and use counts[word] = counts.get(word, 0) + 1',
    tests: py`
want = {"the": 3, "cat": 1, "and": 2, "hat": 1, "bat": 1}
assert dict(counts) == want, f"counts is {dict(counts)!r}, expected {want!r}."
`
  },
  ]
},
{
  id: 'm6', title: 'Functions', blurb: 'Package code into reusable, testable pieces.',
  lessons: [
  {
    id: 'def', title: 'def & return',
    body: md`
A **function** is a named block of code you can run whenever you need it. ~def~ defines one, and ~return~ sends a result back to whoever called it:

~~~
def double(x):
    return x * 2

print(double(4))
result = double(10) + 1
print(result)
~~~

~print~ and ~return~ are different. ~print~ shows a value on screen. ~return~ hands the value back so the rest of your program can use it. A function without a ~return~ gives back ~None~.
`,
    task: md`Write a function ~square(n)~ that **returns** ~n~ multiplied by itself.`,
    starter: py`def square(n):
    pass  # replace this line
`,
    solution: py`def square(n):
    return n * n
`,
    hint: 'Inside the function: return n * n',
    tests: py`
assert "square" in globals() and callable(square), "Define a function called square."
r = square(3)
assert r is not None, "square(3) returned None. Use return, not print."
for n, want in [(3, 9), (-4, 16), (0, 0), (12, 144)]:
    assert square(n) == want, f"square({n}) returned {square(n)!r}, expected {want}."
`
  },
  {
    id: 'params', title: 'Parameters & defaults',
    body: md`
Functions can take several parameters. A parameter can also have a **default value**, which is used when the caller leaves it out:

~~~
def power(base, exp=2):
    return base ** exp

print(power(3))          # exp defaults to 2
print(power(2, 10))
print(power(exp=3, base=2))   # keyword arguments: any order
~~~
`,
    task: md`Write ~greet(name, greeting="Hello")~ so that it **returns** the text ~"<greeting>, <name>!"~. For example, ~greet("Ana")~ returns ~"Hello, Ana!"~.`,
    starter: py`def greet(name, greeting="Hello"):
    pass
`,
    solution: py`def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
`,
    hint: 'return f"{greeting}, {name}!"',
    tests: py`
assert greet("Ana") == "Hello, Ana!", f"greet('Ana') returned {greet('Ana')!r}, expected 'Hello, Ana!'."
assert greet("Ben", "Hi") == "Hi, Ben!", f"greet('Ben', 'Hi') returned {greet('Ben', 'Hi')!r}."
assert greet(greeting="Hey", name="Cy") == "Hey, Cy!", "Keyword arguments should work too."
`
  },
  {
    id: 'grade', title: 'Functions with if',
    body: md`
Functions can contain any code, including ~if~ statements. A ~return~ ends the function immediately, which often keeps the code short:

~~~
def sign(n):
    if n > 0:
        return "positive"
    if n < 0:
        return "negative"
    return "zero"

for n in [5, -2, 0]:
    print(n, sign(n))
~~~
`,
    task: md`Write ~grade(score)~ that returns ~"A"~ for 90 and above, ~"B"~ for 80 to 89, ~"C"~ for 70 to 79, ~"D"~ for 60 to 69, and ~"F"~ below 60.`,
    starter: py`def grade(score):
    pass
`,
    solution: py`def grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    return "F"
`,
    hint: 'Check from the top down: if score >= 90 return "A", elif score >= 80 ...',
    tests: py`
cases = [(100, "A"), (90, "A"), (89, "B"), (80, "B"), (75, "C"), (70, "C"), (65, "D"), (60, "D"), (59, "F"), (0, "F")]
for s, want in cases:
    got = grade(s)
    assert got == want, f"grade({s}) returned {got!r}, expected {want!r}."
`
  },
  {
    id: 'vowels', title: 'Functions with loops',
    body: md`
Most useful functions combine loops, conditions and a value to return:

~~~
def longest(words):
    best = ""
    for w in words:
        if len(w) > len(best):
            best = w
    return best

print(longest(["hi", "hello", "hey"]))
~~~
`,
    task: md`Write ~count_vowels(text)~ that returns how many vowels (a, e, i, o, u) are in ~text~. Count capital letters too.`,
    starter: py`def count_vowels(text):
    pass
`,
    solution: py`def count_vowels(text):
    count = 0
    for ch in text.lower():
        if ch in "aeiou":
            count += 1
    return count
`,
    hint: 'Loop over text.lower() and check: if ch in "aeiou".',
    tests: py`
for t, want in [("hello", 2), ("PYTHON", 1), ("Queue", 4), ("rhythm", 0), ("", 0), ("AEIOU aeiou", 10)]:
    got = count_vowels(t)
    assert got == want, f"count_vowels({t!r}) returned {got!r}, expected {want}."
`
  },
  {
    id: 'recursion', title: 'Recursion',
    body: md`
A function can call **itself**. This is called recursion, and it works well when a problem contains a smaller version of the same problem.

Every recursive function needs a **base case** where it stops calling itself:

~~~
def countdown(n):
    if n == 0:          # base case
        print("Done!")
        return
    print(n)
    countdown(n - 1)    # smaller problem

countdown(3)
~~~

The factorial of ~n~ (written ~n!~) is ~n × (n-1) × ... × 1~. That means ~n! = n × (n-1)!~, and ~0! = 1~.
`,
    task: md`Write ~factorial(n)~ that returns the factorial of ~n~. ~factorial(5)~ should be ~120~ and ~factorial(0)~ should be ~1~. You can use a loop or recursion.`,
    starter: py`def factorial(n):
    pass
`,
    solution: py`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
`,
    hint: 'Base case: if n <= 1 return 1. Otherwise return n * factorial(n - 1).',
    tests: py`
for n, want in [(0, 1), (1, 1), (5, 120), (10, 3628800)]:
    got = factorial(n)
    assert got == want, f"factorial({n}) returned {got!r}, expected {want}."
`
  },
  ]
},
{
  id: 'm7', title: 'Intermediate Python', blurb: 'Comprehensions, errors, classes, modules, sorting and files.',
  lessons: [
  {
    id: 'comprehensions', title: 'List comprehensions',
    body: md`
A **list comprehension** builds a list in a single line. It's a shorter way to write the "empty list, loop, append" pattern:

~~~
squares = [n * n for n in range(1, 6)]
print(squares)

evens = [n for n in range(10) if n % 2 == 0]
print(evens)

names = ["ana", "ben"]
print([name.title() for name in names])
~~~

The pattern is ~[expression for item in sequence if condition]~. The ~if~ part is optional.
`,
    task: md`Using comprehensions, create ~evens~ (all even numbers from 0 to 20 inclusive) and ~shout~ (every word in ~words~ in uppercase).`,
    starter: py`words = ["hello", "world", "python"]

# evens = [...]
# shout = [...]
`,
    solution: py`words = ["hello", "world", "python"]

evens = [n for n in range(21) if n % 2 == 0]
shout = [w.upper() for w in words]
`,
    hint: '[n for n in range(21) if n % 2 == 0] and [w.upper() for w in words]',
    tests: py`
assert evens == list(range(0, 21, 2)), f"evens is {evens!r}, expected [0, 2, 4, ..., 20]."
assert shout == ["HELLO", "WORLD", "PYTHON"], f"shout is {shout!r}."
assert _src.count(" for ") >= 2, "Use a comprehension for each list."
`
  },
  {
    id: 'errors', title: 'try / except',
    body: md`
When something goes wrong, Python **raises an exception**. You can catch it with ~try~ / ~except~ so your program keeps running instead of crashing:

~~~
try:
    number = int("abc")
except ValueError:
    print("That wasn't a number!")

try:
    print(10 / 0)
except ZeroDivisionError as e:
    print("Oops:", e)
~~~

Common exceptions include ~ValueError~, ~TypeError~, ~KeyError~, ~IndexError~ and ~ZeroDivisionError~. Catch the specific one you expect, not every possible error.
`,
    task: md`Write ~safe_divide(a, b)~ that returns ~a / b~, or returns ~None~ when ~b~ is zero. Use ~try~ / ~except~.`,
    starter: py`def safe_divide(a, b):
    pass
`,
    solution: py`def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None
`,
    hint: 'try: return a / b   except ZeroDivisionError: return None',
    tests: py`
assert safe_divide(10, 2) == 5, f"safe_divide(10, 2) returned {safe_divide(10, 2)!r}, expected 5.0."
assert safe_divide(1, 4) == 0.25, "safe_divide(1, 4) should be 0.25."
assert safe_divide(5, 0) is None, f"safe_divide(5, 0) returned {safe_divide(5, 0)!r}, expected None."
assert "try" in _src and "except" in _src, "Use try / except for this one."
`
  },
  {
    id: 'classes', title: 'Classes & objects',
    body: md`
A **class** is a blueprint for creating your own kind of object. An object bundles data (called **attributes**) together with functions (called **methods**):

~~~
class Counter:
    def __init__(self, start=0):   # runs when you create one
        self.value = start

    def increment(self):
        self.value += 1
        return self.value

c = Counter()
c.increment()
c.increment()
print(c.value)
~~~

~self~ is the object itself. Every method receives it as its first parameter.
`,
    task: md`Write a class ~Dog~. Creating ~Dog("Rex")~ should store the name in ~self.name~, and its ~speak()~ method should return ~"Rex says woof!"~ (using the dog's own name).`,
    starter: py`class Dog:
    def __init__(self, name):
        pass

    def speak(self):
        pass
`,
    solution: py`class Dog:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} says woof!"
`,
    hint: 'In __init__: self.name = name. In speak: return f"{self.name} says woof!"',
    tests: py`
assert "Dog" in globals(), "Define a class called Dog."
d = Dog("Rex")
assert getattr(d, "name", None) == "Rex", "Dog('Rex').name should be 'Rex'. Set self.name in __init__."
assert d.speak() == "Rex says woof!", f"speak() returned {d.speak()!r}, expected 'Rex says woof!'."
assert Dog("Bo").speak() == "Bo says woof!", "speak() should use the dog's own name."
`
  },
  {
    id: 'modules', title: 'Importing modules',
    body: md`
Python comes with a huge **standard library**. ~import~ lets you use it:

~~~
import math
print(math.sqrt(16))
print(math.pi)

from random import randint, choice
print(randint(1, 6))
print(choice(["rock", "paper", "scissors"]))

import datetime
print(datetime.date.today())
~~~

There are modules for math, dates, randomness, JSON, text processing and much more.
`,
    task: md`Import ~math~. Store the hypotenuse of a 3-by-4 right triangle in ~hyp~ (use ~math.sqrt~), and the area of a circle with radius 2 in ~area~ (use ~math.pi~).`,
    starter: py`# import ...

`,
    solution: py`import math

hyp = math.sqrt(3 ** 2 + 4 ** 2)
area = math.pi * 2 ** 2
`,
    hint: 'hyp = math.sqrt(3**2 + 4**2), area = math.pi * 2**2',
    tests: py`
import math as _m
assert "import" in _src and "math" in _src, "Import the math module."
assert abs(hyp - 5) < 1e-9, f"hyp is {hyp!r}, expected 5.0."
assert abs(area - _m.pi * 4) < 1e-9, f"area is {area!r}, expected about 12.566."
`
  },
  {
    id: 'sorting', title: 'Sorting with key & lambda',
    body: md`
~sorted()~ takes a ~key~ argument. That's a function which picks the value to sort by. ~lambda~ is a quick way to write a tiny function on the spot:

~~~
words = ["banana", "kiwi", "apple"]
print(sorted(words))               # alphabetical
print(sorted(words, key=len))      # by length

people = [("ana", 31), ("ben", 27), ("cy", 45)]
print(sorted(people, key=lambda p: p[1]))
print(sorted(people, key=lambda p: p[1], reverse=True))
~~~
`,
    task: md`Create ~by_score~: the ~students~ list sorted by score, **highest first**.`,
    starter: py`students = [("ana", 88), ("ben", 95), ("cara", 72), ("dev", 91)]

`,
    solution: py`students = [("ana", 88), ("ben", 95), ("cara", 72), ("dev", 91)]

by_score = sorted(students, key=lambda s: s[1], reverse=True)
`,
    hint: 'sorted(students, key=lambda s: s[1], reverse=True)',
    tests: py`
want = [("ben", 95), ("dev", 91), ("ana", 88), ("cara", 72)]
assert list(by_score) == want, f"by_score is {by_score!r}, expected {want!r}."
`
  },
  {
    id: 'files', title: 'Reading & writing files',
    body: md`
~open()~ gives you a file. Use it inside a ~with~ block so the file is closed for you automatically:

~~~
with open("hello.txt", "w") as f:     # "w" = write (replaces the file)
    f.write("first line\n")
    f.write("second line\n")

with open("hello.txt") as f:          # default mode is read
    for line in f:
        print(line.strip())
~~~

Use ~"a"~ to add to the end of a file instead of replacing it. In PyQuest, files live in a temporary in-browser folder.
`,
    task: md`Write the three lines ~eggs~, ~milk~ and ~bread~ to ~shopping.txt~. Then read the file back into a list ~items~ that contains those three words, without the newline characters.`,
    starter: py`# write the file

# read it back into items
`,
    solution: py`with open("shopping.txt", "w") as f:
    f.write("eggs\nmilk\nbread\n")

with open("shopping.txt") as f:
    items = [line.strip() for line in f]
`,
    hint: 'Write with f.write("eggs\\n") etc. Read with [line.strip() for line in f].',
    tests: py`
import os
assert os.path.exists("shopping.txt"), "Create the file shopping.txt with open(..., \"w\")."
content = open("shopping.txt").read().split()
assert content == ["eggs", "milk", "bread"], f"shopping.txt contains {content!r}."
assert "items" in globals(), "Read the file back into a list called items."
assert list(items) == ["eggs", "milk", "bread"], f"items is {items!r}. Did you strip the newlines?"
`
  },
  ]
},
{
  id: 'm8', title: 'Challenges', blurb: 'Put it all together. Bigger problems, bigger XP.',
  lessons: [
  {
    id: 'palindrome', title: 'Palindrome checker', kind: 'challenge',
    body: md`
A **palindrome** reads the same forwards and backwards, like "racecar" or "Never odd or even".

To check one, ignore capital letters and spaces. Clean the text first, then compare it with its reverse.
`,
    task: md`Write ~is_palindrome(text)~ that returns ~True~ or ~False~, ignoring case and spaces.`,
    starter: py`def is_palindrome(text):
    pass
`,
    solution: py`def is_palindrome(text):
    clean = text.lower().replace(" ", "")
    return clean == clean[::-1]
`,
    hint: 'clean = text.lower().replace(" ", "") then compare clean with clean[::-1].',
    tests: py`
for t, want in [("racecar", True), ("Never odd or even", True), ("python", False), ("A", True), ("Step on no pets", True), ("ab", False)]:
    got = is_palindrome(t)
    assert got == want, f"is_palindrome({t!r}) returned {got!r}, expected {want}."
`
  },
  {
    id: 'primes', title: 'Prime finder', kind: 'challenge',
    body: md`
A **prime** is a whole number greater than 1 that can only be divided evenly by 1 and itself. The first few are 2, 3, 5, 7 and 11.

To test whether ~n~ is prime, check whether any number from 2 up to ~n - 1~ divides it evenly. You can speed this up: you only need to check up to the square root of ~n~.
`,
    task: md`Write ~primes_up_to(n)~ that returns a list of all primes from 2 up to and including ~n~.`,
    starter: py`def primes_up_to(n):
    pass
`,
    solution: py`def is_prime(k):
    if k < 2:
        return False
    for d in range(2, int(k ** 0.5) + 1):
        if k % d == 0:
            return False
    return True

def primes_up_to(n):
    return [k for k in range(2, n + 1) if is_prime(k)]
`,
    hint: 'Write a helper is_prime(k), then collect [k for k in range(2, n + 1) if is_prime(k)].',
    tests: py`
cases = [(10, [2, 3, 5, 7]), (1, []), (2, [2]), (30, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29])]
for n, want in cases:
    got = primes_up_to(n)
    assert list(got) == want, f"primes_up_to({n}) returned {got!r}, expected {want!r}."
assert len(primes_up_to(1000)) == 168, "primes_up_to(1000) should contain 168 primes."
`
  },
  {
    id: 'caesar', title: 'Caesar cipher', kind: 'challenge',
    body: md`
The Caesar cipher hides a message by shifting every letter along the alphabet. With a shift of 3, ~a~ becomes ~d~ and ~x~ wraps around to ~a~.

Two helpers make this possible: ~ord()~ turns a character into a number, and ~chr()~ turns a number back into a character:

~~~
print(ord("a"), ord("z"), chr(98))
print((ord("y") - ord("a") + 3) % 26)
~~~
`,
    task: md`Write ~caesar(text, shift)~. Shift letters only, keep uppercase letters uppercase, leave every other character unchanged, and wrap around at the end of the alphabet.`,
    starter: py`def caesar(text, shift):
    pass
`,
    solution: py`def caesar(text, shift):
    result = ""
    for ch in text:
        if ch.isalpha():
            base = ord("A") if ch.isupper() else ord("a")
            result += chr((ord(ch) - base + shift) % 26 + base)
        else:
            result += ch
    return result
`,
    hint: 'For each letter: base = ord("A") or ord("a"); new = chr((ord(ch) - base + shift) % 26 + base).',
    tests: py`
cases = [(("abc", 1), "bcd"), (("xyz", 3), "abc"), (("Hello, World!", 5), "Mjqqt, Btwqi!"), (("ABC", -1), "ZAB")]
for args, want in cases:
    got = caesar(*args)
    assert got == want, f"caesar{args!r} returned {got!r}, expected {want!r}."
assert caesar(caesar("Python 3", 7), -7) == "Python 3", "Shifting forward then back should give the original."
`
  },
  {
    id: 'bank', title: 'Bank account', kind: 'challenge',
    body: md`
Classes can protect their own data by refusing invalid actions. To refuse, **raise** an exception:

~~~
def set_age(age):
    if age < 0:
        raise ValueError("age can't be negative")
    return age

try:
    set_age(-3)
except ValueError as e:
    print("Refused:", e)
~~~
`,
    task: md`Write a class ~BankAccount(owner)~ that starts with a ~balance~ of 0. It needs these methods:
- ~deposit(amount)~ adds money. Raise ~ValueError~ if ~amount~ is 0 or less.
- ~withdraw(amount)~ takes money out. Raise ~ValueError~ if there isn't enough money, and leave the balance unchanged.`,
    starter: py`class BankAccount:
    def __init__(self, owner):
        pass
`,
    solution: py`class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
`,
    hint: 'Store self.owner and self.balance = 0 in __init__. In withdraw, check amount > self.balance before subtracting.',
    tests: py`
a = BankAccount("Ana")
assert getattr(a, "owner", None) == "Ana", "Store the owner in self.owner."
assert getattr(a, "balance", None) == 0, "A new account should have balance 0."
a.deposit(50)
assert a.balance == 50, f"After deposit(50), balance is {a.balance!r}."
a.withdraw(20)
assert a.balance == 30, f"After withdraw(20), balance is {a.balance!r}, expected 30."
try:
    a.withdraw(100)
    raise AssertionError("withdraw(100) with only 30 in the account should raise ValueError.")
except ValueError:
    pass
assert a.balance == 30, "A refused withdrawal must not change the balance."
try:
    a.deposit(-5)
    raise AssertionError("deposit(-5) should raise ValueError.")
except ValueError:
    pass
`
  },
  {
    id: 'wordfreq', title: 'Word frequency', kind: 'challenge',
    body: md`
This one brings together strings, dictionaries and loops.

Tip: ~max()~ takes a ~key~ argument, just like ~sorted()~. For example, ~max(d, key=d.get)~ returns the key of ~d~ that has the biggest value.
`,
    task: md`Write ~most_common_word(text)~ that returns the word that appears most often, ignoring case. The result should be lowercase. The checker never gives you a tie.`,
    starter: py`def most_common_word(text):
    pass
`,
    solution: py`def most_common_word(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return max(counts, key=counts.get)
`,
    hint: 'Count words in a dict (like the counting lesson) on text.lower().split(), then use max(counts, key=counts.get).',
    tests: py`
cases = [("the cat and the hat", "the"), ("Apple apple banana", "apple"), ("one two two three three three", "three"), ("Go go GO stop", "go")]
for t, want in cases:
    got = most_common_word(t)
    assert got == want, f"most_common_word({t!r}) returned {got!r}, expected {want!r}."
`
  },
  ]
},
];
})();
