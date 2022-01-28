import { Octokit } from 'octokit';
import { createAppAuth } from '@octokit/auth-app';
import { appId, clientId, installationId, privateKey, clientSecret, appName, repoOptions } from './constants';
import { evalIssue, getIssueNumber } from './utils';
import { getCategories } from './fetches';
import { Category } from './types';

const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId,
    clientId,
    installationId,
    privateKey,
    clientSecret,
  },
});

const main = async () => {
  const categories = await getCategories();

  const {
    data: { token: accessToken },
  } = await octokit.rest.apps.createInstallationAccessToken({
    installation_id: installationId,
  });

  const remoteUrl = `https://${appName}:${accessToken}@github.com/${repoOptions.owner}/${repoOptions.repo}`;

  const list = await octokit.rest.issues.listForRepo({
    ...repoOptions,
  });

  list.data.forEach((item) => {
    const issueNumber = getIssueNumber(item.url);
    const evals = evalIssue(item.body, categories as Array<Category>);
    console.log(evals);
  });
};

main();
