# very-unique-id

> A generator of more memorable and pretty unique IDs
> (especially in the sense of "that's an ID you don't see every day!").

To be more precise, there is this `getUniqueMonster()` function that returns a monster with its color as a slug.

Like `maroon-vampire` or `purple-sphinx` or `cyan-cyclops`!

## Example

Check out the `./example` directory. I mean...

## Install

Import it into your project...

```shell
npm install @das.laboratory/very-unique-id
```

or use a CDN...

```html
<script src="https://unpkg.com/@das.laboratory/very-unique-id/dist/very-unique-id.umd.js"></script>
```

...for whatever reason.

## Usage

### Browser

```html
<script src="./path/to/very-unique-id.umd.js"></script>
<script>
	const uniqueMonster = getUniqueMonster(); // lavender-banshee
</script>
```

### Node.js

```js
import getUniqueMonster from '@das.laboratory/very-unique-id';

const uniqueMonster = getUniqueMonster(); // orchid-bogeyman
```

## But... why?!?

Okay, here is the thing. During development, I needed some unique IDs and made them with a hash encoded random number. The problem was that working with them sucked because I couldn't keep their value in my head for longer than 500 microseconds. At best. But monsters? With a cool color? That totally works for me.

Okay, to be honest, the color part was born out of necessity because I figured 72 monsters might not be what one would call a big data set. But adding 31 colors to the mix will make that exactly... about... a lot of colorful monsters!
