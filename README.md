# Amazon MQ PoC Backend

## Overview
Backend which stores what IDs are currently locked for a variety of entities, which are described via an identifying string (e.g. "Agency").

The idea behind this backend is it can be used to persist locks on entities, so that we don't need to rely on clients to know what's currently 
locked.

## Routes

### Get locked IDs for an entity
Route: `/lock/{entity}`
Method: GET

Get all locked IDs for an entity.

Example calling route: `/lock/Agency`
Example response: `[1, 7, 31]`

Returns a 200 on success.

### Check if an entity is locked
Route: `/lock/{entity}/{id}`
Method: GET

Check if a given entity with a given ID is locked.

Returns a 200 on success.

### Lock an entity
Route: `/lock/{entity}`
Method: GET
Body: `{ "id": int }`

Locks the entity with the given name and ID.

Example calling route: `/lock/Agency`
Example body: `{ "id": 1 }`

Returns a 201 on success.

### Unlock an entity
Route: `/lock/{entity}/{id}`
Method: DELETE

Unlocks the entity with the given name and ID.

Example calling route: `/lock/Agency/1`

Returns a 204 on success.

