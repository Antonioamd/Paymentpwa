/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */
const { Targetables } = require("@magento/pwa-buildpack");

module.exports = (targets) => {
  const targetables = Targetables.using(targets);


    const HomeComponent = targetables.reactComponent(
        "@magento/venia-ui/lib/RootComponents/CMS/cms.js"
     );
     const Slide1 = HomeComponent.addImport(
        "Slide1 from '@aiello/slide/components/Slide1'"
    );
    HomeComponent.prependJSX("<Fragment/>",`${Slide1}  `);





  targets.of("@magento/venia-ui").routes.tap((routes) => {
    routes.push({
      name: "MyGreetingRoute",
      pattern: "/greeting/:who?",
      path: require.resolve("./src/components/GreetingPage/greetingPage.js"),
    });
    return routes;
  });
};


