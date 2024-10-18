---
slug: /contributing/translations
---

# Contributions to translations

You can help translate the Playground documentation into any language. This page provides a comprehensive guide on how to contribute to the translation of Playground docs.

## How can I contribute to translations?

By using the same workflow than contributing to any other docs page. You could fork [WordPress/wordpress-playground](https://github.com/WordPress/wordpress-playground) and make PRs with your changes or edit pages directly using the GitHub UI

:::info
Check the [How can I contribute?](/contributing/documentation#how-can-i-contribute) to learn more about how to contribute to Playground Docs
:::

## Translations implementation details

:::info
Check the [Internationalization section](https://docusaurus.io/docs/i18n/introduction) of Docusaurus Docs to learn more about translations management in a Docusaurus website (the engine behind Playground Docs).
:::

Languages available for the Docs site are defined on `docusaurus.config.js`. For example:

```
i18n: {
  defaultLocale: 'en',
  path: 'i18n',
  locales: ['en', 'fr'],
  localeConfigs: {
	en: {
		label: 'English',
		path: 'en',
	},
	fr: {
		label: 'French',
		path: 'fr',
	},
  },
}
```

Translated docs pages are located in the [WordPress/wordpress-playground](https://github.com/WordPress/wordpress-playground) repository.

Under `packages/docs/site/i18n/` there's a folder for each language.
For example for `es` (Spanish) there's a `packages/docs/site/i18n/es` folder

Under each language folder there should be a `docusaurus-plugin-content-docs/current` folder.
For example for `es` (Spanish) there's a `packages/docs/site/i18n/es/docusaurus-plugin-content-docs/current` folder.

Under `docusaurus-plugin-content-docs/current` the same structure of files of the original docs (same structure of files than under `packages/docs/site/docs`) should be replicated.

For example for `es` (Spanish) the folllowing translated files exists: `packages/docs/site/i18n/es/docusaurus-plugin-content-docs/current/main/intro.md`

If a file is not available under a language's folder the original file in the default language will be loaded

When a new language is added (see PR [#1807](https://github.com/WordPress/wordpress-playground/pull/1807)) you can run `npm run write-translations -- --locale <%LANGUAGE%>` from `packages/docs/site` to generate the JSON files with messages that can be translated to a specific language.

With the proper i18n `docusaurus.config.js` configuration and files under `i18n` when running `npm run build:docs` from the root of the project especific folders under `dist` for each language will be created.

## How to locally test a language

To locally test an existing language you can do:

-   Modify (translate) any file under one of the available languages: `packages/docs/site/i18n/{%LANGUAGE%}/docusaurus-plugin-content-docs/current`
-   From `/packages/docs/site` run the version for the language you'd like to test. For example to test `es`:

```

npm run dev -- --locale es

```

## Language Switcher - UI element to change language

The "Language Switcher" is a UI element provided by docusuarus (the docs engine behind Playground Docs) that allows user to change the language of a specific page.

To give more visibility to a translated version the language switcher can be displayed by adding the following lines at `docusaurus.config.js`

```

{
  type: 'localeDropdown',
  position: 'right',
},

```

This will generate a dropdown in the header to access directly to a language version of each file.

It's strongly recommended that a specific language is activated in this Dropdown only when there's a fair amount of pages translated. If it's activated with few pages translated the experience the user will get is that whenever they change to the language no page will be translated to that language.

### Making a language publicly available on the Language Switcher

All languages are available when the i18n setup for a language is done and the correct structure of files is available under `i18n`.

-   https://wordpress.github.io/wordpress-playground/
-   https://wordpress.github.io/wordpress-playground/es/
-   https://wordpress.github.io/wordpress-playground/fr/

These language versions of the docs should be hidden on the language switcher hidden until there's a fair amount of pages translated for that language. To be more precise, the recommendation is to only make a language publicly available on the Language Switcher when at least the [Documentation](https://wordpress.github.io/wordpress-playground/) section is completely translated for a specific language including the following sections:

-   [Quick Start Guide](https://wordpress.github.io/wordpress-playground/quick-start-guide)
-   [Playground web instance](https://wordpress.github.io/wordpress-playground/web-instance)
-   [About Playground](https://wordpress.github.io/wordpress-playground/about)
-   [Guides](https://wordpress.github.io/wordpress-playground/guides)
-   [Contributing](https://wordpress.github.io/wordpress-playground/contributing)
-   [Links and Resources](https://wordpress.github.io/wordpress-playground/resources)

Even if the language switcher doesn't display a specific language, work on adding translated pages can still progress, as the translated pages will become publicly available once the PRs containing the translated files are merged.

Asumming the `fr` language is the first language with the Documentation hub pages (Quick Start Guide, Playground web instance, About Playground, Guides,... ) completely translated to French, the `docusaurus.config.js` should look like this in that branch so `npm run build:docs` properly generate the `fr` subsite and only displays the french language in the `localeDropdown` language switcher

```
  {
    "i18n": {
      "defaultLocale": "en",
      "path": "i18n",
      "locales": [
        "en",
        "fr"
      ],
      "localeConfigs": {
        "en": {
          "label": "English",
          "path": "en"
        },
        "fr": {
          "label": "French",
          "path": "fr"
        }
      }
    }
  },
  {
    "type": "localeDropdown",
    "position": "right"
  }
```

### Testing the Language Switcher locally

Regarding testing the `localeDropdown` locally, I have found that although is displayed locally it doesn't really work locally as expected as the translated pages are not found. But it seems to work well in production.

You can test the `localeDropdown` from any fork and doing from the root of the project:

```
npm run build:docs
npm run deploy:docs
```

This generates three versions of the docs in the GitHub Pages of my forked repo:

```
https://<%GH-USER-WITH-FORK%>.github.io/wordpress-playground/
https://<%GH-USER-WITH-FORK%>.github.io/wordpress-playground/es/
https://<%GH-USER-WITH-FORK%>.github.io/wordpress-playground/fr/
```

So, a possible approach to testing the `localeDropdown` feature is by deploying it to the GitHub Pages of a forked repository.

## Process to translate one page in a language

The recommended process is to copy and paste the `.md` file from the original path (`packages/docs/site/docs`) into the desired language path ( `packages/docs/site/i18n/{%LANGUAGE%}/docusaurus-plugin-content-docs/current`). It is important to replicate the structure of files at `packages/docs/site/docs`

The file under `packages/docs/site/i18n/{%LANGUAGE%}/docusaurus-plugin-content-docs/current` can be translated and a PR can be created with the new changes.

When the PR is merged the translated version of that page should appear under https://wordpress.github.io/wordpress-playground/{%LANGUAGE%}
