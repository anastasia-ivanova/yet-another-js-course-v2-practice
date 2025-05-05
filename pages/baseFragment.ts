import { Page } from '@playwright/test';

export abstract class BaseFragment {
    constructor(readonly page: Page) {}
}