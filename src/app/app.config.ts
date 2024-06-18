import { AXConversationModule } from '@acorex/components/conversation';
import { AX_DATETIME_HOLIDAYS_LOADER } from '@acorex/core/date-time';
import { AXFormatModule } from '@acorex/core/format';
import { AX_TRANSLATION_CONFIG, AX_TRANSLATION_LOADER, translationConfig } from '@acorex/core/translation';
import { AXValidationModule } from '@acorex/core/validation';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MyCustomHolidaysLoader, MyTranslationLoader } from './app.loaders';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    importProvidersFrom(AXValidationModule.forRoot(), AXConversationModule.forRoot(), AXFormatModule.forRoot()),
    {
      provide: AX_DATETIME_HOLIDAYS_LOADER,
      useClass: MyCustomHolidaysLoader,
    },
    {
      provide: AX_TRANSLATION_LOADER,
      useClass: MyTranslationLoader,
    },
    {
      provide: AX_TRANSLATION_CONFIG,
      useValue: translationConfig({
        preloadLangs: ['en'],
        defaultLang: 'en',
      }),
    },
  ],
};
