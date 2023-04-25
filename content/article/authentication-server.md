---
title: Authentication server protocol
date: 2023-04-05
---

This is a draft of the authentication protocol.

We take email as an example but it would be the same for mobile or OAuth/OpenID (mailing would be replaced by SMS and OAuth respectively)

#### Adding users

After creating the election, the **user** send the list of authorized emails to the authentication server (can be done multiple times).

```json
{
	"electionId": electionId,
	"emails": [
		"alice@domain1",
		"bob@domain2"
	]
}
```

The **authentication server** generate a new public key, used to manage those users.

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

The **user** update the election's `adminIds` with the received userId, allowing the server to update  the election.

#### Logging in (new user)

The **voter** click on "Login by email"
The voter fill his email.
A new account (userId + secret) is generated on device.

The voter to the authentication server:

```json
{
	"electionId": electionId,
	"userId": account.userId,
	"email": email
}
```

The authentification server then check if that email is authorized.

If so, the authentification server generate a verification token and send it by email.

```js
app.post("/login", async (req, res) => {
	let { email, userId, userToken } = req.body

	await knex('users').insert({
		email,
		userId,
		userToken
	})
	
	let link = "https://email.auth.scrutin.app/verify/"
	+ userId
	+ "/"
	+ userToken

	// TODO: Warn the user NOT TO CLICK if he did not made the request
	sendEmail(email, "Verify your email", `Click here: ${link}`)
	
	res.send({ status: "unconfirmed" })
})
```

When the user click on the link, the authentication server add the new `userId` to `election.voterIds`

```js
app.get("/verify/:userId/:userToken", async (req, res) => {
	if (verifyUser()) {
		updateElectionVoters()
	}
})
```

The user is redirected to the voting page.

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