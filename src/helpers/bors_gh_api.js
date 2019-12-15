/* eslint-disable no-undef */

import Octokit from '@octokit/rest';
import { STORAGE_USE_GH_API, STORAGE_GH_API_TOKEN } from './constants';

const REVIEW_TYPES = {
  COMMENT: 'comment',
  REVIEW: 'review',
  APPROVE: 'approve',
};

export default class BorsExtension {
  constructor() {
    this.settings = storage.sync.get(STORAGE_USE_GH_API, STORAGE_GH_API_TOKEN);

    this.octokit = this.settings.then((results) => {
      if (!results[STORAGE_USE_GH_API]) {
        return Promise.resolve();
      }

      return new Octokit({
        auth: results[STORAGE_GH_API_TOKEN],
        userAgent: 'bors-extension',
      });
    });
  }

  borsMerge = async ({
    owner, repo, pull, reviewType = REVIEW_TYPES.COMMENT,
  }) => {
    if (this.notEnabled) {
      // eslint-disable-next-line no-console
      console.warn('Github API is not enabled.');
      return Promise.resolve();
    }

    const octokit = await this.octokit;

    octokit.pulls.createReview({
      owner,
      repo,
      pull,
      event: reviewType,
    });

    return response;
  }
}
