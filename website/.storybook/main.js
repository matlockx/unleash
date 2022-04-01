const AliasPlugin = require('enhanced-resolve/lib/AliasPlugin');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-root-attribute/register',
    ],
    framework: '@storybook/react',
    staticDirs: [
        {
            from: '../static',
            to: '/',
        },
    ],
    webpackFinal: async (config) => {
        const path = require('path');

        const docusaurusPath = (...paths) =>
            path.resolve(
                __dirname,
                '../',
                'node_modules',
                '@docusaurus',
                ...paths,
            );

        config.resolve.plugins = [
            new AliasPlugin(
                'described-resolve',
                [
                    {
                        name: '@theme',
                        alias: [
                            path.resolve(__dirname, '../', 'src', 'theme'),
                            docusaurusPath(
                                'theme-classic',
                                'lib-next',
                                'theme',
                            ),
                            docusaurusPath(
                                'core',
                                'lib',
                                'client',
                                'theme-fallback',
                            ),
                        ],
                    },
                ],
                'resolve',
            ),
        ];

        // const docusaurusAliases = await loadDocusaurusAliases();
        // console.log(docusaurusAliases);

        config.resolve.alias = {
            ...config.resolve.alias,
            '@site': path.resolve(__dirname, '../'),
            '@docusaurus/theme-common': path.resolve(
                __dirname,
                '../',
                'node_modules',
                '@docusaurus',
                'theme-common',
                'src',
                'index.ts',
            ),
            '@docusaurus/utils-common': path.resolve(
                __dirname,
                '../',
                'node_modules',
                '@docusaurus',
                'utils-common',
                'lib',
            ),
            '@docusaurus/plugin-content-docs': path.resolve(
                __dirname,
                '../',
                'node_modules',
                '@docusaurus',
                'plugin-content-docs',
                'src',
            ),
            '@docusaurus': path.resolve(
                __dirname,
                '../',
                'node_modules',
                '@docusaurus',
                'core',
                'lib',
                'client',
                'exports',
            ),
            '@generated': path.resolve(__dirname, '../', '.docusaurus'),
        };

        let cssRules = [];
        const rules = config.module.rules.map((rule) => {
            if (rule.test.toString() === '/\\.css$/') {
                cssRules.push(JSON.parse(JSON.stringify(rule)));

                return {
                    ...rule,
                    exclude: /\.module\.css$/,
                };
            } else if (rule.test.toString() === '/\\.(mjs|tsx?|jsx?)$/') {
                return {
                    ...rule,
                    // don't exclude docusaurus files
                    exclude: /node_modules\/(?!@docusaurus)/,
                };
            } else return rule;
        });

        cssRules.forEach((r) => {
            const moduleRule = {
                ...r,
                test: /\.module\.css$/,
                use: r.use.map((use) => {
                    if (
                        typeof use === 'object' &&
                        use.loader.includes('/css-loader/')
                    ) {
                        use.options = {
                            ...use.options,
                            modules: true,
                        };
                    }
                    return use;
                }),
            };
            rules.push(moduleRule);
        });

        return {
            ...config,
            module: {
                ...config.module,
                rules,
            },
        };
    },
};
