import { mergeTests } from '@playwright/test';
import { homePageTest } from './home-page-tests';
import { networkInterceptor } from './networkInterceptor-test';

export const test = mergeTests(homePageTest, networkInterceptor);
