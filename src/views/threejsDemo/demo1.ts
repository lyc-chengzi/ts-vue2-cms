import DemoBase from "./demoBase";
export default class TestDemo extends DemoBase {
  private readonly controlParams = {
    name: "你好",
  };
  mounted(): void {
    this.initHelper(this.controlParams);
  }
}
