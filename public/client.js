const socket = io();

const client = feathers();

client.configure(feathers.socketio(socket));

client.configure(
  feathers.authentication({
    storage: window.localStorage
  })
);

const login = async () => {
  try {
    return await client.reAuthenticate();
  } catch (error) {
    return await client.authenticate({
      strategy: "local",
      email: "jane@doe.com",
      password: "111111"
    });
  }
};

const main = async () => {
  const auth = await login();
  console.log(auth);

  await client.logout();
};

main();
