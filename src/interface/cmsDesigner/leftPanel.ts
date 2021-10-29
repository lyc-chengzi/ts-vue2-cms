export interface IMenus {
    level: number;
    key: string;
    title: string;
    icon?: string;
    children?: IMenus[];
    selected?: boolean;
}
export interface ILeftMenuModuleState {
    menus: IMenus[];
    selectedMenuId: string;
}
