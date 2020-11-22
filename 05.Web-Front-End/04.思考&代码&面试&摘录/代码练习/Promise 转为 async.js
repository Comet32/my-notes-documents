function example() {
  return Promise.resolve(1)
    .then(() => {
      return Promise.resolve(2)
    })
    .then(value => {
      console.log(value)
      return Promise.reject(3)
    })
    .catch(err => {
      console.log(err)
    })
}

async function example() {
  try {
    await Promise.resolve(1);
    const value = await Promise.resolve(2);
    console.log(value);
    return Promise.reject(3);
  }
  catch (err) {
    console.log(err);
  }
}

function get() {
  return fetch('http://')
    .then(res => res.text())
    .catch(err => console.log('err', err))
}

async function get() {
  try {
    const res = await fetch('http://')
    return await res.text()
  } catch (err) {
    return console.log('err', err)
  }
}
