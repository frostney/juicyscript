# juicyscript

Sweet experimental scripting language

## Philosophy

JuicyScript is a Lua-inspired scripting language

## Variables

Declared variables are always immutable

```
num = 5
num = 8 // Exception: Variable cannot be re-assigned
```

### Primitives

```
hello = 'world'
num = 5
sum = num + 2
bool = true
```

### Structures

There is no distinction between objects and arrays.

```
hello = ('world', 'earth')
// is the same as
hello = ('0': 'world', '1': 'earth')
```

```
numbers = (1, 2, 3, 4)
named = (hello: 'world', hi: 'there')

number = 5 // This is the same as number = (5)

hello[0] // 'world'
named.hello // 'world'
```

#### Destructuring
Not sure about this. Might cut this feature.

```
unpack (numA, numA) = (1, 2)
numA // 1
numB // 2
```

```
unpack (age, name) = (age: 19, name: 'this')
age // 19
name // 'this'
```

### Functions

#### Single-line functions

```
answer = () -> 42
answer()
```

#### Multi-line functions

```
logPerson = (person) ->
  print(person.name)
  print(person.age)
end

logPerson(name: 'me', age: 19)
```

### Modules

Not sure about this. Might cut this feature.

By default everything inside of a source file is private

```
// moduleA.juicy
export num = 5
export log = (name) ->
  print(name)
end
```

```
// moduleB.juicy
moduleA = import './moduleA'
unpack (num, log) = import './moduleA'
```

## License

MIT
