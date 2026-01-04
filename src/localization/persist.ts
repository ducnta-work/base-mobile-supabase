/**
 * Helper persist ngôn ngữ ứng dụng dùng MMKV.
 * Để thêm ngôn ngữ mới:
 * 1. Thêm resource vào `resources` trong `src/localization/index.ts` (namespace hiện dùng: task, finance)
 * 2. Thêm option vào `languageOptions.ts` với code + labelKey tương ứng
 * 3. Thêm các cặp key dịch trong JSON (en/vi hoặc ngôn ngữ mới)
 * 4. Không cần chỉnh logic persist; chỉ cần gọi setAppLanguage(code)
 */
import { MMKV } from "react-native-mmkv"

const storage = new MMKV({ id: "app-settings" })
const LANGUAGE_KEY = "app.language"

export function getPersistedLanguage(): string | null {
  try {
    return storage.getString(LANGUAGE_KEY) ?? null
  } catch {
    return null
  }
}

export function setAppLanguage(code: string) {
  try {
    storage.set(LANGUAGE_KEY, code)
  } catch {
    // swallow
  }
}

export const LANGUAGE_PERSIST_KEY = LANGUAGE_KEY
