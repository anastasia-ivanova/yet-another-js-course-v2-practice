import {Locator} from "@playwright/test";
import {BaseFragment} from "../../baseFragment";

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

export  class SideBarFragment extends BaseFragment{
    private readonly root: Locator = this.page.getByTestId('filters');
    readonly sortDropdownLocator: Locator = this.root.getByTestId('sort');

    async selectSortingOption(sortingOption: SortingOption):Promise<void>{
        await this.sortDropdownLocator.selectOption(sortingOption);
        await this.page.waitForResponse(resp => resp.url().includes('/products?sort=') && resp.status() === 200 )
    }

    async applyPowerToolsFilter(filterOption: PowerTools):Promise<void>{
        await this.root.getByRole('checkbox', { name: filterOption }).check();
        await this.page.waitForResponse(resp => resp.url().includes('/products?between=price,1,100&by_category=') && resp.status() === 200);

    }


}

