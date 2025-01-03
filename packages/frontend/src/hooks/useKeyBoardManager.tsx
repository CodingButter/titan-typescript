import { useEffect, useState, createContext, useContext } from "react"

const SpecialKeys = {
  Control: {
    key: "Control",
    shorthand: "Ctrl",
    codes: ["ControlLeft", "ControlRight"],
    code: "Control",
    keyCodes: [17],
  },
  Shift: {
    key: "Shift",
    shorthand: "Shift",
    codes: ["ShiftLeft", "ShiftRight"],
    code: "Shift",
    keyCodes: [16],
  },
  Alt: {
    key: "Alt",
    shorthand: "Alt",
    codes: ["AltLeft", "AltRight"],
    code: "Alt",
    keyCodes: [18],
  },
  Meta: {
    key: "Meta",
    shorthand: "Meta",
    codes: ["MetaLeft", "MetaRight"],
    code: "Meta",
    keyCodes: [91],
  },
  Enter: {
    key: "Enter",
    shorthand: "Enter",
    codes: ["Enter"],
    code: "Enter",
    keyCodes: [13],
  },
  Tab: {
    key: "Tab",
    shorthand: "Tab",
    codes: ["Tab"],
    code: "Tab",
    keyCodes: [9],
  },
  Backspace: {
    key: "Backspace",
    shorthand: "Backspace",
    codes: ["Backspace"],
    code: "Backspace",
    keyCodes: [8],
  },
  Delete: {
    key: "Delete",
    shorthand: "Delete",
    codes: ["Delete"],
    code: "Delete",
    keyCodes: [46],
  },
  Escape: {
    key: "Escape",
    shorthand: "Esc",
    codes: ["Escape"],
    code: "Escape",
    keyCodes: [27],
  },
  CapsLock: {
    key: "CapsLock",
    shorthand: "CapsLock",
    codes: ["CapsLock"],
    code: "CapsLock",
    keyCodes: [20],
  },
}

export interface Combinition {
  key: string
  specialKeys: keyof (typeof SpecialKeys)[]
  mode: "strict" | "loose"
}

export interface KeyBind {
  combination: Combinition
  enabled: boolean
  action: string
}

export interface KeyboardManager {
  keyBinds: KeyBind[]
  addKeyBind: (keyBind: KeyBind) => void
  removeKeyBind: (keyBind: KeyBind) => void
  pressedKeys: Combinition
}
const KeyboardManagerContext = createContext``
