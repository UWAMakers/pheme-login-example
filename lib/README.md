
# UWA Card Management

## The current situation


## The current solution


## pheme-card-manager.js

To assist with the implementation of card management, 
we've made available a small handy-dandy js lib that abstracts the card management API.

### Methods
**constructor(userToken)**

Expects a `userToken` from the main login API as the only argument.

Returns the initiated class for the user.

```js
const pcm = new PhemeCardManager(userToken);
```

**async find()**

No Args.

Returns a Promise, that returns an array of card details, of which all belong to the user.

```js
const cards = await pcm.find();
```

**async create(uuid, [name])**

Expects a uuid (array of numbers(bytes)) of the new card and optionally the user-defined name of the card.

Returns a Promise, that returns the new card details.

```js
const newCard = await pcm.create([1, 2, 3, 4], 'My Special Card');
```

**async get(cardId)**

Expects the ID of the card.

Returns a Promise, that returns the requested card details (you can only query the current user's cards).

```js
const currentCard = await pcm.get('0123456789abcdef');
```

**async patch(cardId, name)**

Expects the ID of the card and the new name for it.

Returns a Promise, that returns the updated card details.

```js
const updatedCard = await pcm.patch('0123456789abcdef', 'New Card Name');
console.log(updatedCard.name); // 'New Card Name'
```

**async delete(cardId)**

Expects the ID of the card.

Returns a Promise, that returns the now-deleted card details.

```js
const deletedCard = await pcm.delete('0123456789abcdef');
```

### Params

**cards**

After the first call to `find()`, all of the user's cards are kept in this array, 
as you make other calls, this param will update to the new list automatically, 
preserving the origional array, so this could be used in vue or similar.


