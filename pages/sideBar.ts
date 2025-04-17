import {Locator, Page} from "@playwright/test";

export enum SortingOption {
    NameAsc = 'name,asc',
    NameDesc = 'name,desc',
    PriceDesc = 'price,desc',
    PriceAsc = 'price,asc',
}

export enum HandTools {
    Hammer = 'Hammer',
    HandSaw = 'Hand Saw',
    Wrench = 'Wrench',
    Screwdriver = 'Screwdriver',
    Pliers = 'Pliers',
    Chisels = 'Chisels',
    Measures = 'Measures',
}

export enum PowerTools {
    Grinder = 'Grinder',
    Sander = 'Sander',
    Saw = 'Saw',
    Drill = 'Drill',
}

export enum OtherTools {
    ToolBelts = 'Tool Belts',
    StorageSolutions = 'Storage Solutions',
    Workbench = 'Workbench',
    SafetyGear = 'Safety Gear',
    Fasteners = 'Fasteners',
}

export  class SideBar {
    page: Page;
    sortDropdownLocator: Locator;
    filterCheckBoxByName: string;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdownLocator = this.page.locator('[data-test="sort"]');
        this.filterCheckBoxByName = 'name="category_id"';
    };

    async selectSortingOption(sortingOption: SortingOption){
        await this.sortDropdownLocator.selectOption(sortingOption);
    }

    async applyPowerToolsFilter(filterOption: PowerTools){
        await this.page.getByRole('checkbox', { name: /Sander/i }).check();
    }


}

