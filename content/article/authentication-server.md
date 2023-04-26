---
title: Authentication server protocol
date: 2023-04-05
---

This is a draft of the authentication protocol.

We take email as an example but it would be the same for mobile or OAuth/OpenID (mailing would be replaced by SMS and OAuth respectively)

#### Adding users by email

After creating the election, the **admin** can use the **authentication server** to invite users by email.

```json
{
	"electionId": electionId,
	"email": "alice@domain1"
}
```

The **authentication server** generate a identity in behalf of this users.

```js
let managerAccount = Account.new()
let managerId = managerAccount.userId

await knex('users').insert({
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

_NOTE: If the user already exists, then the server could directly reply with the userId, but then, what to do if that user loose his secret? (ex: login on another device)_

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

	// TOFIX: Not insert but update? (or other table)
	await knex('users').insert({
		email,
		userId,
		userToken
	})
	
	let link = `https://email.auth.scrutin.app/verify/${userId}/${userToken}`

	// TODO: Warn the user NOT TO CLICK if he did not made the request
	sendEmail(email, "Verify your email", `Click here: ${link}`)
	
	res.send({ status: "unconfirmed" })
})
```

Using the token, the voter can now ask the authentication server to emit a vote deleguation to that new userId
```js
app.get("/verify/:userId/:userToken", async (req, res) => {
	if (verifyUser()) {
		res.send(deleguateVote(electionId, managerId, userId))
	}
})
```

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