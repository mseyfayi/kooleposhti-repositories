import { Octokit } from 'octokit';
import { createAppAuth } from '@octokit/auth-app';

const main = async () => {
  const appId = 167852;
  const installationId = 22704068;
  const clientId = 'Iv1.1787295e80ced193';
  const privateKey =
    '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEowIBAAKCAQEAs2sLBsm1/1qqlTucuk5bNBXX3yZdxdDN+DlBrOKvMNn5ZlMu\n' +
    'tf2evLmf5NEmbdzVcovRjGCIdVD3S2Y68lcjR1Q2c0mkd/cxc9jE25XlnATuFMpz\n' +
    'QTTQB5vQ4e+G7Pt5yKvSGv9bVrzYosRuwtC33nZH6saQqLuLREt9uOIdBWht8lZ2\n' +
    'M9C1V6W/3H+FsRf3df7yZYiybpJt5J+3tHPagibGHvqBCQcW7aA/jMaakXq04tz5\n' +
    'lg9ujpFrjSJlDrvvvWEk40IxEZJL09DDVFiVpPo8432q/W3lDO0H7a5PnGcXi9k6\n' +
    'IXSkWehYS+0r85xfxQV9T5jtjCuuf7nSE5+v6wIDAQABAoIBAF2B8GE9R2kqa7UT\n' +
    'OH+wzr+6kqNub3jldjNkQ+JC0mN3dw/pUnLvF4fshnTOvGSNr4DfdfrfZL8fz4Kw\n' +
    'aRBccbp/HVHAk8MiRdfGpfJ7kQtbVmnniWH2kGUmxBq8p2ljNvlq8zm21HfEPHO4\n' +
    'RLGr7eg3ZQvrKQGHnPGfFosA7XcfMi5o+Jbj3a6A+4wqYfa5oS57M3knlMuXHoUt\n' +
    'ksLapTzfSPLPI0ZQjtGFUwpNfnnwj8reqU0r/jOXrpDGuvNbjCD0fFdBFEb4jkFv\n' +
    'h74jDY8HsNc4M0vj9KbwX86Bedz2RWRlR2bVIzqSRSTtDxsj/9LRQ5WOsgJUYQXA\n' +
    'bc/2zQECgYEA5NbF65UNJ6paR8+xwpy7vLpwIWYh3ix+W9bpRBQX8wMkrHTrLZ+2\n' +
    'Aq4GgcLOs4ocnbkgQNec8sCPkLBPB4Iun7Um+/ezDq4JeTIh1/ElWPaYOQf0lvwu\n' +
    'M75abow5nBp6+VEAm6neHuDS4loW6VzeRuuv+2gldlW/16mRCfpEpWECgYEAyLag\n' +
    'xKmkq23tST4TmYTRknvJkA7g5LkwoC/b/LjfRr8aCmsw404Q6cfy7YzOEws2Uurp\n' +
    'F0W81sR1nzLjhtiQExvcCul612DUe7v+Dt8WP6Izm1rpvr2mOG97rHyErYXwTDMI\n' +
    'BODYEogQCVU0Vl/Ltz4ecixjXp8Iq3/V8y1wDMsCgYA8rRnjgizvxIKVoeNvR6Gb\n' +
    'xA9xO6RlRYTnkw9cxrsm60FxHLsy6LMY+M2u4FlwT4GQ7II5zzHFR/uJEMaTphf4\n' +
    'rs68Zowqq0jFwt4oZL9TXGc2T/6xfgI+JA3UXAf2dSsAKlMv8xV7OH+SFvMWQ1KI\n' +
    'mXua/J1aSBhK9aIIdDx5YQKBgQCTlia1NYDORXCb0LecxRtNORTHhwk7ZikpQMfk\n' +
    'FxSm8tJ1Isi5+6dYIByzLDxDqJTzd6SZ5j+rNJ7Axyyi9Q9L3cp5g6E+Sgc0TNHN\n' +
    'oaC8fcqwy7Lg/JcDHIa2GIF/DuPZRBT7cVGwnrgcBLkNYjdrsJO2pIkVBJ/da4yo\n' +
    '2Zpw7QKBgG2YPWWyGztY97W9AF1fJgYSk+Pz5BKVKU7vIFcxIQ2buFOsMTxRKBRu\n' +
    'hyuavjK3FWxB0domGPMULzEIrPsKYWsH8fOTK1CCLvgT/BYUbMggoGoE45F1Zd+C\n' +
    'XHzkYITQtlePfZW7xh9+fXMNbsGMb7Z/9B61vVKhYO3D5EZbxy76\n' +
    '-----END RSA PRIVATE KEY-----';
  const clientSecret = '630f01bedf73947762ea5a6177effddc29f0d58b';
  const appName = 'kooleposhti-repositories-bot';
  const repoOptions = {
    owner: 'madsams',
    repo: 'kooleposhti-repositories',
  };

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

  const {
    data: { token: accessToken },
  } = await octokit.rest.apps.createInstallationAccessToken({
    installation_id: installationId,
  });

  const remoteUrl = `https://${appName}:${accessToken}@github.com/${repoOptions.owner}/${repoOptions.repo}`;

  const list = await octokit.rest.issues.listForRepo({
    ...repoOptions,
    since: new Date(new Date().valueOf() - 1000000000).toISOString(),
  });

  await octokit.rest.issues.create({ ...repoOptions, title: 'created by bot', body: 'test bot' });
};

main();
