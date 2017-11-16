# juicyscript
Sweet experimental scripting language

## Philosophy



## Variables

Declared variables are always immutable

### Primitives
```
hello = 'world'
num = 5
sum = num + 2
```

### Objects & arrays (i need a better name for this)
There is no distinction between objects and arrays.

```
hello = ('world', 'earth')
numbers = (1, 2, 3, 4)
named = (hello: 'world', hi: 'there')

number = 5 // This is the same as number = (5)

hello[0] // 'world'
named.hello // 'world'
```

### Functions
```
answer = () -> 42
```