// prettier-ignore
// Auto-generated. Do not edit.
// Run: bun scripts/genAssets.ts

const MAP = {
  "adaptive-icon": require("./adaptive-icon.png"),
  "favicon": require("./favicon.png"),
  "icon": require("./icon.png"),
  "icon.apple": require("./icon/apple.svg"),
  "icon.google": require("./icon/google.svg"),
  "manifest": require("./manifest.json"),
  "splash": require("./splash.png"),
  "splash-icon": require("./splash-icon.png"),
  "storyset.signin": require("./storyset/signin.svg"),
  "user_avatar.buffalo": require("./user_avatar/buffalo.png"),
  "user_avatar.cat": require("./user_avatar/cat.png"),
  "user_avatar.chick": require("./user_avatar/chick.png"),
  "user_avatar.default": require("./user_avatar/default.png"),
  "user_avatar.goat": require("./user_avatar/goat.png"),
  "user_avatar.hamster": require("./user_avatar/hamster.png"),
  "user_avatar.horse": require("./user_avatar/horse.png"),
  "user_avatar.lion": require("./user_avatar/lion.png"),
  "user_avatar.owl": require("./user_avatar/owl.png"),
  "user_avatar.pig": require("./user_avatar/pig.png"),
  "user_avatar.sheep": require("./user_avatar/sheep.png"),
  "user_avatar.snake": require("./user_avatar/snake.png"),
  "user_avatar.tiger": require("./user_avatar/tiger.png"),
} as const

export type AssetKey = keyof typeof MAP
export namespace Assets {
  export function get(key: AssetKey) {
    return MAP[key]
  }
}
export default Assets
