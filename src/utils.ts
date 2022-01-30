import { repoOptions } from './constants';
import { Octokit } from 'octokit/dist-types/octokit';

export const getIssueNumber = (issueUrl: string) => {
  const match = issueUrl.match(/\d+$/);
  return match && match[0];
};

export const createComment = async (octokit: Octokit, body: string, issueNumber: number) => {
  console.log('Creating comment...', issueNumber, body);
  await octokit.rest.issues.createComment({
    ...repoOptions,
    issue_number: issueNumber,
    body,
  });
  console.log('Issue comment', issueNumber, body);
};

export const closeIssue = async (octokit: Octokit, issueNumber: number) => {
  console.log('Closing issue...', issueNumber);
  await octokit.rest.issues.update({
    ...repoOptions,
    issue_number: issueNumber,
    state: 'closed',
  });
  console.log('Issue closed', issueNumber);
};

export const evalIssue = (body: string | null | undefined) => {
  if (!body) return undefined;
  const lines = body.split('\n');

  const linkEval = lines[0].match(/Link:\s"(https:\/\/github.com\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}\/[a-z0-9\-_]+)/i);
  const link = linkEval && linkEval[1];

  return { link };
};
