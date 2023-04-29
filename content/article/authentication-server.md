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

_If the user already exists, then the server could directly reply with the userId, but then, what to do if that user loose his secret or login on another device?_

#### Logging in (new user)

In most case you should receive a link by email, but if not, you can ask an OTP from the **authentication server**

```json
query = {
	"email": email
}
response = {} // email sent
```

If the email is authorized the authentification server generate a verification token and send it by email

By sending the token to the server, alongside an freshly generated userId, the authentication server would then emit a deleguation to that new userId


```json
let account = Account.make()
query = {
	"userId": account.userId
}
response = {
	"electionId": electionId,
	"voterId": manager.userId,
	"delegateId": req.body.userId,
} // A full event, signed with manager.secret, that can be broadcasted, giving voting right to the new account
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