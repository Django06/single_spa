import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import { eventBus } from "./event-bus.service";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => System.import(name),
});
const layoutEngine = constructLayoutEngine({ routes, applications });

window.eventBus = eventBus;

applications.forEach(registerApplication);
layoutEngine.activate();
start();
