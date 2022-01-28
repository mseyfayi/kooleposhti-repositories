import { repoOptions } from './constants';
import { Octokit } from 'octokit/dist-types/octokit';
import { Category } from './types';

export const getIssueNumber = (issueUrl: string) => {
  const match = issueUrl.match(/\d+$/);
  return match && match[0];
};

export const createComment = (octokit: Octokit, body: string, issueNumber: number) =>
  octokit.rest.issues.createComment({
    ...repoOptions,
    issue_number: issueNumber,
    body,
  });

export const closeIssue = (octokit: Octokit, issueNumber: number) =>
  octokit.rest.issues.update({
    ...repoOptions,
    issue_number: issueNumber,
    state: 'closed',
  });

export const evalIssue = (body: string | null | undefined, categories: Array<Category>) => {
  if (!body) return undefined;
  const lines = body.split('\n');

  const linkEval = lines[0].match(/Link:\s"(https:\/\/github.com\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}\/[a-z0-9\-_]+)/i);
  const link = linkEval && linkEval[1];

  const categoryLines = lines.slice(2);

  // const tags = categoryLines.map((line, index) => line.match(new RegExp(categories[index].title)));
  return { link };
};
