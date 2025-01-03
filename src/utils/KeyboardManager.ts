import * as Hooks from "@hooks/index"

export default class KeyboardManager {
  private static keyBinds: Map<string, Function> = new Map()
  private static keyDowns: Map<string, boolean> = new Map()
  private static keyUps: Map<string, boolean> = new Map()
  private static specialKeys: Map<string, string> = new Map()
  private static specialKeysReverse: Map<string, string> = new Map()
  private static specialKeysDown: Map<string, boolean> = new Map()
  private static specialKeysUp: Map<string, boolean> = new Map()

  getAvailableCommands() {
    return Hooks.useGetCommands()
  }
  public static init() {}
}
