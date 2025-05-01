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
    readonly page: Page;
    private readonly root: Locator;
    readonly sortDropdownLocator: Locator;
    readonly filterCheckBoxByName: string;

    constructor(page: Page) {
        this.page = page;
        this.root = this.page.getByTestId('filters');
        this.sortDropdownLocator = this.root.getByTestId('sort');
        this.filterCheckBoxByName = 'name="category_id"';
    };

    async selectSortingOption(sortingOption: SortingOption){
        await this.sortDropdownLocator.selectOption(sortingOption);
    }

    async applyPowerToolsFilter(filterOption: PowerTools){
        await this.root.getByRole('checkbox', { name: filterOption }).check();
    }


}

