import { TranslateLoader } from "@ngx-translate/core"
import { of } from "rxjs"
import * as de from "@locales/de.json"
import * as en from "@locales/en.json"

export class MyTranslationLoader implements TranslateLoader {
    public getTranslation(lang: string) {
        let translation;
        switch (lang) {
            case 'de':
                translation = { ...de };
                break;
            case 'en':
                translation = { ...en };
                break;
            default:
                translation = { ...de };
                break;
        }
        return of(translation)
    }
}