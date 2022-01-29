const fetch = require("node-fetch");

async function fetchRepositoriesInfo(username) {
  return await fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((data) => data ?? []);
}

async function handleRepositoriesData(username) {
  const repositories = await fetchRepositoriesInfo(username);

  if (repositories?.length) {
    const languages = [];

    repositories.forEach((repository) => {
      const index = languages.findIndex(
        (language) => language?.name === repository?.language
      );

      if (repository?.language) {
        if (index === -1) {
          languages.push({ name: repository?.language, count: 1 });
        } else {
          languages[index].count += 1;
        }
      }
    });

    languages?.map((language) =>
      console.log(`${language?.name},${language?.count}`)
    );
  }
}

function run() {
  try {
    handleRepositoriesData("awslabs");
  } catch (error) {}
}

run();
