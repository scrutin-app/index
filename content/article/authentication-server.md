---
title: Authentication server protocol
date: 2023-04-05
---

This is a draft of the authentication protocol.

#### Adding users by email

After creating the election, the **admin** can use the **authentication server** to invite users by email.

```json
{
	"electionId": electionId,
	"email": "alice@domain1"
}
```

The **authentication server** generate a manager identity in behalf of the user.

```json
{
	"managerId": "74945b68a479bab2ed1e21f9e14c67814a571221b17c8f2de8c0cb435ddb3bd3350c7ca43eb487e92640ef2cee3602e45b5cdcdbb1243fc4c78af17b601de985"
}
```

That ID can be directly added to `election.voterIds`

_If the user already exists, then the server could directly reply with the userId, but then, what to do if that user loose his secret or login on another device?_

#### Logging in

The server generate an OTP and send it by email.

By proving knowledge of the  OTP, alongside a freshly generated userId (=publicKey),  the **authentication server** will give you a delegation.

```json
let account = Account.make()
query = {
	userToken, // The OTP
	userId // A freshly generated account
}
response = Event_.ElectionDelegation.create({
	"electionId": electionId,
	"voterId": manager.userId,
	"delegateId": req.body.userId
}, manager)
// The server delegated his voice.
```

<!--
#### Logging in (existing user)

Voter to authentication server:

```json
{
	"electionId": electionId,
	"userId": account.userId,
	"email": email
}
```

The server:

```js
res.send(deleguateVote(electionId, managerId, userId))
```

The user is immediatly capable of voting.
-->