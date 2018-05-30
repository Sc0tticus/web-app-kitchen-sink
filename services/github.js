require("dotenv").load();

const {decode} = require("./base64");
const github = new (require("@octokit/rest"));
github.authenticate({
    type: "token",
    token: process.env.GITHUB_API_KEY
});

function getFile(owner, repo, path){
    return github.repos.getContent({owner, repo, path})
        .then(response => decode(response.data.content))
        .catch(error => "");
}

function getBackendExamples(route){
    return getFile(
        process.env.GITHUB_USERNAME,
        process.env.GITHUB_REPO,
        `routes/apis/${route}.js`
    );
}

function getFrontendExamples(component){
    return getFile(
        process.env.GITHUB_USERNAME,
        process.env.GITHUB_REPO,
        `client/src/components/apis/${component}.vue`
    );
}

function getAllExamples(label){
    return Promise.all([
        getFrontendExamples(label),
        getBackendExamples(label)
    ]).then(([frontendExamples, backendExamples]) => {
        return frontendExamples.concat(backendExamples)
    });
}

module.exports = {
    getFile,
    getFrontendExamples,
    getBackendExamples,
    getAllExamples
};
