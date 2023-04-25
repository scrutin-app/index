---
title: Authentication server protocol
date: 2023-04-05
---

This is a draft of the authentication protocol.

We take email as an example but it would be the same for mobile or OAuth/OpenID (mailing would be replaced by SMS and OAuth respectively)

#### When adding users

1.

After creating the election, the user send the list of authorized emails to the authentication server (can be done multiple times).

```json
{
	"electionId": electionId,
	"emails": [
		"alice@domain1",
		"bob@domain2"
	]
}
```

2.

The authentication server generate a new public key, used to manage those users.

```js
let managerAccount = Account.new()
let managerId = managerAccount.userId

await knex('managedEmails').insert({
	electionId,
	emails,
	managerId,
	secret: managerAccount.secret,
})

res.send({
	electionId,
	emails,
	managerId
})
```

3.

The user update the election's `adminIds` with the received userId, allowing the server to update  the election.

#### Adding users

1.

The user click on "authenticate by email"
The user fill his email

**If the user is already authenticated, see below**
If the user isn't authenticated:
The user generate a key pair
The user send a request to scrutin-auth-email with:

```json
{
	"userId": account.userId,
	email
}
```

2.

The authentification server check if that email is allowed.

If so, the authentification server generate a token and send it by email for verification.

```js



let link = "https://email.auth.scrutin.app/verify/"
+ userId
+ "/"
+ userToken

// TODO: Warn the user NOT TO CLICK if he did not made the request
let emailBody = `Click here: ${link}`

sendEmail(email, "Verify your email", `Click here: ${link}`)

res.send({ status: "unconfirmed" })
```

3.

When the user click on the link, the authentication server add the new `userId` to `election.voterIds`

4.

The user is redirected to the voting page.

---
**If the user is already authenticated**
1b.
The user already has an account (userId + secret) associated with that email.

Voter to authentication server:

```json
{
	"userId": account.userId,
	"email": "user@domain"
}
```

The server:

```json
let election = {
	...election,
	// set originId if necessary
	voterIds: Array.concat(voterIds, [userId])
}

// And add the userId to the election's `voterIds` (if it's not already the case)
broadcastEvent("election.update", election, managerAccount)

res.send{ status: "verified" })
```

The user is immediatly capable of voting.