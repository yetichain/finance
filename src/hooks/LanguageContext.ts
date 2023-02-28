import { createContext, Dispatch, SetStateAction } from 'react'

export interface LanguageObject {
  code: string
  language: string
}
interface LanguageState {
  selectedLanguage: LanguageObject
  setSelectedLanguage: Dispatch<SetStateAction<LanguageObject>>
  translatedLanguage: LanguageObject
  setTranslatedLanguage: Dispatch<SetStateAction<LanguageObject>>
}

const defaultLanguageState: LanguageState = {
  selectedLanguage: { code: '', language: '' },
  setSelectedLanguage: (): void => undefined,
  translatedLanguage: { code: '', language: '' },
  setTranslatedLanguage: (): void => undefined,
}

export const LanguageContext = createContext(defaultLanguageState as LanguageState)
