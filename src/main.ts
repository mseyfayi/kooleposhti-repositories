import { Octokit } from 'octokit';
import { createAppAuth } from '@octokit/auth-app';
import { appId, clientId, clientSecret, installationId, privateKey, repoOptions } from './constants';
import { closeIssue, createComment, evalIssue, getIssueNumber } from './utils';
import { createPost } from './fetches';
import schedule from 'node-schedule';

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
  try {
    const list = await octokit.rest.issues.listForRepo({
      ...repoOptions,
    });

    for (const item of list.data) {
      const issueNumber = getIssueNumber(item.url);
      const evals = evalIssue(item.body);
      console.log(evals);
      if (!evals || !evals.link) {
        await createComment(octokit, 'Pattern is not followed', Number(issueNumber));
      } else {
        await createPost({ repoUrl: evals.link });
        await createComment(octokit, 'Post created', Number(issueNumber));
      }
      await closeIssue(octokit, Number(issueNumber));
    }
  } catch (e) {
    console.log('Error', e);
  }
};

schedule.scheduleJob('* * 0 * *', () => {
  main();
});
