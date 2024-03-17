import { mergeTests } from '@playwright/test';
import { homePageTest } from './home-page-tests';
import { networkInterceptor } from './networkInterceptor-test';
import { shellTest } from './shell-tests';
import { ownerPageTest } from './owners-test';

export const test = mergeTests(homePageTest, networkInterceptor, shellTest, ownerPageTest);
