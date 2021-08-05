import { CreateElement, VNode } from "vue";
import { IPageJSONConfig } from ".";

export type baseRenderFunc = (
  createElement: CreateElement,
  element?: IPageJSONConfig
) => VNode | undefined;
export type componentRenderFunc = (
  createElement: CreateElement,
  element: IPageJSONConfig,
  baseRender: baseRenderFunc
) => VNode | undefined;