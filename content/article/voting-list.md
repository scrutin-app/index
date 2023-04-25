---
title: Voting list
description: How to avoid ballot stuffing
date: 2023-04-13
---

In [Belenios](https://www.belenios.org/):

- **Voters authenticate their vote** using [public key cryptography](https://en.wikipedia.org/wiki/Digital_signature).
- The voting list is **publicly available**.
- Everyone can **verify the origin** of every vote.
- Votes are **encrypted** using the election's key.

The Belenios voting system uses credential authorities to generate and send voters' credentials.

Scrutin ship with a new credential authority:

- Credentials are generated on users' devices, whenever possible.
- New users don't have credentials yet. In this case Scrutin credential authority would generate credentials for them.
- Anytime, users can update their credentials by new, locally generated, ones.
	They can do so by proving account ownership (by email address or other authentication mechanism)
- If user loses their key, they can also upload new ones by proving account ownership.

```mermaid
flowchart TD
	O[Organizer of the election]
	I[Identity server]

	O <-->|Search for user| I

	I <--> E{User registered?}
	E <--> ReplyWithUserKey([Reply with user key])
	E <--> GenerateKey([Generate a new key])
```
